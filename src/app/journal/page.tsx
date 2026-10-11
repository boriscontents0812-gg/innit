import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export const metadata = {
  title: "The Style Journal — Atelier AI Fashion Masterclasses",
  description: "Complimentary fashion editorial masterclasses on quiet luxury, trouser geometry, Deadly Ponies leather craft, and capsule wardrobe architecture.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Journal Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-charcoal-850 border border-luxury-border px-4 py-1.5 rounded-full text-[11px] tracking-widest-plus uppercase text-brass-400 font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-brass-400" />
          <span>EDITORIAL CURATION</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-bone-100 font-light mb-4 tracking-tight">
          The Style Journal
        </h1>
        <p className="text-xs sm:text-sm text-bone-400 leading-relaxed font-light">
          Complimentary, in-depth sartorial masterclasses. Learn the mathematics of silhouette balance, the craft of leather patinas, and how to construct high-utility capsule wardrobes.
        </p>
      </div>

      {/* Featured Headline Article */}
      {JOURNAL_ARTICLES[0] && (
        <div className="mb-16">
          <Link
            href={`/journal/${JOURNAL_ARTICLES[0].slug}`}
            className="group block bg-charcoal-900 border border-luxury-border hover:border-brass-500/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-charcoal-950">
                <img
                  src={JOURNAL_ARTICLES[0].heroImage}
                  alt={JOURNAL_ARTICLES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-brass-400 uppercase tracking-widest font-semibold mb-3">
                    <span>Featured Essay</span>
                    <span>•</span>
                    <span>{JOURNAL_ARTICLES[0].category}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl text-bone-100 group-hover:text-brass-300 transition-colors font-light mb-4 leading-snug">
                    {JOURNAL_ARTICLES[0].title}
                  </h2>

                  <p className="text-xs sm:text-sm text-bone-400 leading-relaxed mb-6 font-light">
                    {JOURNAL_ARTICLES[0].subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-luxury-border/60 flex items-center justify-between text-xs text-bone-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brass-400" />
                    <span>{JOURNAL_ARTICLES[0].readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brass-400 font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Read Masterclass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {JOURNAL_ARTICLES.slice(1).map((article) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className="group bg-charcoal-900 border border-luxury-border hover:border-brass-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg"
          >
            <div>
              <div className="aspect-[16/10] w-full bg-charcoal-950 overflow-hidden relative">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-obsidian/85 backdrop-blur-xs text-[10px] uppercase tracking-wider text-brass-400 px-2.5 py-1 rounded font-medium border border-luxury-border/60">
                  {article.category}
                </span>
              </div>

              <div className="p-6 text-left">
                <div className="text-[10px] text-bone-500 font-mono mb-2">
                  {article.date} • {article.readTime}
                </div>
                <h3 className="font-serif text-xl text-bone-100 group-hover:text-brass-300 transition-colors font-light mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-bone-400 leading-relaxed font-light line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-luxury-border/60 flex items-center justify-between text-xs text-brass-400 font-medium uppercase tracking-wider">
                <span>Explore Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
