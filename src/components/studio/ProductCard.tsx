"use client";

import React, { useState } from "react";
import { ExternalLink, RefreshCw, Sparkles, Check, Info } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog";
import { useApp } from "@/context/AppContext";

interface ProductCardProps {
  slot: string;
  product: CatalogProduct;
  matchReason: string;
  onSwapClick: (slot: string, productId: string) => void;
  isHero?: boolean;
}

export default function ProductCard({
  slot,
  product,
  matchReason,
  onSwapClick,
  isHero = false,
}: ProductCardProps) {
  const { formatCurrency, country, user } = useApp();
  const [showReason, setShowReason] = useState(true);

  const slotLabels: Record<string, string> = {
    hero: "Uploaded Reference",
    top: "Upper Body Layer",
    bottom: "Tailored Trousers / Bottom",
    footwear: "Footwear",
    outerwear: "Outerwear / Overcoat",
    accessory: "Deadly Ponies Leather & Accents",
    vibe: "Lifestyle Atmosphere & Scent",
  };

  const affiliateRedirectUrl = `/api/affiliate/redirect?productId=${product.id}&retailer=${encodeURIComponent(
    product.retailer
  )}&country=${country.code}&userId=${user?.id || ""}`;

  return (
    <div className="group bg-charcoal-900 border border-luxury-border hover:border-brass-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col editorial-card-hover relative">
      {/* Category / Slot Banner */}
      <div className="bg-charcoal-950 px-4 py-2 border-b border-luxury-border/60 flex items-center justify-between text-[10px] uppercase tracking-widest-plus text-brass-400 font-medium">
        <span>{slotLabels[slot] || slot}</span>
        {isHero ? (
          <span className="bg-brass-500/20 text-brass-300 px-2 py-0.5 rounded-full font-semibold">
            Anchor Piece
          </span>
        ) : (
          <span className="text-bone-400 font-mono text-[9px]">Verified In Stock</span>
        )}
      </div>

      {/* Product Image */}
      <div className="aspect-[4/5] w-full bg-charcoal-950 overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Brand Badge */}
        <div className="absolute top-3 left-3 bg-obsidian/85 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] tracking-widest uppercase text-bone-200 font-medium border border-luxury-border/60">
          {product.brand}
        </div>

        {/* Retailer Badge */}
        <div className="absolute top-3 right-3 bg-charcoal-900/90 backdrop-blur-xs px-2 py-1 rounded text-[9px] uppercase tracking-wider text-brass-400 border border-luxury-border/60">
          via {product.retailer}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-serif text-lg text-bone-100 font-light leading-snug group-hover:text-brass-300 transition-colors">
              {product.name}
            </h4>
            <div className="text-right shrink-0">
              <span className="font-serif text-lg text-bone-100 font-normal">
                {formatCurrency(product.priceUsd)}
              </span>
            </div>
          </div>

          {/* Fabric & Sizes */}
          <div className="text-[11px] text-bone-400 mb-3 flex items-center gap-2">
            <span>{product.fabric}</span>
            <span>•</span>
            <span>Sizes: {product.sizes}</span>
          </div>

          {/* "Why It Matches" Rationale */}
          <div className="bg-charcoal-950 border border-luxury-border/60 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brass-400 font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Why This Matches</span>
            </div>
            <p className="text-xs text-bone-300 leading-relaxed font-light">
              {matchReason}
            </p>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-luxury-border/60">
          {!isHero && (
            <button
              onClick={() => onSwapClick(slot, product.id)}
              className="flex-1 bg-charcoal-800 hover:bg-charcoal-750 text-bone-300 hover:text-bone-100 border border-luxury-border py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
              title="Replace this piece with an alternative"
            >
              <RefreshCw className="w-3.5 h-3.5 text-brass-400" />
              <span>Swap Item</span>
            </button>
          )}

          <a
            href={affiliateRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isHero ? "w-full" : "flex-1"
            } bg-bone-100 hover:bg-bone-200 text-obsidian py-2.5 px-3 rounded-lg text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm`}
          >
            <span>Shop Piece</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
