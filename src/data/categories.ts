// Recipe category pages — group recipes + combos by protein source
import { RECIPES } from "./recipes";
import { COMBOS, type Combo } from "./combos";

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string; // tailwind color name (green, red, yellow, etc.)
  // Matching logic
  recipeTagMatch: string[]; // match recipe tags containing these strings
  comboProteinMatch: string[]; // match combo protein IDs
  // SEO
  targetKeyword: string;
  seoKeywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "ground-beef",
    name: "Ground Beef",
    emoji: "🥩",
    tagline: "The OG Boy Kibble protein. Cheap, fast, 26g protein per 100g.",
    description: "Every ground beef recipe and combo on ProteinBro — with macros, cost, and cook time. From classic beef & rice to Korean bowls and taco bowls.",
    color: "red",
    recipeTagMatch: ["ground beef"],
    comboProteinMatch: ["ground-beef"],
    targetKeyword: "ground beef recipes high protein",
    seoKeywords: ["ground beef recipes", "ground beef meal prep", "high protein ground beef", "cheap ground beef meals", "ground beef and rice"],
  },
  {
    slug: "chicken",
    name: "Chicken",
    emoji: "🍗",
    tagline: "Breast for cutting, thighs for flavor. The gym bro staple.",
    description: "Chicken breast and chicken thigh recipes — air fryer, baked, grilled, sheet pan. Every method, every side, all with macros.",
    color: "orange",
    recipeTagMatch: ["chicken"],
    comboProteinMatch: ["chicken-breast", "chicken-thighs"],
    targetKeyword: "high protein chicken recipes",
    seoKeywords: ["chicken meal prep", "high protein chicken recipes", "chicken breast recipes", "chicken thigh recipes", "air fryer chicken"],
  },
  {
    slug: "turkey",
    name: "Turkey",
    emoji: "🦃",
    tagline: "Leaner than beef. 93/7 ground turkey is the clean bulk move.",
    description: "Ground turkey recipes and combos — meatballs, bowls, sheet pan meals. All the flavor with less fat.",
    color: "amber",
    recipeTagMatch: ["turkey"],
    comboProteinMatch: ["ground-turkey"],
    targetKeyword: "ground turkey recipes high protein",
    seoKeywords: ["ground turkey recipes", "ground turkey meal prep", "lean turkey meals", "turkey meatballs", "healthy turkey recipes"],
  },
  {
    slug: "salmon",
    name: "Salmon",
    emoji: "🐟",
    tagline: "Omega-3s + 40g protein. The smart bro's protein source.",
    description: "Salmon recipes — air fryer, baked, cast iron, grilled. High protein, healthy fats, ready in under 15 minutes.",
    color: "pink",
    recipeTagMatch: ["salmon"],
    comboProteinMatch: ["salmon"],
    targetKeyword: "salmon recipes high protein",
    seoKeywords: ["salmon recipes", "salmon meal prep", "easy salmon recipes", "air fryer salmon", "salmon and rice"],
  },
  {
    slug: "shrimp",
    name: "Shrimp",
    emoji: "🦐",
    tagline: "41g protein per serving with almost zero fat. The leanest option.",
    description: "Shrimp recipes — garlic butter, air fryer, grilled skewers. Fast cooking, high protein, restaurant quality at home.",
    color: "rose",
    recipeTagMatch: ["shrimp"],
    comboProteinMatch: ["shrimp"],
    targetKeyword: "high protein shrimp recipes",
    seoKeywords: ["shrimp recipes", "garlic butter shrimp", "air fryer shrimp", "shrimp meal prep", "easy shrimp recipes"],
  },
  {
    slug: "pork",
    name: "Pork",
    emoji: "🥩",
    tagline: "Underrated and underpriced. $2-3/lb with 25g protein per 100g.",
    description: "Pork chop recipes — air fryer, cast iron, grilled, baked. The most underrated protein source in the grocery store.",
    color: "fuchsia",
    recipeTagMatch: ["pork"],
    comboProteinMatch: ["pork-chops"],
    targetKeyword: "pork chop recipes high protein",
    seoKeywords: ["pork chop recipes", "pork meal prep", "easy pork chop recipes", "air fryer pork chops", "cheap pork recipes"],
  },
  {
    slug: "eggs",
    name: "Eggs",
    emoji: "🥚",
    tagline: "The cheapest complete protein. $0.29 per egg, 6g protein each.",
    description: "Egg recipes and combos — scrambles, fried rice, baked egg cups. Budget protein that's always in the fridge.",
    color: "yellow",
    recipeTagMatch: ["eggs"],
    comboProteinMatch: ["eggs"],
    targetKeyword: "high protein egg recipes",
    seoKeywords: ["egg recipes", "high protein eggs", "egg fried rice", "egg meal prep", "cheap protein meals"],
  },
  {
    slug: "fish",
    name: "Fish",
    emoji: "🐟",
    tagline: "Tilapia, tuna, salmon — the highest protein-per-dollar seafood.",
    description: "All fish recipes — from budget canned tuna to tilapia and salmon. High protein, lean, and faster to cook than you think.",
    color: "cyan",
    recipeTagMatch: ["tuna", "salmon", "shrimp", "fish", "tilapia"],
    comboProteinMatch: ["salmon", "shrimp", "tilapia"],
    targetKeyword: "high protein fish recipes",
    seoKeywords: ["fish recipes", "high protein fish", "tuna recipes", "tilapia recipes", "seafood meal prep"],
  },
  {
    slug: "tofu",
    name: "Tofu",
    emoji: "🧊",
    tagline: "35g protein per serving. The plant-based bro's best friend.",
    description: "Crispy tofu recipes — air fryer, baked, skillet. Press it, season it, and it rivals any meat for protein density.",
    color: "emerald",
    recipeTagMatch: ["tofu"],
    comboProteinMatch: ["tofu"],
    targetKeyword: "high protein tofu recipes",
    seoKeywords: ["tofu recipes", "crispy tofu", "air fryer tofu", "high protein tofu", "tofu meal prep"],
  },
];

// Get matching recipes and combos for a category
export function getCategoryContent(category: Category) {
  const recipes = RECIPES.filter((r) =>
    category.recipeTagMatch.some((tag) =>
      r.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    )
  );

  const combos = COMBOS.filter((c) =>
    category.comboProteinMatch.includes(c.protein.id)
  );

  // Stats
  const allProtein = [
    ...recipes.map((r) => r.perServing.protein),
    ...combos.map((c) => c.totalPerServing.protein),
  ];
  const allCost = [
    ...recipes.map((r) => r.costPerServing),
    ...combos.map((c) => c.totalCost),
  ];

  const avgProtein = allProtein.length
    ? Math.round(allProtein.reduce((s, p) => s + p, 0) / allProtein.length)
    : 0;
  const avgCost = allCost.length
    ? allCost.reduce((s, c) => s + c, 0) / allCost.length
    : 0;
  const cheapest = allCost.length ? Math.min(...allCost) : 0;
  const highestProtein = allProtein.length ? Math.max(...allProtein) : 0;

  return {
    recipes,
    combos,
    stats: {
      totalPages: recipes.length + combos.length,
      avgProtein,
      avgCost,
      cheapest,
      highestProtein,
    },
  };
}
