import { NextRequest, NextResponse } from "next/server";
import { createShopifyCart } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lines } = body;

    // Default to at least one sample item if none specified
    const cartLines = lines && lines.length > 0
      ? lines
      : [{ merchandiseId: "gid://shopify/ProductVariant/51592955855122", quantity: 1 }];

    const result = await createShopifyCart(cartLines);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: result.checkoutUrl,
      cartId: result.cartId,
    });
  } catch (error: any) {
    console.error("Shopify cart checkout API error:", error);
    return NextResponse.json({ error: error.message || "Failed to create Shopify checkout" }, { status: 500 });
  }
}
