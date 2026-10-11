# innit — AI Fashion Stylist & Shopping Platform

A production-ready, mobile-first AI fashion styling platform with the understated luxury aesthetic of **Deadly Ponies** (`deadlyponies.com`), built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma ORM (SQLite/PostgreSQL)**, **Stripe**, **Shopify Storefront API**, and multi-modal AI Vision.

---

## 1. Product Concept & Overview

**"ONE PIECE. A WHOLE FIT."**

The platform allows users on mobile (iOS/Safari) or desktop to upload a photo of any single clothing piece (sweater, jacket, shirt, trousers, shoes, or leather bag). 

The AI vision engine extracts the garment's weave texture, silhouette proportions, and color undertones, assembling a complete, coordinated 5-piece capsule:
1. **Matching Bottoms or Tops** (proportional balance)
2. **Matching Footwear** (penny loafers, Chelsea boots, minimalist sneakers)
3. **Outerwear & Layering** (tailored wool overcoats, trenches, bombers)
4. **Artisanal Leather Accessories** (featuring handcrafted Deadly Ponies Bovine & Deer Nappa leather goods, belts, watches)
5. **Lifestyle Atmosphere & Scent** (niche olfactive pairings like Le Labo Santal 33, Tom Ford Ombré Leather)

Every piece includes a genuine **"Why This Matches"** explanation, verified real retailer links, real prices localized into 7 currencies, individual piece swap controls, and **1-Click Shopify Checkout**.

---

## 2. Shopify Store Connection

**innit** connects directly with any Shopify store (including Deadly Ponies or your own custom merchant store) via the **Shopify Storefront GraphQL API**:

- **Live Product Sync**: Pull products directly from your Shopify store catalog into the AI recommendation engine via `/api/shopify/products?sync=true` or the `/admin` control suite.
- **1-Click Native Shopify Cart Checkout**: Users can click *"Shop Outfit on Shopify"* to bundle all in-stock pieces into an instant Shopify checkout session or Shop Pay.
- **Works Out-of-the-Box**: Without API keys, the platform operates in a seamless sandbox mode redirecting to verified product pages; connecting your store keys enables live checkout URLs and direct catalog synchronization.

### Connecting Your Shopify Store
1. In your Shopify Admin, navigate to **Settings > Apps and sales channels > Develop apps**.
2. Click **Create an app** (name it `innit AI Stylist`).
3. Click **Configure Storefront API scopes** and enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_write_customers`
4. Click **Install app** and copy your **Storefront API access token**.
5. Add your credentials to `.env`:
   ```ini
   SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
   SHOPIFY_STOREFRONT_ACCESS_TOKEN="shpat_..."
   SHOPIFY_API_VERSION="2024-07"
   ```
6. Open `/admin` (Secret: `atelier_admin_secret_2026`) and click **Sync Products**!

---

## 3. Visual Identity (Deadly Ponies Aesthetic)

- **Color Palette**:
  - Obsidian & Charcoal Canvas: `#0C0C0D`, `#141416`, `#19181B`
  - Bone & Cream Typography: `#FAF8F5`, `#F3EFE8`, `#C9C2B4`
  - Solid Brass & Muted Gold Accents: `#C5A880`, `#D4B688`
  - Razor-thin 1px Dividers: `#242321`
- **Typography**:
  - Serif Display Headlines: *Cormorant Garamond* / *Playfair Display*
  - Body & Labels: *Plus Jakarta Sans* with tracked uppercase styling (`tracking-[0.25em] text-[10px]`)
- **Layout**: Asymmetrical editorial moodboards, tactile photography, subtle micro-animations.

---

## 4. Mobile-First & iOS Experience

- **Native Mobile Bottom Navigation**: Quick switches for *Studio*, *Journal*, *Saved Looks*, *Pro*, and *Account*.
- **Camera & Gallery Picker**: Direct iOS camera trigger (`capture="environment"`), photo library picker, and desktop drag-and-drop.
- **HEIC Image Handling**: Safe conversion and validation for iPhone photos up to 10MB.
- **iOS Safe Areas**: Native notch and home bar padding (`pb-safe`, `pt-safe`, `viewport-fit=cover`).
- **Progressive Web App**: Installable PWA with `manifest.json` and standalone display.

---

## 5. Business & Monetization Architecture

### Complimentary Tier: 3 Free Outfits
- Every user receives **3 free full outfit generations**.
- Enforced on the server—credits are deducted **only** after generation successfully completes. Failed uploads never consume credits.
- Transparent credit counter pill in the top navigation.

