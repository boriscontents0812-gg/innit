import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { REAL_PRODUCT_CATALOG } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId") || "unknown";
    const retailer = searchParams.get("retailer") || "Merchant";
    const country = searchParams.get("country") || "US";
    const userId = searchParams.get("userId") || null;

    // Log outbound click event
    try {
      await prisma.affiliateClick.create({
        data: {
          productId,
          retailer,
          country,
          userId: userId || undefined,
        },
      });
    } catch (e) {
      console.warn("Failed to log affiliate click:", e);
    }

    // Determine target URL
    const product = REAL_PRODUCT_CATALOG.find((p) => p.id === productId);
    const destination = product?.affiliateUrl || product?.productUrl || "https://deadlyponies.com";

    return NextResponse.redirect(new URL(destination), {
      status: 307,
    });
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
