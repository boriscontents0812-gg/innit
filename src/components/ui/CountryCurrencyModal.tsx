"use client";

import React from "react";
import { X, Check, Globe } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_COUNTRIES } from "@/lib/currency";

export default function CountryCurrencyModal() {
  const { country, setCountry, isCountryModalOpen, setIsCountryModalOpen } = useApp();

  if (!isCountryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-charcoal-900 border border-luxury-border w-full max-w-md rounded-xl p-6 shadow-2xl relative">
        <button
          onClick={() => setIsCountryModalOpen(false)}
          className="absolute top-5 right-5 text-bone-400 hover:text-bone-100 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-5 h-5 text-brass-400" />
          <h3 className="font-serif text-2xl text-bone-100 font-light">Regional Curation</h3>
        </div>
        <p className="text-xs text-bone-400 mb-6">
          Select your destination to adapt merchant availability, shipping relevance, and localized currency pricing.
        </p>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {SUPPORTED_COUNTRIES.map((c) => {
            const isSelected = country.code === c.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  setCountry(c);
                  setIsCountryModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "bg-charcoal-800 border-brass-500/60 text-bone-100"
                    : "bg-charcoal-950/60 border-luxury-border/60 hover:border-luxury-border text-bone-300 hover:text-bone-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-bone-400 font-mono">
                      {c.currency} ({c.currencySymbol})
                    </div>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-brass-400" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-luxury-border text-[11px] text-bone-400 text-center">
          Exchange rates are calibrated to daily market benchmarks. Retailer checkout totals reflect actual native merchant invoicing.
        </div>
      </div>
    </div>
  );
}