### AI Stylist Pro: $399 USD for 14 Days
- **14-day access pass** granting unlimited generations, single-piece swaps, and high-tier luxury catalog access.
- **No auto-renewal trap**: Naturally expires after 14 days without surprise recurring charges.
- Integrated with **Stripe Checkout** (`/api/checkout`) and verified webhooks (`/api/webhooks/stripe`). Includes an instant sandbox simulator for test environments.

### Affiliate Monetization & FTC Compliance
- Outbound click logging & redirect engine (`/api/affiliate/redirect`).
- Clear FTC / ASA disclosure: We participate in affiliate marketing and may earn a commission on qualifying purchases at no extra cost to the buyer. No fabricated shopping links or inventory.

---

## 6. System Architecture & Routes

```
src/
├── app/
│   ├── layout.tsx                # Luxury layout with fonts, PWA meta, and modals
│   ├── page.tsx                  # Flagship homepage (Hero, Moodboard, Method, Categories, Pricing, FAQ)
│   ├── studio/page.tsx           # AI Outfit Studio (Camera upload -> 4-stage loader -> Moodboard canvas)
│   ├── journal/                  # The Style Journal (6 in-depth sartorial masterclasses)
│   │   ├── page.tsx              # Directory
│   │   └── [slug]/page.tsx       # Detail with internal builder links
│   ├── saved/page.tsx            # Private Look Vault with 1-click GDPR photo purge
│   ├── account/page.tsx          # User profile, credits, Pro pass status, currency preferences
│   ├── admin/page.tsx            # Curator console (Shopify sync, metrics, stock toggles, catalog)
│   ├── privacy/page.tsx          # Privacy Policy & Photo Retention
│   ├── terms/page.tsx            # Terms of Service & 14-day pass rules
│   ├── refund/page.tsx           # Refund & Cancellation policy
│   ├── affiliate-disclosure/page.tsx # FTC Affiliate Disclosure
│   ├── support/page.tsx          # Concierge support desk
│   └── api/
│       ├── analyze/route.ts      # Multi-modal AI vision & styling engine
│       ├── regenerate-item/route.ts # Single piece swap
│       ├── checkout/route.ts     # Stripe Checkout session creator
│       ├── webhooks/stripe/route.ts # Stripe webhook signature verification
│       ├── affiliate/redirect/route.ts # Outbound click logger & redirect
│       ├── outfits/route.ts      # Saved looks and GDPR deletion
│       ├── user/credits/route.ts # Server-side credit and Pro pass status
│       ├── shopify/checkout/route.ts # 1-click Shopify cart creation
│       ├── shopify/products/route.ts # Shopify Storefront catalog sync
│       └── admin/route.ts        # Admin analytics and stock management
├── components/
│   ├── navigation/               # Header, BottomNav (iOS), Footer
│   ├── studio/                   # ImageUploader, FilterDrawer, LoadingSequencer, OutfitCanvas, ProductCard, ItemSwapModal
│   └── ui/                       # CountryCurrencyModal, UpgradeModal
├── context/                      # Global AppContext (currency, country, user state)
└── lib/                          # Prisma, AI stylist, real catalog, currency conversion, Stripe, Shopify
```

---

## 7. Quick Start & Setup

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### 1. Installation
```bash
git clone <repository_url>
cd shopify
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configuration variables:
```ini
DATABASE_URL="file:./dev.db"

# Shopify Storefront API
SHOPIFY_STORE_DOMAIN="deadly-ponies-nz.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN=""
SHOPIFY_API_VERSION="2024-07"

# AI Vision & Language Models (Deterministic fallback if unconfigured)
GEMINI_API_KEY=""
OPENAI_API_KEY=""

# Stripe Billing ($399 USD 14-Day Pass)
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Admin Console Access
ADMIN_SECRET_KEY="atelier_admin_secret_2026"
```

### 3. Database Migration & Seeding
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Automated Verification Test Suite
```bash
npx tsx scripts/verify-platform.ts
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Production Build
```bash
npm run build
npm run start
```

---

## 8. Verification Results
Run `npx tsx scripts/verify-platform.ts` to verify all 19 subsystem tests:
- Database Catalog Integrity (27 verified luxury products)
- Deadly Ponies Bag & Belt Catalog Presence
- Multi-Currency Converters (USD, NZD, GBP, JPY, EUR, AUD, CAD)
- AI Vision & Attribute Extraction Pipeline
- 5-Piece Coordinated Capsule Matcher with "Why It Matches" Rationales
- Single-Piece Swap Engine
- Server-Side Credit Deduction Rules (3 Free Outfits)
- 14-Day Pro Pass Expiration Calculation
- Style Journal Masterclasses Pre-rendering
