import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Refund Policy — innit",
};

export default function RefundPage() {
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
        <RefreshCw className="w-4 h-4" />
        <span>SATISFACTION & ASSURANCE</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-8">
        Refund & Cancellation Policy
      </h1>

      <div className="space-y-8 text-xs sm:text-sm text-bone-300 font-light leading-relaxed">
        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">1. AI Stylist Pro Refund Guarantee</h2>
          <p>
            If you experience technical issues or if the AI outfit styling engine fails to generate recommendations for your uploaded pieces within your 14-day access period, you may request a full refund by contacting our curator team at <a href="mailto:support@atelier-stylist.internal" className="text-brass-400 underline">support@atelier-stylist.internal</a>.
          </p>
        </section>

        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">2. Physical Product Purchases</h2>
          <p>
            Physical garments, shoes, and leather accessories recommended on innit are purchased directly through individual merchant sites (e.g. Deadly Ponies, Farfetch, SSENSE, COS). Returns, sizing exchanges, and refunds for physical goods are governed strictly by each retailer's respective policy.
          </p>
        </section>
      </div>
    </div>
  );
}
