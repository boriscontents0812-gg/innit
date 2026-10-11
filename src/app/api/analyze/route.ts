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

    // 1. Get or create user
    let user = reqUserId ? await prisma.user.findUnique({ where: { id: reqUserId } }) : null;
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

    // 2. Check Pro status & remaining free credits
    const isPro = user.isPro && (!user.proExpiresAt || new Date() < user.proExpiresAt);
    if (!isPro && user.freeCredits <= 0) {
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

    // 3. Perform AI Generation
    const result = await generateOutfitFromImage(imageBase64, mimeType || "image/jpeg", {
      aesthetic,
      occasion,
      budgetMaxUsd: budgetMaxUsd ? Number(budgetMaxUsd) : 5000,
      excludedBrands,
    });

    // 4. Server-Side Credit Deduction ONLY upon successful completion
    let updatedCredits = user.freeCredits;
    if (!isPro) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { freeCredits: { decrement: 1 } },
      });
      updatedCredits = updatedUser.freeCredits;
    }

    // 5. Persist Outfit to database
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
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      outfitId: savedOutfit.id,
      outfit: result,
      remainingCredits: updatedCredits,
      isPro,
    });
  } catch (error) {
    console.error("AI Outfit Generation error:", error);
    // Notice: user credit is NOT deducted if an error occurs!
    return NextResponse.json(
      { error: "AI styling analysis failed. Please try a different photo or angle." },
      { status: 500 }
    );
  }
}
