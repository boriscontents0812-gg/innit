"use client";

import React, { useState } from "react";
import ImageUploader from "@/components/studio/ImageUploader";
import FilterDrawer from "@/components/studio/FilterDrawer";
import LoadingSequencer from "@/components/studio/LoadingSequencer";
import OutfitCanvas from "@/components/studio/OutfitCanvas";
import { OutfitGenerationResult } from "@/lib/ai-stylist";
import { useApp } from "@/context/AppContext";
import { Sparkles, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

export default function StudioPage() {
  const { user, refreshUserData, setIsUpgradeModalOpen } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>("Quiet Luxury");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Editorial Dinner");
  const [maxBudgetUsd, setMaxBudgetUsd] = useState<number>(3500);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outfitResult, setOutfitResult] = useState<OutfitGenerationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelected = (base64: string, mime: string) => {
    setSelectedImage(base64);
    setMimeType(mime);
    setOutfitResult(null);
    setErrorMessage(null);
  };

  const handleGenerateOutfit = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType,
          aesthetic: selectedAesthetic,
          occasion: selectedOccasion,
          budgetMaxUsd: maxBudgetUsd,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "CREDIT_LIMIT_EXHAUSTED") {
          setIsUpgradeModalOpen(true);
          setErrorMessage(data.message || "You have reached your 3 complimentary outfit limit.");
        } else {
          throw new Error(data.error || "Failed to analyze garment");
        }
        return;
      }

      if (data.outfit) {
        setOutfitResult(data.outfit);
        await refreshUserData();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to generate outfit capsule. Please try another image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setOutfitResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
          innit BESPOKE CURATION STUDIO
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light mb-3">
          One Piece. A Whole Fit.
        </h1>
        <p className="text-xs sm:text-sm text-bone-400 leading-relaxed">
          Upload any single clothing item. Our AI analyzes its weave, undertones, and silhouette to assemble a coordinated luxury capsule from real online stores.
        </p>
      </div>

      {/* Main Flow: 1. Loading State */}
      {isLoading && <LoadingSequencer />}

      {/* 2. Completed Outfit Canvas */}
      {!isLoading && outfitResult && (
        <div className="space-y-6">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-bone-400 hover:text-brass-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload a different piece</span>
          </button>
          <OutfitCanvas outfit={outfitResult} onRegenerateAll={handleGenerateOutfit} />
        </div>
      )}

      {/* 3. Upload & Configuration Flow */}
      {!isLoading && !outfitResult && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Step 1: Image Uploader */}
          <ImageUploader onImageSelected={handleImageSelected} isLoading={isLoading} />

          {/* Selected Image Preview (if chosen) */}
          {selectedImage && (
            <div className="bg-charcoal-900 border border-brass-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-charcoal-950 border border-luxury-border shrink-0">
                  <img src={selectedImage} alt="Selected Garment" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brass-400 font-semibold block">
                    Ready For AI Analysis
                  </span>
                  <div className="text-sm font-serif text-bone-100 mt-0.5">
                    Anchor Piece Loaded Successfully
                  </div>
                  <div className="text-xs text-bone-400 mt-0.5">
                    Click 'Generate Capsule' below to curate your outfit.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="text-xs text-bone-400 hover:text-bone-100 underline"
              >
                Change Photo
              </button>
            </div>
          )}

          {/* Step 2: Curation Parameters */}
          <FilterDrawer
            selectedAesthetic={selectedAesthetic}
            setSelectedAesthetic={setSelectedAesthetic}
            selectedOccasion={selectedOccasion}
            setSelectedOccasion={setSelectedOccasion}
            maxBudgetUsd={maxBudgetUsd}
            setMaxBudgetUsd={setMaxBudgetUsd}
          />

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              {errorMessage.includes("complimentary") && (
                <button
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="bg-brass-500 hover:bg-brass-400 text-obsidian px-3 py-1 rounded text-[11px] font-semibold uppercase tracking-wider"
                >
                  Upgrade to Pro ($399)
                </button>
              )}
            </div>
          )}

          {/* Action Trigger */}
          <div className="text-center pt-4">
            <button
              onClick={handleGenerateOutfit}
              disabled={!selectedImage || isLoading}
              className="w-full sm:w-auto min-w-[280px] bg-bone-100 hover:bg-bone-200 text-obsidian font-semibold py-4 px-8 rounded-xl text-xs uppercase tracking-widest-plus transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed mx-auto"
            >
              <Sparkles className="w-4 h-4 text-obsidian" />
              <span>Curate Complete Outfit Capsule</span>
            </button>
            <div className="text-[11px] text-bone-500 mt-3">
              Generates a full 5-piece capsule with matching bottoms, footwear, outerwear, and accessories.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
