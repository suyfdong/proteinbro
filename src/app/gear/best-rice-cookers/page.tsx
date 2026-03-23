import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CookingPot,
  Star,
  CheckCircle,
  XCircle,
  Flame,
  Package,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Rice Cookers for Meal Prep (2026) — Simple, Cheap, Reliable",
  description:
    "Best rice cookers ranked for meal prep. From the $29 Aroma to the $170 Zojirushi. We tested them with white rice, brown rice, and quinoa. Top pick: Aroma 8-Cup ($29).",
  keywords: [
    "best rice cooker 2026",
    "best rice cooker for meal prep",
    "cheap rice cooker",
    "aroma rice cooker review",
    "zojirushi rice cooker review",
    "rice cooker for bodybuilding",
    "best rice cooker under $50",
    "rice cooker for gym",
  ],
  openGraph: {
    title: "Best Rice Cookers for Meal Prep — ProteinBro",
    description: "Top pick: Aroma 8-Cup ($29). Perfect rice, zero effort.",
    type: "article",
    url: "https://proteinbro.net/gear/best-rice-cookers",
  },
  alternates: {
    canonical: "/gear/best-rice-cookers",
  },
};

const riceCookers = [
  {
    rank: 1,
    name: "Aroma 8-Cup Digital",
    price: 29,
    capacity: "8 cups (cooked)",
    rating: 4.6,
    bestFor: "Best value overall",
    pros: [
      "Under $30 — cheapest reliable option",
      "Steamer tray included (steam veggies while rice cooks)",
      "Programmable delay timer",
      "Keep-warm function (up to 12 hours)",
      "Makes white rice, brown rice, and oatmeal",
    ],
    cons: [
      "Non-stick coating wears after 2-3 years",
      "No fuzzy logic (rice can be slightly inconsistent)",
    ],
    verdict:
      "The gym bro default. $29 for perfect rice 95% of the time. The steamer tray is a bonus — cook broccoli on top while rice cooks below.",
    badge: "Top Pick",
    badgeColor: "bg-green-500 text-zinc-950",
  },
  {
    rank: 2,
    name: "Hamilton Beach 8-Cup",
    price: 24,
    capacity: "8 cups (cooked)",
    rating: 4.4,
    bestFor: "Absolute cheapest",
    pros: [
      "Under $25 — the absolute minimum spend",
      "One-switch operation (cook/warm)",
      "Rinse-able inner pot",
      "Compact size",
    ],
    cons: [
      "No timer or delay function",
      "No steamer tray",
      "Only basic cook/warm modes",
    ],
    verdict:
      "If you literally just need rice and nothing else, this does the job for $24. No frills, no features, just rice.",
    badge: "Budget Pick",
    badgeColor: "bg-yellow-500 text-zinc-950",
  },
  {
    rank: 3,
    name: "Zojirushi NS-TSC10 5.5-Cup",
    price: 170,
    capacity: "5.5 cups (uncooked)",
    rating: 4.8,
    bestFor: "Perfect rice every time",
    pros: [
      "Fuzzy logic — adjusts temp and time automatically",
      "Perfect rice consistency, every single time",
      "Multiple settings: white, brown, sushi, porridge, quick",
      "Built to last 10+ years",
      "Retractable cord for clean storage",
    ],
    cons: [
      "$170 — 6x the price of the Aroma",
      "Smaller capacity than cheaper options",
      "Takes longer than basic cookers",
    ],
    verdict:
      "The 'buy it for life' option. If you eat rice daily and want perfection, the Zojirushi is unbeatable. But for most gym bros, the Aroma at $29 is plenty.",
    badge: "Premium Pick",
    badgeColor: "bg-blue-500 text-zinc-950",
  },
];

const faqData = [
  {
    question: "Do I really need a rice cooker?",
    answer:
      "If you eat rice 4+ times per week (and if you're reading this, you do), yes. A rice cooker frees up a burner, requires zero attention, and produces consistent results. It's also the cheapest kitchen appliance on this list at $24-29.",
  },
  {
    question: "Rice cooker vs Instant Pot for rice?",
    answer:
      "Rice cooker wins for simplicity and consistency. Instant Pot is more versatile but takes longer (10 min to pressurize + cook time + release). If you mainly need rice, get a rice cooker. If you want to cook everything in one pot, get an Instant Pot.",
  },
  {
    question: "Can I cook quinoa and oatmeal in a rice cooker?",
    answer:
      "Yes. Most rice cookers handle quinoa (1:2 ratio), oatmeal (1:2 ratio), and even lentils. The Aroma and Zojirushi both have dedicated settings for these grains.",
  },
];

