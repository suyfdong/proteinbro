"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/data/recipes";
import {
  Clock,
  DollarSign,
  Flame,
  Beef,
  ChefHat,
  Droplets,
  UtensilsCrossed,
  Timer,
  Scissors,
  Fish,
  Carrot,
  Minus,
  Plus,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

const STEP_ICONS: Record<string, typeof Flame> = {
  Flame,
  Beef,
  ChefHat,
  Droplets,
  UtensilsCrossed,
  Timer,
  Scissors,
  Fish,
  Carrot,
};

function MacroRing({
  label,
  value,
  unit,
  color,
  pct,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  pct: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-[80px] w-[80px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-zinc-800"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={color}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-black tabular-nums text-zinc-100">
            {value}
          </span>
          <span className="text-[10px] text-zinc-500">{unit}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </span>
    </div>
  );
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.servings);
  const ratio = servings / recipe.servings;

  const scaled = useMemo(
    () => ({
      calories: Math.round(recipe.perServing.calories * ratio),
      protein: Math.round(recipe.perServing.protein * ratio),
      fat: Math.round(recipe.perServing.fat * ratio),
      carbs: Math.round(recipe.perServing.carbs * ratio),
      cost: recipe.costPerServing * ratio,
    }),
    [recipe, ratio]
  );

  // Macro percentages for rings (based on calorie contribution)
  const proteinCal = recipe.perServing.protein * 4;
  const carbsCal = recipe.perServing.carbs * 4;
  const fatCal = recipe.perServing.fat * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;

  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  return (
    <div className="space-y-6">
      {/* ===== STAT BAR ===== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            icon: Clock,
            label: "Total Time",
            value: `${totalMinutes}`,
            unit: "min",
            color: "text-blue-400",
            bg: "border-blue-500/20 bg-blue-500/5",
          },
          {
            icon: DollarSign,
            label: "Per Serving",
            value: `$${recipe.costPerServing.toFixed(2)}`,
            unit: "",
            color: "text-yellow-400",
            bg: "border-yellow-500/20 bg-yellow-500/5",
          },
          {
            icon: Target,
            label: "Protein",
            value: `${recipe.perServing.protein}g`,
            unit: "",
            color: "text-green-400",
            bg: "border-green-500/20 bg-green-500/5",
          },
          {
            icon: Zap,
            label: "Calories",
            value: `${recipe.perServing.calories}`,
            unit: "cal",
            color: "text-orange-400",
            bg: "border-orange-500/20 bg-orange-500/5",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-3 rounded-xl border-2 ${stat.bg} p-3`}
          >
            <stat.icon className={`h-5 w-5 shrink-0 ${stat.color}`} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {stat.label}
              </div>
              <div className={`font-mono text-lg font-black ${stat.color}`}>
                {stat.value}
                {stat.unit && (
                  <span className="ml-0.5 text-xs font-normal text-zinc-600">
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MACRO RINGS ===== */}
      <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Nutrition Per Serving
          </h2>
          {/* Serving adjuster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-black tabular-nums text-zinc-100">
                {servings}
              </span>
              <span className="text-xs text-zinc-500">servings</span>
            </div>
            <button
              onClick={() => setServings(servings + 1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-6 sm:gap-10">
          <MacroRing
            label="Calories"
            value={scaled.calories}
            unit="cal"
            color="text-orange-400"
            pct={100}
          />
          <MacroRing
            label="Protein"
            value={scaled.protein}
            unit="g"
            color="text-green-400"
            pct={totalMacroCal > 0 ? (proteinCal / totalMacroCal) * 100 : 0}
          />
          <MacroRing
            label="Carbs"
            value={scaled.carbs}
            unit="g"
            color="text-yellow-400"
            pct={totalMacroCal > 0 ? (carbsCal / totalMacroCal) * 100 : 0}
          />
          <MacroRing
            label="Fat"
            value={scaled.fat}
            unit="g"
            color="text-red-400"
            pct={totalMacroCal > 0 ? (fatCal / totalMacroCal) * 100 : 0}
          />
        </div>

        {servings !== recipe.servings && (
          <div className="mt-4 text-center text-xs text-zinc-600">
            Scaled from {recipe.servings} → {servings} servings. Cost per serving: ${scaled.cost.toFixed(2)}
          </div>
        )}
      </div>

      {/* ===== INGREDIENTS ===== */}
      <div className="rounded-2xl border-2 border-zinc-800 overflow-hidden">
        <div className="border-b border-zinc-800 bg-zinc-900/80 px-5 py-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Ingredients
          </h2>
        </div>
        <div className="divide-y divide-zinc-800/40">
          {recipe.ingredients.map((ing, i) => {
            const catColor =
              ing.category === "protein"
                ? "bg-red-500"
                : ing.category === "carb"
                  ? "bg-yellow-500"
                  : ing.category === "vegetable"
                    ? "bg-green-500"
                    : ing.category === "fat"
                      ? "bg-orange-500"
                      : "bg-purple-500";

            return (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-zinc-900/40"
              >
                <div className={`h-2 w-2 shrink-0 rounded-full ${catColor}`} />
                <span className="text-sm font-semibold text-zinc-200">
                  {ing.name}
                </span>
                <span className="ml-auto font-mono text-sm text-zinc-500">
                  {ing.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== STEPS ===== */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Steps
        </h2>
        {recipe.steps.map((step, i) => {
          const Icon = STEP_ICONS[step.icon] || Flame;
          return (
            <div
              key={i}
              className="flex gap-4 rounded-xl border-2 border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                <Icon className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">
                  {step.text}
                </p>
                {step.minutes && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
                    <Clock className="h-3 w-3" />
                    {step.minutes} min
                  </div>
                )}
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                <span className="font-mono text-xs font-bold text-zinc-500">
                  {i + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== TIPS ===== */}
      {recipe.tips.length > 0 && (
        <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Pro Tips
          </h2>
          <ul className="space-y-2">
            {recipe.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-zinc-400"
              >
                <span className="shrink-0 text-green-500">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ===== COST BREAKDOWN ===== */}
      <div className="rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-zinc-900 p-5">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400/70">
          <DollarSign className="h-4 w-4" />
          Cost Analysis
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="text-xs text-zinc-600">Per Serving</div>
            <div className="font-mono text-xl font-black text-yellow-400">
              ${recipe.costPerServing.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">Total Batch</div>
            <div className="font-mono text-xl font-black text-zinc-200">
              ${(recipe.costPerServing * recipe.servings).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">Per Day (3 meals)</div>
            <div className="font-mono text-xl font-black text-zinc-200">
              ${(recipe.costPerServing * 3).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">Per Month (est.)</div>
            <div className="font-mono text-xl font-black text-zinc-200">
              ${(recipe.costPerServing * 3 * 30).toFixed(0)}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-zinc-600">
          Prices based on US national averages (March 2026). Your local prices may vary.
        </div>
      </div>
    </div>
  );
}
