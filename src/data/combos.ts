// Programmatic SEO: Protein × Method × Side combo pages
// Each combo targets a long-tail keyword like "air fryer chicken breast with rice"

export interface ComboProtein {
  id: string;
  name: string;
  shortName: string;
  servingGrams: number; // typical serving size
  perServing: { calories: number; protein: number; fat: number; carbs: number };
  costPerServing: number;
  icon: string; // emoji for visual
}

export interface ComboMethod {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  prepMinutes: number;
}

export interface ComboSide {
  id: string;
  name: string;
  shortName: string;
  perServing: { calories: number; protein: number; fat: number; carbs: number };
  costPerServing: number;
  icon: string;
}

export interface CookSpec {
  temp: string;
  cookMinutes: number;
  technique: string;
  steps: string[];
}

export interface Combo {
  slug: string;
  protein: ComboProtein;
  method: ComboMethod;
  side: ComboSide;
  cookSpec: CookSpec;
  // Calculated
  totalPerServing: { calories: number; protein: number; fat: number; carbs: number };
  totalCost: number;
  totalMinutes: number;
  // SEO
  title: string;
  tagline: string;
  targetKeyword: string;
  seoKeywords: string[];
  // Scores (1-10)
  scores: { protein: number; value: number; speed: number; ease: number };
  // Tips
  tips: string[];
}

// ========== PROTEINS ==========
const PROTEINS: Record<string, ComboProtein> = {
  "chicken-breast": {
    id: "chicken-breast", name: "Chicken Breast", shortName: "Chicken",
    servingGrams: 200, icon: "🍗",
    perServing: { calories: 330, protein: 62, fat: 7, carbs: 0 },
    costPerServing: 1.76,
  },
  "chicken-thighs": {
    id: "chicken-thighs", name: "Chicken Thighs", shortName: "Thighs",
    servingGrams: 200, icon: "🍗",
    perServing: { calories: 418, protein: 52, fat: 22, carbs: 0 },
    costPerServing: 1.10,
  },
  "ground-beef": {
    id: "ground-beef", name: "Ground Beef 80/20", shortName: "Ground Beef",
    servingGrams: 170, icon: "🥩",
    perServing: { calories: 462, protein: 44, fat: 30, carbs: 0 },
    costPerServing: 2.06,
  },
  "ground-turkey": {
    id: "ground-turkey", name: "Ground Turkey 93/7", shortName: "Ground Turkey",
    servingGrams: 170, icon: "🦃",
    perServing: { calories: 289, protein: 36, fat: 16, carbs: 0 },
    costPerServing: 2.06,
  },
  "salmon": {
    id: "salmon", name: "Salmon Fillet", shortName: "Salmon",
    servingGrams: 170, icon: "🐟",
    perServing: { calories: 354, protein: 40, fat: 20, carbs: 0 },
    costPerServing: 3.50,
  },
  "shrimp": {
    id: "shrimp", name: "Shrimp", shortName: "Shrimp",
    servingGrams: 170, icon: "🦐",
    perServing: { calories: 168, protein: 41, fat: 1, carbs: 0 },
    costPerServing: 3.37,
  },
  "pork-chops": {
    id: "pork-chops", name: "Pork Chops", shortName: "Pork",
    servingGrams: 170, icon: "🥩",
    perServing: { calories: 393, protein: 44, fat: 23, carbs: 0 },
    costPerServing: 1.50,
  },
  "tilapia": {
    id: "tilapia", name: "Tilapia Fillet", shortName: "Tilapia",
    servingGrams: 170, icon: "🐟",
    perServing: { calories: 218, protein: 45, fat: 5, carbs: 0 },
    costPerServing: 1.87,
  },
  "eggs": {
    id: "eggs", name: "Whole Eggs (4)", shortName: "Eggs",
    servingGrams: 200, icon: "🥚",
    perServing: { calories: 312, protein: 25, fat: 21, carbs: 2 },
    costPerServing: 1.16,
  },
  "tofu": {
    id: "tofu", name: "Firm Tofu", shortName: "Tofu",
    servingGrams: 200, icon: "🧊",
    perServing: { calories: 288, protein: 35, fat: 17, carbs: 6 },
    costPerServing: 1.25,
  },
};

