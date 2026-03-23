import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Clock,
  DollarSign,
  Dumbbell,
  Flame,
  Target,
  CheckCircle,
  AlertTriangle,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Boy Kibble Recipe — The Original Ground Beef & Rice (With Macros)",
  description:
    "The original boy kibble recipe: seasoned ground beef over white rice. Step-by-step instructions, exact macros for every beef ratio, cost breakdown, meal prep tips, and pro upgrades. 51g protein, $2.30, 20 minutes.",
  keywords: [
    "boy kibble recipe",
    "boy kibble original recipe",
    "ground beef and rice recipe",
    "how to make boy kibble",
    "boy kibble meal prep",
    "boy kibble macros",
    "boy kibble ingredients",
    "simple ground beef rice",
    "gym bro recipe",
    "boy kibble step by step",
  ],
  openGraph: {
    title: "Boy Kibble Recipe — The Original — ProteinBro",
    description:
      "51g protein, $2.30, 20 minutes. The original boy kibble recipe with full macros.",
    type: "article",
    url: "https://proteinbro.net/boy-kibble/original-recipe",
  },
  alternates: {
    canonical: "/boy-kibble/original-recipe",
  },
};

export default function OriginalRecipePage() {
  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: "Boy Kibble — The Original Ground Beef & Rice",
    description:
      "The original viral TikTok gym bro meal. Seasoned ground beef over white rice. 51g protein, $2.30 per serving, ready in 20 minutes.",
    image: "https://proteinbro.net/recipes/cast-iron-ground-beef-with-rice.webp",
    author: { "@type": "Organization", name: "ProteinBro" },
    datePublished: "2026-03-08",
    prepTime: "PT5M",
    cookTime: "PT15M",
    totalTime: "PT20M",
    recipeYield: "2 servings",
    recipeCategory: "Main Course",
    recipeCuisine: "American",
    keywords: "boy kibble, ground beef and rice, high protein, meal prep, gym bro",
    nutrition: {
      "@type": "NutritionInformation",
      calories: "673 calories",
      proteinContent: "51g",
      fatContent: "25g",
      carbohydrateContent: "57g",
      fiberContent: "0.8g",
    },
    recipeIngredient: [
      "1 lb (450g) ground beef, 85/15",
      "2 cups white rice, uncooked",
      "4 cups water",
      "1 tsp salt",
      "1/2 tsp black pepper",
      "1 tsp garlic powder",
      "1 tbsp soy sauce (optional)",
      "1/2 tsp onion powder (optional)",
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        name: "Cook the rice",
        text: "Bring 4 cups of water to a boil. Add 2 cups white rice and 1/2 tsp salt. Cover, reduce to low heat, and simmer for 18 minutes. Remove from heat and let sit covered for 5 minutes. Fluff with a fork.",
      },
      {
        "@type": "HowToStep",
        name: "Brown the beef",
        text: "While rice cooks, heat a skillet over medium-high heat. Add 1 lb ground beef. Break it up with a spatula and cook for 8-10 minutes until fully browned. Drain fat if desired.",
      },
      {
        "@type": "HowToStep",
        name: "Season the beef",
        text: "Add salt, pepper, and garlic powder to the browned beef. Stir to combine. For extra flavor, add soy sauce and onion powder.",
      },
      {
        "@type": "HowToStep",
        name: "Serve",
        text: "Divide rice between 2 bowls. Top each with half the seasoned beef. Eat immediately or store in meal prep containers for up to 5 days.",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      {/* NAV */}
      <Link
        href="/boy-kibble"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Boy Kibble Guide
      </Link>

      {/* HEADER */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs font-semibold text-orange-400">
            <Flame className="h-3 w-3" />
            The Original
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-400">
            <Clock className="h-3 w-3" />
            20 min
          </span>
        </div>

        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Boy Kibble: <span className="text-orange-400">The Original Recipe</span>
        </h1>
        <p className="text-zinc-400">
          Ground beef + white rice. The meal that broke TikTok. Here&apos;s the
          definitive version with exact measurements, macros for every beef
          ratio, and meal prep instructions.
        </p>

        {/* Stat pills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { icon: Target, label: "51g protein", color: "text-green-400" },
            { icon: DollarSign, label: "$2.30/serving", color: "text-yellow-400" },
            { icon: Clock, label: "20 min total", color: "text-blue-400" },
            { icon: Dumbbell, label: "673 calories", color: "text-orange-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2"
            >
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs font-semibold text-zinc-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* MACRO DASHBOARD */}
      <section className="mb-10 rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-6">
        <h2 className="mb-4 font-heading text-lg font-bold uppercase text-zinc-200">
          Nutrition per Serving
        </h2>
        <div className="mb-4 grid grid-cols-4 gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-center">
          {[
            { label: "Calories", value: "673", color: "text-orange-400" },
            { label: "Protein", value: "51g", color: "text-green-400" },
            { label: "Fat", value: "25g", color: "text-zinc-300" },
            { label: "Carbs", value: "57g", color: "text-zinc-300" },
          ].map((m) => (
            <div key={m.label}>
              <div className={`font-mono text-2xl font-bold ${m.color}`}>
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-600">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-600">
          Based on 170g cooked 85/15 ground beef + 200g cooked white rice.
          Makes 2 servings per batch.
        </p>
      </section>

      {/* INGREDIENTS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          <span className="text-green-500">Ingredients</span>
        </h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Makes 2 servings
          </div>
          <div className="space-y-2">
            {[
              { item: "Ground beef, 85/15", amount: "1 lb (450g)", note: "See ratio guide below" },
              { item: "White rice, uncooked", amount: "2 cups", note: "Jasmine or long grain" },
              { item: "Water", amount: "4 cups", note: "For rice" },
              { item: "Salt", amount: "1 tsp", note: "" },
              { item: "Black pepper", amount: "½ tsp", note: "" },
              { item: "Garlic powder", amount: "1 tsp", note: "Non-negotiable" },
            ].map((ing) => (
              <div
                key={ing.item}
                className="flex items-center gap-3 rounded-lg border border-zinc-800/40 px-3 py-2"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                <span className="flex-1 text-sm font-medium text-zinc-200">
                  {ing.item}
                </span>
                <span className="font-mono text-sm text-zinc-400">
                  {ing.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Optional Upgrades
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "1 tbsp soy sauce (umami bomb)",
                "½ tsp onion powder",
                "1 tsp paprika (smoky)",
                "Hot sauce to taste",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800/40 px-3 py-1.5 text-sm text-zinc-400"
                >
                  <span className="text-yellow-500">+</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTIONS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          <span className="text-orange-400">Instructions</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Start the rice",
              time: "2 min active",
              detail:
                "Bring 4 cups water to a boil in a pot. Add 2 cups rice and ½ tsp salt. Cover, reduce to low, simmer 18 minutes. Don't lift the lid. Or just use a rice cooker — one button, walk away.",
              tip: "Rice cooker is the gym bro move. $29 and you'll never think about rice again.",
            },
            {
              step: 2,
              title: "Brown the beef",
              time: "10 min",
              detail:
                "Heat a skillet or cast iron over medium-high. Dump in 1 lb ground beef. Break it up with a spatula. Cook 8-10 minutes until fully browned and no pink remains. Stir occasionally.",
              tip: "Cast iron > non-stick for better browning and crispier bits.",
            },
            {
              step: 3,
              title: "Drain (optional)",
              time: "1 min",
              detail:
                "If you're cutting: tilt the pan, push beef to one side, spoon out the grease. This removes ~45% of the fat from 80/20 beef. If you're bulking: keep the fat, it's free calories.",
              tip: null,
            },
            {
              step: 4,
              title: "Season",
              time: "1 min",
              detail:
                "Add salt, pepper, and garlic powder. Stir to combine evenly. For extra flavor, add soy sauce now — it'll sizzle and caramelize on the hot beef.",
              tip: "Garlic powder is non-negotiable. It's the difference between 'meh' and 'actually good.'",
            },
            {
              step: 5,
              title: "Plate and eat",
              time: "1 min",
              detail:
                "Scoop rice into a bowl. Pile beef on top. That's it. You just made the meal that 10 million TikTok viewers watched. Congratulations.",
              tip: null,
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 font-mono text-sm font-bold text-green-400">
                  {s.step}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-base font-bold uppercase text-zinc-200">
                    {s.title}
                  </h3>
                </div>
                <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-500">
                  {s.time}
                </span>
              </div>
              <p className="text-sm text-zinc-400">{s.detail}</p>
              {s.tip && (
                <div className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2">
                  <p className="text-xs text-green-400">
                    <strong>Pro tip:</strong> {s.tip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BEEF RATIO GUIDE */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Which Beef Ratio? <span className="text-green-500">Compared</span>
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          Per serving (170g cooked beef + 200g cooked white rice).
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-zinc-400">
                  Ratio
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-green-400">
                  Protein
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Fat
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Calories
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-yellow-400">
                  Cost
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase text-zinc-400">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { ratio: "73/27", protein: "48g", fat: "40g", cal: "785", cost: "$1.85", use: "Bulking" },
                { ratio: "80/20", protein: "50g", fat: "31g", cal: "722", cost: "$2.06", use: "Default" },
                { ratio: "85/15", protein: "51g", fat: "25g", cal: "673", cost: "$2.30", use: "Sweet spot" },
                { ratio: "90/10", protein: "52g", fat: "20g", cal: "629", cost: "$2.75", use: "Cutting" },
                { ratio: "93/7", protein: "54g", fat: "15g", cal: "593", cost: "$3.05", use: "Max lean" },
              ].map((row, i) => (
                <tr
                  key={row.ratio}
                  className={`border-b border-zinc-800/60 ${i === 2 ? "bg-green-500/5" : ""}`}
                >
                  <td className="px-4 py-2.5 font-mono font-bold text-zinc-300">
                    {row.ratio}
                    {i === 2 && (
                      <span className="ml-2 text-[10px] text-green-400">★</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono font-bold text-green-400">
                    {row.protein}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-zinc-400">
                    {row.fat}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-zinc-400">
                    {row.cal}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-yellow-400">
                    {row.cost}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-zinc-500">
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          ★ 85/15 is the recommended ratio — best balance of protein, flavor, and cost.
        </p>
      </section>

      {/* MEAL PREP GUIDE */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Meal Prep <span className="text-blue-400">Instructions</span>
        </h2>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="mb-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-mono text-2xl font-bold text-blue-400">5</div>
              <div className="text-xs text-zinc-500">days of meals</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-blue-400">30</div>
              <div className="text-xs text-zinc-500">min total work</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-yellow-400">$11.50</div>
              <div className="text-xs text-zinc-500">total cost</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-zinc-400">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                1
              </span>
              <p>
                <strong className="text-zinc-200">Scale up:</strong> 2.5 lbs ground beef + 5 cups dry rice. This makes 5 servings.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                2
              </span>
              <p>
                <strong className="text-zinc-200">Cook simultaneously:</strong> Rice in the cooker, beef in the skillet. Both done in 20 min.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                3
              </span>
              <p>
                <strong className="text-zinc-200">Portion:</strong> Divide into 5 containers. Each gets ~1 cup rice + ~5 oz beef.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                4
              </span>
              <p>
                <strong className="text-zinc-200">Store:</strong> Fridge for up to 5 days. Microwave 2 min to reheat. Add hot sauce fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COST BREAKDOWN */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Cost <span className="text-yellow-400">Breakdown</span>
        </h2>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <div className="space-y-2 text-sm">
            {[
              { item: "Ground beef 85/15 (1 lb @ $6.49/lb)", cost: "$6.49" },
              { item: "White rice (2 cups dry @ $1.50/lb)", cost: "$0.50" },
              { item: "Garlic powder + salt + pepper", cost: "$0.10" },
              { item: "Soy sauce (1 tbsp)", cost: "$0.05" },
            ].map((row) => (
              <div
                key={row.item}
                className="flex items-center justify-between border-b border-yellow-500/10 pb-2"
              >
                <span className="text-zinc-300">{row.item}</span>
                <span className="font-mono font-bold text-yellow-400">
                  {row.cost}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1">
              <span className="text-zinc-400">Total for 2 servings</span>
              <span className="font-mono font-bold text-zinc-300">$7.14</span>
            </div>
            <div className="flex items-center justify-between border-t border-yellow-500/20 pt-2">
              <span className="font-bold text-zinc-100">Per serving</span>
              <span className="font-mono text-xl font-black text-yellow-400">
                $3.57
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-600">
            Using 80/20 beef ($5.49/lb) drops it to $2.30/serving. Buying family
            packs at Costco drops it further.
          </p>
        </div>
      </section>

      {/* PRO TIPS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Pro <span className="text-green-500">Tips</span>
        </h2>
        <div className="space-y-3">
          {[
            {
              tip: "Use cast iron for better browning",
              detail: "Cast iron gets hotter and creates crispier beef bits. Those crispy bits are flavor. Non-stick pans are faster to clean but sacrifice texture.",
            },
            {
              tip: "Don't touch the beef for the first 3 minutes",
              detail: "Let it sit and form a crust on the bottom. Then break it up. You want some chunks, not a fine powder.",
            },
            {
              tip: "Season AFTER browning, not before",
              detail: "Garlic powder burns at high heat. Brown the beef first, then reduce heat and add seasoning.",
            },
            {
              tip: "Add frozen broccoli for 2 minutes at the end",
              detail: "Throw frozen broccoli into the rice cooker or microwave it. Adds fiber, vitamin C, and makes this a complete meal.",
            },
            {
              tip: "Keep hot sauce bottles next to your containers",
              detail: "Adding sauce fresh (not during prep) keeps each meal tasting different. Sriracha Monday, Cholula Tuesday, etc.",
            },
          ].map((item) => (
            <div
              key={item.tip}
              className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <div className="mb-1 text-sm font-bold text-zinc-200">
                  {item.tip}
                </div>
                <p className="text-sm text-zinc-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/boy-kibble/variations"
          className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 transition-colors hover:border-orange-500/40"
        >
          <Flame className="mb-2 h-5 w-5 text-orange-400" />
          <div className="text-sm font-bold">10 Boy Kibble Variations</div>
          <div className="text-xs text-zinc-500">
            Korean, Taco, Teriyaki, Curry & more
          </div>
        </Link>
        <Link
          href="/tools/ground-beef-macro-calculator"
          className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition-colors hover:border-green-500/40"
        >
          <Calculator className="mb-2 h-5 w-5 text-green-400" />
          <div className="text-sm font-bold">Beef Macro Calculator</div>
          <div className="text-xs text-zinc-500">
            Exact macros for any ratio & serving size
          </div>
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">FAQ</h2>
        <div className="space-y-3">
          {[
            {
              q: "What beef ratio should I use for boy kibble?",
              a: "85/15 is the sweet spot — good protein, decent flavor, reasonable price. Use 80/20 to save money or 93/7 if you're cutting.",
            },
            {
              q: "Can I use ground turkey instead of beef?",
              a: "Yes. Ground turkey 93/7 has similar protein (21g/100g vs 28g/100g for beef) but less fat. It's a lighter version. See our variations page for more swaps.",
            },
            {
              q: "How long does boy kibble last in the fridge?",
              a: "3-5 days in a sealed container. Don't push it past 5 days. You can also freeze portions for up to 3 months — thaw in the fridge overnight.",
            },
            {
              q: "Is boy kibble good for bulking?",
              a: "Yes. Use 80/20 beef (more calories), add cheese or an egg on top, and double the rice portion. You'll hit 900+ calories per plate with 55g+ protein.",
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <summary className="cursor-pointer px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-colors hover:text-green-400">
                {faq.q}
              </summary>
              <div className="border-t border-zinc-800 px-4 py-3 text-sm text-zinc-400">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What beef ratio should I use for boy kibble?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "85/15 is the sweet spot — good protein, decent flavor, reasonable price. Use 80/20 to save money or 93/7 if you're cutting.",
                },
              },
              {
                "@type": "Question",
                name: "How long does boy kibble last in the fridge?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "3-5 days in a sealed container. Don't push it past 5 days. You can also freeze portions for up to 3 months.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
