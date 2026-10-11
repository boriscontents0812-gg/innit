import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Affiliate Disclosure — Atelier AI",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bone-400 hover:text-brass-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Atelier Home</span>
      </Link>

      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-2">
        <ExternalLink className="w-4 h-4" />
        <span>FTC & ASA TRANSPARENCY</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-8">
        Affiliate Marketing Disclosure
      </h1>

      <div className="space-y-8 text-xs sm:text-sm text-bone-300 font-light leading-relaxed">
        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">1. Affiliate Relationships</h2>
          <p>
            Atelier AI participates in affiliate marketing programs. This means that when you click on certain product links on our platform and make a qualifying purchase on an authorized merchant website (such as Deadly Ponies, Farfetch, SSENSE, COS, Uniqlo, or Mr Porter), we may earn an affiliate commission.
          </p>
          <p className="mt-3">
            <strong>Zero Cost To You:</strong> Earning an affiliate commission does not increase the price you pay. You pay the exact same retail or sale price as you would by navigating directly to the retailer's online store.
          </p>
        </section>

        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">2. Editorial Independence</h2>
          <p>
            Our AI curation engine selects complementary pieces based strictly on color harmony, silhouette proportions, aesthetic resonance, and material weave—never based on commission rates. We never invent or fabricate fake shopping links, partnerships, or discounts.
          </p>
        </section>
      </div>
    </div>
  );
}
