"use client";

import { useState, useEffect, useCallback } from "react";
import { PROTEIN_SOURCES } from "@/data/protein-sources";
import { Dumbbell, Target } from "lucide-react";

// Pick 6 diverse sources
const SHOWCASE_IDS = [
  "chicken-breast",
  "ground-beef-80-20",
  "eggs",
  "canned-tuna",
  "whey-protein",
  "greek-yogurt",
];

const SOURCES = SHOWCASE_IDS
  .map((id) => PROTEIN_SOURCES.find((s) => s.id === id)!)
  .filter(Boolean);

const MACRO_MAX = { protein: 75, fat: 55, carbs: 25 }; // scale bars against max values

function MacroRing({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, (value / maxValue) * 100);
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative h-[100px] w-[100px]">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-zinc-800"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-green-400"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-black tabular-nums text-green-400">
          {value}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
          g/100g
        </span>
      </div>
    </div>
  );
}

function MacroBar({
  label,
  value,
  maxValue,
  color,
  unit = "g",
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  unit?: string;
}) {
  const pct = Math.min(100, (value / maxValue) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-right text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${pct}%`,
            transition: "width 0.8s ease",
          }}
        />
      </div>
      <span className="w-10 font-mono text-xs font-bold tabular-nums text-zinc-400">
        {value}{unit}
      </span>
    </div>
  );
}

export default function HeroProteinTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SOURCES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const source = SOURCES[activeIndex];
  const proteinPerDollar =
    (source.per100g.protein / 100) *
    (source.defaultPricePer.gramsPerUnit / source.defaultPricePer.amount);

  return (
    <div
      className="hero-float rounded-2xl border-2 border-green-500/20 bg-zinc-900/80 p-5 backdrop-blur-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/10">
          <Target className="h-3.5 w-3.5 text-green-400" />
        </div>
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
          Protein Tracker
        </span>
        <div className="ml-auto flex h-5 items-center rounded-full bg-zinc-800 px-2">
          <span className="font-mono text-[9px] font-bold text-zinc-500">
            LIVE
          </span>
          <span className="ml-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
        </div>
      </div>

      {/* Active Source */}
      <div
        key={activeIndex}
        className="animate-in fade-in"
        style={{ animationDuration: "0.4s" }}
      >
        <div className="mb-4 flex items-center gap-4">
          <MacroRing
            value={source.per100g.protein}
            maxValue={75}
          />
          <div className="flex-1">
            <h3 className="mb-1 font-heading text-base font-bold uppercase leading-tight text-zinc-100">
              {source.name}
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono text-orange-400">
                {source.per100g.calories} cal
              </span>
              <span className="font-mono text-yellow-400">
                ${source.defaultPricePer.amount}/{source.defaultPricePer.unit}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5">
              <Dumbbell className="h-3 w-3 text-green-400" />
              <span className="font-mono text-[10px] font-bold text-green-400">
                {proteinPerDollar.toFixed(1)}g protein/$
              </span>
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="space-y-2">
          <MacroBar
            label="Protein"
            value={source.per100g.protein}
            maxValue={MACRO_MAX.protein}
            color="bg-green-500"
          />
          <MacroBar
            label="Fat"
            value={source.per100g.fat}
            maxValue={MACRO_MAX.fat}
            color="bg-red-500/60"
          />
          <MacroBar
            label="Carbs"
            value={source.per100g.carbs}
            maxValue={MACRO_MAX.carbs}
            color="bg-yellow-500/60"
          />
        </div>
      </div>

      {/* Dot navigation */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {SOURCES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-4 bg-green-500"
                : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