// ========== METHODS ==========
const METHODS: Record<string, ComboMethod> = {
  "air-fryer":    { id: "air-fryer",    name: "Air Fryer",    icon: "Wind",        emoji: "🌡️", prepMinutes: 3 },
  "baked":        { id: "baked",        name: "Baked",        icon: "Flame",       emoji: "🔥", prepMinutes: 5 },
  "cast-iron":    { id: "cast-iron",    name: "Cast Iron",    icon: "CircleDot",   emoji: "🍳", prepMinutes: 3 },
  "grilled":      { id: "grilled",      name: "Grilled",      icon: "Flame",       emoji: "🔥", prepMinutes: 5 },
  "sheet-pan":    { id: "sheet-pan",    name: "Sheet Pan",    icon: "LayoutGrid",  emoji: "🍽️", prepMinutes: 5 },
  "skillet":      { id: "skillet",      name: "Skillet",      icon: "ChefHat",     emoji: "🍳", prepMinutes: 3 },
  "instant-pot":  { id: "instant-pot",  name: "Instant Pot",  icon: "Timer",       emoji: "⏱️", prepMinutes: 5 },
  "slow-cooker":  { id: "slow-cooker",  name: "Slow Cooker",  icon: "Clock",       emoji: "🕐", prepMinutes: 5 },
};

// ========== SIDES ==========
const SIDES: Record<string, ComboSide> = {
  "rice": {
    id: "rice", name: "White Rice", shortName: "Rice", icon: "🍚",
    perServing: { calories: 206, protein: 4, fat: 0, carbs: 45 },
    costPerServing: 0.25,
  },
  "brown-rice": {
    id: "brown-rice", name: "Brown Rice", shortName: "Brown Rice", icon: "🍚",
    perServing: { calories: 216, protein: 5, fat: 2, carbs: 45 },
    costPerServing: 0.35,
  },
  "sweet-potato": {
    id: "sweet-potato", name: "Sweet Potato", shortName: "Sweet Potato", icon: "🍠",
    perServing: { calories: 180, protein: 4, fat: 0, carbs: 41 },
    costPerServing: 0.75,
  },
  "potatoes": {
    id: "potatoes", name: "Potatoes", shortName: "Potatoes", icon: "🥔",
    perServing: { calories: 164, protein: 4, fat: 0, carbs: 37 },
    costPerServing: 0.40,
  },
  "broccoli": {
    id: "broccoli", name: "Broccoli", shortName: "Broccoli", icon: "🥦",
    perServing: { calories: 55, protein: 4, fat: 1, carbs: 11 },
    costPerServing: 0.50,
  },
  "pasta": {
    id: "pasta", name: "Pasta", shortName: "Pasta", icon: "🍝",
    perServing: { calories: 220, protein: 8, fat: 1, carbs: 43 },
    costPerServing: 0.30,
  },
  "quinoa": {
    id: "quinoa", name: "Quinoa", shortName: "Quinoa", icon: "🌾",
    perServing: { calories: 222, protein: 8, fat: 4, carbs: 39 },
    costPerServing: 0.60,
  },
  "mixed-veggies": {
    id: "mixed-veggies", name: "Mixed Vegetables", shortName: "Veggies", icon: "🥗",
    perServing: { calories: 82, protein: 4, fat: 0, carbs: 18 },
    costPerServing: 0.45,
  },
};

