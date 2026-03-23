import type { Metadata } from "next";
import Link from "next/link";
import { PROTEIN_SOURCES } from "@/data/protein-sources";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Target,
  Trophy,
  TrendingDown,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cheapest Protein Sources Ranked — Grams Per Dollar (2026 Prices)",
  description:
    "Every protein source ranked by grams of protein per dollar. Compare chicken, beef, eggs, tuna, whey, and more. Updated March 2026 US prices. Find the cheapest way to hit your protein goals.",
  keywords: [
    "cheapest protein sources",
    "cheap protein",
    "protein per dollar",
    "cheapest protein food",
    "cheap high protein foods",
    "budget protein sources",
    "most protein per dollar",
    "cheapest protein for muscle",
    "protein cost comparison",
    "cheap protein sources bodybuilding",
  ],
  openGraph: {
    title: "Cheapest Protein Sources Ranked — ProteinBro",
    description:
      "Every protein source ranked by grams per dollar. 2026 US prices.",
    type: "article",
    url: "https://proteinbro.net/nutrition/cheapest-protein-sources",
  },
  alternates: {
    canonical: "/nutrition/cheapest-protein-sources",
  },
};

const faqData = [
  {
    question: "What is the cheapest protein source?",
    answer:
      "Whole milk is typically the cheapest protein per dollar at around 28g/$1, followed by whole eggs, lentils, and chicken thighs. However, milk is mostly water and carbs — if you want a high protein-to-calorie ratio, eggs and canned tuna are better options.",
  },
  {
    question: "Is whey protein worth the money?",
    answer:
      "Yes. Whey protein powder typically delivers 25-30g of protein per dollar, making it one of the most cost-effective sources. It's also convenient and has high bioavailability. The main downside is that it's less satiating than whole food sources.",
  },
  {
    question: "Is chicken breast or chicken thigh cheaper per gram of protein?",
    answer:
      "Chicken thigh is significantly cheaper per gram of protein because it costs less per pound while having similar protein content. Thighs have slightly more fat and calories, but the protein per dollar is much better.",
  },
  {
    question: "How much does it cost to eat 150g protein per day?",
    answer:
      "Using the cheapest sources (eggs, chicken thighs, ground beef 80/20, milk), you can hit 150g daily protein for $6-8. Using premium sources (salmon, lean beef 93/7, Greek yogurt), expect $12-15/day.",
  },
  {
    question: "Are canned proteins a good budget option?",
    answer:
      "Canned tuna and canned salmon are excellent budget protein sources. Canned tuna delivers about 14g protein per dollar and requires zero cooking. The only downside is mercury concerns — limit tuna to 2-3 cans per week.",
  },
];

