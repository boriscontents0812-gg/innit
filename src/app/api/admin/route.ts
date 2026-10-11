import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get("x-admin-key");
    const expectedKey = process.env.ADMIN_SECRET_KEY || "atelier_admin_secret_2026";

    if (adminKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const [
      totalUsers,
      totalOutfits,
      totalPurchases,
      totalAffiliateClicks,
      products,
      settings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.outfit.count(),
      prisma.purchase.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.affiliateClick.count(),
      prisma.product.findMany({ orderBy: { brand: "asc" } }),
      prisma.systemSetting.findMany(),
    ]);

    const totalRevenueUsd = totalPurchases.reduce((acc, p) => acc + p.amount, 0);

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalOutfits,
        activePurchasesCount: totalPurchases.length,
        totalRevenueUsd,
        totalAffiliateClicks,
      },
      recentPurchases: totalPurchases,
      products,
      settings,
    });
  } catch (error) {
    console.error("Admin dashboard API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get("x-admin-key");
    const expectedKey = process.env.ADMIN_SECRET_KEY || "atelier_admin_secret_2026";

    if (adminKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { action, productId, inStock, priceUsd, settingKey, settingValue } = body;

    if (action === "toggle_product_stock" && productId) {
      const updated = await prisma.product.update({
        where: { id: productId },
        data: { inStock: Boolean(inStock) },
      });
      return NextResponse.json({ success: true, product: updated });
    }

    if (action === "update_product_price" && productId && priceUsd) {
      const updated = await prisma.product.update({
        where: { id: productId },
        data: { priceUsd: Number(priceUsd), lastChecked: new Date() },
      });
      return NextResponse.json({ success: true, product: updated });
    }

    if (action === "update_setting" && settingKey && settingValue !== undefined) {
      const updated = await prisma.systemSetting.upsert({
        where: { key: settingKey },
        update: { value: String(settingValue) },
        create: { key: settingKey, value: String(settingValue) },
      });
      return NextResponse.json({ success: true, setting: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Admin action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
