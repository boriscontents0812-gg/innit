"use client";

import React from "react";
import { SlidersHorizontal, Sparkles, DollarSign, Calendar, Layers } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const STYLE_CATEGORIES = [
  { id: "Quiet Luxury", label: "Quiet Luxury", desc: "Understated silhouettes, neutral palette, opulent fabrics" },
  { id: "Old Money", label: "Old Money", desc: "Heritage tailoring, loafers, oxford cotton, signet accents" },
  { id: "Minimalist", label: "Minimalist", desc: "Clean architecture, monochrome palette, zero ostentation" },
  { id: "Smart Casual", label: "Smart Casual", desc: "Tailored trousers paired with relaxed knitwear and derbies" },
  { id: "Streetwear", label: "Elevated Streetwear", desc: "Boxy cuts, selvedge denim, luxury sneakers, utilitarian bags" },
  { id: "Starboy", label: "Starboy", desc: "Monochrome black, leather outerwear, Chelsea boots, dark amber" },
  { id: "Vintage", label: "Vintage Heritage", desc: "Washed denims, waxed cotton, patina leather, nostalgic cuts" },
  { id: "Casual Everyday", label: "Casual Everyday", desc: "Effortless flowy trousers, Supima tees, soft suede clogs" },
  { id: "Formal", label: "Black Tie / Formal", desc: "Sharp peak lapels, virgin wool flannel, polished alligator timepieces" },
  { id: "Custom Style", label: "Custom Eclectic", desc: "Unconventional balance of high-low pieces and unexpected textures" },
];

export const OCCASIONS = [
  "Editorial Dinner",
  "Cocktail Hour",
  "Art Gallery Vernissage",
  "Casual Creative Meeting",
  "Weekend City Exploration",
  "Travel & Long Haul Transit",
];

interface FilterDrawerProps {
  selectedAesthetic: string;
  setSelectedAesthetic: (aesthetic: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occasion: string) => void;
  maxBudgetUsd: number;
  setMaxBudgetUsd: (val: number) => void;
}

export default function FilterDrawer({
  selectedAesthetic,
  setSelectedAesthetic,
  selectedOccasion,
  setSelectedOccasion,
  maxBudgetUsd,
  setMaxBudgetUsd,
}: FilterDrawerProps) {
  const { formatCurrency } = useApp();

  return (
    <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-luxury-border/60">
        <SlidersHorizontal className="w-4 h-4 text-brass-400" />
        <h3 className="font-serif text-xl text-bone-100 font-light">Curation Parameters</h3>
      </div>

      <div className="space-y-6">
        {/* Style Category Selector */}
        <div>
          <label className="text-xs uppercase tracking-widest-plus text-bone-300 font-medium block mb-3">
            Primary Aesthetic
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {STYLE_CATEGORIES.map((cat) => {
              const active = selectedAesthetic === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedAesthetic(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs ${
                    active
                      ? "bg-charcoal-800 border-brass-500 text-bone-100 shadow-sm"
                      : "bg-charcoal-950/60 border-luxury-border/60 hover:border-luxury-border text-bone-400 hover:text-bone-200"
                  }`}
                >
                  <div className={`font-serif text-sm ${active ? "text-brass-300 font-medium" : "text-bone-200"}`}>
                    {cat.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasion Selector */}
        <div>
          <label className="text-xs uppercase tracking-widest-plus text-bone-300 font-medium block mb-3">
            Target Occasion
          </label>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => {
              const active = selectedOccasion === occ;
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-3.5 py-2 rounded-full text-xs transition-all ${
                    active
                      ? "bg-brass-500 text-obsidian font-semibold shadow-sm"
                      : "bg-charcoal-850 border border-luxury-border text-bone-400 hover:text-bone-200"
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-widest-plus text-bone-300 font-medium">
              Capsule Target Budget Ceiling
            </label>
            <span className="font-serif text-lg text-brass-300">
              {formatCurrency(maxBudgetUsd)}
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="6000"
            step="100"
            value={maxBudgetUsd}
            onChange={(e) => setMaxBudgetUsd(Number(e.target.value))}
            className="w-full accent-brass-500 bg-charcoal-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-bone-500 mt-1 font-mono">
            <span>High-Street Mix ({formatCurrency(300)})</span>
            <span>Unrestricted Luxury ({formatCurrency(6000)})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