// ========== COOK SPECS ==========
// protein -> method -> cooking details
const COOK_SPECS: Record<string, Record<string, CookSpec>> = {
  "chicken-breast": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 18,
      technique: "Flip halfway for even browning",
      steps: [
        "Preheat air fryer to 400°F.",
        "Season chicken breast with oil, salt, pepper, and garlic powder.",
        "Place in air fryer basket — don't crowd. Single layer only.",
        "Cook 18 min, flipping at 9 min. Internal temp: 165°F.",
      ],
    },
    "baked": {
      temp: "425°F", cookMinutes: 22,
      technique: "Let it rest 5 min before slicing",
      steps: [
        "Preheat oven to 425°F. Line a baking sheet.",
        "Season chicken with olive oil + your favorite seasoning.",
        "Bake 20-22 min until internal temp hits 165°F.",
        "Rest 5 min. Slice and serve.",
      ],
    },
    "cast-iron": {
      temp: "Medium-high", cookMinutes: 14,
      technique: "Don't move it — let the crust form",
      steps: [
        "Heat cast iron skillet over medium-high until smoking hot.",
        "Season chicken. Add 1 tbsp oil to pan.",
        "Sear 6-7 min per side. Don't touch it while it sears.",
        "Internal temp: 165°F. Rest 3 min.",
      ],
    },
    "grilled": {
      temp: "Medium-high", cookMinutes: 14,
      technique: "Don't press down — you'll lose all the juice",
      steps: [
        "Preheat grill to medium-high. Oil the grates.",
        "Pound chicken to even thickness for uniform cooking.",
        "Grill 6-7 min per side. One flip only.",
        "Rest 5 min before slicing.",
      ],
    },
    "sheet-pan": {
      temp: "425°F", cookMinutes: 25,
      technique: "Cut protein and veggies to similar sizes",
      steps: [
        "Preheat oven to 425°F. Line a sheet pan with parchment.",
        "Season chicken + toss your side with oil and spices.",
        "Spread everything on the pan. Don't crowd.",
        "Roast 22-25 min until chicken hits 165°F.",
      ],
    },
    "skillet": {
      temp: "Medium-high", cookMinutes: 14,
      technique: "Flatten to even thickness for quick cooking",
      steps: [
        "Heat a skillet with 1 tbsp oil over medium-high.",
        "Season chicken. Place in hot pan.",
        "Cook 7 min per side until golden and cooked through.",
        "Slice and serve.",
      ],
    },
    "instant-pot": {
      temp: "High pressure", cookMinutes: 12,
      technique: "Quick release. Shred with two forks for meal prep",
      steps: [
        "Add 1 cup water/broth + seasoned chicken to Instant Pot.",
        "Seal lid. High pressure for 10-12 min.",
        "Quick release. Internal temp: 165°F.",
        "Shred or slice. Use the broth for extra flavor.",
      ],
    },
    "slow-cooker": {
      temp: "Low / 6 hours", cookMinutes: 360,
      technique: "The ultimate set-it-and-forget-it protein",
      steps: [
        "Place chicken in slow cooker. Add seasoning + 1/2 cup broth.",
        "Cook on LOW for 6 hours or HIGH for 3 hours.",
        "Shred with two forks right in the pot.",
        "Use for bowls, wraps, or straight from the pot.",
      ],
    },
  },
  "chicken-thighs": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 22,
      technique: "Skin-side up for crispy skin",
      steps: [
        "Preheat air fryer to 400°F.",
        "Season thighs. Place skin-side up in basket.",
        "Cook 20-22 min until skin is crispy and internal temp is 175°F.",
        "No flipping needed for skin-on thighs.",
      ],
    },
    "baked": {
      temp: "425°F", cookMinutes: 30,
      technique: "Higher temp = crispier skin",
      steps: [
        "Preheat oven to 425°F.",
        "Season thighs generously. Place skin-side up on a sheet pan.",
        "Roast 28-30 min until skin is golden and crispy.",
        "Internal temp should be 175°F for thighs.",
      ],
    },
    "sheet-pan": {
      temp: "425°F", cookMinutes: 30,
      technique: "Add veggies around the thighs — they roast in the drippings",
      steps: [
        "Preheat oven to 425°F. Line a sheet pan.",
        "Arrange seasoned thighs skin-side up with veggies around them.",
        "Roast 28-30 min. Thighs baste the veggies in their fat.",
        "Everything comes out in one pan. Zero cleanup.",
      ],
    },
    "cast-iron": {
      temp: "Medium-high → oven 400°F", cookMinutes: 20,
      technique: "Start on stove for sear, finish in oven",
      steps: [
        "Preheat oven to 400°F. Heat cast iron on stove over medium-high.",
        "Sear thighs skin-side down 5 min until crispy.",
        "Flip and transfer to oven for 15 min.",
        "Rest 3 min. The skin will be insanely crispy.",
      ],
    },
    "skillet": {
      temp: "Medium-high", cookMinutes: 18,
      technique: "Skin-side first, press down gently for maximum contact",
      steps: [
        "Heat skillet with 1 tbsp oil over medium-high.",
        "Place thighs skin-side down. Press gently with spatula.",
        "Cook 8-10 min until skin is golden.",
        "Flip. Cook 6-8 min until cooked through (175°F).",
      ],
    },
    "grilled": {
      temp: "Medium", cookMinutes: 20,
      technique: "Indirect heat prevents flare-ups from the fat",
      steps: [
        "Preheat grill. Set up indirect heat zone.",
        "Season thighs. Start skin-side down on direct heat 5 min.",
        "Move to indirect heat. Close lid. Cook 12-15 min.",
        "Internal temp: 175°F. Rest 5 min.",
      ],
    },
  },
  "ground-beef": {
    "skillet": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "Break it up small for maximum browning",
      steps: [
        "Heat a large skillet over medium-high. No oil needed for 80/20.",
        "Add ground beef. Break into crumbles with a spatula.",
        "Cook 8-10 min until browned. Drain fat if desired.",
        "Season and serve.",
      ],
    },
    "cast-iron": {
      temp: "High", cookMinutes: 10,
      technique: "Let it sit 2 min before breaking up — builds a crust",
      steps: [
        "Heat cast iron over high until smoking.",
        "Add beef in a single layer. Let it SIT for 2 min — don't touch.",
        "Break up and stir. Cook another 6-8 min until browned.",
        "The cast iron gives a crust you can't get in non-stick.",
      ],
    },
    "sheet-pan": {
      temp: "425°F", cookMinutes: 20,
      technique: "Spread thin for crispy edges",
      steps: [
        "Preheat oven to 425°F. Line a sheet pan.",
        "Crumble raw ground beef evenly across the pan. Season.",
        "Bake 15-20 min, breaking up halfway through.",
        "Drain fat. Crispy, hands-off ground beef.",
      ],
    },
    "instant-pot": {
      temp: "Sauté mode", cookMinutes: 8,
      technique: "Use Sauté mode — works just like a skillet",
      steps: [
        "Set Instant Pot to Sauté mode.",
        "Add ground beef. Break up with a spoon.",
        "Cook 8 min until browned. Drain fat.",
        "Add your sauce/seasoning + rice + liquid for a one-pot meal.",
      ],
    },
  },
  "ground-turkey": {
    "skillet": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "Add a splash of oil — turkey is leaner than beef",
      steps: [
        "Heat skillet with 1 tsp oil over medium-high.",
        "Add ground turkey. Break into small crumbles.",
        "Cook 8-10 min until no longer pink.",
        "Season aggressively — lean turkey needs bold flavor.",
      ],
    },
    "sheet-pan": {
      temp: "400°F", cookMinutes: 20,
      technique: "Form into patties or meatballs for better texture",
      steps: [
        "Preheat oven to 400°F. Line a sheet pan.",
        "Form turkey into meatballs or spread as crumbles.",
        "Bake 18-20 min until cooked through (165°F).",
        "Add your side veggies to the same pan.",
      ],
    },
    "cast-iron": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "Cast iron adds the flavor that lean turkey is missing",
      steps: [
        "Heat cast iron with 1 tbsp oil over medium-high.",
        "Add turkey. Let it sit 2 min for a brown crust.",
        "Break up and cook 6-8 min total.",
        "The cast iron sear makes lean turkey taste way better.",
      ],
    },
  },
  "salmon": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 10,
      technique: "Skin-side down, no flip needed",
      steps: [
        "Preheat air fryer to 400°F.",
        "Pat salmon dry. Season with salt, pepper, lemon.",
        "Place skin-side down in basket.",
        "Cook 8-10 min. Skin peels right off (or eat it crispy).",
      ],
    },
    "baked": {
      temp: "400°F", cookMinutes: 14,
      technique: "Don't overcook — salmon dries out fast past 145°F",
      steps: [
        "Preheat oven to 400°F. Line a baking sheet.",
        "Season salmon. Place skin-side down.",
        "Bake 12-14 min until it flakes with a fork.",
        "Internal temp: 145°F. Still slightly translucent in center is perfect.",
      ],
    },
    "cast-iron": {
      temp: "Medium-high", cookMinutes: 8,
      technique: "Start skin-side down for crispy skin",
      steps: [
        "Heat cast iron over medium-high with 1 tbsp oil.",
        "Place salmon skin-side down. Press gently.",
        "Cook 4 min until skin is crispy. Flip.",
        "Cook 3-4 more min. Don't overcook.",
      ],
    },
    "grilled": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "Oil the grates well — salmon sticks easily",
      steps: [
        "Preheat grill to medium-high. Oil grates generously.",
        "Season salmon. Place skin-side down.",
        "Grill 4-5 min per side. Don't force it off — it'll release when ready.",
        "Internal temp: 145°F.",
      ],
    },
    "sheet-pan": {
      temp: "400°F", cookMinutes: 15,
      technique: "Add veggies that cook in the same time",
      steps: [
        "Preheat oven to 400°F. Line a sheet pan.",
        "Arrange salmon + veggies. Season everything.",
        "Bake 12-15 min until salmon flakes easily.",
        "One pan, complete meal, minimal cleanup.",
      ],
    },
  },
  "shrimp": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 8,
      technique: "Shake basket halfway through for even cooking",
      steps: [
        "Preheat air fryer to 400°F.",
        "Toss shrimp with oil + seasoning.",
        "Single layer in basket. Cook 6-8 min, shaking halfway.",
        "They're done when pink and curled into a C shape (not O — that's overcooked).",
      ],
    },
    "skillet": {
      temp: "High", cookMinutes: 5,
      technique: "2 min per side MAX — shrimp overcook in seconds",
      steps: [
        "Heat skillet with butter/oil over high heat.",
        "Pat shrimp dry. Season.",
        "Sear 2 min per side until pink. That's it.",
        "Don't walk away — shrimp go from perfect to rubber in 30 seconds.",
      ],
    },
    "grilled": {
      temp: "Medium-high", cookMinutes: 6,
      technique: "Use skewers or a grill basket — shrimp fall through grates",
      steps: [
        "Preheat grill to medium-high.",
        "Thread shrimp on skewers. Brush with oil + seasoning.",
        "Grill 2-3 min per side until pink.",
        "Pull immediately when they turn pink.",
      ],
    },
    "sheet-pan": {
      temp: "425°F", cookMinutes: 8,
      technique: "Add shrimp later than veggies — they cook faster",
      steps: [
        "Preheat oven to 425°F. Start veggies on pan first (10 min head start).",
        "Add seasoned shrimp to the pan.",
        "Bake 6-8 min until shrimp are pink.",
        "Timing is everything — shrimp overcook easily.",
      ],
    },
  },
  "pork-chops": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 14,
      technique: "Flip once halfway through",
      steps: [
        "Preheat air fryer to 400°F.",
        "Season pork chops with garlic powder, paprika, salt.",
        "Cook 12-14 min, flipping halfway.",
        "Internal temp: 145°F. Rest 3 min.",
      ],
    },
    "cast-iron": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "The brown sugar crust is worth it",
      steps: [
        "Heat cast iron over medium-high with 1 tbsp oil.",
        "Season chops with a brown sugar + paprika rub.",
        "Sear 4-5 min per side until caramelized.",
        "Rest 3 min. Internal temp: 145°F. Pink is safe.",
      ],
    },
    "baked": {
      temp: "400°F", cookMinutes: 18,
      technique: "Sear first for color, then finish in oven",
      steps: [
        "Preheat oven to 400°F. Season pork chops.",
        "Sear in a hot pan 2 min per side for color.",
        "Transfer to oven. Bake 12-15 min.",
        "145°F internal. Rest 5 min.",
      ],
    },
    "grilled": {
      temp: "Medium-high", cookMinutes: 12,
      technique: "Brine for 30 min in salt water to prevent drying out",
      steps: [
        "Preheat grill to medium-high.",
        "Season pork chops generously.",
        "Grill 5-6 min per side.",
        "145°F internal. Pink in the middle is perfect and safe.",
      ],
    },
    "skillet": {
      temp: "Medium-high", cookMinutes: 10,
      technique: "Let it rest — cutting too early loses all the juice",
      steps: [
        "Heat skillet with oil over medium-high.",
        "Season chops. Sear 4-5 min per side.",
        "Internal temp: 145°F.",
        "Rest 3-5 min before cutting.",
      ],
    },
  },
  "tilapia": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 10,
      technique: "Pat dry and use parchment to prevent sticking",
      steps: [
        "Preheat air fryer to 400°F.",
        "Pat tilapia dry. Season with lemon pepper + garlic powder.",
        "Place on parchment in basket.",
        "Cook 8-10 min until flaky. No flip needed.",
      ],
    },
    "baked": {
      temp: "400°F", cookMinutes: 12,
      technique: "The cheapest fish with the highest protein-per-dollar",
      steps: [
        "Preheat oven to 400°F. Line a baking sheet.",
        "Season tilapia. Drizzle with lemon juice.",
        "Bake 10-12 min until fish flakes with a fork.",
        "Fast, cheap, lean. The gym bro fish.",
      ],
    },
    "skillet": {
      temp: "Medium-high", cookMinutes: 8,
      technique: "Don't flip too early — let it release naturally",
      steps: [
        "Heat skillet with butter/oil over medium-high.",
        "Season tilapia. Place in hot pan.",
        "Cook 3-4 min per side until golden and flaky.",
        "Squeeze lemon on top. Done.",
      ],
    },
  },
  "eggs": {
    "skillet": {
      temp: "Medium", cookMinutes: 8,
      technique: "Scramble low and slow for creamy texture",
      steps: [
        "Heat skillet with butter over medium heat.",
        "Crack eggs into bowl. Whisk.",
        "Pour into pan. Stir gently until just set.",
        "Season and serve immediately.",
      ],
    },
    "baked": {
      temp: "350°F", cookMinutes: 15,
      technique: "Muffin tin eggs = grab-and-go protein all week",
      steps: [
        "Preheat oven to 350°F. Grease a muffin tin.",
        "Whisk eggs with veggies/cheese. Pour into cups.",
        "Bake 12-15 min until set.",
        "Pop out. Store in fridge. Reheat in 30 seconds.",
      ],
    },
  },
  "tofu": {
    "air-fryer": {
      temp: "400°F", cookMinutes: 15,
      technique: "Press out water first for maximum crispiness",
      steps: [
        "Press tofu 15 min to remove water. Cut into cubes.",
        "Toss with cornstarch + soy sauce + sesame oil.",
        "Air fry at 400°F for 12-15 min, shaking halfway.",
        "Crispier than any restaurant. Seriously.",
      ],
    },
    "skillet": {
      temp: "Medium-high", cookMinutes: 12,
      technique: "Don't touch it for 3-4 min — let the crust build",
      steps: [
        "Press tofu. Cut into cubes or slabs.",
        "Heat skillet with oil over medium-high.",
        "Place tofu in pan. Don't move it for 3-4 min per side.",
        "Toss with sauce of choice.",
      ],
    },
    "baked": {
      temp: "425°F", cookMinutes: 25,
      technique: "Cornstarch coating is the secret to crispy baked tofu",
      steps: [
        "Press tofu. Cut into cubes. Toss with cornstarch.",
        "Preheat oven to 425°F. Line a sheet pan.",
        "Spread tofu in single layer. Bake 22-25 min, flipping halfway.",
        "Toss in your favorite sauce after baking.",
      ],
    },
  },
};

