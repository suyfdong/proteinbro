import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/data/recipes";
import { COMBOS } from "@/data/combos";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  DollarSign,
  Target,
  Calendar,
  Zap,
  ShoppingCart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meal Prep Guide for Men — Weekly Plans, Budget Meals, Fast Recipes",
  description:
    "No-BS meal prep guide for gym bros. Weekly meal plans, recipes under 30 minutes, and budget meals under $2/serving. All with macros and cost breakdowns.",
  keywords: [
    "meal prep for men",
    "meal prep recipes",
    "high protein meal prep",
    "weekly meal prep plan",
    "budget meal prep",
    "meal prep under 30 minutes",
    "cheap meal prep ideas",
    "bodybuilding meal prep",
  ],
  openGraph: {
    title: "Meal Prep Guide — ProteinBro",
    description:
      "Weekly plans, budget meals, and fast recipes. All with macros.",
    type: "website",
    url: "https://proteinbro.net/meal-prep",
  },
  alternates: {
    canonical: "/meal-prep",
  },
};

export default function MealPrepHub() {
  // Get meal-prep tagged recipes
  const mealPrepRecipes = RECIPES.filter((r) =>
    r.tags.some((t) => t.toLowerCase().includes("meal prep"))
  ).sort((a, b) => b.perServing.protein - a.perServing.protein);

  const quickRecipes = RECIPES.filter(
    (r) => r.prepMinutes + r.cookMinutes <= 30
  );
  const budgetRecipes = RECIPES.filter((r) => r.costPerServing <= 2.5);

  // Stats
  const avgProtein = Math.round(
    mealPrepRecipes.reduce((s, r) => s + r.perServing.protein, 0) /
      mealPrepRecipes.length
  );
  const avgCost =
    mealPrepRecipes.reduce((s, r) => s + r.costPerServing, 0) /
    mealPrepRecipes.length;
  const cheapest = Math.min(...RECIPES.map((r) => r.costPerServing));

  // Hub sections
  const sections = [
    {
      title: "7-Day Meal Plan",
      desc: "Auto-generated weekly plan with shopping list",
      href: "/meal-prep/weekly-plan",
      icon: Calendar,
      stat: "7 days",
      statLabel: "planned",
      color: "blue",
      borderColor: "border-blue-500/20",
      bgColor: "bg-blue-500/5",
      textColor: "text-blue-400",
    },
    {
      title: "Under 30 Minutes",
      desc: `${quickRecipes.length} recipes ready in 30 min or less`,
      href: "/meal-prep/under-30-minutes",
      icon: Clock,
      stat: `${quickRecipes.length}`,
      statLabel: "recipes",
      color: "orange",
      borderColor: "border-orange-500/20",
      bgColor: "bg-orange-500/5",
      textColor: "text-orange-400",
    },
    {
      title: "Budget Meals",
      desc: `${budgetRecipes.length} meals under $2.50/serving`,
      href: "/meal-prep/budget",
      icon: DollarSign,
      stat: `$${cheapest.toFixed(2)}`,
      statLabel: "cheapest",
      color: "green",
      borderColor: "border-green-500/20",
      bgColor: "bg-green-500/5",
      textColor: "text-green-400",
    },
  ];

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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-blue-500/20 bg-blue-500/10">
            <ShoppingCart className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              Meal Prep Hub
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Meal Prep for Men
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-base text-zinc-400">
          Weekly plans, budget meals, and fast recipes. Every meal has macros,
          cost, and zero fluff.
        </p>
      </header>

      {/* STATS */}
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
            Meal Prep Recipes
          </div>
          <div className="font-mono text-2xl font-black text-blue-400">
            {mealPrepRecipes.length}
          </div>
        </div>
      </div>

      {/* SECTION CARDS */}
      <div className="mb-10 grid gap-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`group flex items-center gap-4 rounded-2xl border-2 ${s.borderColor} p-5 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 ${s.borderColor} ${s.bgColor}`}
              >
                <Icon className={`h-7 w-7 ${s.textColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-lg font-bold uppercase text-zinc-200 group-hover:text-green-400">
                  {s.title}
                </h2>
                <p className="text-sm text-zinc-500">{s.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className={`font-mono text-xl font-black ${s.textColor}`}>
                  {s.stat}
                </div>
                <div className="text-[10px] text-zinc-600">{s.statLabel}</div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
            </Link>
          );
        })}
      </div>

      {/* TOP MEAL PREP RECIPES */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-green-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Top Meal Prep Recipes
          </h2>
        </div>
        <div className="space-y-3">
          {mealPrepRecipes.slice(0, 6).map((recipe, idx) => {
            const totalMin = recipe.prepMinutes + recipe.cookMinutes;
            return (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group flex items-center gap-4 rounded-xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={`/recipes/${recipe.slug}.webp`}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  <div className="absolute bottom-0 right-0 rounded-tl-md bg-zinc-900/90 px-1 py-0.5 font-mono text-[9px] font-bold text-zinc-400">
                    {idx + 1}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-base font-bold uppercase text-zinc-200 group-hover:text-green-400">
                    {recipe.title}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-green-400">
                      {recipe.perServing.protein}g
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="font-mono text-yellow-400">
                      ${recipe.costPerServing.toFixed(2)}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-500">{totalMin}m</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* TOOLS CTA */}
      <section className="mb-10 rounded-2xl border-2 border-zinc-800 p-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
          Meal Prep Tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools/meal-prep-cost-calculator"
            className="group flex items-center gap-3 rounded-xl border border-zinc-700 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/[0.03]"
          >
            <ShoppingCart className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-sm font-bold text-zinc-300 group-hover:text-green-400">
                Cost Calculator
              </div>
              <div className="text-[10px] text-zinc-600">
                Plan your grocery budget
              </div>
            </div>
          </Link>
          <Link
            href="/tools/protein-per-dollar-calculator"
            className="group flex items-center gap-3 rounded-xl border border-zinc-700 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/[0.03]"
          >
            <DollarSign className="h-5 w-5 text-yellow-400" />
            <div>
              <div className="text-sm font-bold text-zinc-300 group-hover:text-green-400">
                Protein Per Dollar
              </div>
              <div className="text-[10px] text-zinc-600">
                Find cheapest protein sources
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
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
