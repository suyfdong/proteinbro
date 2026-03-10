import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/data/recipes";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  DollarSign,
  Target,
  Zap,
  ChefHat,
} from "lucide-react";

export const metadata: Metadata = {
  title: "High Protein Recipes — Macros, Cost, Zero BS",
  description:
    "Simple high protein recipes with macros, cost per serving, and no life stories. Ground beef, chicken, tuna — every recipe under $4 and 40g+ protein.",
  keywords: [
    "high protein recipes",
    "cheap high protein meals",
    "ground beef recipes",
    "meal prep recipes",
    "high protein meal prep",
    "boy kibble recipes",
    "budget bodybuilding meals",
  ],
  openGraph: {
    title: "High Protein Recipes — ProteinBro",
    description:
      "Every recipe has macros, cost, and zero fluff. Built for gym bros.",
    type: "website",
    url: "https://proteinbro.net/recipes",
  },
  alternates: {
    canonical: "/recipes",
  },
};

export default function RecipesPage() {
  // Sort by protein desc
  const sorted = [...RECIPES].sort(
    (a, b) => b.perServing.protein - a.perServing.protein
  );

  // Stats
  const avgProtein = Math.round(
    RECIPES.reduce((s, r) => s + r.perServing.protein, 0) / RECIPES.length
  );
  const avgCost =
    RECIPES.reduce((s, r) => s + r.costPerServing, 0) / RECIPES.length;
  const cheapest = [...RECIPES].sort(
    (a, b) => a.costPerServing - b.costPerServing
  )[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        ProteinBro
      </Link>

      {/* HEADER */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-red-500/20 bg-red-500/10">
            <ChefHat className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              {RECIPES.length} Recipes
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              High Protein Recipes
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-base text-zinc-400">
          Every recipe has macros, cost per serving, and zero life stories.
          Sorted by protein.
        </p>
      </header>

      {/* SUMMARY STATS */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border-2 border-green-500/20 bg-green-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-green-400/60">
            Avg Protein
          </div>
          <div className="font-mono text-2xl font-black text-green-400">
            {avgProtein}g
          </div>
        </div>
        <div className="rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/60">
            Avg Cost
          </div>
          <div className="font-mono text-2xl font-black text-yellow-400">
            ${avgCost.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Cheapest
          </div>
          <div className="font-mono text-lg font-black text-blue-400">
            ${cheapest.costPerServing.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-600">{cheapest.title}</div>
        </div>
      </div>

      {/* RECIPE LIST */}
      <div className="space-y-3">
        {sorted.map((recipe, idx) => {
          const totalMin = recipe.prepMinutes + recipe.cookMinutes;
          return (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group flex items-center gap-4 rounded-2xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03] sm:p-5"
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                <Image
                  src={`/recipes/${recipe.slug}.webp`}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <div className="absolute bottom-0 right-0 rounded-tl-lg bg-zinc-900/90 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-400">
                  {idx + 1}
                </div>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-heading text-lg font-bold uppercase text-zinc-200 group-hover:text-green-400 sm:text-xl">
                  {recipe.title}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-green-400" />
                    <span className="font-mono font-bold text-green-400">
                      {recipe.perServing.protein}g
                    </span>
                    <span className="text-zinc-600">protein</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-400" />
                    <span className="font-mono font-bold text-zinc-400">
                      {recipe.perServing.calories}
                    </span>
                    <span className="text-zinc-600">cal</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-yellow-400" />
                    <span className="font-mono font-bold text-yellow-400">
                      ${recipe.costPerServing.toFixed(2)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-400" />
                    <span className="font-mono font-bold text-zinc-400">
                      {totalMin}
                    </span>
                    <span className="text-zinc-600">min</span>
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 transition-colors group-hover:text-green-400" />
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
        <p>
          <Link href="/" className="text-zinc-500 hover:text-zinc-300">
            ProteinBro.net
          </Link>{" "}
          — Simple High Protein Meals for Men
        </p>
      </footer>
    </div>
  );
}
