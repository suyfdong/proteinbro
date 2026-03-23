import type { Metadata } from "next";
import Link from "next/link";
import { PROTEIN_SOURCES } from "@/data/protein-sources";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  TrendingUp,
  ShoppingCart,
  Weight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Proteinmaxxing Guide — How to Hit 150g+ Protein Every Day on a Budget",
  description:
    "The complete proteinmaxxing playbook. How to eat 150g+ protein daily for under $10. Meal timing, cheapest sources ranked, sample day, and common mistakes. No supplements required.",
  keywords: [
    "proteinmaxxing",
    "proteinmaxxing guide",
    "how to eat more protein",
    "high protein diet plan",
    "150g protein per day",
    "protein on a budget",
    "high protein meals cheap",
    "protein diet for men",
    "proteinmaxxing meals",
    "how to get enough protein",
  ],
  openGraph: {
    title: "Proteinmaxxing Guide — ProteinBro",
    description:
      "Hit 150g+ protein daily for under $10. The complete playbook.",
    type: "article",
    url: "https://proteinbro.net/nutrition/proteinmaxxing-guide",
  },
  alternates: {
    canonical: "/nutrition/proteinmaxxing-guide",
  },
};

const faqData = [
  {
    question: "What is proteinmaxxing?",
    answer:
      "Proteinmaxxing is the practice of intentionally maximizing your daily protein intake, typically aiming for 1g per pound of bodyweight or higher. It became a trending term in 2025-2026 as more young men focused on building muscle through diet optimization rather than just supplements.",
  },
  {
    question: "How much protein do I actually need for proteinmaxxing?",
    answer:
      "For muscle building, research supports 0.7-1g per pound of bodyweight. A 180lb guy should aim for 126-180g daily. Going above 1g/lb hasn't shown additional muscle-building benefits in studies, but it won't hurt you either.",
  },
  {
    question: "Can I proteinmax on a budget?",
    answer:
      "Absolutely. The cheapest protein sources (eggs, whole milk, chicken thighs, canned tuna, ground beef 80/20) can get you 150g+ protein for under $8/day. The key is buying in bulk, cooking in batches, and sticking to staples instead of premium cuts.",
  },
  {
    question: "Do I need protein powder for proteinmaxxing?",
    answer:
      "No. Whey protein is convenient but not required. You can hit 150g+ daily from whole foods alone. That said, whey is one of the most cost-effective protein sources per gram, so it's a smart addition if budget is tight.",
  },
  {
    question: "Is proteinmaxxing safe?",
    answer:
      "For healthy adults, high protein diets (up to 1.5g/lb) have been studied extensively and shown no kidney damage or health issues. If you have pre-existing kidney disease, consult a doctor. For everyone else, the bigger risk is not eating enough protein to support your training.",
  },
];

