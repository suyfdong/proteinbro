"use client";

import { useState } from "react";
import Link from "next/link";
import type { Combo } from "@/data/combos";
import { getSwapOptions } from "@/data/combos";
import {
  Clock,
  DollarSign,
  Target,
  Zap,
  ArrowRight,
  Repeat2,
  TrendingUp,
  Minus,
  Plus,
} from "lucide-react";

// ========== SCORE BAR ==========
function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${color}`}
          style={{ width: `${pct}%`, transition: "width 0.8s ease" }}
        />
      </div>
      <span className="w-10 text-right font-mono text-sm font-black text-zinc-300">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// ========== MACRO RING (reused pattern) ==========
function MacroRing({
  label,
  value,
  unit,
  color,
  pct,
  size = 80,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  pct: number;
  size?: number;
}) {
  const radius = (size / 2) - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ height: size, width: size }}>
        <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="currentColor" strokeWidth="5"
            className="text-zinc-800"
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="currentColor" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={color}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
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

// ========== SWAP CARD ==========
function SwapCard({ combo, label }: { combo: Combo; label: string }) {
  return (
    <Link
      href={`/recipes/${combo.slug}`}
      className="group flex items-center gap-3 rounded-xl border-2 border-zinc-800 p-3 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
    >
      <span className="text-xl">{label === "protein" ? combo.protein.icon : label === "side" ? combo.side.icon : combo.method.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-zinc-300 group-hover:text-green-400">
          {label === "protein" ? combo.protein.shortName : label === "side" ? combo.side.shortName : combo.method.name}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-600">
          <span className="font-mono font-bold text-green-400/70">{combo.totalPerServing.protein}g</span>
          <span>•</span>
          <span className="font-mono text-yellow-400/70">${combo.totalCost.toFixed(2)}</span>
          <span>•</span>
          <span>{combo.totalMinutes}m</span>
        </div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-700 group-hover:text-green-400" />
    </Link>
  );
}

// ========== MAIN COMPONENT ==========
export default function ComboCard({ combo }: { combo: Combo }) {
  const [servings, setServings] = useState(1);
  const { swapProtein, swapSide, swapMethod } = getSwapOptions(combo);

  const scaled = {
    calories: Math.round(combo.totalPerServing.calories * servings),
    protein: Math.round(combo.totalPerServing.protein * servings),
    fat: Math.round(combo.totalPerServing.fat * servings),
    carbs: Math.round(combo.totalPerServing.carbs * servings),
    cost: combo.totalCost * servings,
  };

  const proteinCal = combo.totalPerServing.protein * 4;
  const carbsCal = combo.totalPerServing.carbs * 4;
  const fatCal = combo.totalPerServing.fat * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;

  const overallScore = Math.round(
    (combo.scores.protein * 0.35 + combo.scores.value * 0.25 +
     combo.scores.speed * 0.2 + combo.scores.ease * 0.2) * 10
  ) / 10;

  return (
    <div className="space-y-6">
      {/* ===== FORMULA HERO ===== */}
      <div className="overflow-hidden rounded-2xl border-2 border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950">
        <div className="flex flex-col items-center gap-4 p-6 sm:p-8">
          {/* Method badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5">
            <span className="text-base">{combo.method.emoji}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">
              {combo.method.name}
            </span>
          </div>

          {/* The formula: PROTEIN × SIDE */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-3">
              <span className="text-3xl">{combo.protein.icon}</span>
              <span className="mt-1 text-sm font-black uppercase text-zinc-200">
                {combo.protein.shortName}
              </span>
              <span className="text-[10px] text-zinc-500">{combo.protein.servingGrams}g</span>
            </div>

            <span className="text-2xl font-black text-zinc-600">+</span>

            <div className="flex flex-col items-center rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-3">
              <span className="text-3xl">{combo.side.icon}</span>
              <span className="mt-1 text-sm font-black uppercase text-zinc-200">
                {combo.side.shortName}
              </span>
              <span className="text-[10px] text-zinc-500">1 serving</span>
            </div>
          </div>

          {/* Quick technique note */}
          <div className="max-w-md rounded-lg bg-zinc-800/40 px-4 py-2 text-center text-xs text-zinc-400">
            {combo.cookSpec.technique}
          </div>
        </div>
      </div>

      {/* ===== STAT BAR ===== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Target, label: "Protein", value: `${combo.totalPerServing.protein}g`, color: "text-green-400", bg: "border-green-500/20 bg-green-500/5" },
          { icon: Zap, label: "Calories", value: `${combo.totalPerServing.calories}`, color: "text-orange-400", bg: "border-orange-500/20 bg-orange-500/5" },
          { icon: DollarSign, label: "Cost", value: `$${combo.totalCost.toFixed(2)}`, color: "text-yellow-400", bg: "border-yellow-500/20 bg-yellow-500/5" },
          { icon: Clock, label: "Total Time", value: `${combo.totalMinutes}m`, color: "text-blue-400", bg: "border-blue-500/20 bg-blue-500/5" },
        ].map((stat) => (
          <div key={stat.label} className={`flex items-center gap-3 rounded-xl border-2 ${stat.bg} p-3`}>
            <stat.icon className={`h-5 w-5 shrink-0 ${stat.color}`} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
              <div className={`font-mono text-lg font-black ${stat.color}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== COMBO SCORE ===== */}
      <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Combo Score
          </h2>
          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1">
            <span className="font-mono text-lg font-black text-green-400">{overallScore}</span>
            <span className="text-[10px] font-bold text-green-400/60">/10</span>
          </div>
        </div>
        <div className="space-y-3">
          <ScoreBar label="Protein" score={combo.scores.protein} color="bg-green-500" />
          <ScoreBar label="Value" score={combo.scores.value} color="bg-yellow-500" />
          <ScoreBar label="Speed" score={combo.scores.speed} color="bg-blue-500" />
          <ScoreBar label="Ease" score={combo.scores.ease} color="bg-purple-500" />
        </div>
      </div>

      {/* ===== MACRO RINGS ===== */}
      <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Nutrition Breakdown
          </h2>
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
              <span className="text-xs text-zinc-500">{servings === 1 ? "serving" : "servings"}</span>
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
          <MacroRing label="Calories" value={scaled.calories} unit="cal" color="text-orange-400" pct={100} />
          <MacroRing label="Protein" value={scaled.protein} unit="g" color="text-green-400" pct={totalMacroCal > 0 ? (proteinCal / totalMacroCal) * 100 : 0} />
          <MacroRing label="Carbs" value={scaled.carbs} unit="g" color="text-yellow-400" pct={totalMacroCal > 0 ? (carbsCal / totalMacroCal) * 100 : 0} />
          <MacroRing label="Fat" value={scaled.fat} unit="g" color="text-red-400" pct={totalMacroCal > 0 ? (fatCal / totalMacroCal) * 100 : 0} />
        </div>

        {servings > 1 && (
          <div className="mt-4 text-center text-xs text-zinc-600">
            {servings} servings: {scaled.protein}g protein, ${scaled.cost.toFixed(2)} total
          </div>
        )}
      </div>

      {/* ===== QUICK STEPS ===== */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          How to Make It
        </h2>
        {combo.cookSpec.steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border-2 border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
              <span className="font-mono text-sm font-bold text-green-400">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-200">{step}</p>
            </div>
          </div>
        ))}
        {/* Temp & time callout */}
        <div className="flex items-center gap-3 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-4">
          <Clock className="h-5 w-5 text-blue-400" />
          <div className="text-sm text-zinc-300">
            <span className="font-bold text-blue-400">{combo.cookSpec.temp}</span>
            <span className="mx-2 text-zinc-600">•</span>
            <span className="font-mono font-bold">{combo.cookSpec.cookMinutes} min</span>
            <span className="ml-2 text-zinc-500">cook time</span>
          </div>
        </div>
      </div>

      {/* ===== PRO TIPS ===== */}
      {combo.tips.length > 0 && (
        <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Pro Tips
          </h2>
          <ul className="space-y-2">
            {combo.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-400">
                <span className="shrink-0 text-green-500">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ===== COST ANALYSIS ===== */}
      <div className="rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-zinc-900 p-5">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400/70">
          <DollarSign className="h-4 w-4" />
          Cost Breakdown
        </h2>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <div className="text-xs text-zinc-600">{combo.protein.shortName}</div>
            <div className="font-mono text-lg font-black text-zinc-200">
              ${combo.protein.costPerServing.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">{combo.side.shortName}</div>
            <div className="font-mono text-lg font-black text-zinc-200">
              ${combo.side.costPerServing.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">Per Plate</div>
            <div className="font-mono text-lg font-black text-yellow-400">
              ${combo.totalCost.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-600">Per Month (1x/day)</div>
            <div className="font-mono text-lg font-black text-zinc-200">
              ${(combo.totalCost * 30).toFixed(0)}
            </div>
          </div>
        </div>
        {/* Protein per dollar */}
        <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
          <span className="text-xs text-zinc-500">Protein per dollar: </span>
          <span className="font-mono text-sm font-black text-green-400">
            {(combo.totalPerServing.protein / combo.totalCost).toFixed(1)}g/$
          </span>
        </div>
      </div>

      {/* ===== SWAP IT ===== */}
      {(swapProtein.length > 0 || swapSide.length > 0 || swapMethod.length > 0) && (
        <div className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Repeat2 className="h-4 w-4 text-green-400" />
            Swap It
          </h2>

          <div className="space-y-4">
            {/* Swap protein */}
            {swapProtein.length > 0 && (
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  Different Protein
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {swapProtein.map((c) => (
                    <SwapCard key={c.slug} combo={c} label="protein" />
                  ))}
                </div>
              </div>
            )}

            {/* Swap side */}
            {swapSide.length > 0 && (
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  Different Side
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {swapSide.map((c) => (
                    <SwapCard key={c.slug} combo={c} label="side" />
                  ))}
                </div>
              </div>
            )}

            {/* Swap method */}
            {swapMethod.length > 0 && (
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  Different Method
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {swapMethod.map((c) => (
                    <SwapCard key={c.slug} combo={c} label="method" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
