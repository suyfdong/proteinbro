import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Trophy,
  CookingPot,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Air Fryers for Meal Prep (2026) — Tested for High Protein Cooking",
  description:
    "Best air fryers ranked for meal prep and high protein cooking. We tested capacity, cook time, and cleanup. Top pick: Cosori Pro II ($89). Full comparison with prices.",
  keywords: [
    "best air fryer 2026",
    "best air fryer for meal prep",
    "air fryer for chicken breast",
    "best air fryer for bodybuilding",
    "cosori air fryer review",
    "ninja air fryer review",
    "air fryer for protein",
    "best air fryer under $100",
  ],
  openGraph: {
    title: "Best Air Fryers for Meal Prep — ProteinBro",
    description: "Tested for high protein cooking. Top pick: Cosori Pro II ($89).",
    type: "article",
    url: "https://proteinbro.net/gear/best-air-fryers",
  },
  alternates: {
    canonical: "/gear/best-air-fryers",
  },
};

const airFryers = [
  {
    rank: 1,
    name: "Cosori Pro II 5.8 QT",
    price: 89,
    capacity: "5.8 qt",
    watts: 1700,
    rating: 4.7,
    bestFor: "Overall best value",
    pros: [
      "Fits 2 lbs chicken breast flat (no stacking)",
      "12 one-touch presets including chicken & steak",
      "Shake reminder halfway through cooking",
      "Dishwasher-safe basket",
      "Heats up in 2 minutes",
    ],
    cons: [
      "No window to check food",
      "Single basket (no dual zone)",
    ],
    verdict:
      "The default choice. Big enough for batch cooking, affordable, and dead simple. If you cook chicken, salmon, or pork chops 4x/week, this is it.",
    badge: "Top Pick",
    badgeColor: "bg-green-500 text-zinc-950",
  },
  {
    rank: 2,
    name: "Ninja Air Fryer Max XL 5.5 QT",
    price: 119,
    capacity: "5.5 qt",
    watts: 1750,
    rating: 4.8,
    bestFor: "Most even cooking",
    pros: [
      "Max Crisp technology — crispier than competitors",
      "7 cooking functions (air fry, roast, reheat, dehydrate)",
      "Ceramic-coated basket (easier cleanup)",
      "Slightly more powerful motor",
    ],
    cons: [
      "$30 more than Cosori for similar capacity",
      "Slightly louder",
    ],
    verdict:
      "Better build quality and crispier results, but you're paying a premium. Worth it if you air fry daily.",
    badge: "Premium Pick",
    badgeColor: "bg-blue-500 text-zinc-950",
  },
  {
    rank: 3,
    name: "DASH Compact 2 QT",
    price: 39,
    capacity: "2 qt",
    watts: 1000,
    rating: 4.5,
    bestFor: "Single servings / dorm rooms",
    pros: [
      "Cheapest air fryer that actually works",
      "Tiny footprint — fits on any counter",
      "Perfect for 1 chicken breast or 1 salmon fillet",
      "Auto-shutoff timer",
    ],
    cons: [
      "Too small for meal prep (1 serving max)",
      "Lower wattage = longer cook times",
      "No presets — manual temp and time only",
    ],
    verdict:
      "If you're cooking for one and don't meal prep, this is all you need for $39. Not for batch cooking.",
    badge: "Budget Pick",
    badgeColor: "bg-yellow-500 text-zinc-950",
  },
  {
    rank: 4,
    name: "Ninja Foodi 6-in-1 DualZone 8 QT",
    price: 169,
    capacity: "8 qt (2×4qt)",
    watts: 1690,
    rating: 4.7,
    bestFor: "Cooking protein + side simultaneously",
    pros: [
      "Two independent baskets — cook chicken and veggies at the same time",
      "Smart Finish syncs both zones to finish together",
      "8 qt total = biggest capacity in the list",
      "Match Cook copies settings between zones",
    ],
    cons: [
      "Most expensive option",
      "Takes up significant counter space",
      "Overkill for simple meals",
    ],
    verdict:
      "The meal prep beast. Cook 3 lbs protein in one zone and your side in the other. Worth the price if you prep 5+ days at once.",
    badge: "Meal Prep Beast",
    badgeColor: "bg-purple-500 text-zinc-950",
  },
];

const faqData = [
  {
    question: "Is an air fryer worth it for meal prep?",
    answer:
      "Yes. An air fryer cooks chicken breast in 18 minutes, salmon in 12 minutes, and pork chops in 15 minutes — all with no oil and minimal cleanup. For high-protein meal prep, it's the single most useful kitchen appliance.",
  },
  {
    question: "What size air fryer do I need for meal prep?",
    answer:
      "5.5-6 quart for cooking 2-3 servings at a time. 8 quart if you want to cook 4-5 servings. Anything under 4 quart is only good for single servings.",
  },
  {
    question: "Air fryer vs oven for meal prep?",
    answer:
      "Air fryer wins for speed (2x faster), crispiness, and energy cost. Oven wins for volume (sheet pan holds more). Best strategy: air fryer for protein, oven for sheet pan veggies.",
  },
];