// ========== COMBO GENERATOR ==========
function calcScores(
  protein: ComboProtein,
  side: ComboSide,
  totalMinutes: number,
  totalCost: number,
  totalProtein: number,
): { protein: number; value: number; speed: number; ease: number } {
  // Protein score: based on total protein (max ~66g = 10)
  const proteinScore = Math.min(10, Math.round((totalProtein / 66) * 10 * 10) / 10);

  // Value score: based on protein per dollar (max ~30g/$ = 10)
  const ppd = totalProtein / totalCost;
  const valueScore = Math.min(10, Math.round((ppd / 30) * 10 * 10) / 10);

  // Speed score: inverse of time (5 min = 10, 60 min = 3, 360 min = 1)
  const speedScore = totalMinutes <= 10 ? 10
    : totalMinutes <= 15 ? 9
    : totalMinutes <= 20 ? 8
    : totalMinutes <= 25 ? 7.5
    : totalMinutes <= 30 ? 7
    : totalMinutes <= 45 ? 6
    : totalMinutes <= 60 ? 5
    : 3;

  // Ease score: based on method/protein complexity
  const easeScore = totalMinutes <= 15 ? 9.5
    : totalMinutes <= 25 ? 8.5
    : totalMinutes <= 35 ? 7.5
    : 6;

  return { protein: proteinScore, value: valueScore, speed: speedScore, ease: easeScore };
}

