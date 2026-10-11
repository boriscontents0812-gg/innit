import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: "Missing webhook secret or signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId || session.client_reference_id;

    if (userId) {
      const durationDays = parseInt(session.metadata?.durationDays || "14", 10);
      const proExpiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: userId },
        data: {
          isPro: true,
          proExpiresAt,
        },
      });

      await prisma.purchase.create({
        data: {
          userId,
          stripeSessionId: session.id,
          amount: (session.amount_total || 39900) / 100,
          currency: (session.currency || "usd").toUpperCase(),
          durationDays,
          status: "completed",
        },
      });

      console.log(`Successfully activated 14-day Pro pass for user ${userId}`);
    }
  }

  return NextResponse.json({ received: true });
}
