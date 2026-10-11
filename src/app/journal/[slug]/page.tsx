import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Sparkles, Check, ArrowRight } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/lib/journal";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bone-400 hover:text-brass-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Style Journal</span>
      </Link>

      {/* Article Header */}
      <header className="mb-10 text-left">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-3">
          <span>{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span>•</span>
          <span className="text-bone-500">{article.date}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-bone-100 font-light tracking-tight mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-bone-300 font-light leading-relaxed">
          {article.subtitle}
        </p>
      </header>

      {/* Hero Image */}
      <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-charcoal-950 border border-luxury-border mb-12 shadow-2xl">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Key Takeaways Box */}
      <div className="bg-charcoal-900 border border-luxury-border/80 rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest-plus text-brass-400 font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Curator's Key Principles</span>
        </div>
        <ul className="space-y-3">
          {article.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-bone-200 leading-relaxed">
              <Check className="w-4 h-4 text-brass-400 mt-1 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Essay Content */}
      <div className="space-y-6 text-sm sm:text-base text-bone-300 leading-relaxed font-light mb-16">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Internal Link to Outfit Studio with preselected aesthetic */}
      <div className="bg-charcoal-900 border border-brass-500/40 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />
        <span className="text-[11px] uppercase tracking-widest-plus text-brass-400 font-semibold block mb-2">
          APPLY THIS MASTERCLASS
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-bone-100 font-light mb-3">
          Curate a {article.recommendedAesthetic} Outfit
        </h3>
        <p className="text-xs sm:text-sm text-bone-400 max-w-md mx-auto mb-8 leading-relaxed">
          Upload any piece you own. Our AI will assemble a coordinated capsule following these exact architectural and color principles.
        </p>

        <Link
          href={`/studio?aesthetic=${encodeURIComponent(article.recommendedAesthetic)}`}
          className="inline-flex bg-bone-100 hover:bg-bone-200 text-obsidian px-8 py-3.5 rounded-xl text-xs font-semibold tracking-widest-plus uppercase transition-all duration-300 items-center justify-center gap-2 shadow-xl hover:scale-105"
        >
          <span>Open Studio with {article.recommendedAesthetic} Edit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
