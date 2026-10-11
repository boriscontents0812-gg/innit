import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Service — innit",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bone-400 hover:text-brass-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to innit Home</span>
      </Link>

      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-2">
        <Shield className="w-4 h-4" />
        <span>LEGAL CONTRACT & TERMS</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-8">
        Terms of Service
      </h1>

      <div className="space-y-8 text-xs sm:text-sm text-bone-300 font-light leading-relaxed">
        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">1. Free Generations & AI Stylist Pro</h2>
          <p>
            New visitors receive three (3) complimentary full outfit generations. When complimentary credits are exhausted, users may purchase the AI Stylist Pro pass.
          </p>
          <p className="mt-3">
            <strong>14-Day Fixed Access Period:</strong> The AI Stylist Pro plan ($399 USD) grants 14 days of unrestricted outfit generations and item swap controls. It is a fixed access pass—NOT an automatic recurring subscription. You will not be rebilled automatically upon expiration.
          </p>
        </section>

        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">2. Retailer Inventory & Pricing</h2>
          <p>
            innit curates recommendations from authorized retailer feeds and approved partner catalogs. While we make every reasonable effort to keep pricing and stock up-to-date, final checkout price, shipping rates, and stock availability are determined exclusively by the respective retailer at point of sale.
          </p>
        </section>
      </div>
    </div>
  );
}
