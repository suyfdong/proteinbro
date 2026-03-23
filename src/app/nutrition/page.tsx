import type { Metadata } from "next";
import Link from "next/link";
import { PROTEIN_SOURCES } from "@/data/protein-sources";
import {
  ArrowLeft,
  ArrowRight,
  Apple,
  Dumbbell,
  DollarSign,
  Target,
  Weight,
  BookOpen,
  TrendingUp,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nutrition Guide for Men — Protein, Macros & Budget Tips",
  description:
    "No-BS nutrition guide for gym bros. How much protein you actually need, cheapest protein sources ranked, and the proteinmaxxing guide. Science-backed, bro-approved.",
  keywords: [
    "nutrition guide for men",
    "high protein diet",
    "proteinmaxxing",
    "how much protein per day",
    "cheapest protein sources",
    "bodybuilding nutrition",
    "protein guide",
    "macros for men",
    "gym nutrition",
  ],
  openGraph: {
    title: "Nutrition Guide — ProteinBro",
    description:
      "Protein guides, cheapest sources ranked, and the proteinmaxxing playbook.",
    type: "website",
    url: "https://proteinbro.net/nutrition",
  },
  alternates: {
    canonical: "/nutrition",
  },
};

export default function NutritionHub() {
  // Quick stats from protein data
  const cheapestSource = [...PROTEIN_SOURCES]
    .map((s) => ({
      ...s,
      proteinPerDollar:
        (s.per100g.protein / 100) *
        (s.defaultPricePer.gramsPerUnit / s.defaultPricePer.amount),
    }))
    .sort((a, b) => b.proteinPerDollar - a.proteinPerDollar)[0];

  const highestProteinPer100g = [...PROTEIN_SOURCES].sort(
    (a, b) => b.per100g.protein - a.per100g.protein
  )[0];

  const sections = [
    {
      title: "Proteinmaxxing Guide",
      desc: "The complete playbook for maximizing protein intake on a budget. Strategy, timing, and real numbers.",
      href: "/nutrition/proteinmaxxing-guide",
      icon: Dumbbell,
      stat: "150g+",
      statLabel: "daily target",
      color: "green",
      borderColor: "border-green-500/20",
      bgColor: "bg-green-500/5",
      textColor: "text-green-400",
    },
    {
      title: "How Much Protein Per Day",
      desc: "Science-backed protein targets by body weight, activity level, and goal. No broscience.",
      href: "/nutrition/how-much-protein-per-day",
      icon: Weight,
      stat: "0.7–1g",
      statLabel: "per lb bodyweight",
      color: "blue",
      borderColor: "border-blue-500/20",
      bgColor: "bg-blue-500/5",
      textColor: "text-blue-400",
    },
    {
      title: "Cheapest Protein Sources",
      desc: `${PROTEIN_SOURCES.length} protein sources ranked by grams per dollar. Know where your money goes.`,
      href: "/nutrition/cheapest-protein-sources",
      icon: DollarSign,
      stat: `${PROTEIN_SOURCES.length}+`,
      statLabel: "sources ranked",
      color: "yellow",
      borderColor: "border-yellow-500/20",
      bgColor: "bg-yellow-500/5",
      textColor: "text-yellow-400",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      {/* HEADER */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-green-500/20 bg-green-500/10">
            <Apple className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              Nutrition
            </div>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Nutrition <span className="text-green-500">Guide</span>
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-zinc-400">
          No fluff, no broscience. Just the numbers you need to hit your protein
          targets without going broke. Every claim backed by USDA data.
        </p>
      </header>

      {/* QUICK STATS */}
      <div className="mb-10 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-green-400">
            {highestProteinPer100g.per100g.protein}g
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            top protein/100g
          </div>
          <div className="mt-0.5 text-[10px] text-zinc-600">
            {highestProteinPer100g.name}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-yellow-400">
            {PROTEIN_SOURCES.length}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            sources tracked
          </div>
          <div className="mt-0.5 text-[10px] text-zinc-600">
            USDA verified
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-blue-400">
            1g/lb
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            the gold standard
          </div>
          <div className="mt-0.5 text-[10px] text-zinc-600">
            for lifters
          </div>
        </div>
      </div>

      {/* GUIDE CARDS */}
      <div className="mb-10 grid gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`hover-lift group overflow-hidden rounded-2xl border-2 ${section.borderColor} ${section.bgColor} p-6 transition-colors`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${section.borderColor} ${section.bgColor}`}
              >
                <section.icon className={`h-6 w-6 ${section.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <h2 className="font-heading text-xl font-bold uppercase">
                    {section.title}
                  </h2>
                  <div className="rounded-full border border-zinc-700 bg-zinc-800/60 px-2 py-0.5">
                    <span className="font-mono text-xs font-bold text-zinc-300">
                      {section.stat}
                    </span>
                    <span className="ml-1 text-[10px] text-zinc-500">
                      {section.statLabel}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">{section.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                  Read guide <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK REFERENCE: TOP PROTEINS */}
      <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="mb-4 font-heading text-lg font-bold uppercase">
          Quick Reference: <span className="text-green-500">Top Proteins</span>
        </h2>
        <div className="space-y-2">
          {[...PROTEIN_SOURCES]
            .sort((a, b) => b.per100g.protein - a.per100g.protein)
            .slice(0, 8)
            .map((source, i) => {
              const proteinPerDollar =
                (source.per100g.protein / 100) *
                (source.defaultPricePer.gramsPerUnit /
                  source.defaultPricePer.amount);
              return (
                <div
                  key={source.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2"
                >
                  <span className="font-mono text-xs text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium">
                    {source.name}
                  </span>
                  <span className="font-mono text-sm font-bold text-green-400">
                    {source.per100g.protein}g
                  </span>
                  <span className="text-xs text-zinc-600">/100g</span>
                  <span className="font-mono text-xs text-yellow-400">
                    {proteinPerDollar.toFixed(1)}g/$
                  </span>
                </div>
              );
            })}
        </div>
        <Link
          href="/nutrition/cheapest-protein-sources"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-green-400 hover:text-green-300"
        >
          See full ranking <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* CROSS LINKS */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="mb-4 font-heading text-lg font-bold uppercase">
          Put It Into <span className="text-green-500">Practice</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/recipes"
            className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700"
          >
            <BookOpen className="mb-2 h-5 w-5 text-red-400" />
            <div className="text-sm font-bold">30+ Recipes</div>
            <div className="text-xs text-zinc-500">
              All with macros & cost
            </div>
          </Link>
          <Link
            href="/meal-prep"
            className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700"
          >
            <Zap className="mb-2 h-5 w-5 text-blue-400" />
            <div className="text-sm font-bold">Meal Prep</div>
            <div className="text-xs text-zinc-500">
              Weekly plans & budgets
            </div>
          </Link>
          <Link
            href="/tools/protein-per-dollar-calculator"
            className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700"
          >
            <TrendingUp className="mb-2 h-5 w-5 text-yellow-400" />
            <div className="text-sm font-bold">Protein/$ Calculator</div>
            <div className="text-xs text-zinc-500">
              Compare with your prices
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