function generateCombo(proteinKey: string, methodKey: string, sideKey: string): Combo | null {
  const protein = PROTEINS[proteinKey];
  const method = METHODS[methodKey];
  const side = SIDES[sideKey];
  const spec = COOK_SPECS[proteinKey]?.[methodKey];

  if (!protein || !method || !side || !spec) return null;

  const totalPerServing = {
    calories: protein.perServing.calories + side.perServing.calories,
    protein: protein.perServing.protein + side.perServing.protein,
    fat: protein.perServing.fat + side.perServing.fat,
    carbs: protein.perServing.carbs + side.perServing.carbs,
  };

  const totalCost = Math.round((protein.costPerServing + side.costPerServing) * 100) / 100;
  const totalMinutes = method.prepMinutes + spec.cookMinutes;

  const scores = calcScores(protein, side, totalMinutes, totalCost, totalPerServing.protein);

  const slug = `${methodKey}-${proteinKey}-with-${sideKey}`;
  const title = `${method.name} ${protein.name} with ${side.name}`;
  const targetKeyword = `${method.name.toLowerCase()} ${protein.name.toLowerCase()} with ${side.name.toLowerCase()}`;

  // Generate tips based on protein and method
  const tips = generateTips(protein, method, side, totalCost, totalPerServing.protein);

  return {
    slug,
    protein,
    method,
    side,
    cookSpec: spec,
    totalPerServing,
    totalCost,
    totalMinutes,
    title,
    tagline: `${totalPerServing.protein}g protein, $${totalCost.toFixed(2)}/plate, ${totalMinutes} min. ${method.name} perfection.`,
    targetKeyword,
    seoKeywords: [
      targetKeyword,
      `${protein.name.toLowerCase()} ${side.name.toLowerCase()}`,
      `${method.name.toLowerCase()} ${protein.name.toLowerCase()}`,
      `high protein ${protein.shortName.toLowerCase()} ${side.shortName.toLowerCase()}`,
      `easy ${protein.shortName.toLowerCase()} meal prep`,
      `${method.name.toLowerCase()} ${protein.shortName.toLowerCase()} recipe`,
    ],
    scores,
    tips,
  };
}