export default function CheapestProteinPage() {
  // Rank all sources by protein per dollar
  const ranked = [...PROTEIN_SOURCES]
    .map((s) => {
      const proteinPerDollar =
        (s.per100g.protein / 100) *
        (s.defaultPricePer.gramsPerUnit / s.defaultPricePer.amount);
      const calPerDollar =
        (s.per100g.calories / 100) *
        (s.defaultPricePer.gramsPerUnit / s.defaultPricePer.amount);
      const proteinPct =
        ((s.per100g.protein * 4) / s.per100g.calories) * 100;
      return {
        ...s,
        proteinPerDollar,
        calPerDollar,
        proteinPct,
      };
    })
    .sort((a, b) => b.proteinPerDollar - a.proteinPerDollar);

  const maxPPD = ranked[0].proteinPerDollar;

  // Category groups
  const categories = [
    { label: "Meat", filter: "meat" as const },
    { label: "Dairy", filter: "dairy" as const },
    { label: "Seafood", filter: "seafood" as const },
    { label: "Plant", filter: "plant" as const },
    { label: "Supplement", filter: "supplement" as const },
  ];

  // Budget tiers
  const tiers = [
    {
      label: "Best Value",
      desc: "25g+ protein per dollar",
      sources: ranked.filter((s) => s.proteinPerDollar >= 25),
      color: "text-green-400",
      borderColor: "border-green-500/20",
    },
    {
      label: "Good Value",
      desc: "15-25g protein per dollar",
      sources: ranked.filter(
        (s) => s.proteinPerDollar >= 15 && s.proteinPerDollar < 25
      ),
      color: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Premium",
      desc: "Under 15g protein per dollar",
      sources: ranked.filter((s) => s.proteinPerDollar < 15),
      color: "text-yellow-400",
      borderColor: "border-yellow-500/20",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/nutrition"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Nutrition
      </Link>

      {/* HEADER */}
      <header className="mb-10">
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Cheapest Protein{" "}
          <span className="text-yellow-400">Sources</span>
        </h1>
        <p className="text-zinc-400">
          Every protein source ranked by grams per dollar. US average prices,
          March 2026. Stop overpaying for gains.
        </p>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-center">
            <div className="font-mono text-xl font-bold text-green-400">
              {ranked[0].proteinPerDollar.toFixed(0)}g/$
            </div>
            <div className="mt-0.5 text-[10px] text-zinc-500">
              best value
            </div>
            <div className="text-[10px] text-zinc-600">{ranked[0].name}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-center">
            <div className="font-mono text-xl font-bold text-yellow-400">
              {PROTEIN_SOURCES.length}
            </div>
            <div className="mt-0.5 text-[10px] text-zinc-500">
              sources compared
            </div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-center">
            <div className="font-mono text-xl font-bold text-blue-400">
              {ranked[ranked.length - 1].proteinPerDollar.toFixed(0)}g/$
            </div>
            <div className="mt-0.5 text-[10px] text-zinc-500">
              most expensive
            </div>
            <div className="text-[10px] text-zinc-600">
              {ranked[ranked.length - 1].name}
            </div>
          </div>
        </div>
      </header>

      {/* FULL RANKING */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Full Ranking: <span className="text-yellow-400">Protein Per Dollar</span>
        </h2>
        <div className="space-y-2">
          {ranked.map((source, i) => {
            const pct = (source.proteinPerDollar / maxPPD) * 100;
            const medal =
              i === 0
                ? "text-yellow-400"
                : i === 1
                  ? "text-zinc-300"
                  : i === 2
                    ? "text-amber-600"
                    : "text-zinc-600";
            return (
              <div
                key={source.id}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-bold ${medal}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-bold">{source.name}</span>
                      <span className="ml-2 rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
                        {source.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-lg font-bold text-yellow-400">
                    {source.proteinPerDollar.toFixed(1)}g/$
                  </span>
                </div>

                {/* Bar */}
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-green-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Details row */}
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>
                    <strong className="text-green-400">
                      {source.per100g.protein}g
                    </strong>{" "}
                    protein/100g
                  </span>
                  <span>
                    <strong className="text-zinc-300">
                      {source.per100g.calories}
                    </strong>{" "}
                    cal/100g
                  </span>
                  <span>
                    <strong className="text-blue-400">
                      {source.proteinPct.toFixed(0)}%
                    </strong>{" "}
                    protein cal
                  </span>
                  <span className="ml-auto">
                    ${source.defaultPricePer.amount}/{source.defaultPricePer.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Prices are US national averages, March 2026. Your local prices may
          vary. Use our{" "}
          <Link
            href="/tools/protein-per-dollar-calculator"
            className="text-green-400 hover:text-green-300"
          >
            Protein Per Dollar Calculator
          </Link>{" "}
          to plug in your own prices.
        </p>
      </section>

      {/* VALUE TIERS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Value <span className="text-green-500">Tiers</span>
        </h2>
        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`rounded-xl border ${tier.borderColor} bg-zinc-900/40 p-4`}
            >
              <h3 className={`mb-1 font-heading text-base font-bold uppercase ${tier.color}`}>
                {tier.label}
              </h3>
              <p className="mb-3 text-xs text-zinc-500">{tier.desc}</p>
              <div className="flex flex-wrap gap-2">
                {tier.sources.map((s) => (
                  <span
                    key={s.id}
                    className="rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {s.name}{" "}
                    <span className="text-zinc-600">
                      ({s.proteinPerDollar.toFixed(0)}g/$)
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BY CATEGORY */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Best in Each <span className="text-green-500">Category</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const best = ranked.filter((s) => s.category === cat.filter)[0];
            if (!best) return null;
            return (
              <div
                key={cat.label}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Best {cat.label}
                  </span>
                </div>
                <div className="text-sm font-bold">{best.name}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-yellow-400">
                    {best.proteinPerDollar.toFixed(1)}g/$
                  </span>
                  <span className="text-xs text-zinc-600">
                    {best.per100g.protein}g protein/100g
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DAILY COST SCENARIOS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Daily Cost for{" "}
          <span className="text-green-500">150g Protein</span>
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "Budget Bro",
              sources: "Eggs + chicken thighs + milk + black beans",
              cost: "$6.50",
              color: "text-green-400",
            },
            {
              label: "Balanced Bro",
              sources: "Eggs + ground beef + Greek yogurt + canned tuna",
              cost: "$9.20",
              color: "text-blue-400",
            },
            {
              label: "Premium Bro",
              sources: "Chicken breast + salmon + Greek yogurt + whey",
              cost: "$13.80",
              color: "text-yellow-400",
            },
          ].map((scenario) => (
            <div
              key={scenario.label}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <div className="flex-1">
                <div className={`text-sm font-bold ${scenario.color}`}>
                  {scenario.label}
                </div>
                <div className="text-xs text-zinc-500">{scenario.sources}</div>
              </div>
              <div className="font-mono text-xl font-bold text-zinc-200">
                {scenario.cost}
                <span className="text-xs text-zinc-600">/day</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/tools/protein-per-dollar-calculator"
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 transition-colors hover:border-yellow-500/40"
        >
          <DollarSign className="mb-2 h-5 w-5 text-yellow-400" />
          <div className="text-sm font-bold">Protein/$ Calculator</div>
          <div className="text-xs text-zinc-500">
            Plug in your local prices
          </div>
        </Link>
        <Link
          href="/nutrition/proteinmaxxing-guide"
          className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition-colors hover:border-green-500/40"
        >
          <Zap className="mb-2 h-5 w-5 text-green-400" />
          <div className="text-sm font-bold">Proteinmaxxing Guide</div>
          <div className="text-xs text-zinc-500">
            Hit 150g+ daily on a budget
          </div>
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          FAQ
        </h2>
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Cheapest Protein Sources Ranked by Grams Per Dollar (2026)",
            description:
              "Every protein source ranked by cost efficiency. US prices, March 2026.",
            url: "https://proteinbro.net/nutrition/cheapest-protein-sources",
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
