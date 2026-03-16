import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/data/recipes";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Target,
  TrendingDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Budget High Protein Meals Under $2.50 — Cheap Meal Prep",
  description:
    "The cheapest high protein meals ranked by cost per serving. Every recipe under $2.50 with 35g+ protein. Bodybuilding on a budget, no excuses.",
  keywords: [
    "cheap high protein meals",
    "budget meal prep",
    "cheap bodybuilding meals",
    "high protein meals under $2",
    "cheapest meal prep",
    "budget protein meals",
    "cheap meal prep for muscle",
    "protein on a budget",
  ],
  openGraph: {
    title: "Budget High Protein Meals — ProteinBro",
    description: "Cheapest protein meals ranked by cost. All under $2.50.",
    type: "website",
    url: "https://proteinbro.net/meal-prep/budget",
  },
  alternates: {
    canonical: "/meal-prep/budget",
  },
};

export default function BudgetPage() {
  // All recipes sorted by cost (cheapest first)
  const allByCost = [...RECIPES].sort(
    (a, b) => a.costPerServing - b.costPerServing
  );
  const budgetRecipes = allByCost.filter((r) => r.costPerServing <= 2.5);
  const midRecipes = allByCost.filter(
    (r) => r.costPerServing > 2.5 && r.costPerServing <= 3.5
  );

  const cheapest = allByCost[0];
  const avgProtein = Math.round(
    budgetRecipes.reduce((s, r) => s + r.perServing.protein, 0) /
      budgetRecipes.length
  );

  // Protein per dollar ranking
  const proteinPerDollar = [...RECIPES]
    .map((r) => ({
      ...r,
      ppd: r.perServing.protein / r.costPerServing,
    }))
    .sort((a, b) => b.ppd - a.ppd);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/meal-prep"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Meal Prep
      </Link>

      {/* HEADER */}
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-green-500/20 bg-green-500/10">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              {budgetRecipes.length} Budget Meals
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Budget Meal Prep
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-base text-zinc-400">
          High protein doesn&apos;t mean high price. Every meal here is under
          $2.50/serving.
        </p>
      </header>

      {/* STATS */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border-2 border-green-500/20 bg-green-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-green-400/60">
            Cheapest
          </div>
          <div className="font-mono text-2xl font-black text-green-400">
            ${cheapest.costPerServing.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/60">
            Avg Protein
          </div>
          <div className="font-mono text-2xl font-black text-yellow-400">
            {avgProtein}g
          </div>
        </div>
        <div className="rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Weekly (7 meals)
          </div>
          <div className="font-mono text-2xl font-black text-blue-400">
            ${(budgetRecipes.slice(0, 7).reduce((s, r) => s + r.costPerServing, 0)).toFixed(2)}
          </div>
        </div>
      </div>

      {/* CHEAPEST HERO */}
      <Link
        href={`/recipes/${cheapest.slug}`}
        className="group mb-8 block overflow-hidden rounded-2xl border-2 border-green-500/20 transition-colors hover:border-green-500/30"
      >
        <div className="relative h-48 w-full sm:h-56">
          <Image
            src={`/recipes/${cheapest.slug}.webp`}
            alt={cheapest.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          <div className="absolute top-3 left-3 rounded-full bg-green-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Cheapest
          </div>
          <div className="absolute bottom-0 left-0 p-5">
            <h3 className="font-heading text-2xl font-black uppercase text-white group-hover:text-green-400">
              {cheapest.title}
            </h3>
            <div className="mt-1 flex items-center gap-4 text-sm">
              <span className="font-mono font-bold text-green-400">
                ${cheapest.costPerServing.toFixed(2)}/serving
              </span>
              <span className="font-mono font-bold text-yellow-400">
                {cheapest.perServing.protein}g protein
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* PROTEIN PER DOLLAR RANKING */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-green-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Best Protein per Dollar
          </h2>
        </div>
        <div className="space-y-2">
          {proteinPerDollar.slice(0, 10).map((recipe, idx) => {
            // Bar width: relative to max PPD
            const maxPPD = proteinPerDollar[0].ppd;
            const pct = Math.round((recipe.ppd / maxPPD) * 100);
            return (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group block rounded-xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-zinc-500">
                      #{idx + 1}
                    </span>
                    <h3 className="font-heading text-sm font-bold uppercase text-zinc-200 group-hover:text-green-400 sm:text-base">
                      {recipe.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-green-400">
                      {recipe.ppd.toFixed(1)}g/$
                    </span>
                    <span className="font-mono text-yellow-400">
                      ${recipe.costPerServing.toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* Bar */}
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href="/tools/protein-per-dollar-calculator"
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-400 hover:text-green-300"
        >
          Full calculator with custom prices <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {/* UNDER $2.50 LIST */}
      <section className="mb-10">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
          Under $2.50/serving ({budgetRecipes.length})
        </h2>
        <div className="space-y-2">
          {budgetRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group flex items-center gap-4 rounded-xl border-2 border-zinc-800 p-3 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`/recipes/${recipe.slug}.webp`}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-heading text-sm font-bold uppercase text-zinc-200 group-hover:text-green-400">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-yellow-400">
                    ${recipe.costPerServing.toFixed(2)}
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className="font-mono font-bold text-green-400">
                    {recipe.perServing.protein}g
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">
                    {recipe.prepMinutes + recipe.cookMinutes}m
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
            </Link>
          ))}
        </div>
      </section>

      {/* MID-RANGE */}
      {midRecipes.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
            $2.50–$3.50/serving ({midRecipes.length})
          </h2>
          <div className="space-y-2">
            {midRecipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-800/60 p-3 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={`/recipes/${recipe.slug}.webp`}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-zinc-300 group-hover:text-green-400">
                    {recipe.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-yellow-400">
                  ${recipe.costPerServing.toFixed(2)}
                </span>
                <span className="font-mono text-xs text-green-400">
                  {recipe.perServing.protein}g
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
        <p>
          Costs are US national averages (March 2026). Your local prices may
          vary.
        </p>
        <p className="mt-2">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300">
            ProteinBro.net
          </Link>{" "}
          — Simple High Protein Meals for Men
        </p>
      </footer>
    </div>
  );
}