function generateTips(
  protein: ComboProtein,
  method: ComboMethod,
  side: ComboSide,
  cost: number,
  totalProtein: number,
): string[] {
  const tips: string[] = [];

  if (cost < 2.5) tips.push(`At $${cost.toFixed(2)}/plate with ${totalProtein}g protein, this is elite value.`);
  if (totalProtein >= 60) tips.push(`${totalProtein}g protein in one meal — that's almost half your daily target if you're aiming for 150g.`);
  if (method.id === "air-fryer") tips.push("No preheating needed on most air fryers. Just throw it in.");
  if (method.id === "sheet-pan") tips.push("Line with parchment paper. Zero cleanup. You're welcome.");
  if (method.id === "instant-pot") tips.push("Make 5 servings at once. Meal prep in one pot.");
  if (method.id === "slow-cooker") tips.push("Start it before work. Dinner's ready when you get home.");
  if (protein.id === "chicken-breast") tips.push("Pound to even thickness — cooks faster, stays juicier.");
  if (protein.id === "ground-beef") tips.push("80/20 is the sweet spot — enough fat for flavor, good protein.");
  if (protein.id === "salmon") tips.push("Frozen salmon fillets are half the price and often fresher.");
  if (protein.id === "shrimp") tips.push("Buy frozen, peel-and-eat. Way cheaper than fresh counter shrimp.");
  if (protein.id === "tofu") tips.push("Press it for 15 min to remove water. This is the #1 tofu secret.");
  if (side.id === "rice") tips.push("Make a big batch of rice on Sunday. Reheat all week.");
  if (side.id === "sweet-potato") tips.push("Microwave sweet potatoes (8 min) if you're in a rush.");

  return tips.slice(0, 4);
}

