import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — innit",
};

export default function PrivacyPage() {
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
        <ShieldCheck className="w-4 h-4" />
        <span>DATA PROTECTION & PRIVACY POLICY</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-8">
        Privacy & Photo Handling Policy
      </h1>

      <div className="space-y-8 text-xs sm:text-sm text-bone-300 font-light leading-relaxed">
        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">1. Image Processing & Retention</h2>
          <p>
            When you upload a clothing item to innit, the image is transmitted securely via 256-bit encrypted SSL. The photo is analyzed solely to extract visual parameters: garment classification, silhouette drape, weave texture, and color harmony.
          </p>
          <p className="mt-3">
            We never share your personal uploads with public repositories, third-party advertisers, or search engines. Your images are tied exclusively to your private session and look vault.
          </p>
        </section>

        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">2. Right to be Forgotten (GDPR & CCPA)</h2>
          <p>
            You maintain absolute sovereignty over your uploaded content. You can purge all uploaded photos and generation history instantly at any time from your <Link href="/account" className="text-brass-400 underline">Account Dashboard</Link> or <Link href="/saved" className="text-brass-400 underline">Look Vault</Link> with 1-click execution.
          </p>
        </section>

        <section className="bg-charcoal-900 border border-luxury-border p-6 rounded-2xl">
          <h2 className="font-serif text-xl text-bone-100 font-light mb-3">3. Payment Information Security</h2>
          <p>
            All financial transactions are handled directly through Stripe, a Level 1 PCI-DSS compliant payment provider. innit never stores, processes, or has access to your full credit card number or billing CVV.
          </p>
        </section>
      </div>
    </div>
  );
}
