import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Clock,
  DollarSign,
  Dumbbell,
  Target,
  ChefHat,
  Star,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "10 Boy Kibble Variations — Korean, Taco, Teriyaki & More (With Macros)",
  description:
    "10 boy kibble variations to keep your gains interesting. Korean, Taco, Teriyaki, Italian, Curry, Philly, Sriracha Lime, BBQ, Greek, and Breakfast. Every variation has full macros, cost, and instructions.",
  keywords: [
    "boy kibble variations",
    "boy kibble recipes",
    "boy kibble flavors",
    "ground beef and rice variations",
    "korean boy kibble",
    "taco boy kibble",
    "teriyaki boy kibble",
    "boy kibble meal prep ideas",
    "ground beef rice recipes",
    "boy kibble upgrades",
  ],
  openGraph: {
    title: "10 Boy Kibble Variations — ProteinBro",
    description:
      "Keep the gains, change the flavor. 10 variations with full macros.",
    type: "article",
    url: "https://proteinbro.net/boy-kibble/variations",
  },
  alternates: {
    canonical: "/boy-kibble/variations",
  },
};

const variations = [
  {
    name: "Korean Kibble",
    flavor: "Sweet, spicy, umami",
    addIns: "2 tbsp gochujang, 1 tsp sesame oil, sliced green onion, fried egg on top",
    extraProtein: 6,
    extraCost: 0.6,
    extraCal: 95,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["Fan Favorite", "Extra Protein"],
    color: "text-red-400",
    borderColor: "border-red-500/20",
  },
  {
    name: "Taco Kibble",
    flavor: "Savory, tangy, cheesy",
    addIns: "1 tbsp taco seasoning, 2 tbsp salsa, 1 oz shredded cheddar, hot sauce",
    extraProtein: 7,
    extraCost: 0.5,
    extraCal: 120,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["Most Popular"],
    color: "text-yellow-400",
    borderColor: "border-yellow-500/20",
  },
  {
    name: "Teriyaki Kibble",
    flavor: "Sweet, savory, ginger",
    addIns: "2 tbsp soy sauce, 1 tbsp brown sugar, 1 tsp ginger, garlic, steamed broccoli",
    extraProtein: 3,
    extraCost: 0.4,
    extraCal: 65,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["+Fiber"],
    color: "text-green-400",
    borderColor: "border-green-500/20",
  },
  {
    name: "Italian Kibble",
    flavor: "Tomato, herb, cheesy",
    addIns: "¼ cup marinara, 1 tsp Italian seasoning, 1 tbsp parmesan, basil",
    extraProtein: 4,
    extraCost: 0.45,
    extraCal: 70,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["Comfort Food"],
    color: "text-orange-400",
    borderColor: "border-orange-500/20",
  },
  {
    name: "Curry Kibble",
    flavor: "Warm, aromatic, creamy",
    addIns: "1 tbsp curry powder, ¼ cup coconut milk, diced tomato, cilantro",
    extraProtein: 1,
    extraCost: 0.55,
    extraCal: 80,
    difficulty: "Medium",
    mealPrepFriendly: true,
    tags: ["Level Up"],
    color: "text-yellow-400",
    borderColor: "border-yellow-500/20",
  },
  {
    name: "Philly Kibble",
    flavor: "Savory, pepper, melty cheese",
    addIns: "Sautéed bell pepper & onion, 1 slice provolone melted on top",
    extraProtein: 8,
    extraCost: 0.7,
    extraCal: 110,
    difficulty: "Medium",
    mealPrepFriendly: false,
    tags: ["+Flavor"],
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    name: "Sriracha Lime Kibble",
    flavor: "Spicy, citrus, fresh",
    addIns: "1 tbsp sriracha, juice of ½ lime, chopped cilantro",
    extraProtein: 0,
    extraCost: 0.3,
    extraCal: 15,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["Lowest Cal"],
    color: "text-red-400",
    borderColor: "border-red-500/20",
  },
  {
    name: "BBQ Kibble",
    flavor: "Sweet, smoky, savory",
    addIns: "2 tbsp BBQ sauce, caramelized onion, cheddar if bulking",
    extraProtein: 1,
    extraCost: 0.35,
    extraCal: 70,
    difficulty: "Easy",
    mealPrepFriendly: true,
    tags: ["Easy Win"],
    color: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    name: "Greek Kibble",
    flavor: "Cool, tangy, Mediterranean",
    addIns: "2 tbsp tzatziki, diced cucumber, 1 oz feta, oregano",
    extraProtein: 5,
    extraCost: 0.75,
    extraCal: 85,
    difficulty: "Easy",
    mealPrepFriendly: false,
    tags: ["Different"],
    color: "text-cyan-400",
    borderColor: "border-cyan-500/20",
  },
  {
    name: "Breakfast Kibble",
    flavor: "Savory, rich, everything bagel",
    addIns: "2 scrambled eggs mixed in, everything bagel seasoning, hot sauce",
    extraProtein: 12,
    extraCost: 0.5,
    extraCal: 140,
    difficulty: "Easy",
    mealPrepFriendly: false,
    tags: ["Most Protein"],
    color: "text-green-400",
    borderColor: "border-green-500/20",
  },
];

