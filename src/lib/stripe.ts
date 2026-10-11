import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20" as any,
  appInfo: {
    name: "Atelier AI Fashion Stylist",
    version: "1.0.0",
  },
});

export interface CheckoutSessionOptions {
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createProPassCheckoutSession({
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: CheckoutSessionOptions) {
  // If no live Stripe key is configured, return simulated test session
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_placeholder")) {
    return {
      isSimulated: true,
      url: `${successUrl}?session_id=sim_stripe_${Date.now()}&user_id=${userId}`,
      id: `sim_sess_${Date.now()}`,
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail,
    client_reference_id: userId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "AI Stylist Pro — 14-Day Access Pass",
            description: "Unlimited AI outfit generation, high-tier luxury catalog matching, direct stylist swaps, and editorial moodboards for 14 full days.",
            images: [
              "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
            ],
          },
          unit_amount: 39900, // $399.00 USD
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      plan: "stylist_pro_14d",
      durationDays: "14",
    },
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
  });

  return {
    isSimulated: false,
    url: session.url,
    id: session.id,
  };
}
