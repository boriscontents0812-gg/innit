import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Sparkles } from "lucide-react";

export const metadata = {
  title: "innit Support & Concierge — innit",
};

export default function SupportPage() {
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
        <MessageSquare className="w-4 h-4" />
        <span>CLIENT CARE & STYLING CONCIERGE</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-8">
        innit Care & Inquiries
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Curator Email Desk</h3>
          <p className="text-xs text-bone-400 mb-4 leading-relaxed">
            For technical support with photo uploads, Stripe billing, or custom outfit requests.
          </p>
          <a
            href="mailto:support@innit.internal"
            className="text-xs text-brass-400 hover:underline font-mono"
          >
            support@innit.internal
          </a>
        </div>

        <div className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-bone-100 font-light mb-2">Retailer & Affiliate Relations</h3>
          <p className="text-xs text-bone-400 mb-4 leading-relaxed">
            For luxury brands and independent leather goods designers interested in catalog indexing.
          </p>
          <a
            href="mailto:curators@innit.internal"
            className="text-xs text-brass-400 hover:underline font-mono"
          >
            curators@innit.internal
          </a>
        </div>
      </div>
    </div>
  );
}
