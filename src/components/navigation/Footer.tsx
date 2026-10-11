"use client";

import React from "react";
import Link from "next/link";
import { Globe, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { country, setIsCountryModalOpen } = useApp();

  return (
    <footer className="bg-charcoal-950 border-t border-luxury-border text-bone-400 text-xs mt-auto">
      {/* Manifesto & Value Banner */}
      <div className="border-b border-luxury-border/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-serif text-2xl tracking-editorial text-bone-100 font-light block mb-2">
              THE PHILOSOPHY OF RESTRAINT
            </span>
            <p className="text-bone-400 text-xs sm:text-sm leading-relaxed">
              Inspired by the quiet craft of New Zealand leather ateliers like Deadly Ponies and the timeless tailoring of Savile Row. 
              We believe great style starts with a single cherished piece, thoughtfully anchored by harmonized silhouettes and authentic materials.
            </p>
          </div>
          <button
            onClick={() => setIsCountryModalOpen(true)}
            className="flex items-center gap-2 bg-charcoal-850 hover:bg-charcoal-800 border border-luxury-border px-4 py-2.5 rounded-full text-bone-200 transition-colors uppercase tracking-wider text-[11px]"
          >
            <Globe className="w-4 h-4 text-brass-400" />
            <span>Shipping & Currency: {country.flag} {country.name} ({country.currency})</span>
          </button>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-bone-100 font-medium tracking-widest-plus uppercase text-[11px] mb-4">
              Curated Studio
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/studio" className="hover:text-bone-100 transition-colors">
                  Outfit Builder
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-bone-100 transition-colors">
                  Style Aesthetics
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-bone-100 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-bone-100 transition-colors">
                  My Look Vault
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-bone-100 font-medium tracking-widest-plus uppercase text-[11px] mb-4">
              The Style Journal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/journal" className="hover:text-bone-100 transition-colors">
                  All Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/journal/anatomy-of-quiet-luxury" className="hover:text-bone-100 transition-colors">
                  Quiet Luxury Defined
                </Link>
              </li>
              <li>
                <Link href="/journal/trouser-shoe-pairing-guide" className="hover:text-bone-100 transition-colors">
                  Shoe-to-Hem Harmony
                </Link>
              </li>
              <li>
                <Link href="/journal/deadly-ponies-leather-craft" className="hover:text-bone-100 transition-colors">
                  Deadly Ponies Leather Craft
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-bone-100 font-medium tracking-widest-plus uppercase text-[11px] mb-4">
              Membership & Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#pricing" className="hover:text-bone-100 transition-colors">
                  AI Stylist Pro Pass ($399)
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-bone-100 transition-colors">
                  Account & Usage
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-bone-100 transition-colors">
                  Styling Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-bone-100 transition-colors text-bone-500">
                  Curator Console
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-bone-100 font-medium tracking-widest-plus uppercase text-[11px] mb-4">
              Transparency & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="hover:text-bone-100 transition-colors">
                  Privacy Policy & Photo Vault
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-bone-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-bone-100 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-bone-100 transition-colors">
                  FTC Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Compliance Box */}
        <div className="mt-12 pt-8 border-t border-luxury-border/60">
          <div className="bg-charcoal-900 border border-luxury-border p-4 rounded-lg text-[11px] text-bone-400 leading-relaxed mb-6">
            <strong className="text-bone-200 block mb-1 uppercase tracking-wider">Affiliate & Partner Disclosure:</strong>
            Atelier AI participates in selective affiliate marketing partnerships with fashion retailers and luxury brands (including Deadly Ponies, Farfetch, SSENSE, COS, Uniqlo, and Mr Porter). When you click or purchase recommended products via our links, we may earn an affiliate commission at no extra cost to you. We never fabricate shopping listings, discounts, or stock status. All prices and availability are verified through authorized feeds or direct merchant inventories.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-bone-500 gap-4">
            <p>© {new Date().getFullYear()} ATELIER AI Ltd. All rights reserved. New Zealand & Worldwide.</p>
            <div className="flex items-center gap-4">
              <span>Secure SSL 256-bit Encryption</span>
              <span>•</span>
              <span>Stripe Verified Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