// ========== HIGH-PRIORITY COMBOS ==========
// Curated list of high-search-volume combinations
const COMBO_DEFINITIONS: [string, string, string][] = [
  // ========== Chicken Breast (highest search volume) ==========
  ["chicken-breast", "air-fryer", "rice"],
  ["chicken-breast", "air-fryer", "sweet-potato"],
  ["chicken-breast", "air-fryer", "broccoli"],
  ["chicken-breast", "air-fryer", "potatoes"],
  ["chicken-breast", "air-fryer", "quinoa"],
  ["chicken-breast", "air-fryer", "mixed-veggies"],
  ["chicken-breast", "baked", "rice"],
  ["chicken-breast", "baked", "sweet-potato"],
  ["chicken-breast", "baked", "broccoli"],
  ["chicken-breast", "baked", "potatoes"],
  ["chicken-breast", "baked", "quinoa"],
  ["chicken-breast", "grilled", "rice"],
  ["chicken-breast", "grilled", "sweet-potato"],
  ["chicken-breast", "grilled", "broccoli"],
  ["chicken-breast", "grilled", "mixed-veggies"],
  ["chicken-breast", "cast-iron", "rice"],
  ["chicken-breast", "cast-iron", "sweet-potato"],
  ["chicken-breast", "cast-iron", "broccoli"],
  ["chicken-breast", "skillet", "rice"],
  ["chicken-breast", "skillet", "sweet-potato"],
  ["chicken-breast", "skillet", "pasta"],
  ["chicken-breast", "instant-pot", "rice"],
  ["chicken-breast", "instant-pot", "potatoes"],
  ["chicken-breast", "sheet-pan", "mixed-veggies"],
  ["chicken-breast", "sheet-pan", "sweet-potato"],
  ["chicken-breast", "sheet-pan", "broccoli"],
  ["chicken-breast", "slow-cooker", "rice"],
  ["chicken-breast", "slow-cooker", "sweet-potato"],

  // ========== Chicken Thighs ==========
  ["chicken-thighs", "air-fryer", "rice"],
  ["chicken-thighs", "air-fryer", "sweet-potato"],
  ["chicken-thighs", "air-fryer", "broccoli"],
  ["chicken-thighs", "sheet-pan", "sweet-potato"],
  ["chicken-thighs", "sheet-pan", "potatoes"],
  ["chicken-thighs", "sheet-pan", "mixed-veggies"],
  ["chicken-thighs", "baked", "rice"],
  ["chicken-thighs", "baked", "sweet-potato"],
  ["chicken-thighs", "baked", "potatoes"],
  ["chicken-thighs", "cast-iron", "rice"],
  ["chicken-thighs", "cast-iron", "potatoes"],
  ["chicken-thighs", "skillet", "rice"],
  ["chicken-thighs", "skillet", "sweet-potato"],
  ["chicken-thighs", "grilled", "rice"],
  ["chicken-thighs", "grilled", "mixed-veggies"],

  // ========== Ground Beef ==========
  ["ground-beef", "skillet", "rice"],
  ["ground-beef", "skillet", "sweet-potato"],
  ["ground-beef", "skillet", "pasta"],
  ["ground-beef", "skillet", "broccoli"],
  ["ground-beef", "cast-iron", "potatoes"],
  ["ground-beef", "cast-iron", "rice"],
  ["ground-beef", "cast-iron", "sweet-potato"],
  ["ground-beef", "sheet-pan", "potatoes"],
  ["ground-beef", "sheet-pan", "sweet-potato"],
  ["ground-beef", "sheet-pan", "mixed-veggies"],
  ["ground-beef", "instant-pot", "rice"],
  ["ground-beef", "instant-pot", "potatoes"],

  // ========== Ground Turkey ==========
  ["ground-turkey", "skillet", "rice"],
  ["ground-turkey", "skillet", "sweet-potato"],
  ["ground-turkey", "skillet", "pasta"],
  ["ground-turkey", "skillet", "broccoli"],
  ["ground-turkey", "sheet-pan", "sweet-potato"],
  ["ground-turkey", "sheet-pan", "mixed-veggies"],
  ["ground-turkey", "cast-iron", "rice"],
  ["ground-turkey", "cast-iron", "sweet-potato"],

  // ========== Salmon ==========
  ["salmon", "air-fryer", "rice"],
  ["salmon", "air-fryer", "broccoli"],
  ["salmon", "air-fryer", "quinoa"],
  ["salmon", "baked", "rice"],
  ["salmon", "baked", "broccoli"],
  ["salmon", "baked", "sweet-potato"],
  ["salmon", "baked", "quinoa"],
  ["salmon", "cast-iron", "rice"],
  ["salmon", "cast-iron", "broccoli"],
  ["salmon", "grilled", "rice"],
  ["salmon", "grilled", "mixed-veggies"],
  ["salmon", "sheet-pan", "mixed-veggies"],
  ["salmon", "sheet-pan", "broccoli"],
  ["salmon", "sheet-pan", "sweet-potato"],

  // ========== Shrimp ==========
  ["shrimp", "air-fryer", "rice"],
  ["shrimp", "air-fryer", "broccoli"],
  ["shrimp", "air-fryer", "quinoa"],
  ["shrimp", "skillet", "rice"],
  ["shrimp", "skillet", "pasta"],
  ["shrimp", "skillet", "broccoli"],
  ["shrimp", "grilled", "rice"],
  ["shrimp", "grilled", "mixed-veggies"],
  ["shrimp", "sheet-pan", "mixed-veggies"],
  ["shrimp", "sheet-pan", "rice"],

  // ========== Pork Chops ==========
  ["pork-chops", "air-fryer", "rice"],
  ["pork-chops", "air-fryer", "sweet-potato"],
  ["pork-chops", "air-fryer", "broccoli"],
  ["pork-chops", "cast-iron", "rice"],
  ["pork-chops", "cast-iron", "potatoes"],
  ["pork-chops", "cast-iron", "sweet-potato"],
  ["pork-chops", "grilled", "rice"],
  ["pork-chops", "grilled", "mixed-veggies"],
  ["pork-chops", "baked", "sweet-potato"],
  ["pork-chops", "baked", "rice"],
  ["pork-chops", "baked", "potatoes"],
  ["pork-chops", "skillet", "rice"],
  ["pork-chops", "skillet", "sweet-potato"],

  // ========== Tilapia ==========
  ["tilapia", "air-fryer", "rice"],
  ["tilapia", "air-fryer", "broccoli"],
  ["tilapia", "air-fryer", "quinoa"],
  ["tilapia", "baked", "rice"],
  ["tilapia", "baked", "broccoli"],
  ["tilapia", "baked", "sweet-potato"],
  ["tilapia", "skillet", "rice"],
  ["tilapia", "skillet", "broccoli"],

  // ========== Eggs ==========
  ["eggs", "skillet", "rice"],
  ["eggs", "skillet", "sweet-potato"],
  ["eggs", "baked", "sweet-potato"],
  ["eggs", "baked", "mixed-veggies"],

  // ========== Tofu ==========
  ["tofu", "air-fryer", "rice"],
  ["tofu", "air-fryer", "broccoli"],
  ["tofu", "air-fryer", "quinoa"],
  ["tofu", "skillet", "rice"],
  ["tofu", "skillet", "broccoli"],
  ["tofu", "baked", "quinoa"],
  ["tofu", "baked", "rice"],
  ["tofu", "baked", "brown-rice"],
];

