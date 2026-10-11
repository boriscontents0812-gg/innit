"use client";

import React, { useState } from "react";
import { X, RefreshCw, Sparkles, Loader2 } from "lucide-react";

interface ItemSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: string;
  currentProductId: string;
  aesthetic: string;
  onItemSwapped: (slot: string, newItem: any) => void;
}

const QUICK_INSTRUCTIONS = [
  "Find a more accessible/cheaper option",
  "Elevate to ultra-luxury heirloom piece",
  "Swap footwear to classic leather penny loafers",
  "Make the silhouette more relaxed & flowy",
  "Switch to minimalist white sneakers",
  "Shift to darker monochrome palette",
];

export default function ItemSwapModal({
  isOpen,
  onClose,
  slot,
  currentProductId,
  aesthetic,
  onItemSwapped,
}: ItemSwapModalProps) {
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSwap = async (selectedInstruction?: string) => {
    const promptText = selectedInstruction || instruction;
    if (!promptText) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/regenerate-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot,
          currentProductId,
          swapInstruction: promptText,
          aesthetic,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to regenerate piece");
      }

      if (data.swappedItem) {
        onItemSwapped(slot, data.swappedItem);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to swap item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-charcoal-900 border border-luxury-border w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-bone-400 hover:text-bone-100 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <RefreshCw className="w-4 h-4 text-brass-400" />
          <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold">
            REFINE OUTFIT PIECE
          </span>
        </div>

        <h3 className="font-serif text-2xl text-bone-100 font-light mb-2 capitalize">
          Swap {slot} Piece
        </h3>
        <p className="text-xs text-bone-400 mb-6">
          Tell the AI stylist how you want to adjust this specific piece without regenerating the rest of your outfit.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="mb-6">
          <label className="text-[11px] uppercase tracking-wider text-bone-300 font-medium block mb-2.5">
            Quick Suggestions
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_INSTRUCTIONS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInstruction(chip);
                  handleSwap(chip);
                }}
                disabled={loading}
                className="text-xs bg-charcoal-800 hover:bg-charcoal-750 text-bone-300 hover:text-bone-100 border border-luxury-border/80 px-3 py-1.5 rounded-lg transition-colors text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="mb-6">
          <label className="text-[11px] uppercase tracking-wider text-bone-300 font-medium block mb-2">
            Or Type Custom Instruction
          </label>
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g. Find trousers under $150 in dark olive..."
            className="w-full bg-charcoal-950 border border-luxury-border focus:border-brass-400 px-4 py-3 rounded-lg text-xs text-bone-100 placeholder:text-bone-600 outline-hidden transition-colors"
          />
        </div>

        {error && (
          <div className="mb-4 text-xs text-red-400 bg-red-950/40 border border-red-800/40 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={() => handleSwap()}
          disabled={loading || !instruction.trim()}
          className="w-full bg-bone-100 hover:bg-bone-200 text-obsidian font-semibold py-3 px-6 rounded-lg text-xs uppercase tracking-widest-plus transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Regenerating Selection...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Swap Piece Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
