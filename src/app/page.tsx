"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Camera,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Crown,
  Check,
  ChevronDown,
  Globe,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { STYLE_CATEGORIES } from "@/components/studio/FilterDrawer";

export default function HomePage() {
  const { formatCurrency, setIsUpgradeModalOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI determine what clothes match my uploaded item?",
      a: "The vision model identifies the uploaded garment's silhouette, fabric texture, and tonal palette. It then consults an architectural styling matrix to select complementary pieces—ensuring proportional balance (e.g. relaxed trousers with structured knitwear) and harmonious undertones.",
    },
    {
      q: "Are the recommended products real and purchasable?",
      a: "Yes. Every recommendation links directly to authentic, in-stock products from verified luxury and contemporary merchants (including Deadly Ponies, Farfetch, SSENSE, COS, Uniqlo, and Mr Porter). We never fabricate shopping links or product listings.",
    },
    {
      q: "How do the 3 free generations work?",
      a: "Every new visitor receives 3 complimentary, full 5-piece outfit generations. A credit is only deducted when your generation successfully completes. Failed uploads never consume credits.",
    },
    {
      q: "What is the AI Stylist Pro pass?",
      a: "AI Stylist Pro is an unrestricted 14-day styling pass for $399 USD. It grants unlimited outfit generations, individual item swaps, and priority access to high-tier luxury catalogs. It naturally expires after 14 days with zero recurring surprise charges.",
    },
    {
      q: "How are uploaded photos handled and stored?",
      a: "Your uploaded garments are processed solely to extract styling parameters. Photos are kept in your private account lookbook and can be permanently deleted with a single click in your account settings.",
    },
    {
      q: "Does Atelier AI earn a commission?",
      a: "We participate in selective affiliate programs with authorized retailers. When you purchase through our links, we may receive a commission at no additional cost to you.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-luxury-border">
        {/* Subtle ambient luxury lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brass-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-charcoal-850 border border-luxury-border px-4 py-1.5 rounded-full text-[11px] tracking-widest-plus uppercase text-brass-400 font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span>Editorial AI Fashion Curation</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-bone-100 font-light tracking-tight max-w-4xl leading-[1.1] mb-6">
            ONE PIECE. <br />
            <span className="italic font-normal text-brass-300">A WHOLE FIT.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-bone-400 max-w-2xl font-light leading-relaxed mb-10">
            Upload any clothing item. Get a complete outfit matched to your style, budget, and the stores you love.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <Link
              href="/studio"
              className="w-full sm:w-auto bg-bone-100 hover:bg-bone-200 text-obsidian px-8 py-4 rounded-xl text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:scale-105"
            >
              <span>Build My Outfit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-charcoal-900 hover:bg-charcoal-800 text-bone-200 border border-luxury-border px-8 py-4 rounded-xl text-xs font-medium tracking-widest-plus uppercase transition-all flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
          </div>

          {/* EDITORIAL SAMPLE MOODBOARD (Deadly Ponies Inspired) */}
          <div className="w-full max-w-5xl bg-charcoal-900/90 border border-luxury-border rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-luxury-border/60 text-left">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brass-400 font-semibold block">
                  LOOKBOOK CURATION N° 01
                </span>
                <h3 className="font-serif text-2xl text-bone-100 font-light">
                  The Quiet Luxury Edit
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-bone-400 block font-mono">
                  Full Capsule Value
                </span>
                <span className="font-serif text-xl sm:text-2xl text-bone-100">
                  {formatCurrency(3859)}
                </span>
              </div>
            </div>

            {/* Asymmetrical Editorial Moodboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Anchor Sweater */}
              <div className="group bg-charcoal-950 border border-luxury-border rounded-2xl p-3 text-left">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 relative bg-charcoal-900">
                  <img
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
                    alt="Loro Piana Cashmere Knit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-brass-500 text-obsidian text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                    Anchor Piece
                  </span>
                </div>
                <div className="text-[11px] text-brass-400 uppercase tracking-wider font-medium">Loro Piana</div>
                <div className="font-serif text-sm text-bone-100 truncate">Baby Cashmere Crewneck</div>
                <div className="text-xs text-bone-400 mt-1">{formatCurrency(1450)}</div>
              </div>

              {/* Card 2: Deadly Ponies Bag */}
              <div className="group bg-charcoal-950 border border-luxury-border rounded-2xl p-3 text-left">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 relative bg-charcoal-900">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
                    alt="Deadly Ponies Mr Mini Bandit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-obsidian/80 text-bone-200 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-medium border border-luxury-border">
                    Leather Accents
                  </span>
                </div>
                <div className="text-[11px] text-brass-400 uppercase tracking-wider font-medium">Deadly Ponies</div>
                <div className="font-serif text-sm text-bone-100 truncate">Mr Mini Bandit Bovine</div>
                <div className="text-xs text-bone-400 mt-1">{formatCurrency(469)}</div>
              </div>

              {/* Card 3: The Row Trousers */}
              <div className="group bg-charcoal-950 border border-luxury-border rounded-2xl p-3 text-left">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 relative bg-charcoal-900">
                  <img
                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
                    alt="The Row Pleated Trousers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-obsidian/80 text-bone-200 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-medium border border-luxury-border">
                    Tailored Flannel
                  </span>
                </div>
                <div className="text-[11px] text-brass-400 uppercase tracking-wider font-medium">The Row</div>
                <div className="font-serif text-sm text-bone-100 truncate">Pleated Wool Trousers</div>
                <div className="text-xs text-bone-400 mt-1">{formatCurrency(1290)}</div>
              </div>

              {/* Card 4: Le Labo Vibe */}
              <div className="group bg-charcoal-950 border border-luxury-border rounded-2xl p-3 text-left">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 relative bg-charcoal-900">
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
                    alt="Le Labo Santal 33"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-obsidian/80 text-bone-200 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-medium border border-luxury-border">
                    Vibe & Fragrance
                  </span>
                </div>
                <div className="text-[11px] text-brass-400 uppercase tracking-wider font-medium">Le Labo</div>
                <div className="font-serif text-sm text-bone-100 truncate">Santal 33 Eau de Parfum</div>
                <div className="text-xs text-bone-400 mt-1">{formatCurrency(320)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-luxury-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
              METHODOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-4">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-bone-400">
              Four deliberate steps from a single cherished garment to a complete, purchasable wardrobe capsule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 text-left relative">
              <span className="font-serif text-4xl text-brass-500/40 font-light block mb-4">01</span>
              <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Upload a Piece</h3>
              <p className="text-xs text-bone-400 leading-relaxed">
                Snap any clothing piece with your iPhone camera or drop a photo. Jackets, shirts, trousers, boots, or leather bags.
              </p>
            </div>

            <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 text-left relative">
              <span className="font-serif text-4xl text-brass-500/40 font-light block mb-4">02</span>
              <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Refine Style & Budget</h3>
              <p className="text-xs text-bone-400 leading-relaxed">
                Select your aesthetic (Old Money, Quiet Luxury, Minimalist), target occasion, and preferred budget ceiling.
              </p>
            </div>

            <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 text-left relative">
              <span className="font-serif text-4xl text-brass-500/40 font-light block mb-4">03</span>
              <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Generate Capsule</h3>
              <p className="text-xs text-bone-400 leading-relaxed">
                Our vision engine extracts the undertones, weave, and silhouette to assemble a coordinated 5-piece outfit.
              </p>
            </div>

            <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 text-left relative">
              <span className="font-serif text-4xl text-brass-500/40 font-light block mb-4">04</span>
              <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Shop Real Products</h3>
              <p className="text-xs text-bone-400 leading-relaxed">
                Purchase directly from verified online retailers with live pricing and regional delivery relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STYLE CATEGORIES SECTION */}
      <section id="categories" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-luxury-border bg-charcoal-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
              CURATED AESTHETICS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-4">
              10 Signature Styles
            </h2>
            <p className="text-xs sm:text-sm text-bone-400">
              Each aesthetic is governed by tailored proportions, tactile materials, and authentic heritage cues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STYLE_CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/studio?aesthetic=${encodeURIComponent(cat.id)}`}
                className="group bg-charcoal-900 border border-luxury-border hover:border-brass-500/60 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-brass-400/80 font-mono block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl text-bone-100 group-hover:text-brass-300 transition-colors font-light mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-bone-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-luxury-border/60 flex items-center justify-between text-[11px] text-brass-400 font-medium">
                  <span>Explore Edit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING & PRO PASS */}
      <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-luxury-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
              TRANSPARENT VALUE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-4">
              Complimentary vs Pro Pass
            </h2>
            <p className="text-xs sm:text-sm text-bone-400">
              Begin with three complimentary full outfits. Upgrade to our unrestricted 14-day pass when you require deeper wardrobe curation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="bg-charcoal-900 border border-luxury-border rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bone-400 font-semibold block mb-2">
                  COMPLIMENTARY ACCESS
                </span>
                <h3 className="font-serif text-3xl text-bone-100 font-light mb-2">
                  Atelier Discovery
                </h3>
                <div className="font-serif text-4xl text-bone-100 mb-6">
                  $0 <span className="text-xs font-sans text-bone-400 uppercase tracking-wider">/ 3 Outfits</span>
                </div>
                <p className="text-xs text-bone-300 leading-relaxed mb-6">
                  Experience the full power of our vision engine with three complimentary full outfit generations.
                </p>

                <div className="space-y-3 text-xs text-bone-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span>3 Full 5-Piece Coordinated Outfits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span>Real verified store recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span>Color & silhouette harmony breakdown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span>Private look vault storage</span>
                  </div>
                </div>
              </div>

              <Link
                href="/studio"
                className="mt-8 w-full bg-charcoal-800 hover:bg-charcoal-750 text-bone-100 border border-luxury-border py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest-plus text-center transition-colors block"
              >
                Start Styling (Free)
              </Link>
            </div>

            {/* Pro Tier ($399 for 14 Days) */}
            <div className="bg-charcoal-900 border-2 border-brass-500/70 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden">
              <div className="absolute top-4 right-4 bg-brass-500 text-obsidian text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" /> Pro Access
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-brass-400 font-semibold block mb-2">
                  14-DAY BESPOKE PASS
                </span>
                <h3 className="font-serif text-3xl text-bone-100 font-light mb-2">
                  AI Stylist Pro
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-serif text-4xl text-bone-100">$399</span>
                  <span className="text-xs font-sans text-bone-400 uppercase tracking-wider">
                    USD / 14-Day Pass
                  </span>
                </div>
                <p className="text-xs text-bone-300 leading-relaxed mb-6">
                  Unrestricted access for 14 days. Ideal for seasonal wardrobe overhauls, trip capsules, and high-tier fashion investments.
                </p>

                <div className="space-y-3 text-xs text-bone-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span><strong>Unlimited Outfit Generations</strong> for 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span><strong>Individual Piece Swaps</strong> ("find cheaper trousers", etc.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span>High-tier luxury brand matching (Deadly Ponies, The Row, Loro Piana)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brass-400" />
                    <span><strong>Zero Recurring Auto-Renewals</strong> (expires cleanly after 14 days)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="mt-8 w-full bg-bone-100 hover:bg-bone-200 text-obsidian py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest-plus text-center transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Unlock 14-Day Pro Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STYLE FAQS SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-luxury-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
              CLARITY & ASSURANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-4">
              Frequently Answered
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-charcoal-900 border border-luxury-border rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-medium text-bone-100 hover:text-brass-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brass-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-bone-400 leading-relaxed border-t border-luxury-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-950 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[11px] uppercase tracking-widest-plus text-brass-400 font-semibold block mb-3">
            ELEVATE YOUR WARDROBE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-bone-100 font-light mb-6">
            Begin With One Piece.
          </h2>
          <p className="text-xs sm:text-sm text-bone-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Upload your favorite shirt, trousers, or shoes right now. Receive your first complete coordinated outfit in seconds.
          </p>

          <Link
            href="/studio"
            className="inline-flex bg-bone-100 hover:bg-bone-200 text-obsidian px-10 py-4 rounded-xl text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 shadow-2xl hover:scale-105"
          >
            Open Atelier Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