export default function BestAirFryersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/gear"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Gear
      </Link>

      {/* HEADER */}
      <header className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-orange-400">
            Updated March 2026
          </span>
        </div>
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Best <span className="text-orange-400">Air Fryers</span> for
          Meal Prep
        </h1>
        <p className="text-zinc-400">
          We tested air fryers specifically for high-protein cooking: chicken
          breast, salmon, pork chops, and ground beef. Here&apos;s what actually
          works.
        </p>
      </header>

      {/* TL;DR */}
      <section className="mb-10 rounded-2xl border-2 border-green-500/20 bg-green-500/5 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-green-400">
          TL;DR — Quick Picks
        </h2>
        <div className="space-y-2">
          {airFryers.map((af) => (
            <div
              key={af.name}
              className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${af.badgeColor}`}>
                  {af.badge}
                </span>
                <span className="text-sm font-medium">{af.name}</span>
              </div>
              <span className="font-mono text-sm font-bold text-yellow-400">
                ${af.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED REVIEWS */}
      <section className="mb-10 space-y-6">
        {airFryers.map((af) => (
          <div
            key={af.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${af.badgeColor}`}>
                  {af.badge}
                </span>
                <h3 className="font-heading text-xl font-bold uppercase">
                  #{af.rank} {af.name}
                </h3>
                <p className="text-sm text-zinc-500">{af.bestFor}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-yellow-400">
                  ${af.price}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {af.rating}/5
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-zinc-300">
                  {af.capacity}
                </div>
                <div className="text-[10px] text-zinc-600">capacity</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-zinc-300">
                  {af.watts}W
                </div>
                <div className="text-[10px] text-zinc-600">power</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-yellow-400">
                  ${af.price}
                </div>
                <div className="text-[10px] text-zinc-600">price</div>
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-green-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Pros
                </h4>
                <ul className="space-y-1 text-sm text-zinc-400">
                  {af.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-red-400">
                  <XCircle className="h-3.5 w-3.5" /> Cons
                </h4>
                <ul className="space-y-1 text-sm text-zinc-400">
                  {af.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2">
                      <span className="mt-1 text-red-500">−</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div className="rounded-lg border border-zinc-800/40 bg-zinc-950/40 p-3">
              <p className="text-sm text-zinc-400">
                <strong className="text-zinc-300">Verdict:</strong>{" "}
                {af.verdict}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* AIR FRYER COOK TIMES */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Air Fryer <span className="text-orange-400">Cook Times</span>
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Protein
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Temp
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Time
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-green-400">
                  Protein/serving
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { food: "Chicken Breast", temp: "375°F", time: "18 min", protein: "43g" },
                { food: "Chicken Thigh", temp: "400°F", time: "20 min", protein: "38g" },
                { food: "Salmon Fillet", temp: "400°F", time: "12 min", protein: "40g" },
                { food: "Pork Chop", temp: "400°F", time: "15 min", protein: "36g" },
                { food: "Shrimp", temp: "400°F", time: "8 min", protein: "24g" },
                { food: "Tilapia", temp: "400°F", time: "10 min", protein: "36g" },
                { food: "Tofu", temp: "375°F", time: "15 min", protein: "20g" },
              ].map((row) => (
                <tr
                  key={row.food}
                  className="border-b border-zinc-800/60 last:border-0"
                >
                  <td className="px-4 py-2.5 font-medium">{row.food}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-orange-400">
                    {row.temp}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-blue-400">
                    {row.time}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-green-400">
                    {row.protein}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/recipes"
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-colors hover:border-red-500/40"
        >
          <Zap className="mb-2 h-5 w-5 text-red-400" />
          <div className="text-sm font-bold">Air Fryer Recipes</div>
          <div className="text-xs text-zinc-500">
            30+ recipes with macros & cook times
          </div>
        </Link>
        <Link
          href="/gear/best-rice-cookers"
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 transition-colors hover:border-blue-500/40"
        >
          <CookingPot className="mb-2 h-5 w-5 text-blue-400" />
          <div className="text-sm font-bold">Best Rice Cookers</div>
          <div className="text-xs text-zinc-500">
            The other half of every meal
          </div>
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">FAQ</h2>
        <div className="space-y-3">
          {faqData.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <summary className="cursor-pointer px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-colors hover:text-green-400">
                {faq.question}
              </summary>
              <div className="border-t border-zinc-800 px-4 py-3 text-sm text-zinc-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <p className="text-xs text-zinc-700">
        Prices and availability may vary. As an Amazon Associate, ProteinBro earns
        from qualifying purchases. We only recommend gear we&apos;d actually use.
      </p>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Best Air Fryers for Meal Prep (2026)",
            description:
              "Air fryers tested for high protein cooking. Ranked by capacity, cook time, and value.",
            url: "https://proteinbro.net/gear/best-air-fryers",
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
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
