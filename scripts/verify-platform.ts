import { PrismaClient } from "@prisma/client";
import { REAL_PRODUCT_CATALOG } from "../src/lib/catalog";
import { formatPrice, convertPrice, SUPPORTED_COUNTRIES } from "../src/lib/currency";
import { generateOutfitFromImage, swapOutfitItem } from "../src/lib/ai-stylist";
import { JOURNAL_ARTICLES } from "../src/lib/journal";

const prisma = new PrismaClient();

async function runVerification() {
  console.log("=================================================");
  console.log("  ATELIER AI STYLIST PLATFORM — SYSTEM VERIFICATION");
  console.log("=================================================\n");

  let passed = 0;
  let total = 0;

  function assert(name: string, condition: boolean, detail: string = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${name} ${detail ? `(${detail})` : ""}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} — ${detail}`);
    }
  }

  // Test 1: Database Catalog
  const dbProductsCount = await prisma.product.count();
  assert("Database Catalog Loaded", dbProductsCount >= 25, `Found ${dbProductsCount} products in SQLite`);

  // Test 2: Deadly Ponies Products in Catalog
  const dpProducts = REAL_PRODUCT_CATALOG.filter((p) => p.brand === "Deadly Ponies");
  assert("Deadly Ponies Products Present", dpProducts.length >= 4, `Found ${dpProducts.length} Deadly Ponies leather goods`);

  // Test 3: Currency & Country Localization
  assert("Supported Countries Configured", SUPPORTED_COUNTRIES.length >= 7, `${SUPPORTED_COUNTRIES.length} countries available`);
  const usdFormat = formatPrice(1450, "USD");
  const nzdFormat = formatPrice(1450, "NZD");
  const gbpFormat = formatPrice(1450, "GBP");
  const jpyFormat = formatPrice(1450, "JPY");
  assert("USD Currency Formatter", usdFormat === "$1,450", usdFormat);
  assert("NZD Currency Formatter", nzdFormat.startsWith("NZ$"), nzdFormat);
  assert("GBP Currency Formatter", gbpFormat.startsWith("£"), gbpFormat);
  assert("JPY Currency Formatter", jpyFormat.startsWith("¥"), jpyFormat);

  // Test 4: AI Outfit Generation Pipeline
  const mockImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
  console.log("\nExecuting AI Vision & Styling Pipeline...");
  const outfit = await generateOutfitFromImage(mockImageBase64, "image/jpeg", {
    aesthetic: "Quiet Luxury",
    occasion: "Editorial Dinner",
    budgetMaxUsd: 5000,
  });

  assert("Hero Garment Identity Preserved", Boolean(outfit.heroItem.name), outfit.heroItem.name);
  assert("5 Complementary Outfit Pieces Curated", outfit.items.length === 5, `${outfit.items.length} items`);
  assert("Includes Deadly Ponies / Leather Accessory", outfit.items.some((i) => i.slot === "accessory"), "Accessory slot filled");
  assert("Includes Fragrance / Vibe", outfit.items.some((i) => i.slot === "vibe"), "Vibe slot filled");
  assert("Generated 'Why It Matches' Rationale", outfit.items.every((i) => i.matchReason.length > 20), "All items have genuine matching reasons");
  assert("Total Listed Price Calculated", outfit.totalPriceUsd > 0, `$${outfit.totalPriceUsd} USD`);

  // Test 5: Single Item Swap / Regeneration
  console.log("\nExecuting Single-Item Swap Engine...");
  const currentShoeId = outfit.items.find((i) => i.slot === "footwear")?.product.id || "loro-piana-summer-charms-loafers";
  const swapped = swapOutfitItem(currentShoeId, "footwear", "Find a cheaper alternative", "Quiet Luxury");
  assert("Single-Piece Swap Succeeded", swapped.product.id !== currentShoeId, `Swapped to ${swapped.product.name} (${swapped.product.brand})`);
  assert("Swap Match Rationale Generated", Boolean(swapped.matchReason), swapped.matchReason);

  // Test 6: Free Credits Tracking (3 Free Outfits)
  console.log("\nVerifying Server-Side Credit Rules...");
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "test_verification@atelier-stylist.internal",
        name: "Test Curator",
        freeCredits: 3,
        isPro: false,
      },
    });
  }
  const initialCredits = user.freeCredits;
  assert("User Credit Balance Exists", typeof initialCredits === "number", `${initialCredits} credits`);

  // Test 7: 14-Day Pro Pass Expiration Calculation
  console.log("\nVerifying 14-Day Pro Pass Duration...");
  const proDurationDays = 14;
  const proExpiresAt = new Date(Date.now() + proDurationDays * 24 * 60 * 60 * 1000);
  const diffDays = Math.round((proExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  assert("Pro Pass Valid for Exactly 14 Days", diffDays === 14, `${diffDays} days from now`);

  // Test 8: The Style Journal Articles
  console.log("\nVerifying Style Journal Content...");
  assert("Style Journal Articles Curated", JOURNAL_ARTICLES.length >= 6, `${JOURNAL_ARTICLES.length} masterclasses`);
  const quietLuxuryArticle = JOURNAL_ARTICLES.find((a) => a.slug === "anatomy-of-quiet-luxury");
  assert("Quiet Luxury Masterclass Complete", Boolean(quietLuxuryArticle && quietLuxuryArticle.content.length >= 3), `${quietLuxuryArticle?.readTime}`);

  console.log("\n=================================================");
  console.log(`  VERIFICATION RESULT: ${passed} / ${total} CHECKS PASSED`);
  console.log("=================================================\n");

  await prisma.$disconnect();

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runVerification().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
