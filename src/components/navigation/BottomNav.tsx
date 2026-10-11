"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BookOpen, Bookmark, Crown, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { user, setIsUpgradeModalOpen } = useApp();

  const isPro = user?.isPro;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-obsidian/95 backdrop-blur-lg border-t border-luxury-border pb-safe">
      <div className="grid grid-cols-5 h-16 items-center">
        {/* Studio / Build */}
        <Link
          href="/studio"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/studio" ? "text-brass-400 font-medium" : "text-bone-400 hover:text-bone-200"
          }`}
        >
          <Sparkles className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Studio</span>
        </Link>

        {/* Journal */}
        <Link
          href="/journal"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname.startsWith("/journal") ? "text-brass-400 font-medium" : "text-bone-400 hover:text-bone-200"
          }`}
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Journal</span>
        </Link>

        {/* Saved Looks */}
        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/saved" ? "text-brass-400 font-medium" : "text-bone-400 hover:text-bone-200"
          }`}
        >
          <Bookmark className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Saved</span>
        </Link>

        {/* Pro Pass */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isPro ? "text-brass-400" : "text-bone-400 hover:text-brass-400"
          }`}
        >
          <Crown className={`w-5 h-5 mb-1 ${isPro ? "text-brass-400 fill-brass-400/20" : ""}`} />
          <span className="text-[10px] tracking-wider uppercase font-medium">
            {isPro ? "Pro" : "Upgrade"}
          </span>
        </button>

        {/* Account */}
        <Link
          href="/account"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/account" ? "text-brass-400 font-medium" : "text-bone-400 hover:text-bone-200"
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Account</span>
        </Link>
      </div>
    </nav>
  );
}
