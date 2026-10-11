"use client";

import React, { useRef, useState } from "react";
import { Camera, Image as ImageIcon, UploadCloud, Sparkles, Check, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  isLoading: boolean;
}

const PRESET_SAMPLE_GARMENTS = [
  {
    name: "Camel Cashmere Knit",
    category: "Top",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Deadly Ponies Leather Bag",
    category: "Leather Goods",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pleated Wool Flannel",
    category: "Bottom",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Burgundy Penny Loafers",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ImageUploader({ onImageSelected, isLoading }: ImageUploaderProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setError(null);

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setError("File exceeds maximum 10MB limit. Please choose a smaller photo.");
      return;
    }

    const mime = file.type || "image/jpeg";
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, mime);
      }
    };

    reader.onerror = () => {
      setError("Failed to read image file. Please try another photo.");
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const selectPresetSample = async (sampleUrl: string) => {
    try {
      // Create a canvas to convert sample URL to base64
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = sampleUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg", 0.9);
        onImageSelected(dataURL, "image/jpeg");
      };
    } catch (e) {
      onImageSelected(sampleUrl, "image/jpeg");
    }
  };

  return (
    <div className="w-full">
      {/* Hidden file inputs for Camera and Photo Library */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Drag-and-Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 relative ${
          isDragging
            ? "border-brass-400 bg-charcoal-850"
            : "border-luxury-border hover:border-brass-500/50 bg-charcoal-900/60"
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 mb-5 shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-bone-100 font-light mb-2">
            Upload Any Clothing Piece
          </h3>
          <p className="text-xs sm:text-sm text-bone-400 mb-8 leading-relaxed">
            Snap a photo with your iPhone camera or choose from your library. Jackets, sweaters, trousers, shoes, or leather bags.
          </p>

          {/* Action Buttons for Mobile & Desktop */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Camera Button (iOS priority) */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isLoading}
              className="w-full sm:w-auto bg-bone-100 hover:bg-bone-200 text-obsidian px-6 py-3 rounded-lg text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              <span>Take Photo</span>
            </button>

            {/* Gallery Upload Button */}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={isLoading}
              className="w-full sm:w-auto bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border border-luxury-border hover:border-brass-500/50 px-6 py-3 rounded-lg text-xs font-medium tracking-widest-plus uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ImageIcon className="w-4 h-4 text-brass-400" />
              <span>Photo Library</span>
            </button>
          </div>

          <div className="mt-4 text-[11px] text-bone-500">
            Supports HEIC, JPG, PNG & WebP up to 10MB • Private & Encrypted
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Preset Reference Garments for Instant 1-Click Test Drive */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span className="text-xs uppercase tracking-widest-plus text-bone-300 font-medium">
              Or Try With A Curated Reference Piece
            </span>
          </div>
          <span className="text-[11px] text-bone-500">Instant AI Styling Demo</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {PRESET_SAMPLE_GARMENTS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => selectPresetSample(preset.image)}
              disabled={isLoading}
              className="group bg-charcoal-900 border border-luxury-border hover:border-brass-500/50 rounded-xl p-2.5 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-charcoal-950 mb-2 relative">
                <img
                  src={preset.image}
                  alt={preset.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-obsidian/85 backdrop-blur-xs text-[9px] uppercase tracking-wider text-brass-300 px-1.5 py-0.5 rounded font-medium">
                  {preset.category}
                </span>
              </div>
              <div className="text-xs font-serif text-bone-100 group-hover:text-brass-300 transition-colors truncate">
                {preset.name}
              </div>
              <div className="text-[10px] text-bone-400 mt-0.5">Click to style</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