export const COMBOS: Combo[] = COMBO_DEFINITIONS
  .map(([p, m, s]) => generateCombo(p, m, s))
  .filter((c): c is Combo => c !== null);

// Helper: find combos with same protein, different method/side
export function getRelatedCombos(combo: Combo, limit = 4): Combo[] {
  return COMBOS
    .filter(c => c.slug !== combo.slug && (
      c.protein.id === combo.protein.id ||
      c.side.id === combo.side.id ||
      c.method.id === combo.method.id
    ))
    .slice(0, limit);
}

// Helper: find swap options
export function getSwapOptions(combo: Combo) {
  const swapProtein = COMBOS.filter(c =>
    c.method.id === combo.method.id && c.side.id === combo.side.id && c.protein.id !== combo.protein.id
  ).slice(0, 3);

  const swapSide = COMBOS.filter(c =>
    c.method.id === combo.method.id && c.protein.id === combo.protein.id && c.side.id !== combo.side.id
  ).slice(0, 3);

  const swapMethod = COMBOS.filter(c =>
    c.protein.id === combo.protein.id && c.side.id === combo.side.id && c.method.id !== combo.method.id
  ).slice(0, 3);

  return { swapProtein, swapSide, swapMethod };
}

// Helper: get all unique proteins/methods/sides for filtering
export function getFilterOptions() {
  const proteins = [...new Set(COMBOS.map(c => c.protein.id))].map(id => COMBOS.find(c => c.protein.id === id)!.protein);
  const methods = [...new Set(COMBOS.map(c => c.method.id))].map(id => COMBOS.find(c => c.method.id === id)!.method);
  const sides = [...new Set(COMBOS.map(c => c.side.id))].map(id => COMBOS.find(c => c.side.id === id)!.side);
  return { proteins, methods, sides };
}
