"use client";

import { useState, useMemo } from "react";
import { BEEF_GRADES, type BeefGrade } from "@/data/ground-beef";
import {
  Beef,
  Scale,
  DollarSign,
  Flame,
  Dumbbell,
  Droplets,
  ChevronDown,
  Zap,
  ArrowUpDown,
} from "lucide-react";

const GRAMS_PER_OZ = 28.3495;
const GRAMS_PER_LB = 453.592;

function MacroRing({
  value,
  max,
  label,
  unit,
  color,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
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
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold tabular-nums tracking-tight">
            {value.toFixed(1)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">
            {unit}
          </span>
        </div>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
    </div>
  );
}

function GradeButton({
  grade,
  selected,
  onClick,
}: {
  grade: BeefGrade;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative min-h-[48px] min-w-[48px] cursor-pointer rounded-lg border-2 px-3 py-2 font-mono text-sm font-bold transition-all duration-200 ${
        selected
          ? "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
          : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
      }`}
    >
      <span className="block text-base">{grade.label}</span>
      <span
        className={`block text-[10px] ${selected ? "text-green-500/70" : "text-zinc-600"}`}
      >
        lean/fat
      </span>
      {selected && (
        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      )}
    </button>
  );
}

function MicroNutrient({
  label,
  value,
  unit,
  dailyPct,
}: {
  label: string;
  value: number;
  unit: string;
  dailyPct: number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800/60 py-2.5 last:border-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-semibold tabular-nums">
          {value.toFixed(1)}
          {unit}
        </span>
        <span className="min-w-[48px] rounded bg-zinc-800 px-2 py-0.5 text-right font-mono text-xs text-zinc-500">
          {dailyPct.toFixed(0)}% DV
        </span>
      </div>
    </div>
  );
}

export default function GroundBeefCalculator() {
  const [selectedIdx, setSelectedIdx] = useState(2); // default 80/20
  const [servingInput, setServingInput] = useState("170");
  const [unit, setUnit] = useState<"g" | "oz">("g");
  const [priceInput, setPriceInput] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  const grade = BEEF_GRADES[selectedIdx];

  const servingGrams = useMemo(() => {
    const val = parseFloat(servingInput) || 0;
    return unit === "oz" ? val * GRAMS_PER_OZ : val;
  }, [servingInput, unit]);

  const macros = useMemo(() => {
    const factor = servingGrams / 100;
    const d = grade.per100g;
    return {
      calories: d.calories * factor,
      protein: d.protein * factor,
      fat: d.fat * factor,
      saturatedFat: d.saturatedFat * factor,
      cholesterol: d.cholesterol * factor,
      iron: d.iron * factor,
      zinc: d.zinc * factor,
      b12: d.b12 * factor,
    };
  }, [grade, servingGrams]);

  const pricePerLb = parseFloat(priceInput) || 0;
  const costPerServing =
    pricePerLb > 0 ? (pricePerLb / GRAMS_PER_LB) * servingGrams : 0;
  const proteinPerDollar =
    costPerServing > 0 ? macros.protein / costPerServing : 0;

  const toggleUnit = () => {
    if (unit === "g") {
      setServingInput((parseFloat(servingInput) / GRAMS_PER_OZ).toFixed(1));
      setUnit("oz");
    } else {
      setServingInput((parseFloat(servingInput) * GRAMS_PER_OZ).toFixed(0));
      setUnit("g");
    }
  };

  return (
    <div className="space-y-8">
      {/* GRADE SELECTOR */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Beef className="h-5 w-5 text-red-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-300">
            Select Your Grind
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {BEEF_GRADES.map((g, i) => (
            <GradeButton
              key={g.label}
              grade={g}
              selected={i === selectedIdx}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          {grade.label} = {grade.leanPct}% lean meat, {grade.fatPct}% fat.{" "}
          {grade.leanPct >= 90
            ? "Ultra lean. Maximum protein density."
            : grade.leanPct >= 85
              ? "Solid lean pick. Great protein-to-fat ratio."
              : grade.leanPct >= 80
                ? "The classic. Best balance of flavor and macros."
                : "Budget-friendly but higher fat. Drain the grease."}
        </p>
      </section>

      {/* SERVING SIZE + PRICE */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
            <Scale className="h-4 w-4 text-blue-400" />
            Serving Size
          </label>
          <div className="flex">
            <input
              type="number"
              inputMode="decimal"
              value={servingInput}
              onChange={(e) => setServingInput(e.target.value)}
              className="min-h-[48px] w-full rounded-l-lg border-2 border-r-0 border-zinc-700 bg-zinc-900 px-4 font-mono text-lg font-bold text-zinc-100 outline-none transition-colors focus:border-green-500"
              placeholder={unit === "g" ? "170" : "6.0"}
            />
            <button
              onClick={toggleUnit}
              className="flex min-h-[48px] min-w-[64px] cursor-pointer items-center justify-center gap-1 rounded-r-lg border-2 border-zinc-700 bg-zinc-800 px-3 font-mono text-sm font-bold text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              <ArrowUpDown className="h-3 w-3" />
              {unit}
            </button>
          </div>
          <p className="mt-1 text-xs text-zinc-600">
            {unit === "g"
              ? `${(servingGrams / GRAMS_PER_OZ).toFixed(1)} oz`
              : `${servingGrams.toFixed(0)} g`}{" "}
            — typical serving is 170g (6oz)
          </p>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
            <DollarSign className="h-4 w-4 text-yellow-400" />
            Price per Pound
            <span className="text-xs font-normal normal-case text-zinc-600">
              (optional)
            </span>
          </label>
          <div className="flex">
            <span className="flex min-h-[48px] items-center rounded-l-lg border-2 border-r-0 border-zinc-700 bg-zinc-800 px-3 font-mono text-zinc-500">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="min-h-[48px] w-full rounded-r-lg border-2 border-zinc-700 bg-zinc-900 px-4 font-mono text-lg font-bold text-zinc-100 outline-none transition-colors focus:border-green-500"
              placeholder="5.99"
            />
          </div>
          <p className="mt-1 text-xs text-zinc-600">
            US average: 80/20 ~$5.49/lb, 93/7 ~$7.29/lb
          </p>
        </div>
      </section>

      {/* MACRO RESULTS — THE HERO */}
      <section className="overflow-hidden rounded-2xl border-2 border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
        {/* Calorie header bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-orange-400" />
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Calories
              </div>
              <div className="font-mono text-3xl font-black tabular-nums tracking-tight text-zinc-100">
                {macros.calories.toFixed(0)}
                <span className="ml-1 text-base font-semibold text-zinc-500">
                  kcal
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              {grade.label} ground beef
            </div>
            <div className="font-mono text-sm text-zinc-500">
              {servingGrams.toFixed(0)}g serving
            </div>
          </div>
        </div>

        {/* Macro rings */}
        <div className="grid grid-cols-3 gap-2 px-6 py-6">
          <MacroRing
            value={macros.protein}
            max={60}
            label="Protein"
            unit="g"
            color="#22c55e"
          />
          <MacroRing
            value={macros.fat}
            max={50}
            label="Total Fat"
            unit="g"
            color="#f97316"
          />
          <MacroRing
            value={macros.saturatedFat}
            max={20}
            label="Sat. Fat"
            unit="g"
            color="#ef4444"
          />
        </div>

        {/* Protein highlight bar */}
        <div className="mx-6 mb-4 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
          <Dumbbell className="h-5 w-5 shrink-0 text-green-400" />
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-widest text-green-400/70">
              Protein per serving
            </div>
            <div className="font-mono text-2xl font-black tabular-nums text-green-400">
              {macros.protein.toFixed(1)}g
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm text-zinc-500">
              {((macros.protein * 4 * 100) / (macros.calories || 1)).toFixed(0)}%
              of cal
            </div>
            <div className="text-xs text-zinc-600">from protein</div>
          </div>
        </div>

        {/* Cost section (conditional) */}
        {pricePerLb > 0 && (
          <div className="mx-6 mb-4 flex items-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
            <DollarSign className="h-5 w-5 shrink-0 text-yellow-400" />
            <div className="grid flex-1 grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-yellow-400/70">
                  Cost / Serving
                </div>
                <div className="font-mono text-xl font-black tabular-nums text-yellow-400">
                  ${costPerServing.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-yellow-400/70">
                  Protein / Dollar
                </div>
                <div className="font-mono text-xl font-black tabular-nums text-yellow-400">
                  {proteinPerDollar.toFixed(1)}g/$
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Micronutrients */}
        <div className="border-t border-zinc-800 px-6 py-4">
          <div className="mb-2 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Micronutrients
            </span>
          </div>
          <MicroNutrient
            label="Cholesterol"
            value={macros.cholesterol}
            unit="mg"
            dailyPct={(macros.cholesterol / 300) * 100}
          />
          <MicroNutrient
            label="Iron"
            value={macros.iron}
            unit="mg"
            dailyPct={(macros.iron / 18) * 100}
          />
          <MicroNutrient
            label="Zinc"
            value={macros.zinc}
            unit="mg"
            dailyPct={(macros.zinc / 11) * 100}
          />
          <MicroNutrient
            label="Vitamin B12"
            value={macros.b12}
            unit="mcg"
            dailyPct={(macros.b12 / 2.4) * 100}
          />
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex min-h-[48px] w-full cursor-pointer items-center justify-between rounded-xl border-2 border-zinc-800 bg-zinc-900 px-5 py-3 transition-colors hover:border-zinc-700"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-300">
            Compare All Grades
          </span>
          <ChevronDown
            className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${showComparison ? "rotate-180" : ""}`}
          />
        </button>

        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border-2 border-zinc-800">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Cal
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-green-500/70">
                    Protein
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Fat
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Sat. Fat
                  </th>
                  {pricePerLb > 0 && (
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-yellow-500/70">
                      $/Serving
                    </th>
                  )}
                  {pricePerLb > 0 && (
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-yellow-500/70">
                      g/$
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {BEEF_GRADES.map((g, i) => {
                  const f = servingGrams / 100;
                  const cost =
                    pricePerLb > 0
                      ? (pricePerLb / GRAMS_PER_LB) * servingGrams
                      : 0;
                  const gpd = cost > 0 ? (g.per100g.protein * f) / cost : 0;
                  return (
                    <tr
                      key={g.label}
                      className={`border-b border-zinc-800/60 transition-colors ${
                        i === selectedIdx
                          ? "bg-green-500/5"
                          : "hover:bg-zinc-900/50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono font-bold ${i === selectedIdx ? "text-green-400" : "text-zinc-300"}`}
                        >
                          {g.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-zinc-400">
                        {(g.per100g.calories * f).toFixed(0)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums text-green-400">
                        {(g.per100g.protein * f).toFixed(1)}g
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-zinc-400">
                        {(g.per100g.fat * f).toFixed(1)}g
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-zinc-400">
                        {(g.per100g.saturatedFat * f).toFixed(1)}g
                      </td>
                      {pricePerLb > 0 && (
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-yellow-400">
                          ${cost.toFixed(2)}
                        </td>
                      )}
                      {pricePerLb > 0 && (
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-yellow-400">
                          {gpd.toFixed(1)}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* QUICK TIPS */}
      <section className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
          <Zap className="h-4 w-4 text-yellow-400" />
          Bro Tips
        </h2>
        <div className="grid gap-4 text-sm text-zinc-400 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-1 font-bold text-zinc-200">
              Bulking? Go 80/20.
            </div>
            Best flavor-to-macro ratio. More calories from fat means easier
            surplus. Cheapest per pound too.
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-1 font-bold text-zinc-200">
              Cutting? Go 93/7 or 96/4.
            </div>
            Maximum protein density, minimum fat. Yes it&apos;s dry — add salsa,
            not butter.
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-1 font-bold text-zinc-200">
              Drain the fat. Seriously.
            </div>
            Draining 80/20 beef removes ~45% of the fat. That 272 cal drops
            closer to 215. Free cut.
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-1 font-bold text-zinc-200">
              Weigh it cooked, not raw.
            </div>
            Beef loses ~25% weight when cooked. 170g raw ≈ 128g cooked. Our
            data is for cooked beef.
          </div>
        </div>
      </section>
    </div>
  );
}
