import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateOutfitFromImage } from "@/lib/ai-stylist";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType, aesthetic, occasion, budgetMaxUsd, excludedBrands, userId: reqUserId } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided for styling analysis" }, { status: 400 });
    }

    // 1. Get or create user (with graceful fallback if DB is initializing or offline)
    let user: any = null;
    let isPro = false;
    let freeCredits = 3;

    try {
      if (reqUserId) {
        user = await prisma.user.findUnique({ where: { id: reqUserId } });
      }
      if (!user) {
        user = await prisma.user.findFirst();
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: "guest@atelier-stylist.internal",
              name: "Guest Collector",
              freeCredits: 3,
              isPro: false,
            },
          });
        }
      }
      if (user) {
        isPro = Boolean(user.isPro && (!user.proExpiresAt || new Date() < user.proExpiresAt));
        freeCredits = user.freeCredits;
      }
    } catch (dbErr) {
      console.warn("Database user check fallback:", dbErr);
      // Fallback: grant full 3 guest credits in-memory
      isPro = false;
      freeCredits = 3;
    }

    if (!isPro && freeCredits <= 0) {
      return NextResponse.json(
        {
          error: "CREDIT_LIMIT_EXHAUSTED",
          message: "You have used your 3 complimentary outfit generations. Upgrade to AI Stylist Pro for 14-day unlimited access.",
          remainingCredits: 0,
          isPro: false,
        },
        { status: 402 }
      );
    }

    // 2. Perform AI Outfit Generation
    const result = await generateOutfitFromImage(imageBase64, mimeType || "image/jpeg", {
      aesthetic,
      occasion,
      budgetMaxUsd: budgetMaxUsd ? Number(budgetMaxUsd) : 5000,
      excludedBrands,
    });

    // 3. Deduct credit & save outfit gracefully
    let updatedCredits = Math.max(0, freeCredits - (isPro ? 0 : 1));
    let outfitId = `outfit_${Date.now()}`;

    try {
      if (user?.id) {
        if (!isPro) {
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { freeCredits: { decrement: 1 } },
          });
          updatedCredits = updatedUser.freeCredits;
        }

        const savedOutfit = await prisma.outfit.create({
          data: {
            userId: user.id,
            uploadedImageUrl: imageBase64.length > 50000 ? imageBase64.substring(0, 50000) : imageBase64,
            originalGarment: result.heroItem.name,
            aesthetic: result.aesthetic,
            occasion: result.occasion,
            totalPrice: result.totalPriceUsd,
            currency: "USD",
            items: {
              create: result.items.map((it) => ({
                slot: it.slot,
                name: it.product.name,
                brand: it.product.brand,
                price: it.product.priceUsd,
                currency: "USD",
                imageUrl: it.product.imageUrl,
                productUrl: it.product.productUrl,
                affiliateUrl: it.product.affiliateUrl,
                matchReason: it.matchReason,
                productId: it.product.id,
              })),
            },
          },
        });
        outfitId = savedOutfit.id;
      }
    } catch (saveErr) {
      console.warn("Failed to persist outfit to DB, returning live outfit result:", saveErr);
    }

    return NextResponse.json({
      success: true,
      outfitId,
      outfit: result,
      remainingCredits: updatedCredits,
      isPro,
    });
  } catch (error: any) {
    console.error("AI Outfit Generation error:", error);
    return NextResponse.json(
      { error: error?.message || "AI styling analysis failed. Please try a different photo or angle." },
      { status: 500 }
    );
  }
}
