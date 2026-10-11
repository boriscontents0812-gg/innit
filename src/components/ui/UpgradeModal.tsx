"use client";

import React, { useState } from "react";
import { X, Crown, Check, ShieldCheck, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function UpgradeModal() {
  const { user, isUpgradeModalOpen, setIsUpgradeModalOpen, refreshUserData } = useApp();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isUpgradeModalOpen) return null;

  const handleCheckout = async (simulate: boolean = false) => {
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          testSimulateSuccess: simulate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to start checkout");
      }

      if (data.isSimulated && data.activated) {
        setStatusMessage("Pro 14-Day Membership Activated Successfully!");
        await refreshUserData();
        setTimeout(() => {
          setIsUpgradeModalOpen(false);
          setStatusMessage(null);
        }, 1500);
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-charcoal-900 border border-luxury-border w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={() => setIsUpgradeModalOpen(false)}
          className="absolute top-5 right-5 text-bone-400 hover:text-bone-100 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-brass-500/20 flex items-center justify-center text-brass-400">
            <Crown className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold">
            innit STYLIST PRO
          </span>
        </div>

        <h3 className="font-serif text-3xl text-bone-100 font-light mb-2">
          14-Day Editorial Styling Pass
        </h3>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-serif text-4xl font-normal text-bone-100">$399</span>
          <span className="text-xs tracking-wider uppercase text-bone-400">USD / 14 Days Unrestricted Access</span>
        </div>

        <p className="text-xs sm:text-sm text-bone-300 leading-relaxed mb-6">
          Full bespoke access to our multi-modal luxury fashion engine. Never wonder what to pair with an investment piece again.
        </p>

        {/* Feature List */}
        <div className="space-y-3 mb-8 bg-charcoal-950/80 border border-luxury-border/60 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-brass-400 mt-0.5 shrink-0" />
            <div className="text-xs text-bone-200">
              <strong className="text-bone-100 block">Unlimited Capsule Generations</strong>
              Upload unlimited shirts, jackets, trousers, or shoes over 14 days without credit restrictions.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-brass-400 mt-0.5 shrink-0" />
            <div className="text-xs text-bone-200">
              <strong className="text-bone-100 block">Single-Piece Swaps & Regenerations</strong>
              Easily ask for cheaper alternatives, swap to penny loafers, or dial up formality.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-brass-400 mt-0.5 shrink-0" />
            <div className="text-xs text-bone-200">
              <strong className="text-bone-100 block">Deadly Ponies & Luxury Catalog Matching</strong>
              Direct integration with verified luxury leather goods, Italian tailoring, and high-street capsules.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-4 h-4 text-brass-400 mt-0.5 shrink-0" />
            <div className="text-xs text-bone-200">
              <strong className="text-bone-100 block">No Recurring Subscription Trap</strong>
              One-off pass. Access naturally expires in 14 days. Zero hidden auto-renewals.
            </div>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 bg-brass-500/10 border border-brass-500/40 text-brass-300 text-xs rounded-lg text-center font-medium">
            {statusMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleCheckout(false)}
            disabled={loading}
            className="w-full bg-bone-100 hover:bg-bone-200 text-obsidian font-semibold py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest-plus transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Initializing Stripe Checkout...
              </>
            ) : (
              <>
                Unlock Pro Pass ($399 USD) <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Test Sandbox bypass for immediate verification */}
          <button
            onClick={() => handleCheckout(true)}
            disabled={loading}
            className="w-full bg-charcoal-800 hover:bg-charcoal-750 text-brass-400 border border-brass-500/30 font-medium py-2.5 px-4 rounded-lg text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" /> Instant Test Activation (Developer Sandbox)
          </button>
        </div>

        {/* Security & Refund guarantee */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-bone-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brass-400" /> 256-bit Encrypted
          </span>
          <span>•</span>
          <span>14-Day Access Period</span>
          <span>•</span>
          <a href="/refund" className="underline hover:text-bone-200">Refund Policy</a>
        </div>
      </div>
    </div>
  );
}