// Base boy kibble macros (85/15 beef)
const BASE = { protein: 51, cal: 673, cost: 2.3, fat: 25, carbs: 57 };

export default function VariationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-orange-400">
            10 Variations
          </span>
        </div>
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Boy Kibble <span className="text-orange-400">Variations</span>
        </h1>
        <p className="text-zinc-400">
          Same base (ground beef + rice), 10 different flavor profiles. Every
          variation keeps the boy kibble promise: cheap, fast, high protein. No
          variation takes more than 5 extra minutes.
        </p>
      </header>

      {/* QUICK REFERENCE */}
      <section className="mb-10 rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-zinc-200">
          Base Boy Kibble (85/15)
        </h2>
        <div className="grid grid-cols-4 gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
          {[
            { label: "Protein", value: `${BASE.protein}g`, color: "text-green-400" },
            { label: "Calories", value: `${BASE.cal}`, color: "text-orange-400" },
            { label: "Cost", value: `$${BASE.cost.toFixed(2)}`, color: "text-yellow-400" },
            { label: "Time", value: "20 min", color: "text-blue-400" },
          ].map((m) => (
            <div key={m.label}>
              <div className={`font-mono text-lg font-bold ${m.color}`}>
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-600">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          All variations below show additional macros/cost on top of the base.
        </p>
      </section>

      {/* VARIATION CARDS */}
      <section className="mb-10 space-y-4">
        {variations.map((v, i) => {
          const totalProtein = BASE.protein + v.extraProtein;
          const totalCal = BASE.cal + v.extraCal;
          const totalCost = BASE.cost + v.extraCost;

          return (
            <div
              key={v.name}
              className={`rounded-2xl border ${v.borderColor} bg-zinc-900/40 p-5`}
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-600">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`font-heading text-xl font-bold uppercase ${v.color}`}>
                      {v.name}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500">{v.flavor}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {v.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-800 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* What to add */}
              <div className="mb-3 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-3 py-2">
                <span className="text-xs font-bold uppercase text-zinc-500">
                  Add to base:{" "}
                </span>
                <span className="text-sm text-zinc-300">{v.addIns}</span>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-2.5 py-1.5">
                  <Target className="h-3.5 w-3.5 text-green-400" />
                  <span className="font-mono text-sm font-bold text-green-400">
                    {totalProtein}g
                  </span>
                  {v.extraProtein > 0 && (
                    <span className="text-[10px] text-green-500/60">
                      (+{v.extraProtein})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-2.5 py-1.5">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <span className="font-mono text-sm text-zinc-300">
                    {totalCal} cal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-2.5 py-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="font-mono text-sm text-yellow-400">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-2.5 py-1.5">
                  <ChefHat className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs text-zinc-400">{v.difficulty}</span>
                </div>
                {v.mealPrepFriendly && (
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    Meal Prep ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* COMPARISON TABLE */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Quick <span className="text-green-500">Comparison</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-3 py-3 text-left text-xs font-bold uppercase text-zinc-400">
                  Variation
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase text-green-400">
                  Protein
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Calories
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase text-yellow-400">
                  Cost
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Prep?
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/60 bg-zinc-900/20">
                <td className="px-3 py-2 font-medium text-zinc-500">
                  Base (classic)
                </td>
                <td className="px-3 py-2 text-center font-mono text-green-400/60">
                  {BASE.protein}g
                </td>
                <td className="px-3 py-2 text-center font-mono text-zinc-500">
                  {BASE.cal}
                </td>
                <td className="px-3 py-2 text-center font-mono text-yellow-400/60">
                  ${BASE.cost.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-center text-green-400">✓</td>
              </tr>
              {variations.map((v) => (
                <tr
                  key={v.name}
                  className="border-b border-zinc-800/60 last:border-0"
                >
                  <td className={`px-3 py-2 font-medium ${v.color}`}>
                    {v.name}
                  </td>
                  <td className="px-3 py-2 text-center font-mono font-bold text-green-400">
                    {BASE.protein + v.extraProtein}g
                  </td>
                  <td className="px-3 py-2 text-center font-mono text-zinc-400">
                    {BASE.cal + v.extraCal}
                  </td>
                  <td className="px-3 py-2 text-center font-mono text-yellow-400">
                    ${(BASE.cost + v.extraCost).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {v.mealPrepFriendly ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WEEKLY ROTATION */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Sample Week <span className="text-blue-400">Rotation</span>
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          Never eat the same kibble twice in a row. Here&apos;s a 5-day meal prep
          rotation:
        </p>
        <div className="space-y-2">
          {[
            { day: "Mon", variation: "Taco Kibble", protein: 58 },
            { day: "Tue", variation: "Teriyaki Kibble", protein: 54 },
            { day: "Wed", variation: "Sriracha Lime Kibble", protein: 51 },
            { day: "Thu", variation: "Korean Kibble", protein: 57 },
            { day: "Fri", variation: "BBQ Kibble", protein: 52 },
          ].map((d) => (
            <div
              key={d.day}
              className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3"
            >
              <span className="w-10 font-mono text-sm font-bold text-zinc-500">
                {d.day}
              </span>
              <span className="flex-1 text-sm font-medium text-zinc-200">
                {d.variation}
              </span>
              <span className="font-mono text-sm font-bold text-green-400">
                {d.protein}g
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
          <p className="text-xs text-green-400">
            <strong>Prep tip:</strong> Cook all the beef and rice on Sunday as one
            batch. Divide into 5 containers. Add each variation&apos;s sauce/toppings
            fresh when reheating — keeps textures better.
          </p>
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/boy-kibble/original-recipe"
          className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 transition-colors hover:border-orange-500/40"
        >
          <ChefHat className="mb-2 h-5 w-5 text-orange-400" />
          <div className="text-sm font-bold">The Original Recipe</div>
          <div className="text-xs text-zinc-500">
            Step-by-step with ratio guide
          </div>
        </Link>
        <Link
          href="/recipes"
          className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition-colors hover:border-green-500/40"
        >
          <Target className="mb-2 h-5 w-5 text-green-400" />
          <div className="text-sm font-bold">30+ More Recipes</div>
          <div className="text-xs text-zinc-500">
            Beyond boy kibble — chicken, salmon, tofu
          </div>
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">FAQ</h2>
        <div className="space-y-3">
          {[
            {
              q: "Which boy kibble variation has the most protein?",
              a: "Breakfast Kibble (+12g from 2 scrambled eggs) brings the total to 63g protein per plate — the highest of all variations.",
            },
            {
              q: "Which variation is best for meal prep?",
              a: "Taco Kibble and Teriyaki Kibble are the best for meal prep. Their sauces reheat well and the flavors actually improve overnight. Avoid Greek and Breakfast Kibble for prep — the fresh ingredients don't hold up.",
            },
            {
              q: "Can I mix variations in one batch?",
              a: "Yes. Cook one big batch of plain beef and rice. Divide into containers, then add different sauces to each. This is the most efficient way to get variety with minimal effort.",
            },
            {
              q: "What's the cheapest variation?",
              a: "Sriracha Lime Kibble adds only $0.30 (sriracha + half a lime + cilantro) and essentially zero calories. Biggest flavor improvement for the least money.",
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "10 Boy Kibble Variations — With Macros and Cost",
            description:
              "10 ground beef and rice variations with full macros, cost, and meal prep instructions.",
            url: "https://proteinbro.net/boy-kibble/variations",
            publisher: {
              "@type": "Organization",
              name: "ProteinBro",
              url: "https://proteinbro.net",
            },
          }),
        }}
      />
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
                name: "Which boy kibble variation has the most protein?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Breakfast Kibble (+12g from 2 scrambled eggs) brings the total to 63g protein per plate.",
                },
              },
              {
                "@type": "Question",
                name: "Which variation is best for meal prep?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Taco Kibble and Teriyaki Kibble. Their sauces reheat well and flavors improve overnight.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
