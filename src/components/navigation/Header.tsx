"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Globe, Bookmark, Crown, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Header() {
  const pathname = usePathname();
  const { country, user, setIsCountryModalOpen, setIsUpgradeModalOpen } = useApp();

  const isPro = user?.isPro;
  const freeCredits = user?.freeCredits ?? 3;

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian/90 backdrop-blur-md border-b border-luxury-border">
      {/* Announcement Bar - Subtle Deadly Ponies Editorial Touch */}
      <div className="bg-charcoal-900 border-b border-luxury-border/60 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] tracking-widest-plus uppercase text-bone-400 font-medium">
          <span className="hidden sm:inline">Complimentary Worldwide Styling Engine</span>
          <span className="mx-auto sm:mx-0">
            {isPro ? (
              <span className="text-brass-400 font-semibold flex items-center gap-1.5">
                <Crown className="w-3 h-3 inline text-brass-400" /> AI Stylist Pro Active
              </span>
            ) : (
              <span>
                <strong className="text-bone-100 font-semibold">{freeCredits} of 3</strong> Free Outfit Generations Remaining
              </span>
            )}
          </span>
          <button
            onClick={() => setIsCountryModalOpen(true)}
            className="flex items-center gap-1.5 text-bone-300 hover:text-brass-400 transition-colors uppercase"
          >
            <span>{country.flag}</span>
            <span>{country.currency}</span>
            <span className="hidden sm:inline">({country.name})</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest-plus uppercase font-medium text-bone-300">
          <Link
            href="/studio"
            className={`transition-colors hover:text-brass-400 ${
              pathname === "/studio" ? "text-brass-400 border-b border-brass-400 pb-1" : ""
            }`}
          >
            Build Outfit
          </Link>
          <Link
            href="/journal"
            className={`transition-colors hover:text-brass-400 ${
              pathname.startsWith("/journal") ? "text-brass-400 border-b border-brass-400 pb-1" : ""
            }`}
          >
            The Style Journal
          </Link>
          <Link
            href="/saved"
            className={`transition-colors hover:text-brass-400 ${
              pathname === "/saved" ? "text-brass-400 border-b border-brass-400 pb-1" : ""
            }`}
          >
            Saved Looks
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center">
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl tracking-editorial text-bone-100 uppercase font-light transition-opacity group-hover:opacity-90">
              ATELIER AI
            </span>
            <span className="text-[9px] tracking-widest-plus text-brass-400/90 uppercase -mt-0.5 font-medium">
              Curated Fashion Studio
            </span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Credit status pill */}
          {!isPro ? (
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="flex items-center gap-2 bg-charcoal-850 hover:bg-charcoal-800 border border-luxury-border hover:border-brass-500/50 px-3 py-1.5 rounded-full text-xs tracking-wider transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-brass-400" />
              <span className="text-bone-200 font-medium">
                {freeCredits} <span className="hidden sm:inline">Free Left</span>
              </span>
              <span className="text-[10px] text-brass-400 font-semibold uppercase bg-brass-500/10 px-1.5 py-0.5 rounded-full">
                Upgrade
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-brass-500/15 border border-brass-500/30 px-3 py-1.5 rounded-full text-xs text-brass-300 font-medium">
              <Crown className="w-3.5 h-3.5 text-brass-400" />
              <span>Pro Member</span>
            </div>
          )}

          {/* Quick country / currency switch */}
          <button
            onClick={() => setIsCountryModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 p-2 rounded-full text-bone-300 hover:text-bone-100 hover:bg-charcoal-800 transition-colors"
            title="Change Country & Currency"
          >
            <Globe className="w-4 h-4 text-bone-400" />
            <span className="text-xs tracking-wider uppercase font-medium">{country.code}</span>
          </button>

          {/* Saved Vault Link */}
          <Link
            href="/saved"
            className="p-2 rounded-full text-bone-300 hover:text-bone-100 hover:bg-charcoal-800 transition-colors relative"
            title="Saved Outfits"
          >
            <Bookmark className="w-4 h-4" />
          </Link>

          {/* Primary Action Button */}
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center justify-center bg-bone-100 hover:bg-bone-200 text-obsidian px-5 py-2 text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 shadow-sm"
          >
            Build Fit
          </Link>
        </div>
      </div>
    </header>
  );
}
