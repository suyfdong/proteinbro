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
} from "lucide-react";

export const metadata: Metadata = {
  title: "High Protein Meals Under 30 Minutes — Fast Meal Prep Recipes",
  description:
    "Quick high protein recipes ready in 30 minutes or less. Perfect for busy gym bros who need fast meal prep with 40g+ protein per serving.",
  keywords: [
    "meals under 30 minutes",
    "quick high protein meals",
    "fast meal prep",
    "30 minute meals high protein",
    "easy meal prep recipes",
    "quick bodybuilding meals",
    "fast protein recipes",
  ],
  openGraph: {
    title: "Under 30 Min High Protein Recipes — ProteinBro",
    description: "Fast meals with 40g+ protein, ready in 30 min or less.",
    type: "website",
    url: "https://proteinbro.net/meal-prep/under-30-minutes",
  },
  alternates: {
    canonical: "/meal-prep/under-30-minutes",
  },
};

export default function Under30Page() {
  const quickRecipes = RECIPES.filter(
    (r) => r.prepMinutes + r.cookMinutes <= 30
  ).sort((a, b) => a.prepMinutes + a.cookMinutes - (b.prepMinutes + b.cookMinutes));

  const fastest = quickRecipes[0];
  const avgProtein = Math.round(
    quickRecipes.reduce((s, r) => s + r.perServing.protein, 0) /
      quickRecipes.length
  );
  const avgTime = Math.round(
    quickRecipes.reduce((s, r) => s + r.prepMinutes + r.cookMinutes, 0) /
      quickRecipes.length
  );

  // Group by time buckets
  const under15 = quickRecipes.filter(
    (r) => r.prepMinutes + r.cookMinutes <= 15
  );
  const under25 = quickRecipes.filter(
    (r) => {
      const t = r.prepMinutes + r.cookMinutes;
      return t > 15 && t <= 25;
    }
  );
  const under30 = quickRecipes.filter(
    (r) => {
      const t = r.prepMinutes + r.cookMinutes;
      return t > 25 && t <= 30;
    }
  );

  const buckets = [
    { label: "⚡ Under 15 min", recipes: under15 },
    { label: "🔥 15–25 min", recipes: under25 },
    { label: "⏱️ 25–30 min", recipes: under30 },
  ].filter((b) => b.recipes.length > 0);

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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-orange-500/20 bg-orange-500/10">
            <Clock className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-green-500">
              {quickRecipes.length} Fast Recipes
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Under 30 Minutes
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-base text-zinc-400">
          No excuses. Every recipe here is ready before your protein shake
          settles.
        </p>
      </header>

      {/* STATS */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border-2 border-orange-500/20 bg-orange-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400/60">
            Fastest
          </div>
          <div className="font-mono text-2xl font-black text-orange-400">
            {fastest.prepMinutes + fastest.cookMinutes}m
          </div>
        </div>
        <div className="rounded-xl border-2 border-green-500/20 bg-green-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-green-400/60">
            Avg Protein
          </div>
          <div className="font-mono text-2xl font-black text-green-400">
            {avgProtein}g
          </div>
        </div>
        <div className="rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Avg Time
          </div>
          <div className="font-mono text-2xl font-black text-blue-400">
            {avgTime}m
          </div>
        </div>
      </div>

      {/* FASTEST HERO */}
      <Link
        href={`/recipes/${fastest.slug}`}
        className="group mb-8 block overflow-hidden rounded-2xl border-2 border-orange-500/20 transition-colors hover:border-green-500/30"
      >
        <div className="relative h-48 w-full sm:h-56">
          <Image
            src={`/recipes/${fastest.slug}.webp`}
            alt={fastest.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          <div className="absolute top-3 left-3 rounded-full bg-orange-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Fastest
          </div>
          <div className="absolute bottom-0 left-0 p-5">
            <h3 className="font-heading text-2xl font-black uppercase text-white group-hover:text-green-400">
              {fastest.title}
            </h3>
            <div className="mt-1 flex items-center gap-4 text-sm">
              <span className="font-mono font-bold text-orange-400">
                {fastest.prepMinutes + fastest.cookMinutes} min
              </span>
              <span className="font-mono font-bold text-green-400">
                {fastest.perServing.protein}g protein
              </span>
              <span className="font-mono font-bold text-yellow-400">
                ${fastest.costPerServing.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* RECIPES BY TIME BUCKET */}
      {buckets.map((bucket) => (
        <section key={bucket.label} className="mb-8">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
            {bucket.label} ({bucket.recipes.length})
          </h2>
          <div className="space-y-2">
            {bucket.recipes.map((recipe) => {
              const totalMin = recipe.prepMinutes + recipe.cookMinutes;
              return (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="group flex items-center gap-4 rounded-xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
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
                    <h3 className="truncate font-heading text-sm font-bold uppercase text-zinc-200 group-hover:text-green-400 sm:text-base">
                      {recipe.title}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-orange-400" />
                        <span className="font-mono font-bold text-orange-400">
                          {totalMin}m
                        </span>
                      </span>
                      <span className="font-mono font-bold text-green-400">
                        {recipe.perServing.protein}g
                      </span>
                      <span className="font-mono text-yellow-400">
                        ${recipe.costPerServing.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
                </Link>
              );
            })}
          </div>
        </section>
      ))}

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
