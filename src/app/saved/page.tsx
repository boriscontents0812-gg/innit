"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function SavedLooksPage() {
  const { user, formatCurrency } = useApp();
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchSavedOutfits = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/outfits?userId=${user?.id || ""}`);
      if (res.ok) {
        const data = await res.json();
        setOutfits(data.outfits || []);
      }
    } catch (e) {
      console.warn("Failed to load saved outfits:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedOutfits();
  }, [user?.id]);

  const handleDeleteOutfit = async (outfitId: string) => {
    try {
      const res = await fetch(`/api/outfits?outfitId=${outfitId}`, { method: "DELETE" });
      if (res.ok) {
        setOutfits((prev) => prev.filter((o) => o.id !== outfitId));
      }
    } catch (e) {
      console.error("Failed to delete outfit:", e);
    }
  };

  const handleDeleteAll = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/outfits?userId=${user.id}&all=true`, { method: "DELETE" });
      if (res.ok) {
        setOutfits([]);
        setMessage("All uploaded photos and saved outfits have been permanently purged.");
        setDeleteConfirm(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-luxury-border">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>PRIVATE WARDROBE VAULT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light tracking-tight">
            Saved Looks & Capsules
          </h1>
          <p className="text-xs text-bone-400 mt-2 max-w-xl">
            Revisit your previously styled outfits without consuming any credits. Your uploads and capsule moodboards are private to your session.
          </p>
        </div>

        {outfits.length > 0 && (
          <div>
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="text-xs text-bone-500 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>GDPR: Purge All Uploads & Outfits</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">Permanently delete all?</span>
                <button
                  onClick={handleDeleteAll}
                  className="bg-red-950 border border-red-800 text-red-300 text-xs px-2.5 py-1 rounded"
                >
                  Yes, Purge
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="text-xs text-bone-400 hover:text-bone-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {message && (
        <div className="mb-8 p-4 bg-charcoal-900 border border-brass-500/40 text-brass-300 text-xs rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Outfits List or Empty State */}
      {loading ? (
        <div className="text-center py-20 text-xs text-bone-400">
          Loading your look vault...
        </div>
      ) : outfits.length === 0 ? (
        <div className="bg-charcoal-900 border border-luxury-border rounded-3xl p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 mx-auto mb-4">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-bone-100 font-light mb-2">
            Your Vault is Empty
          </h3>
          <p className="text-xs text-bone-400 mb-8 leading-relaxed">
            Upload your first clothing item in the studio to generate and save bespoke coordinated capsules.
          </p>
          <Link
            href="/studio"
            className="inline-flex bg-bone-100 hover:bg-bone-200 text-obsidian px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest-plus transition-all shadow-md"
          >
            Go to Outfit Studio
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-charcoal-900 border border-luxury-border rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-luxury-border/60">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brass-400 font-semibold mb-1">
                    <span>{outfit.aesthetic}</span>
                    <span>•</span>
                    <span className="text-bone-400 font-normal">
                      Created {new Date(outfit.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-bone-100 font-light">
                    Anchor: {outfit.originalGarment}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-bone-400 block font-mono">
                      Capsule Total
                    </span>
                    <span className="font-serif text-xl text-bone-100">
                      {formatCurrency(outfit.totalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteOutfit(outfit.id)}
                    className="p-2 text-bone-500 hover:text-red-400 transition-colors"
                    title="Remove look"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {outfit.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-charcoal-950 border border-luxury-border/60 rounded-xl p-3 text-left"
                  >
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden mb-2 bg-charcoal-900">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] text-brass-400 uppercase tracking-wider truncate font-medium">
                      {item.brand}
                    </div>
                    <div className="font-serif text-xs text-bone-100 truncate mt-0.5">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-bone-400 mt-1">
                      {formatCurrency(item.price)}
                    </div>
                    {item.productUrl && (
                      <a
                        href={item.affiliateUrl || item.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[10px] text-brass-400 hover:underline uppercase tracking-wider font-semibold"
                      >
                        <span>Shop</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
