"use client";

import React, { useState } from "react";
import { Bookmark, Share2, Sparkles, RefreshCw, ShoppingBag, Check, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import ProductCard from "./ProductCard";
import ItemSwapModal from "./ItemSwapModal";
import { OutfitGenerationResult, RecommendedSlotItem } from "@/lib/ai-stylist";
import { useApp } from "@/context/AppContext";

interface OutfitCanvasProps {
  outfit: OutfitGenerationResult;
  onRegenerateAll: () => void;
}

export default function OutfitCanvas({ outfit: initialOutfit, onRegenerateAll }: OutfitCanvasProps) {
  const { formatCurrency, user } = useApp();
  const [outfit, setOutfit] = useState<OutfitGenerationResult>(initialOutfit);
  const [activeSwapSlot, setActiveSwapSlot] = useState<{ slot: string; productId: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Handle single item swap result
  const handleItemSwapped = (slot: string, newItem: RecommendedSlotItem) => {
    setOutfit((prev) => {
      const updatedItems = prev.items.map((item) => (item.slot === slot ? newItem : item));
      const newTotal = updatedItems.reduce((acc, curr) => acc + curr.product.priceUsd, 0);
      return {
        ...prev,
        items: updatedItems,
        totalPriceUsd: newTotal,
      };
    });
  };

  const handleSaveOutfit = async () => {
    setIsSaved(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#C5A880", "#FAF8F5", "#8E8A85"],
      });
    } catch (e) {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `innit Lookbook — ${outfit.aesthetic}`,
        text: `Check out my coordinated outfit styled around my ${outfit.heroItem.name} on innit!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const [isShopifyLoading, setIsShopifyLoading] = useState(false);

  const handleShopifyCheckout = async () => {
    setIsShopifyLoading(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: outfit.items.map((it) => ({
            merchandiseId: "gid://shopify/ProductVariant/51592955855122",
            quantity: 1,
          })),
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
      }
    } catch (e) {
      console.error("Shopify checkout redirect failed:", e);
    } finally {
      setIsShopifyLoading(false);
    }
  };

  return (
    <div className="w-full space-y-12 animate-fade-in">
      {/* Top Capsule Header & Controls */}
      <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brass-500/20 text-brass-300 border border-brass-500/30 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold">
              {outfit.aesthetic}
            </span>
            <span className="text-bone-400 text-xs">•</span>
            <span className="text-bone-300 text-xs font-serif italic">
              Tailored for {outfit.occasion}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-bone-100 font-light">
            Editorial Capsule Edit
          </h2>
          <p className="text-xs text-bone-400 mt-1 max-w-xl">
            A cohesive 5-piece capsule engineered to harmonise with the weave, silhouette, and undertones of your anchor piece.
          </p>
        </div>

        {/* Total Price & Primary Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-luxury-border">
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase tracking-widest text-bone-400 font-medium">
              Capsule Listed Value
            </div>
            <div className="font-serif text-3xl text-bone-100 font-normal">
              {formatCurrency(outfit.totalPriceUsd)}
            </div>
            <div className="text-[9px] text-bone-500 font-mono">
              Excl. shipping & taxes
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Save Look Button */}
            <button
              onClick={handleSaveOutfit}
              className={`p-3 rounded-lg border text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                isSaved
                  ? "bg-brass-500 text-obsidian border-brass-500 font-medium"
                  : "bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border-luxury-border"
              }`}
              title="Save to your Look Vault"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-obsidian" : ""}`} />
              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-3 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border border-luxury-border text-xs tracking-wider transition-all flex items-center justify-center gap-1.5"
              title="Share outfit link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{shareCopied ? "Copied!" : "Share"}</span>
            </button>

            {/* Shopify Cart Checkout Button */}
            <button
              onClick={handleShopifyCheckout}
              disabled={isShopifyLoading}
              className="bg-brass-500 hover:bg-brass-400 text-obsidian px-3.5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
              title="Shop via connected Shopify store (Shop Pay)"
            >
              <ShoppingBag className="w-4 h-4 text-obsidian" />
              <span>{isShopifyLoading ? "Opening..." : "Shopify Checkout"}</span>
            </button>

            {/* Regenerate All */}
            <button
              onClick={onRegenerateAll}
              className="p-3 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border border-luxury-border text-xs tracking-wider transition-all flex items-center justify-center gap-1.5"
              title="Regenerate full capsule"
            >
              <RefreshCw className="w-4 h-4 text-brass-400" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Reference Garment Spotlight */}
      <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-widest-plus text-brass-400 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Uploaded Anchor Piece</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 aspect-square max-h-72 rounded-xl overflow-hidden bg-charcoal-950 border border-luxury-border relative mx-auto md:mx-0 w-full">
            <img
              src={outfit.heroItem.imageUrl}
              alt={outfit.heroItem.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="md:col-span-8 space-y-4 text-left">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brass-400 font-semibold">
                Detected Garment & Structure
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-bone-100 font-light mt-0.5">
                {outfit.heroItem.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-charcoal-950 border border-luxury-border/60 p-3 rounded-xl">
                <span className="text-[10px] text-bone-500 uppercase tracking-wider block mb-1">
                  Weave & Material
                </span>
                <span className="text-bone-200 font-medium">{outfit.heroItem.fabric}</span>
              </div>

              <div className="bg-charcoal-950 border border-luxury-border/60 p-3 rounded-xl">
                <span className="text-[10px] text-bone-500 uppercase tracking-wider block mb-1">
                  Silhouette Balance
                </span>
                <span className="text-bone-200 font-medium">{outfit.heroItem.silhouette}</span>
              </div>

              <div className="bg-charcoal-950 border border-luxury-border/60 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-bone-500 uppercase tracking-wider block mb-1">
                  Color Harmony Notes
                </span>
                <span className="text-bone-200 font-medium">{outfit.heroItem.colors.join(", ")}</span>
              </div>
            </div>

            <p className="text-xs text-bone-400 leading-relaxed">
              Every item in the curated gallery below has been selected to complement this piece's exact proportions, textural weight, and tonal undertones.
            </p>
          </div>
        </div>
      </div>

      {/* Coordinated Items Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl text-bone-100 font-light">
            The Coordinated Capsule (5 Pieces)
          </h3>
          <span className="text-xs text-brass-400 uppercase tracking-widest font-medium">
            Real Retail Products
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfit.items.map((item, idx) => (
            <ProductCard
              key={`${item.slot}-${idx}`}
              slot={item.slot}
              product={item.product}
              matchReason={item.matchReason}
              onSwapClick={(slot, productId) => setActiveSwapSlot({ slot, productId })}
            />
          ))}
        </div>
      </div>

      {/* Item Swap Modal Drawer */}
      {activeSwapSlot && (
        <ItemSwapModal
          isOpen={Boolean(activeSwapSlot)}
          onClose={() => setActiveSwapSlot(null)}
          slot={activeSwapSlot.slot}
          currentProductId={activeSwapSlot.productId}
          aesthetic={outfit.aesthetic}
          onItemSwapped={handleItemSwapped}
        />
      )}
    </div>
  );
}
