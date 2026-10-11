import { PrismaClient } from "@prisma/client";
import { REAL_PRODUCT_CATALOG } from "../src/lib/catalog";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with real luxury and contemporary fashion catalog...");

  // Seed Products
  for (const item of REAL_PRODUCT_CATALOG) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        brand: item.brand,
        retailer: item.retailer,
        category: item.category,
        gender: item.gender,
        aesthetic: item.aesthetics.join(", "),
        priceUsd: item.priceUsd,
        imageUrl: item.imageUrl,
        productUrl: item.productUrl,
        affiliateUrl: item.affiliateUrl,
        inStock: item.inStock,
        sizes: item.sizes,
        description: item.description,
      },
      create: {
        id: item.id,
        name: item.name,
        brand: item.brand,
        retailer: item.retailer,
        category: item.category,
        gender: item.gender,
        aesthetic: item.aesthetics.join(", "),
        priceUsd: item.priceUsd,
        imageUrl: item.imageUrl,
        productUrl: item.productUrl,
        affiliateUrl: item.affiliateUrl,
        inStock: item.inStock,
        sizes: item.sizes,
        description: item.description,
      },
    });
  }

  // Seed default admin settings
  const settings = [
    { key: "pro_pass_price_usd", value: "399" },
    { key: "pro_pass_duration_days", value: "14" },
    { key: "free_credits_per_account", value: "3" },
    { key: "affiliate_commission_note", value: "Atelier AI earns affiliate commissions on qualifying purchases." },
  ];

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  console.log(`Seeded ${REAL_PRODUCT_CATALOG.length} luxury products and system settings successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
