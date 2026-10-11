"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";

const STAGES = [
  { title: "Analyzing Visual Geometry", desc: "Extracting silhouette cut, weave texture, and dominant undertones..." },
  { title: "Scanning Luxury Catalogs", desc: "Searching Deadly Ponies, Farfetch, SSENSE, COS & Uniqlo databases..." },
  { title: "Synthesizing Color Harmony", desc: "Pairing tonal contrast, material balance, and occasion appropriateness..." },
  { title: "Finalizing Editorial Capsule", desc: "Assembling coordinated outfit cards and verified shopping paths..." },
];

export default function LoadingSequencer() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl animate-fade-in relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-brass-500/40 flex items-center justify-center text-brass-400 mx-auto mb-6 relative">
        <Loader2 className="w-8 h-8 animate-spin text-brass-400" />
      </div>

      <span className="text-xs uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
        innit AI VISION ENGINE
      </span>

      <h3 className="font-serif text-2xl sm:text-3xl text-bone-100 font-light mb-8">
        Curating Your Outfit
      </h3>

      <div className="space-y-4 text-left">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 ${
                isCurrent
                  ? "bg-charcoal-800 border border-brass-500/40 shadow-sm"
                  : isDone
                  ? "text-bone-400"
                  : "text-bone-600 opacity-40"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-brass-400" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 text-brass-400 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-bone-600" />
                )}
              </div>
              <div>
                <div className={`text-xs font-medium ${isCurrent ? "text-bone-100" : isDone ? "text-bone-300" : "text-bone-500"}`}>
                  {stage.title}
                </div>
                <div className="text-[11px] text-bone-400 mt-0.5">
                  {stage.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
