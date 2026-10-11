"use client";

import React, { useState } from "react";
import { User, Crown, Sparkles, Globe, ShieldCheck, CreditCard, Clock, Trash2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AccountPage() {
  const { user, country, setIsCountryModalOpen, setIsUpgradeModalOpen, refreshUserData } = useApp();
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const isPro = user?.isPro;
  const freeCredits = user?.freeCredits ?? 3;

  const calculateDaysRemaining = () => {
    if (!user?.proExpiresAt) return null;
    const diff = new Date(user.proExpiresAt).getTime() - new Date().getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining();

  const handlePurgeData = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/outfits?userId=${user.id}&all=true`, { method: "DELETE" });
      if (res.ok) {
        setDeleteStatus("Your uploaded images and session history have been permanently purged.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Account Title */}
      <div className="mb-12 pb-6 border-b border-luxury-border">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-2">
          <User className="w-3.5 h-3.5" />
          <span>CURATOR MEMBERSHIP & SETTINGS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light tracking-tight">
          Account & Styling Access
        </h1>
        <p className="text-xs text-bone-400 mt-2">
          Manage your usage allowance, active Pro pass duration, and regional preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Pro Pass or Credit Status Card */}
        <div className="bg-charcoal-900 border border-luxury-border rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-luxury-border/60">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brass-400 font-semibold block mb-1">
                ACCESS TIER
              </span>
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-2xl text-bone-100 font-light">
                  {isPro ? "AI Stylist Pro Member" : "Complimentary Discovery Tier"}
                </h3>
                {isPro ? (
                  <span className="bg-brass-500/20 text-brass-300 border border-brass-500/40 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="bg-charcoal-800 text-bone-300 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-luxury-border">
                    Standard
                  </span>
                )}
              </div>
            </div>

            {!isPro && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="bg-bone-100 hover:bg-bone-200 text-obsidian px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest-plus transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <span>Upgrade to Pro ($399)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-charcoal-950 border border-luxury-border/60 p-4 rounded-xl">
              <span className="text-[10px] text-bone-500 uppercase tracking-wider block mb-1">
                Remaining Outfit Credits
              </span>
              <div className="text-xl font-serif text-bone-100">
                {isPro ? "Unlimited Generations" : `${freeCredits} of 3 Remaining`}
              </div>
              <p className="text-[11px] text-bone-400 mt-1">
                {isPro ? "Full access active without credit limits" : "Credits only consumed on successful outfit generations"}
              </p>
            </div>

            <div className="bg-charcoal-950 border border-luxury-border/60 p-4 rounded-xl">
              <span className="text-[10px] text-bone-500 uppercase tracking-wider block mb-1">
                Pass Expiration
              </span>
              <div className="text-xl font-serif text-bone-100">
                {isPro && daysRemaining !== null ? `${daysRemaining} Days Remaining` : "No Active Paid Pass"}
              </div>
              <p className="text-[11px] text-bone-400 mt-1">
                {isPro && user?.proExpiresAt
                  ? `Access ends on ${new Date(user.proExpiresAt).toLocaleDateString()}`
                  : "One-time $399 USD pass grants 14 days of unrestricted access"}
              </p>
            </div>
          </div>
        </div>

        {/* Regional & Currency Preferences */}
        <div className="bg-charcoal-900 border border-luxury-border rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-xl text-bone-100 font-light">
                Regional Preferences
              </h3>
              <p className="text-xs text-bone-400 mt-0.5">
                Controls retailer availability, shipping destination relevance, and price conversions.
              </p>
            </div>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="text-xs text-brass-400 hover:text-brass-300 font-medium uppercase tracking-wider underline"
            >
              Change
            </button>
          </div>

          <div className="flex items-center gap-4 bg-charcoal-950 border border-luxury-border/60 p-4 rounded-xl text-xs">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <div className="font-medium text-bone-100">{country.name}</div>
              <div className="text-bone-400 font-mono text-[11px]">
                Currency: {country.currency} ({country.currencySymbol})
              </div>
            </div>
          </div>
        </div>

        {/* Data Privacy & GDPR Section */}
        <div className="bg-charcoal-900 border border-luxury-border rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>DATA PRIVACY & RIGHT TO BE FORGOTTEN</span>
          </div>
          <h3 className="font-serif text-xl text-bone-100 font-light mb-2">
            Uploaded Photos & Privacy Vault
          </h3>
          <p className="text-xs text-bone-400 leading-relaxed mb-6">
            We respect your privacy. Uploaded photos are processed strictly to extract color, weave, and silhouette parameters. We never sell your personal data or use your personal images for public display without explicit consent.
          </p>

          {deleteStatus && (
            <div className="mb-4 p-3 bg-charcoal-950 border border-brass-500/40 text-brass-300 text-xs rounded-xl">
              {deleteStatus}
            </div>
          )}

          <button
            onClick={handlePurgeData}
            className="bg-charcoal-800 hover:bg-red-950/60 text-bone-300 hover:text-red-300 border border-luxury-border hover:border-red-800 px-4 py-2.5 rounded-xl text-xs tracking-wider transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Purge All My Uploaded Photos & Look History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