export default function ProteinmaxxingGuide() {
  // Calculate cheapest protein sources
  const rankedSources = [...PROTEIN_SOURCES]
    .map((s) => ({
      ...s,
      proteinPerDollar:
        (s.per100g.protein / 100) *
        (s.defaultPricePer.gramsPerUnit / s.defaultPricePer.amount),
    }))
    .sort((a, b) => b.proteinPerDollar - a.proteinPerDollar);

  // Sample day plan
  const sampleDay = [
    {
      meal: "Breakfast",
      time: "7 AM",
      food: "4 eggs scrambled + 2 slices toast",
      protein: 28,
      cost: 1.5,
    },
    {
      meal: "Lunch",
      time: "12 PM",
      food: "8oz chicken thigh + rice + broccoli",
      protein: 46,
      cost: 2.2,
    },
    {
      meal: "Snack",
      time: "3 PM",
      food: "Greek yogurt (1 cup) + peanut butter (2 tbsp)",
      protein: 24,
      cost: 1.4,
    },
    {
      meal: "Dinner",
      time: "7 PM",
      food: "8oz ground beef 80/20 + rice",
      protein: 46,
      cost: 2.5,
    },
    {
      meal: "Before Bed",
      time: "10 PM",
      food: "Cottage cheese (1 cup) + handful almonds",
      protein: 30,
      cost: 1.6,
    },
  ];

  const totalProtein = sampleDay.reduce((s, m) => s + m.protein, 0);
  const totalCost = sampleDay.reduce((s, m) => s + m.cost, 0);

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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1">
          <TrendingUp className="h-3.5 w-3.5 text-green-400" />
          <span className="text-xs font-semibold text-green-400">
            Trending in 2026
          </span>
        </div>
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          The <span className="text-green-500">Proteinmaxxing</span> Guide
        </h1>
        <p className="text-zinc-400">
          How to eat 150g+ protein every single day without going broke, spending
          hours cooking, or living on protein shakes. The no-BS playbook.
        </p>

        {/* Key stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { icon: Target, label: "150g+ daily", color: "text-green-400" },
            { icon: DollarSign, label: "Under $10/day", color: "text-yellow-400" },
            { icon: Clock, label: "30 min total cooking", color: "text-blue-400" },
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

      {/* WHAT IS PROTEINMAXXING */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          What is <span className="text-green-500">Proteinmaxxing</span>?
        </h2>
        <p className="mb-4 text-zinc-400">
          Proteinmaxxing = intentionally maximizing your daily protein intake.
          Not through supplements or expensive meal plans — through smart food
          choices and simple cooking.
        </p>
        <p className="mb-4 text-zinc-400">
          The term blew up on TikTok and fitness Twitter in 2025-2026. But the
          concept is old as bodybuilding itself: eat enough protein to build
          muscle, and do it as cheaply as possible.
        </p>
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-sm font-semibold text-green-400">
            The proteinmaxxing rule: Every meal should have 30g+ protein. If it
            doesn&apos;t, add eggs, Greek yogurt, or a can of tuna.
          </p>
        </div>
      </section>

      {/* THE 5 RULES */}
      <section className="mb-10">
        <h2 className="mb-6 font-heading text-2xl font-bold uppercase">
          The 5 Rules of <span className="text-green-500">Proteinmaxxing</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              num: "01",
              title: "Protein first, everything else second",
              desc: "Build every meal around a protein source. Rice, veggies, and sauce are supporting actors. The chicken breast is the star.",
            },
            {
              num: "02",
              title: "Eat protein at every meal — including snacks",
              desc: "Spreading protein across 4-5 meals (30-40g each) is better for muscle synthesis than cramming it all at dinner. Your body can only use so much at once.",
            },
            {
              num: "03",
              title: "Buy the cheapest sources, not the fanciest",
              desc: "Chicken thighs over chicken breast. 80/20 ground beef over 93/7. Whole eggs over egg whites. The protein is the same, the price isn't.",
            },
            {
              num: "04",
              title: "Cook once, eat all week",
              desc: "Batch cook 3-4 proteins on Sunday. Divide into containers. Reheat and eat. Total weekly cooking time: 2 hours.",
            },
            {
              num: "05",
              title: "Track for 2 weeks, then eyeball forever",
              desc: "Weigh and log your food for 14 days to calibrate your eye. After that, you'll know what 40g of protein looks like on a plate.",
            },
          ].map((rule) => (
            <div
              key={rule.num}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <span className="font-mono text-2xl font-bold text-green-500/40">
                {rule.num}
              </span>
              <div>
                <h3 className="mb-1 font-heading text-base font-bold uppercase">
                  {rule.title}
                </h3>
                <p className="text-sm text-zinc-400">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP PROTEIN SOURCES */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Best Sources for <span className="text-yellow-400">$/Protein</span>
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          Ranked by grams of protein per dollar. Prices are US averages (March
          2026).
        </p>
        <div className="space-y-2">
          {rankedSources.slice(0, 10).map((source, i) => {
            const maxPPD = rankedSources[0].proteinPerDollar;
            const pct = (source.proteinPerDollar / maxPPD) * 100;
            return (
              <div
                key={source.id}
                className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-3"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-yellow-400">
                      {source.proteinPerDollar.toFixed(1)}g/$
                    </span>
                    <span className="text-xs text-zinc-600">
                      {source.per100g.protein}g/100g
                    </span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-green-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Link
          href="/nutrition/cheapest-protein-sources"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-green-400 hover:text-green-300"
        >
          Full ranking with all sources <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {/* SAMPLE DAY */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Sample Day: <span className="text-green-500">{totalProtein}g Protein</span>,{" "}
          <span className="text-yellow-400">${totalCost.toFixed(2)}</span>
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          A realistic day for a 180lb guy. No protein powder. All whole foods.
        </p>
        <div className="space-y-2">
          {sampleDay.map((meal) => (
            <div
              key={meal.meal}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <div className="w-16 shrink-0">
                <div className="text-xs font-bold uppercase text-zinc-500">
                  {meal.time}
                </div>
                <div className="text-sm font-bold text-zinc-300">
                  {meal.meal}
                </div>
              </div>
              <div className="flex-1 text-sm text-zinc-400">{meal.food}</div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-green-400">
                  {meal.protein}g
                </div>
                <div className="font-mono text-xs text-yellow-400/70">
                  ${meal.cost.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end gap-4 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
          <span className="text-sm font-bold text-zinc-300">Daily Total</span>
          <span className="font-mono text-lg font-bold text-green-400">
            {totalProtein}g protein
          </span>
          <span className="font-mono text-sm text-yellow-400">
            ${totalCost.toFixed(2)}
          </span>
        </div>
      </section>

      {/* DOS AND DON'TS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Do&apos;s and Don&apos;ts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-bold uppercase text-green-400">
              <CheckCircle className="h-5 w-5" />
              Do This
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">•</span>
                Buy protein in bulk (family packs, Costco)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">•</span>
                Cook 3+ proteins on Sunday
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">•</span>
                Keep canned tuna and eggs as backup
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">•</span>
                Add Greek yogurt to every snack
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">•</span>
                Season your food — bland protein = abandoned diet
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-bold uppercase text-red-400">
              <XCircle className="h-5 w-5" />
              Don&apos;t Do This
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                Rely on protein bars (expensive, low satiety)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                Skip breakfast (&quot;I&apos;ll eat more later&quot; never works)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                Buy pre-marinated or pre-seasoned meat (2x markup)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                Eat only chicken breast (you&apos;ll burn out)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                Count protein from rice/bread (too low to matter)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WEEKLY GROCERY LIST */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Weekly Grocery List:{" "}
          <span className="text-yellow-400">~$55</span>
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          Everything you need for 150g+ protein daily. 5 meals/day, 7 days.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { item: "Chicken thighs (bone-in)", qty: "5 lbs", cost: "$12.45" },
              { item: "Ground beef 80/20", qty: "3 lbs", cost: "$16.47" },
              { item: "Eggs (2 dozen)", qty: "24 eggs", cost: "$6.98" },
              { item: "Greek yogurt", qty: "2 tubs (64oz)", cost: "$11.98" },
              { item: "Canned tuna", qty: "4 cans", cost: "$5.16" },
              { item: "Cottage cheese", qty: "1 tub (16oz)", cost: "$3.99" },
            ].map((item) => (
              <div
                key={item.item}
                className="flex items-center justify-between rounded-lg border border-zinc-800/40 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium">{item.item}</div>
                  <div className="text-xs text-zinc-500">{item.qty}</div>
                </div>
                <span className="font-mono text-sm text-yellow-400">
                  {item.cost}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
            <span className="text-sm font-bold text-zinc-300">
              Weekly Total (protein sources only)
            </span>
            <span className="font-mono text-lg font-bold text-yellow-400">
              ~$57
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            Add $15-20 for rice, bread, veggies, oil, and seasonings. Total:
            ~$75/week = ~$10.70/day.
          </p>
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/nutrition/how-much-protein-per-day"
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 transition-colors hover:border-blue-500/40"
        >
          <Weight className="mb-2 h-5 w-5 text-blue-400" />
          <div className="text-sm font-bold">How Much Protein Per Day?</div>
          <div className="text-xs text-zinc-500">
            Science-backed targets by bodyweight
          </div>
        </Link>
        <Link
          href="/nutrition/cheapest-protein-sources"
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 transition-colors hover:border-yellow-500/40"
        >
          <DollarSign className="mb-2 h-5 w-5 text-yellow-400" />
          <div className="text-sm font-bold">Cheapest Protein Sources</div>
          <div className="text-xs text-zinc-500">
            Full ranking by grams per dollar
          </div>
        </Link>
      </section>

      {/* FAQ Schema */}
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
              "Proteinmaxxing Guide — How to Hit 150g+ Protein Every Day on a Budget",
            description:
              "The complete proteinmaxxing playbook for gym bros. Strategy, timing, and real numbers.",
            url: "https://proteinbro.net/nutrition/proteinmaxxing-guide",
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