export default function BestRiceCookersPage() {
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1">
          <CookingPot className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-xs font-semibold text-blue-400">
            Updated March 2026
          </span>
        </div>
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Best <span className="text-blue-400">Rice Cookers</span> for
          Meal Prep
        </h1>
        <p className="text-zinc-400">
          Rice is the foundation of every gym bro meal. These cookers make it
          impossible to mess up. One button, walk away, perfect rice.
        </p>
      </header>

      {/* TL;DR */}
      <section className="mb-10 rounded-2xl border-2 border-green-500/20 bg-green-500/5 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-green-400">
          TL;DR — Quick Picks
        </h2>
        <div className="space-y-2">
          {riceCookers.map((rc) => (
            <div
              key={rc.name}
              className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rc.badgeColor}`}>
                  {rc.badge}
                </span>
                <span className="text-sm font-medium">{rc.name}</span>
              </div>
              <span className="font-mono text-sm font-bold text-yellow-400">
                ${rc.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED REVIEWS */}
      <section className="mb-10 space-y-6">
        {riceCookers.map((rc) => (
          <div
            key={rc.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${rc.badgeColor}`}>
                  {rc.badge}
                </span>
                <h3 className="font-heading text-xl font-bold uppercase">
                  #{rc.rank} {rc.name}
                </h3>
                <p className="text-sm text-zinc-500">{rc.bestFor}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-yellow-400">
                  ${rc.price}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {rc.rating}/5
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-zinc-300">
                  {rc.capacity}
                </div>
                <div className="text-[10px] text-zinc-600">capacity</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-yellow-400">
                  ${rc.price}
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
                  {rc.pros.map((pro) => (
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
                  {rc.cons.map((con) => (
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
                <strong className="text-zinc-300">Verdict:</strong> {rc.verdict}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* RICE RATIOS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Rice <span className="text-blue-400">Ratios</span> Cheat Sheet
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-zinc-400">
                  Grain
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Water Ratio
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-zinc-400">
                  Cook Time
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase text-green-400">
                  Protein/cup
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { grain: "White Rice", ratio: "1:1.5", time: "15 min", protein: "4g" },
                { grain: "Brown Rice", ratio: "1:2", time: "30 min", protein: "5g" },
                { grain: "Quinoa", ratio: "1:2", time: "20 min", protein: "8g" },
                { grain: "Jasmine Rice", ratio: "1:1.25", time: "12 min", protein: "4g" },
                { grain: "Oatmeal", ratio: "1:2", time: "10 min", protein: "6g" },
              ].map((row) => (
                <tr
                  key={row.grain}
                  className="border-b border-zinc-800/60 last:border-0"
                >
                  <td className="px-4 py-2.5 font-medium">{row.grain}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-blue-400">
                    {row.ratio}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono text-zinc-400">
                    {row.time}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-green-400">
                    {row.protein}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/gear/best-air-fryers"
          className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 transition-colors hover:border-orange-500/40"
        >
          <Flame className="mb-2 h-5 w-5 text-orange-400" />
          <div className="text-sm font-bold">Best Air Fryers</div>
          <div className="text-xs text-zinc-500">Cook the protein half</div>
        </Link>
        <Link
          href="/gear/meal-prep-containers"
          className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition-colors hover:border-green-500/40"
        >
          <Package className="mb-2 h-5 w-5 text-green-400" />
          <div className="text-sm font-bold">Meal Prep Containers</div>
          <div className="text-xs text-zinc-500">Store it all for the week</div>
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
            headline: "Best Rice Cookers for Meal Prep (2026)",
            description:
              "Rice cookers tested for meal prep. Ranked by value, consistency, and capacity.",
            url: "https://proteinbro.net/gear/best-rice-cookers",
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
