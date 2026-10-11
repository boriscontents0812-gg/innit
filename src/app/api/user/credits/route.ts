import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let userId = searchParams.get("userId");

    if (!userId) {
      // Find or create default demo/guest user
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            email: "guest@atelier-stylist.internal",
            name: "Guest Collector",
            freeCredits: 3,
            isPro: false,
          },
        });
      }
      userId = defaultUser.id;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { outfits: { take: 5, orderBy: { createdAt: "desc" } } },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if Pro has expired
    let isProActive = user.isPro;
    if (user.isPro && user.proExpiresAt && new Date() > user.proExpiresAt) {
      isProActive = false;
      await prisma.user.update({
        where: { id: user.id },
        data: { isPro: false },
      });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        freeCredits: user.freeCredits,
        isPro: isProActive,
        proExpiresAt: user.proExpiresAt,
        country: user.country,
        currency: user.currency,
      },
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
