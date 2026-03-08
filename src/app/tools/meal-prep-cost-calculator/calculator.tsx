"use client";

import { useState, useMemo, useCallback } from "react";
import {
  PRESET_INGREDIENTS,
  type MealPrepIngredient,
} from "@/data/meal-prep-ingredients";
import {
  Plus,
  X,
  Trash2,
  ShoppingCart,
  Beef,
  Wheat,
  Carrot,
  Droplets,
  Flame as FlameIcon,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Receipt,
  UtensilsCrossed,
  CalendarDays,
  TrendingDown,
  Pencil,
  Check,
} from "lucide-react";

interface CartItem {
  id: string;
  ingredient: MealPrepIngredient;
  quantity: number;
  customPrice: number | null; // null = use default total price
}

const CATEGORY_CONFIG = {
  protein: { label: "Protein", icon: Beef, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  carb: { label: "Carbs", icon: Wheat, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  vegetable: { label: "Veggies", icon: Carrot, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  fat: { label: "Fats", icon: Droplets, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  seasoning: { label: "Seasoning", icon: FlameIcon, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
};

// Default "Boy Kibble" starter cart
const DEFAULT_CART: { ingredientId: string; quantity: number }[] = [
  { ingredientId: "ground-beef-80-20", quantity: 3 },
  { ingredientId: "white-rice", quantity: 5 },
  { ingredientId: "broccoli", quantity: 2 },
  { ingredientId: "onions", quantity: 1 },
  { ingredientId: "olive-oil", quantity: 1 },
  { ingredientId: "garlic", quantity: 2 },
];

function buildCartItem(ingredientId: string, quantity: number): CartItem | null {
  const ingredient = PRESET_INGREDIENTS.find((i) => i.id === ingredientId);
  if (!ingredient) return null;
  return {
    id: `${ingredientId}-${Date.now()}-${Math.random()}`,
    ingredient,
    quantity,
    customPrice: null,
  };
}

function getItemPrice(item: CartItem): number {
  if (item.customPrice !== null) return item.customPrice;
  return (item.ingredient.defaultPrice / item.ingredient.defaultQuantity) * item.quantity;
}

function getItemGrams(item: CartItem): number {
  return item.quantity * item.ingredient.gramsPerUnit;
}

function getItemMacros(item: CartItem) {
  const grams = getItemGrams(item);
  const ratio = grams / 100;
  return {
    calories: item.ingredient.per100g.calories * ratio,
    protein: item.ingredient.per100g.protein * ratio,
    fat: item.ingredient.per100g.fat * ratio,
    carbs: item.ingredient.per100g.carbs * ratio,
  };
}

export default function MealPrepCostCalculator() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const items: CartItem[] = [];
    for (const def of DEFAULT_CART) {
      const item = buildCartItem(def.ingredientId, def.quantity);
      if (item) items.push(item);
    }
    return items;
  });
  const [mealsPerWeek, setMealsPerWeek] = useState(10);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [addCategory, setAddCategory] = useState<MealPrepIngredient["category"] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  // Totals
  const totals = useMemo(() => {
    let totalCost = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    for (const item of cart) {
      totalCost += getItemPrice(item);
      const macros = getItemMacros(item);
      totalCalories += macros.calories;
      totalProtein += macros.protein;
      totalFat += macros.fat;
      totalCarbs += macros.carbs;
    }

    const costPerMeal = mealsPerWeek > 0 ? totalCost / mealsPerWeek : 0;
    const costPerDay = totalCost / 7;
    const calPerMeal = mealsPerWeek > 0 ? totalCalories / mealsPerWeek : 0;
    const proteinPerMeal = mealsPerWeek > 0 ? totalProtein / mealsPerWeek : 0;
    const fatPerMeal = mealsPerWeek > 0 ? totalFat / mealsPerWeek : 0;
    const carbsPerMeal = mealsPerWeek > 0 ? totalCarbs / mealsPerWeek : 0;

    return {
      totalCost,
      costPerMeal,
      costPerDay,
      totalCalories,
      totalProtein,
      totalFat,
      totalCarbs,
      calPerMeal,
      proteinPerMeal,
      fatPerMeal,
      carbsPerMeal,
    };
  }, [cart, mealsPerWeek]);

  const addIngredient = useCallback((ingredient: MealPrepIngredient) => {
    const item: CartItem = {
      id: `${ingredient.id}-${Date.now()}-${Math.random()}`,
      ingredient,
      quantity: ingredient.defaultQuantity,
      customPrice: null,
    };
    setCart((prev) => [...prev, item]);
    setShowAddMenu(false);
    setAddCategory(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const newQty = Math.max(0.5, i.quantity + delta);
        return { ...i, quantity: newQty, customPrice: null };
      })
    );
  }, []);

  const startEditPrice = (id: string, currentPrice: number) => {
    setEditingId(id);
    setEditPrice(currentPrice.toFixed(2));
  };

  const saveEditPrice = (id: string) => {
    const price = parseFloat(editPrice);
    if (price >= 0) {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, customPrice: price } : i))
      );
    }
    setEditingId(null);
  };

  const resetCart = () => {
    const items: CartItem[] = [];
    for (const def of DEFAULT_CART) {
      const item = buildCartItem(def.ingredientId, def.quantity);
      if (item) items.push(item);
    }
    setCart(items);
  };

  // Ingredients already in cart (by ingredient id)
  const cartIngredientIds = useMemo(
    () => new Set(cart.map((i) => i.ingredient.id)),
    [cart]
  );

  const availableByCategory = useMemo(() => {
    if (!addCategory) return [];
    return PRESET_INGREDIENTS.filter(
      (i) => i.category === addCategory && !cartIngredientIds.has(i.id)
    );
  }, [addCategory, cartIngredientIds]);

  // Group cart by category
  const groupedCart = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    for (const item of cart) {
      const cat = item.ingredient.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return groups;
  }, [cart]);

  return (
    <div className="space-y-6">
      {/* MEALS PER WEEK SELECTOR */}
      <div className="rounded-xl border-2 border-zinc-800 bg-zinc-900/50 p-5">
        <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <CalendarDays className="h-4 w-4 text-blue-400" />
          How many meals from this grocery run?
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={21}
            value={mealsPerWeek}
            onChange={(e) => setMealsPerWeek(parseInt(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-green-500"
          />
          <div className="flex min-w-[80px] items-baseline gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2">
            <span className="font-mono text-xl font-black tabular-nums text-zinc-100">
              {mealsPerWeek}
            </span>
            <span className="text-xs text-zinc-500">meals</span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 to-zinc-900 p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400/70">
            <ShoppingCart className="h-4 w-4" />
            Total Cost
          </div>
          <div className="font-mono text-3xl font-black tabular-nums text-green-400">
            ${totals.totalCost.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-green-400/50">for the week</div>
        </div>

        <div className="rounded-xl border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-zinc-900 p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400/70">
            <UtensilsCrossed className="h-4 w-4" />
            Per Meal
          </div>
          <div className="font-mono text-3xl font-black tabular-nums text-yellow-400">
            ${totals.costPerMeal.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-yellow-400/50">
            {totals.proteinPerMeal.toFixed(0)}g protein per meal
          </div>
        </div>

        <div className="rounded-xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-zinc-900 p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400/70">
            <TrendingDown className="h-4 w-4" />
            Per Day
          </div>
          <div className="font-mono text-3xl font-black tabular-nums text-blue-400">
            ${totals.costPerDay.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-blue-400/50">
            ${(totals.totalCost * 4.33).toFixed(0)}/month
          </div>
        </div>

        <div className="rounded-xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-zinc-900 p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400/70">
            <Receipt className="h-4 w-4" />
            Per Meal Macros
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <span>
              <span className="font-mono font-bold text-orange-400">{totals.calPerMeal.toFixed(0)}</span>
              <span className="text-xs text-zinc-500"> cal</span>
            </span>
            <span>
              <span className="font-mono font-bold text-green-400">{totals.proteinPerMeal.toFixed(0)}g</span>
              <span className="text-xs text-zinc-500"> P</span>
            </span>
            <span>
              <span className="font-mono font-bold text-yellow-400">{totals.carbsPerMeal.toFixed(0)}g</span>
              <span className="text-xs text-zinc-500"> C</span>
            </span>
            <span>
              <span className="font-mono font-bold text-red-400">{totals.fatPerMeal.toFixed(0)}g</span>
              <span className="text-xs text-zinc-500"> F</span>
            </span>
          </div>
        </div>
      </div>

      {/* GROCERY LIST */}
      <div className="overflow-hidden rounded-2xl border-2 border-zinc-800">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
            <ShoppingCart className="h-4 w-4 text-green-400" />
            Grocery List
          </h3>
          <button
            onClick={resetCart}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>

        {/* Cart items grouped by category */}
        {(["protein", "carb", "vegetable", "fat", "seasoning"] as const).map((cat) => {
          const items = groupedCart[cat];
          if (!items || items.length === 0) return null;
          const config = CATEGORY_CONFIG[cat];
          const CatIcon = config.icon;

          return (
            <div key={cat}>
              <div className="flex items-center gap-2 border-b border-zinc-800/40 bg-zinc-900/40 px-4 py-2">
                <CatIcon className={`h-3.5 w-3.5 ${config.color}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
                  {config.label}
                </span>
              </div>
              {items.map((item) => {
                const price = getItemPrice(item);
                const isEditing = editingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="grid min-h-[52px] grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-zinc-800/40 px-4 py-2 transition-colors hover:bg-zinc-900/40"
                  >
                    {/* Name */}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-200">
                        {item.ingredient.name}
                      </div>
                      <div className="text-[10px] text-zinc-600">
                        {item.ingredient.per100g.protein}g protein/100g
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-400 transition-colors hover:text-zinc-200"
                      >
                        -
                      </button>
                      <div className="min-w-[60px] text-center">
                        <span className="font-mono text-sm font-bold tabular-nums text-zinc-200">
                          {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)}
                        </span>
                        <span className="ml-1 text-[10px] text-zinc-600">
                          {item.ingredient.defaultUnit}
                        </span>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-400 transition-colors hover:text-zinc-200"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="min-w-[70px] text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-xs text-zinc-500">$</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEditPrice(item.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="w-16 rounded border border-green-500/40 bg-zinc-900 px-2 py-1 font-mono text-xs font-bold text-zinc-100 outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEditPrice(item.id)}
                            className="cursor-pointer rounded p-1 text-green-400 hover:bg-green-500/10"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditPrice(item.id, price)}
                          className="group/price inline-flex cursor-pointer items-center gap-1"
                        >
                          <span className="font-mono text-sm font-bold tabular-nums text-zinc-300">
                            ${price.toFixed(2)}
                          </span>
                          <Pencil className="h-3 w-3 text-zinc-600 opacity-0 transition-opacity group-hover/price:opacity-100" />
                        </button>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}

        {cart.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-zinc-600">
            Your grocery list is empty. Add ingredients below.
          </div>
        )}

        {/* Total row */}
        {cart.length > 0 && (
          <div className="flex items-center justify-between border-t-2 border-zinc-700 bg-zinc-900/80 px-4 py-3">
            <span className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Total ({cart.length} items)
            </span>
            <span className="font-mono text-xl font-black tabular-nums text-green-400">
              ${totals.totalCost.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* ADD INGREDIENT */}
      <div>
        {showAddMenu ? (
          <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
                <Plus className="h-4 w-4 text-green-400" />
                Add Ingredient
              </h3>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  setAddCategory(null);
                }}
                className="cursor-pointer rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Category selector */}
            <div className="mb-4 flex flex-wrap gap-2">
              {(Object.entries(CATEGORY_CONFIG) as [MealPrepIngredient["category"], typeof CATEGORY_CONFIG.protein][]).map(
                ([key, config]) => {
                  const Icon = config.icon;
                  const isActive = addCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setAddCategory(isActive ? null : key)}
                      className={`flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "border-green-500/40 bg-green-500/10 text-green-400"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </button>
                  );
                }
              )}
            </div>

            {/* Ingredient list */}
            {addCategory && (
              <div className="space-y-1">
                {availableByCategory.length === 0 ? (
                  <p className="py-4 text-center text-sm text-zinc-600">
                    All {CATEGORY_CONFIG[addCategory].label.toLowerCase()} ingredients are already in your list.
                  </p>
                ) : (
                  availableByCategory.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => addIngredient(ingredient)}
                      className="flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-800 px-4 py-2 text-left transition-colors hover:border-green-500/30 hover:bg-green-500/5"
                    >
                      <div>
                        <span className="text-sm font-semibold text-zinc-200">
                          {ingredient.name}
                        </span>
                        <span className="ml-2 text-xs text-zinc-600">
                          {ingredient.per100g.protein}g protein/100g
                        </span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500">
                        ${ingredient.defaultPrice.toFixed(2)}/{ingredient.defaultQuantity} {ingredient.defaultUnit}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}

            {!addCategory && (
              <p className="py-4 text-center text-sm text-zinc-600">
                Pick a category above to see available ingredients.
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAddMenu(true)}
            className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 text-sm font-semibold text-zinc-500 transition-all hover:border-zinc-600 hover:text-zinc-300"
          >
            <Plus className="h-4 w-4" />
            Add Ingredient
          </button>
        )}
      </div>

      {/* MACRO BREAKDOWN */}
      {cart.length > 0 && (
        <section className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-300">
            Weekly Totals Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs text-zinc-600">Total Calories</div>
              <div className="font-mono text-lg font-bold text-orange-400">
                {totals.totalCalories.toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-600">Total Protein</div>
              <div className="font-mono text-lg font-bold text-green-400">
                {totals.totalProtein.toFixed(0)}g
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-600">Total Carbs</div>
              <div className="font-mono text-lg font-bold text-yellow-400">
                {totals.totalCarbs.toFixed(0)}g
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-600">Total Fat</div>
              <div className="font-mono text-lg font-bold text-red-400">
                {totals.totalFat.toFixed(0)}g
              </div>
            </div>
          </div>

          {/* Cost efficiency */}
          <div className="mt-4 border-t border-zinc-800 pt-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <div className="text-xs text-zinc-600">Protein per $1</div>
                <div className="font-mono text-lg font-bold text-green-400">
                  {totals.totalCost > 0
                    ? (totals.totalProtein / totals.totalCost).toFixed(1)
                    : "0"}
                  g
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-600">Calories per $1</div>
                <div className="font-mono text-lg font-bold text-orange-400">
                  {totals.totalCost > 0
                    ? (totals.totalCalories / totals.totalCost).toFixed(0)
                    : "0"}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-600">Cost per 40g protein</div>
                <div className="font-mono text-lg font-bold text-yellow-400">
                  $
                  {totals.totalProtein > 0
                    ? ((totals.totalCost / totals.totalProtein) * 40).toFixed(2)
                    : "0.00"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-300">
          How It Works
        </h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>
            <strong className="text-zinc-200">1. Build your grocery list</strong>{" "}
            — Start with the default Boy Kibble cart or customize with your own ingredients.
          </p>
          <p>
            <strong className="text-zinc-200">2. Adjust quantities & prices</strong>{" "}
            — Use +/- to change amounts. Click any price to edit it to match your local store.
          </p>
          <p>
            <strong className="text-zinc-200">3. Set your meal count</strong>{" "}
            — Tell us how many meals you&apos;ll make from these groceries to get per-meal cost.
          </p>
          <p className="text-xs text-zinc-600">
            Nutrition data from USDA FoodData Central. Prices are US national
            averages (March 2026). Macros are approximate — actual values depend on
            cooking method and portion sizes.
          </p>
        </div>
      </section>
    </div>
  );
}
