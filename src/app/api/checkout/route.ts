import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createProPassCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId: reqUserId, testSimulateSuccess } = body;

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

    // Local sandbox immediate activation feature for developer verification
    if (testSimulateSuccess) {
      const proExpiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          isPro: true,
          proExpiresAt,
        },
      });

      await prisma.purchase.create({
        data: {
          userId: user.id,
          stripeSessionId: `sim_dev_${Date.now()}`,
          amount: 399.0,
          currency: "USD",
          durationDays: 14,
          status: "completed",
        },
      });

      return NextResponse.json({
        success: true,
        isSimulated: true,
        activated: true,
        proExpiresAt: updatedUser.proExpiresAt,
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await createProPassCheckoutSession({
      userId: user.id,
      userEmail: user.email,
      successUrl: `${appUrl}/account?upgrade=success`,
      cancelUrl: `${appUrl}/#pricing`,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      isSimulated: session.isSimulated,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Failed to initialize checkout session" }, { status: 500 });
  }
}
