"use client";

import { useState, useMemo, useCallback } from "react";
import { RECIPES, type Recipe } from "@/data/recipes";
import { COMBOS, type Combo } from "@/data/combos";
import Link from "next/link";
import {
  Shuffle,
  Lock,
  Unlock,
  Target,
  DollarSign,
  Clock,
  Flame,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CalendarDays,
  Dumbbell,
  Zap,
  X,
  Check,
  RefreshCw,
} from "lucide-react";

// ========== Types ==========
interface MealOption {
  type: "recipe" | "combo";
  slug: string;
  title: string;
  protein: number;
  calories: number;
  fat: number;
  carbs: number;
  cost: number;
  minutes: number;
  image?: string;
}

interface DaySlot {
  meal: MealOption;
  locked: boolean;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

const PROTEIN_EXCLUDES = [
  { id: "beef", label: "Beef" },
  { id: "chicken", label: "Chicken" },
  { id: "pork", label: "Pork" },
  { id: "fish", label: "Fish" },
  { id: "eggs", label: "Eggs" },
  { id: "tofu", label: "Tofu" },
];

// ========== Helpers ==========
function buildMealPool(excludes: string[]): MealOption[] {
  const pool: MealOption[] = [];

  for (const r of RECIPES) {
    const tags = r.tags.join(" ").toLowerCase();
    const skip = excludes.some((ex) => {
      if (ex === "beef") return tags.includes("ground beef") || tags.includes("beef");
      if (ex === "chicken") return tags.includes("chicken");
      if (ex === "pork") return tags.includes("pork");
      if (ex === "fish") return tags.includes("salmon") || tags.includes("tilapia") || tags.includes("shrimp") || tags.includes("tuna");
      if (ex === "eggs") return tags.includes("egg");
      if (ex === "tofu") return tags.includes("tofu");
      return false;
    });
    if (skip) continue;

    pool.push({
      type: "recipe",
      slug: r.slug,
      title: r.title,
      protein: r.perServing.protein,
      calories: r.perServing.calories,
      fat: r.perServing.fat,
      carbs: r.perServing.carbs,
      cost: r.costPerServing,
      minutes: r.prepMinutes + r.cookMinutes,
      image: `/recipes/${r.slug}.webp`,
    });
  }

  for (const c of COMBOS) {
    const skip = excludes.some((ex) => {
      if (ex === "beef") return c.protein.id === "ground-beef";
      if (ex === "chicken") return c.protein.id.includes("chicken");
      if (ex === "pork") return c.protein.id === "pork-chops";
      if (ex === "fish") return ["salmon", "shrimp", "tilapia"].includes(c.protein.id);
      if (ex === "eggs") return c.protein.id === "eggs";
      if (ex === "tofu") return c.protein.id === "tofu";
      return false;
    });
    if (skip) continue;

    pool.push({
      type: "combo",
      slug: c.slug,
      title: c.title,
      protein: c.totalPerServing.protein,
      calories: c.totalPerServing.calories,
      fat: c.totalPerServing.fat,
      carbs: c.totalPerServing.carbs,
      cost: c.totalCost,
      minutes: c.totalMinutes,
      image: `/recipes/${c.slug}.webp`,
    });
  }

  return pool;
}

function pickMeals(
  pool: MealOption[],
  count: number,
  proteinTarget: number,
  budgetPerMeal: number,
  locked: (MealOption | null)[]
): MealOption[] {
  // Filter pool to budget
  const eligible = pool.filter((m) => m.cost <= budgetPerMeal + 0.5);
  if (eligible.length === 0) return pool.slice(0, count);

  // Sort by how close to protein target
  const sorted = [...eligible].sort(
    (a, b) =>
      Math.abs(a.protein - proteinTarget) - Math.abs(b.protein - proteinTarget)
  );

  const result: MealOption[] = [];
  const usedSlugs = new Set<string>();

  // Keep locked meals
  for (let i = 0; i < count; i++) {
    if (locked[i]) {
      result.push(locked[i]!);
      usedSlugs.add(locked[i]!.slug);
    } else {
      result.push(null as unknown as MealOption); // placeholder
    }
  }

  // Fill unlocked slots with variety (different titles)
  for (let i = 0; i < count; i++) {
    if (locked[i]) continue;

    // Shuffle to add randomness
    const candidates = sorted.filter((m) => !usedSlugs.has(m.slug));
    if (candidates.length === 0) {
      result[i] = sorted[Math.floor(Math.random() * sorted.length)];
    } else {
      // Pick from top 8 candidates randomly for variety
      const topN = candidates.slice(0, Math.min(8, candidates.length));
      const pick = topN[Math.floor(Math.random() * topN.length)];
      result[i] = pick;
      usedSlugs.add(pick.slug);
    }
  }

  return result;
}

// ========== Component ==========
export default function WeeklyMealGenerator() {
  const [proteinGoal, setProteinGoal] = useState(150);
  const [weeklyBudget, setWeeklyBudget] = useState(50);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [plan, setPlan] = useState<DaySlot[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const perMealProtein = Math.round(proteinGoal / 3); // assume 3 meals/day, this generates 1
  const budgetPerMeal = weeklyBudget / 5;

  const pool = useMemo(() => buildMealPool(excludes), [excludes]);

  const generate = useCallback(() => {
    setIsGenerating(true);
    // Animate delay
    setTimeout(() => {
      const locked = plan
        ? plan.map((d) => (d.locked ? d.meal : null))
        : Array(5).fill(null);

      const meals = pickMeals(pool, 5, perMealProtein, budgetPerMeal, locked);
      setPlan(
        meals.map((meal, i) => ({
          meal,
          locked: plan ? plan[i]?.locked ?? false : false,
        }))
      );
      setIsGenerating(false);
    }, 600);
  }, [pool, perMealProtein, budgetPerMeal, plan]);

  const toggleLock = (i: number) => {
    if (!plan) return;
    setPlan(
      plan.map((d, idx) => (idx === i ? { ...d, locked: !d.locked } : d))
    );
  };

  const rerollOne = (i: number) => {
    if (!plan) return;
    const usedSlugs = new Set(plan.map((d) => d.meal.slug));
    const candidates = pool.filter(
      (m) =>
        !usedSlugs.has(m.slug) &&
        m.cost <= budgetPerMeal + 0.5
    );
    if (candidates.length === 0) return;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    setPlan(
      plan.map((d, idx) => (idx === i ? { ...d, meal: pick } : d))
    );
  };

  // Computed totals
  const totals = plan
    ? {
        protein: plan.reduce((s, d) => s + d.meal.protein, 0),
        calories: plan.reduce((s, d) => s + d.meal.calories, 0),
        cost: plan.reduce((s, d) => s + d.meal.cost, 0),
        minutes: plan.reduce((s, d) => s + d.meal.minutes, 0),
      }
    : null;

  const toggleExclude = (id: string) => {
    setExcludes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setPlan(null); // reset plan when filters change
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1">
          <CalendarDays className="h-3.5 w-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-purple-400">
            Free Tool
          </span>
        </div>
        <h1 className="mb-2 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Weekly Kibble{" "}
          <span className="text-green-500">Generator</span>
        </h1>
        <p className="max-w-lg text-sm text-zinc-500">
          Set your protein goal & budget. We&apos;ll build your 5-day rotation.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="mb-8 rounded-2xl border-2 border-zinc-800 bg-zinc-900/60 p-6">
        {/* Protein slider */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300">
              <Target className="h-4 w-4 text-green-400" />
              Daily Protein Target
            </label>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1">
              <span className="font-mono text-lg font-bold text-green-400">
                {proteinGoal}g
              </span>
            </div>
          </div>
          <input
            type="range"
            min={80}
            max={250}
            step={10}
            value={proteinGoal}
            onChange={(e) => {
              setProteinGoal(Number(e.target.value));
              setPlan(null);
            }}
            className="w-full accent-green-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
            <span>80g</span>
            <span>150g</span>
            <span>250g</span>
          </div>
        </div>

        {/* Budget slider */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300">
              <DollarSign className="h-4 w-4 text-yellow-400" />
              Weekly Budget (5 meals)
            </label>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1">
              <span className="font-mono text-lg font-bold text-yellow-400">
                ${weeklyBudget}
              </span>
            </div>
          </div>
          <input
            type="range"
            min={15}
            max={100}
            step={5}
            value={weeklyBudget}
            onChange={(e) => {
              setWeeklyBudget(Number(e.target.value));
              setPlan(null);
            }}
            className="w-full accent-yellow-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
            <span>$15</span>
            <span>${Math.round(weeklyBudget / 5)}/meal</span>
            <span>$100</span>
          </div>
        </div>

        {/* Exclude toggles */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-zinc-300">
            Exclude
          </label>
          <div className="flex flex-wrap gap-2">
            {PROTEIN_EXCLUDES.map((p) => {
              const active = excludes.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleExclude(p.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border-red-500/40 bg-red-500/10 text-red-400"
                      : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {active && <X className="mr-1 inline h-3 w-3" />}
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={isGenerating}
          className="glow-pulse flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : plan ? (
            <>
              <Shuffle className="h-4 w-4" />
              Re-Generate Plan
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Generate My Plan
            </>
          )}
        </button>

        {pool.length > 0 && (
          <p className="mt-2 text-center text-[10px] text-zinc-600">
            {pool.length} meals in pool
          </p>
        )}
      </div>

      {/* RESULTS */}
      {plan && (
        <div
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDuration: "0.5s" }}
        >
          {/* Weekly totals */}
          <div className="mb-6 grid grid-cols-4 gap-2">
            {[
              {
                icon: Target,
                value: `${totals!.protein}g`,
                label: "total protein",
                color: "text-green-400",
                border: "border-green-500/20",
              },
              {
                icon: Flame,
                value: `${totals!.calories}`,
                label: "total cal",
                color: "text-orange-400",
                border: "border-orange-500/20",
              },
              {
                icon: DollarSign,
                value: `$${totals!.cost.toFixed(2)}`,
                label: "total cost",
                color: "text-yellow-400",
                border: "border-yellow-500/20",
              },
              {
                icon: Clock,
                value: `${totals!.minutes}m`,
                label: "total cook",
                color: "text-blue-400",
                border: "border-blue-500/20",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border ${stat.border} bg-zinc-900/60 p-3 text-center`}
              >
                <stat.icon
                  className={`mx-auto mb-1 h-4 w-4 ${stat.color}`}
                />
                <div className={`font-mono text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Daily avg vs target */}
          <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-zinc-500">
                Daily avg from these meals:{" "}
                <strong className="text-green-400">
                  {Math.round(totals!.protein / 5)}g
                </strong>
              </span>
              <span className="text-zinc-500">
                Target per meal:{" "}
                <strong className="text-zinc-300">{perMealProtein}g</strong>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-700"
                style={{
                  width: `${Math.min(100, (totals!.protein / 5 / perMealProtein) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Meal cards */}
          <div className="mb-6 space-y-3">
            {plan.map((slot, i) => (
              <div
                key={`${i}-${slot.meal.slug}`}
                className={`group overflow-hidden rounded-2xl border transition-all ${
                  slot.locked
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-stretch">
                  {/* Day label */}
                  <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-zinc-800/60 bg-zinc-950/40 p-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-zinc-600">
                      {DAY_SHORT[i]}
                    </span>
                    <span className="font-mono text-lg font-bold text-zinc-400">
                      {i + 1}
                    </span>
                  </div>

                  {/* Meal info */}
                  <div className="flex flex-1 items-center gap-3 p-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/recipes/${slot.meal.slug}`}
                        className="block truncate font-heading text-base font-bold uppercase text-zinc-200 transition-colors hover:text-green-400"
                      >
                        {slot.meal.title}
                      </Link>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-green-400">
                          <Target className="h-3 w-3" />
                          {slot.meal.protein}g
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                          <Flame className="h-3 w-3" />
                          {slot.meal.calories}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs text-yellow-400/70">
                          <DollarSign className="h-3 w-3" />
                          {slot.meal.cost.toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs text-zinc-600">
                          <Clock className="h-3 w-3" />
                          {slot.meal.minutes}m
                        </span>
                      </div>
                    </div>

                    {/* Protein bar mini */}
                    <div className="hidden w-20 sm:block">
                      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-green-500 transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (slot.meal.protein / perMealProtein) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="mt-0.5 text-center text-[9px] text-zinc-600">
                        {Math.round(
                          (slot.meal.protein / perMealProtein) * 100
                        )}
                        %
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => toggleLock(i)}
                        className={`rounded-lg p-2 transition-all ${
                          slot.locked
                            ? "bg-green-500/10 text-green-400"
                            : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"
                        }`}
                        title={slot.locked ? "Unlock" : "Lock"}
                      >
                        {slot.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </button>
                      {!slot.locked && (
                        <button
                          onClick={() => rerollOne(i)}
                          className="rounded-lg p-2 text-zinc-600 transition-all hover:bg-zinc-800 hover:text-zinc-300"
                          title="Re-roll this meal"
                        >
                          <Shuffle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shopping list toggle */}
          <button
            onClick={() => setShowShoppingList(!showShoppingList)}
            className="mb-4 flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition-colors hover:border-zinc-700"
          >
            <span className="flex items-center gap-2 font-heading text-sm font-bold uppercase text-zinc-300">
              <ShoppingCart className="h-4 w-4 text-blue-400" />
              Shopping List
            </span>
            {showShoppingList ? (
              <ChevronUp className="h-4 w-4 text-zinc-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            )}
          </button>

          {showShoppingList && (
            <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <div className="space-y-2">
                {plan.map((slot, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-zinc-800/40 px-3 py-2"
                  >
                    <span className="font-mono text-xs text-zinc-600">
                      {DAY_SHORT[i]}
                    </span>
                    <span className="flex-1 text-sm text-zinc-300">
                      {slot.meal.title}
                    </span>
                    <span className="font-mono text-xs text-yellow-400">
                      ${slot.meal.cost.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
                <span className="text-sm font-bold text-zinc-300">
                  Weekly Total
                </span>
                <span className="font-mono text-lg font-bold text-yellow-400">
                  ${totals!.cost.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-[10px] text-zinc-600">
                Costs are per serving. Buying in bulk reduces total by 15-20%.
              </p>
            </div>
          )}

          {/* Browse recipes CTA */}
          <Link
            href="/recipes"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:border-zinc-700 hover:text-green-400"
          >
            Browse all recipes
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
