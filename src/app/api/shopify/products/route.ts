import { NextRequest, NextResponse } from "next/server";
import { getShopifyProducts } from "@/lib/shopify";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const syncWithDb = searchParams.get("sync") === "true";

    const shopifyProducts = await getShopifyProducts(20);

    // Optionally sync into database
    if (syncWithDb && shopifyProducts.length > 0) {
      for (const p of shopifyProducts) {
        const firstVariant = p.variants?.edges?.[0]?.node;
        const firstImage = p.images?.edges?.[0]?.node?.url || "";

        await prisma.product.upsert({
          where: { id: `shopify_${p.handle}` },
          update: {
            name: p.title,
            brand: p.vendor || "Deadly Ponies",
            retailer: "Shopify Store",
            category: p.productType?.toLowerCase() || "accessory",
            priceUsd: parseFloat(firstVariant?.price?.amount || "0"),
            imageUrl: firstImage,
            productUrl: `https://${process.env.SHOPIFY_STORE_DOMAIN || 'deadlyponies.com'}/products/${p.handle}`,
            inStock: firstVariant?.availableForSale ?? true,
            description: p.description,
            aesthetic: "Quiet Luxury",
            gender: "Unisex",
          },
          create: {
            id: `shopify_${p.handle}`,
            name: p.title,
            brand: p.vendor || "Deadly Ponies",
            retailer: "Shopify Store",
            category: p.productType?.toLowerCase() || "accessory",
            aesthetic: "Quiet Luxury",
            gender: "Unisex",
            priceUsd: parseFloat(firstVariant?.price?.amount || "0"),
            imageUrl: firstImage,
            productUrl: `https://${process.env.SHOPIFY_STORE_DOMAIN || 'deadlyponies.com'}/products/${p.handle}`,
            inStock: firstVariant?.availableForSale ?? true,
            sizes: "Standard",
            description: p.description,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      productsCount: shopifyProducts.length,
      products: shopifyProducts,
      connectedStore: process.env.SHOPIFY_STORE_DOMAIN || "Not configured",
    });
  } catch (error: any) {
    console.error("Error fetching Shopify products:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch Shopify products" }, { status: 500 });
  }
}
