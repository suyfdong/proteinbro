import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/data/recipes";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  DollarSign,
  Clock,
  ShoppingCart,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "7-Day High Protein Meal Prep Plan — $2.50/Meal Average",
  description:
    "A complete 7-day meal prep plan with macros, cost, and grocery list. 40g+ protein per meal, under $3/serving average. Auto-generated from real recipes.",
  keywords: [
    "weekly meal prep plan",
    "7 day meal prep",
    "high protein meal plan",
    "weekly meal plan for men",
    "cheap weekly meal plan",
    "bodybuilding meal plan",
    "meal prep schedule",
  ],
  openGraph: {
    title: "7-Day Meal Prep Plan — ProteinBro",
    description: "Complete weekly plan with macros and grocery list.",
    type: "website",
    url: "https://proteinbro.net/meal-prep/weekly-plan",
  },
  alternates: {
    canonical: "/meal-prep/weekly-plan",
  },
};

// Assign recipes to days — curated for variety
const DAY_PLAN: { day: string; short: string; slug: string }[] = [
  { day: "Monday", short: "MON", slug: "chicken-and-rice-meal-prep" },
  { day: "Tuesday", short: "TUE", slug: "ground-beef-and-rice" },
  { day: "Wednesday", short: "WED", slug: "turkey-meatballs-meal-prep" },
  { day: "Thursday", short: "THU", slug: "air-fryer-chicken-breast-rice" },
  { day: "Friday", short: "FRI", slug: "salmon-rice-bowl" },
  { day: "Saturday", short: "SAT", slug: "chicken-burrito-bowl" },
  { day: "Sunday", short: "SUN", slug: "turkey-chili-meal-prep" },
];

export default function WeeklyPlanPage() {
  const days = DAY_PLAN.map((d) => {
    const recipe = RECIPES.find((r) => r.slug === d.slug)!;
    return { ...d, recipe };
  });

  const weeklyProtein = days.reduce(
    (s, d) => s + d.recipe.perServing.protein,
    0
  );
  const weeklyCost = days.reduce(
    (s, d) => s + d.recipe.costPerServing,
    0
  );
  const avgProtein = Math.round(weeklyProtein / 7);
  const avgCost = weeklyCost / 7;

  // Aggregate shopping list
  const ingredientMap = new Map<string, Set<string>>();
  days.forEach((d) =>
    d.recipe.ingredients.forEach((ing) => {
      if (!ingredientMap.has(ing.name)) {
        ingredientMap.set(ing.name, new Set());
      }
      ingredientMap.get(ing.name)!.add(ing.amount);
    })
  );

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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-blue-500/20 bg-blue-500/10">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              Weekly Plan
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              7-Day Meal Prep Plan
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-base text-zinc-400">
          One different high-protein meal every day. Variety without the
          decision fatigue.
        </p>
      </header>

      {/* WEEKLY STATS */}
      <div className="mb-8 grid grid-cols-4 gap-3">
        <div className="rounded-xl border-2 border-green-500/20 bg-green-500/5 p-3 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-green-400/60">
            Daily Avg
          </div>
          <div className="font-mono text-xl font-black text-green-400">
            {avgProtein}g
          </div>
          <div className="text-[10px] text-zinc-600">protein</div>
        </div>
        <div className="rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/60">
            Daily Cost
          </div>
          <div className="font-mono text-xl font-black text-yellow-400">
            ${avgCost.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-600">per meal</div>
        </div>
        <div className="rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-3 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Weekly
          </div>
          <div className="font-mono text-xl font-black text-blue-400">
            {weeklyProtein}g
          </div>
          <div className="text-[10px] text-zinc-600">total protein</div>
        </div>
        <div className="rounded-xl border-2 border-rose-500/20 bg-rose-500/5 p-3 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-rose-400/60">
            Weekly
          </div>
          <div className="font-mono text-xl font-black text-rose-400">
            ${weeklyCost.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-600">total cost</div>
        </div>
      </div>

      {/* 7-DAY GRID */}
      <section className="mb-10">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          The Plan
        </h2>
        <div className="space-y-3">
          {days.map((d) => {
            const totalMin =
              d.recipe.prepMinutes + d.recipe.cookMinutes;
            return (
              <Link
                key={d.day}
                href={`/recipes/${d.recipe.slug}`}
                className="group flex items-center gap-4 rounded-2xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
              >
                {/* Day badge */}
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-zinc-700 bg-zinc-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {d.short}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={`/recipes/${d.recipe.slug}.webp`}
                    alt={d.recipe.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-base font-bold uppercase text-zinc-200 group-hover:text-green-400">
                    {d.recipe.title}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-green-400" />
                      <span className="font-mono font-bold text-green-400">
                        {d.recipe.perServing.protein}g
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-yellow-400" />
                      <span className="font-mono font-bold text-yellow-400">
                        ${d.recipe.costPerServing.toFixed(2)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-zinc-500" />
                      <span className="text-zinc-500">{totalMin}m</span>
                    </span>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* SHOPPING LIST */}
      <section className="mb-10 rounded-2xl border-2 border-zinc-800 p-6">
        <div className="mb-4 flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-blue-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Weekly Shopping List
          </h2>
          <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-bold text-zinc-500">
            {ingredientMap.size} items
          </span>
        </div>
        <div className="grid gap-1 sm:grid-cols-2">
          {Array.from(ingredientMap.entries()).map(([name, amounts]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm odd:bg-zinc-800/30"
            >
              <span className="text-zinc-300">{name}</span>
              <span className="font-mono text-[11px] text-zinc-500">
                {Array.from(amounts).join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS CTA */}
      <Link
        href="/tools/meal-prep-cost-calculator"
        className="mb-10 flex items-center gap-3 rounded-xl border border-zinc-700 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/[0.03]"
      >
        <ShoppingCart className="h-5 w-5 text-blue-400" />
        <div className="flex-1">
          <div className="text-sm font-bold text-zinc-300">
            Calculate Your Exact Weekly Cost
          </div>
          <div className="text-[10px] text-zinc-600">
            Meal Prep Cost Calculator →
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-zinc-700" />
      </Link>

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
