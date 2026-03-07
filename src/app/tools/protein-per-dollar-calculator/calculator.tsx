"use client";

import { useState, useMemo, useCallback } from "react";
import {
  PROTEIN_SOURCES,
  type ProteinSource,
} from "@/data/protein-sources";
import {
  Trophy,
  DollarSign,
  Pencil,
  Trash2,
  Plus,
  X,
  Crown,
  Medal,
  Award,
  Beef,
  Egg,
  Fish,
  Leaf,
  FlaskConical,
  Filter,
  Scissors,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

type Category = "all" | ProteinSource["category"];

interface EditableSource {
  source: ProteinSource;
  customPrice: number | null; // null = use default
}

const CATEGORY_CONFIG: Record<
  Category,
  { label: string; icon: typeof Beef; color: string }
> = {
  all: { label: "All", icon: Filter, color: "text-zinc-300" },
  meat: { label: "Meat", icon: Beef, color: "text-red-400" },
  dairy: { label: "Dairy", icon: Egg, color: "text-yellow-400" },
  seafood: { label: "Seafood", icon: Fish, color: "text-blue-400" },
  plant: { label: "Plant", icon: Leaf, color: "text-green-400" },
  supplement: { label: "Supps", icon: FlaskConical, color: "text-purple-400" },
};

function calcProteinPerDollar(source: ProteinSource, customPrice: number | null): number {
  const price = customPrice ?? source.defaultPricePer.amount;
  if (price <= 0) return 0;
  const gramsFood = source.defaultPricePer.gramsPerUnit;
  const proteinInUnit = (source.per100g.protein / 100) * gramsFood;
  return proteinInUnit / price;
}

function calcFatPerProtein(source: ProteinSource): number {
  if (source.per100g.protein <= 0) return Infinity;
  return source.per100g.fat / source.per100g.protein;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 ring-2 ring-yellow-500/40">
        <Crown className="h-4 w-4 text-yellow-400" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400/10 ring-2 ring-zinc-400/30">
        <Medal className="h-4 w-4 text-zinc-300" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700/20 ring-2 ring-amber-700/40">
        <Award className="h-4 w-4 text-amber-600" />
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
      <span className="font-mono text-xs font-bold text-zinc-500">{rank}</span>
    </div>
  );
}

function ProteinBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ProteinPerDollarCalculator() {
  const [items, setItems] = useState<EditableSource[]>(
    PROTEIN_SOURCES.map((s) => ({ source: s, customPrice: null }))
  );
  const [category, setCategory] = useState<Category>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProtein, setNewProtein] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newCategory, setNewCategory] = useState<ProteinSource["category"]>("meat");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const filtered =
      category === "all"
        ? items
        : items.filter((i) => i.source.category === category);
    return [...filtered].sort(
      (a, b) =>
        calcProteinPerDollar(b.source, b.customPrice) -
        calcProteinPerDollar(a.source, a.customPrice)
    );
  }, [items, category]);

  const maxGpd = useMemo(
    () => Math.max(...sorted.map((i) => calcProteinPerDollar(i.source, i.customPrice)), 1),
    [sorted]
  );

  // Best value overall
  const bestValue = useMemo(() => {
    const all = [...items].sort(
      (a, b) =>
        calcProteinPerDollar(b.source, b.customPrice) -
        calcProteinPerDollar(a.source, a.customPrice)
    );
    return all[0];
  }, [items]);

  // Best for cutting (highest protein, lowest fat ratio per dollar)
  const bestCut = useMemo(() => {
    const scored = items.map((i) => ({
      item: i,
      score:
        calcProteinPerDollar(i.source, i.customPrice) /
        (calcFatPerProtein(i.source) + 0.1), // +0.1 to avoid div by zero
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.item;
  }, [items]);

  const startEdit = (id: string, currentPrice: number) => {
    setEditingId(id);
    setEditPrice(currentPrice.toFixed(2));
  };

  const saveEdit = (id: string) => {
    const price = parseFloat(editPrice);
    if (price > 0) {
      setItems((prev) =>
        prev.map((i) =>
          i.source.id === id ? { ...i, customPrice: price } : i
        )
      );
    }
    setEditingId(null);
  };

  const resetPrice = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.source.id === id ? { ...i, customPrice: null } : i))
    );
    setEditingId(null);
  };

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.source.id !== id));
  }, []);

  const addCustomItem = () => {
    const protein = parseFloat(newProtein);
    const price = parseFloat(newPrice);
    const weight = parseFloat(newWeight);
    if (!newName || !protein || !price || !weight) return;

    const newSource: ProteinSource = {
      id: `custom-${Date.now()}`,
      name: newName,
      category: newCategory,
      per100g: { calories: 0, protein, fat: 0, carbs: 0 },
      defaultPricePer: {
        amount: price,
        unit: newUnit || "unit",
        gramsPerUnit: weight,
      },
    };
    setItems((prev) => [...prev, { source: newSource, customPrice: null }]);
    setNewName("");
    setNewProtein("");
    setNewPrice("");
    setNewWeight("");
    setNewUnit("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid gap-3 sm:grid-cols-2">
        {bestValue && (
          <div className="rounded-xl border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-zinc-900 p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400/70">
              <Trophy className="h-4 w-4" />
              Best Value
            </div>
            <div className="font-heading text-xl font-bold uppercase text-yellow-400">
              {bestValue.source.name}
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-2xl font-black tabular-nums text-yellow-400">
                {calcProteinPerDollar(bestValue.source, bestValue.customPrice).toFixed(1)}g
              </span>
              <span className="text-sm text-yellow-400/60">protein per $1</span>
            </div>
          </div>
        )}
        {bestCut && (
          <div className="rounded-xl border-2 border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-zinc-900 p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400/70">
              <Scissors className="h-4 w-4" />
              Best for Cutting
            </div>
            <div className="font-heading text-xl font-bold uppercase text-cyan-400">
              {bestCut.source.name}
            </div>
            <div className="mt-1 text-sm text-cyan-400/60">
              <span className="font-mono font-bold text-cyan-400">
                {bestCut.source.per100g.protein}g protein
              </span>
              {" / "}
              <span className="font-mono font-bold text-cyan-400">
                {bestCut.source.per100g.fat}g fat
              </span>
              {" per 100g"}
            </div>
          </div>
        )}
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORY_CONFIG) as [Category, typeof CATEGORY_CONFIG.all][]).map(
          ([key, config]) => {
            const Icon = config.icon;
            const isActive = category === key;
            return (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "border-green-500/40 bg-green-500/10 text-green-400"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {config.label}
                {key !== "all" && (
                  <span className="ml-0.5 text-[10px] opacity-60">
                    {items.filter((i) => i.source.category === key).length}
                  </span>
                )}
              </button>
            );
          }
        )}
      </div>

      {/* LEADERBOARD */}
      <div className="overflow-hidden rounded-2xl border-2 border-zinc-800">
        {/* Header */}
        <div className="grid grid-cols-[40px_1fr_100px_100px] items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 sm:grid-cols-[40px_1fr_120px_120px_48px]">
          <span className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            #
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            Source
          </span>
          <span className="text-right text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            Price
          </span>
          <span className="text-right text-[10px] font-bold uppercase tracking-widest text-green-500/60">
            g / $1
          </span>
          <span className="hidden sm:block" />
        </div>

        {/* Rows */}
        <div>
          {sorted.map((item, idx) => {
            const rank = idx + 1;
            const gpd = calcProteinPerDollar(item.source, item.customPrice);
            const price = item.customPrice ?? item.source.defaultPricePer.amount;
            const isEditing = editingId === item.source.id;
            const isExpanded = expandedId === item.source.id;
            const catConfig = CATEGORY_CONFIG[item.source.category];
            const CatIcon = catConfig.icon;

            return (
              <div
                key={item.source.id}
                className={`border-b border-zinc-800/60 transition-colors ${
                  rank === 1
                    ? "bg-yellow-500/[0.03]"
                    : rank === 2
                      ? "bg-zinc-400/[0.02]"
                      : rank === 3
                        ? "bg-amber-700/[0.02]"
                        : "hover:bg-zinc-900/40"
                }`}
              >
                {/* Main row */}
                <div
                  className="grid min-h-[56px] cursor-pointer grid-cols-[40px_1fr_100px_100px] items-center gap-2 px-4 sm:grid-cols-[40px_1fr_120px_120px_48px]"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : item.source.id)
                  }
                >
                  <div className="flex justify-center">
                    <RankBadge rank={rank} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <CatIcon
                        className={`hidden h-3.5 w-3.5 shrink-0 sm:block ${catConfig.color}`}
                      />
                      <span className="truncate text-sm font-semibold text-zinc-200">
                        {item.source.name}
                      </span>
                      {item.customPrice !== null && (
                        <span className="shrink-0 rounded bg-blue-500/10 px-1 py-0.5 text-[9px] font-bold uppercase text-blue-400">
                          Custom
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 hidden sm:block">
                      <ProteinBar value={gpd} max={maxGpd} />
                    </div>
                  </div>

                  <div className="text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs text-zinc-500">$</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(item.source.id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          className="w-16 rounded border border-green-500/40 bg-zinc-900 px-2 py-1 font-mono text-xs font-bold text-zinc-100 outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(item.source.id)}
                          className="cursor-pointer rounded p-1 text-green-400 hover:bg-green-500/10"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(item.source.id, price);
                        }}
                        className="group/price inline-flex cursor-pointer items-center gap-1"
                      >
                        <span className="font-mono text-sm font-bold tabular-nums text-zinc-300">
                          ${price.toFixed(2)}
                        </span>
                        <Pencil className="h-3 w-3 text-zinc-600 opacity-0 transition-opacity group-hover/price:opacity-100" />
                      </button>
                    )}
                    <div className="text-[10px] text-zinc-600">
                      /{item.source.defaultPricePer.unit}
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono text-lg font-black tabular-nums ${
                        rank === 1
                          ? "text-yellow-400"
                          : rank <= 3
                            ? "text-green-400"
                            : "text-zinc-200"
                      }`}
                    >
                      {gpd.toFixed(1)}
                    </span>
                    <span className="ml-0.5 text-[10px] text-zinc-600">
                      g/$
                    </span>
                  </div>

                  <div className="hidden sm:flex sm:justify-center">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-zinc-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-zinc-600" />
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-zinc-800/40 bg-zinc-900/30 px-4 py-3">
                    <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                      <div>
                        <div className="text-zinc-600">Protein/100g</div>
                        <div className="font-mono font-bold text-green-400">
                          {item.source.per100g.protein}g
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-600">Fat/100g</div>
                        <div className="font-mono font-bold text-zinc-300">
                          {item.source.per100g.fat}g
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-600">Calories/100g</div>
                        <div className="font-mono font-bold text-zinc-300">
                          {item.source.per100g.calories}
                        </div>
                      </div>
                      <div>
                        <div className="text-zinc-600">Cal per $1</div>
                        <div className="font-mono font-bold text-zinc-300">
                          {(
                            (item.source.per100g.calories / 100) *
                            item.source.defaultPricePer.gramsPerUnit /
                            price
                          ).toFixed(0)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {item.customPrice !== null && (
                        <button
                          onClick={() => resetPrice(item.source.id)}
                          className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
                        >
                          Reset Price
                        </button>
                      )}
                      <button
                        onClick={() => removeItem(item.source.id)}
                        className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <Trash2 className="mr-1 inline h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-zinc-600">
            No items in this category. Try adding one below.
          </div>
        )}
      </div>

      {/* ADD CUSTOM ITEM */}
      <div>
        {showAddForm ? (
          <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
                <Plus className="h-4 w-4 text-green-400" />
                Add Custom Protein Source
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="cursor-pointer rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Turkey Breast"
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as ProteinSource["category"])
                  }
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-green-500"
                >
                  <option value="meat">Meat</option>
                  <option value="dairy">Dairy</option>
                  <option value="seafood">Seafood</option>
                  <option value="plant">Plant</option>
                  <option value="supplement">Supplement</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Protein per 100g
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={newProtein}
                  onChange={(e) => setNewProtein(e.target.value)}
                  placeholder="e.g. 29"
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Price ($)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 4.99"
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Weight per package (grams)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="e.g. 453.6 (1 lb)"
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 font-mono text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Unit label
                </label>
                <input
                  type="text"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="e.g. lb, can, tub"
                  className="min-h-[48px] w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-green-500"
                />
              </div>
            </div>
            <button
              onClick={addCustomItem}
              className="mt-4 min-h-[48px] cursor-pointer rounded-xl bg-green-500 px-6 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400"
            >
              Add to Ranking
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 text-sm font-semibold text-zinc-500 transition-all hover:border-zinc-600 hover:text-zinc-300"
          >
            <Plus className="h-4 w-4" />
            Add Custom Protein Source
          </button>
        )}
      </div>

      {/* HOW IT WORKS */}
      <section className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
          <TrendingUp className="h-4 w-4 text-green-400" />
          How We Calculate
        </h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>
            <strong className="text-zinc-200">Protein per Dollar</strong> ={" "}
            <span className="font-mono text-green-400">
              (protein per 100g &times; grams per unit &divide; 100) &divide; price
            </span>
          </p>
          <p>
            Higher number = more protein for your money. Edit any price to match
            your local grocery store — the ranking updates instantly.
          </p>
          <p className="text-xs text-zinc-600">
            All nutrition data from USDA FoodData Central. Cooked values where
            applicable. Prices are US national averages (March 2026).
          </p>
        </div>
      </section>
    </div>
  );
}
