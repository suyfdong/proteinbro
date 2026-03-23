import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Weight,
  Target,
  Dumbbell,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How Much Protein Per Day? Science-Based Guide for Men (2026)",
  description:
    "How much protein do you actually need per day? Calculator by body weight, activity level, and goal. Research-backed recommendations for muscle building, fat loss, and maintenance.",
  keywords: [
    "how much protein per day",
    "protein per day calculator",
    "daily protein intake",
    "protein for muscle building",
    "protein per pound bodyweight",
    "how much protein to build muscle",
    "protein intake for men",
    "protein requirements bodybuilding",
    "daily protein needs",
    "grams of protein per day",
  ],
  openGraph: {
    title: "How Much Protein Per Day? — ProteinBro",
    description:
      "Science-backed protein targets by body weight and goal. No broscience.",
    type: "article",
    url: "https://proteinbro.net/nutrition/how-much-protein-per-day",
  },
  alternates: {
    canonical: "/nutrition/how-much-protein-per-day",
  },
};

const faqData = [
  {
    question: "How much protein per day to build muscle?",
    answer:
      "Research consistently shows 0.7-1g per pound of bodyweight (1.6-2.2g per kg) is optimal for muscle building. For a 180lb man, that's 126-180g daily. The meta-analyses show diminishing returns above 0.82g/lb, but going up to 1g/lb provides a safety margin.",
  },
  {
    question: "Can you eat too much protein?",
    answer:
      "For healthy adults, protein intakes up to 1.5g/lb bodyweight have been studied with no adverse kidney effects. The real risk is not eating enough. However, if you have pre-existing kidney disease, consult your doctor before a high-protein diet.",
  },
  {
    question: "Does protein timing matter?",
    answer:
      "Somewhat. Research shows distributing protein across 4-5 meals (25-40g each) is better than eating it all at once. The 'anabolic window' post-workout is real but much wider than previously thought — aim for protein within 2-3 hours of training.",
  },
  {
    question: "How much protein per meal?",
    answer:
      "Research suggests 25-40g per meal optimally stimulates muscle protein synthesis. Eating more than 40g in one sitting isn't wasted — it's just used for other bodily functions. For practical purposes, aim for 30g+ per meal across 4-5 meals.",
  },
  {
    question: "Do I need more protein if I'm cutting?",
    answer:
      "Yes. When in a calorie deficit, your protein needs increase to preserve muscle. Bump up to 1-1.2g per pound of bodyweight during a cut. The leaner you get, the higher your protein should be relative to bodyweight.",
  },
];

// Reference data
const proteinTargets = [
  {
    goal: "Sedentary Adult",
    range: "0.36g/lb",
    metric: "0.8g/kg",
    source: "RDA Minimum",
    note: "Bare minimum to avoid deficiency. Not enough for anyone who lifts.",
    color: "text-zinc-400",
    bgColor: "bg-zinc-800",
  },
  {
    goal: "Maintain Muscle",
    range: "0.5-0.7g/lb",
    metric: "1.2-1.6g/kg",
    source: "ISSN Position Stand",
    note: "Enough for trained individuals who want to keep what they have.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    goal: "Build Muscle",
    range: "0.7-1g/lb",
    metric: "1.6-2.2g/kg",
    source: "Meta-analysis (Morton et al. 2018)",
    note: "The sweet spot. Supported by the largest body of research.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    goal: "Cutting / Fat Loss",
    range: "1-1.2g/lb",
    metric: "2.2-2.6g/kg",
    source: "Helms et al. 2014",
    note: "Higher protein during a deficit preserves muscle and keeps you full.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    goal: "Extreme Cut / Contest Prep",
    range: "1.2-1.4g/lb",
    metric: "2.6-3.1g/kg",
    source: "Natural bodybuilding research",
    note: "Only needed when getting very lean (<10% body fat).",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
];

// Example calculations for common bodyweights
const bodyweightExamples = [
  { weight: 140, build: 98, maintain: 84, cut: 154 },
  { weight: 160, build: 112, maintain: 96, cut: 176 },
  { weight: 180, build: 126, maintain: 108, cut: 198 },
  { weight: 200, build: 140, maintain: 120, cut: 220 },
  { weight: 220, build: 154, maintain: 132, cut: 242 },
];

export default function HowMuchProteinPage() {
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
          How Much Protein{" "}
          <span className="text-green-500">Per Day</span>?
        </h1>
        <p className="text-zinc-400">
          The RDA says 0.36g/lb. Gym bros say 1g/lb. The research says something
          in between. Here&apos;s exactly what you need based on your weight and goal.
        </p>
      </header>

      {/* TL;DR */}
      <section className="mb-10 rounded-2xl border-2 border-green-500/20 bg-green-500/5 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-green-400">
          TL;DR — The Quick Answer
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-blue-400">
              0.7g
            </div>
            <div className="text-xs text-zinc-500">per lb / minimum for lifters</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-green-400">
              1g
            </div>
            <div className="text-xs text-zinc-500">per lb / the gold standard</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-yellow-400">
              1.2g
            </div>
            <div className="text-xs text-zinc-500">per lb / when cutting</div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-zinc-400">
          If you weigh 180 lbs and lift regularly: eat <strong className="text-green-400">126-180g protein</strong> daily.
        </p>
      </section>

      {/* PROTEIN TARGETS TABLE */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Protein Targets by <span className="text-green-500">Goal</span>
        </h2>
        <div className="space-y-3">
          {proteinTargets.map((target) => (
            <div
              key={target.goal}
              className={`rounded-xl border border-zinc-800 ${target.bgColor} p-4`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className={`font-heading text-base font-bold uppercase ${target.color}`}>
                  {target.goal}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-lg font-bold ${target.color}`}>
                    {target.range}
                  </span>
                  <span className="text-xs text-zinc-600">({target.metric})</span>
                </div>
              </div>
              <p className="text-sm text-zinc-400">{target.note}</p>
              <p className="mt-1 text-xs text-zinc-600">Source: {target.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LOOKUP TABLE */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Quick Lookup: <span className="text-green-500">By Body Weight</span>
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Body Weight
                </th>
                <th className="px-4 py-3 text-center font-heading text-xs font-bold uppercase tracking-wider text-blue-400">
                  Maintain
                </th>
                <th className="px-4 py-3 text-center font-heading text-xs font-bold uppercase tracking-wider text-green-400">
                  Build Muscle
                </th>
                <th className="px-4 py-3 text-center font-heading text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Cutting
                </th>
              </tr>
            </thead>
            <tbody>
              {bodyweightExamples.map((row) => (
                <tr
                  key={row.weight}
                  className="border-b border-zinc-800/60 last:border-0"
                >
                  <td className="px-4 py-3 font-mono font-bold">
                    {row.weight} lbs
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-blue-400">
                    {row.maintain}g
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-green-400">
                    {row.build}g
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-yellow-400">
                    {row.cut}g
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Build = 0.7g/lb (lower bound). Most lifters benefit from going up to 1g/lb.
        </p>
      </section>

      {/* PROTEIN DISTRIBUTION */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          How to <span className="text-green-500">Distribute</span> It
        </h2>
        <p className="mb-4 text-zinc-400">
          Muscle protein synthesis (MPS) maxes out at about 25-40g per meal. Eating
          180g at dinner is less effective than spreading it across the day.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <h3 className="mb-3 font-heading text-base font-bold uppercase">
            Target: 180g/day → 4 Meals
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Breakfast", g: 40 },
              { label: "Lunch", g: 50 },
              { label: "Snack", g: 30 },
              { label: "Dinner", g: 60 },
            ].map((meal) => (
              <div key={meal.label} className="text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/5">
                  <span className="font-mono text-lg font-bold text-green-400">
                    {meal.g}g
                  </span>
                </div>
                <div className="text-xs font-medium text-zinc-400">
                  {meal.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-3 py-2">
            <p className="text-xs text-zinc-500">
              <strong className="text-zinc-400">Pro tip:</strong> Frontload protein at breakfast.
              Most guys eat carb-heavy breakfasts (cereal, toast) and try to make up
              protein at dinner. Start with eggs and you&apos;re already ahead.
            </p>
          </div>
        </div>
      </section>

      {/* COMMON MYTHS */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Myths <span className="text-red-400">Debunked</span>
        </h2>
        <div className="space-y-3">
          {[
            {
              myth: '"Your body can only absorb 30g of protein at once"',
              truth:
                "Your body absorbs all the protein you eat. The 30g number refers to the amount that maximally stimulates MPS in one sitting. The rest is still used — just for other functions.",
            },
            {
              myth: '"Too much protein damages your kidneys"',
              truth:
                "In healthy adults, high protein intake (up to 3.3g/kg) shows no adverse kidney effects in studies lasting 1-2 years. If you have existing kidney disease, consult a doctor.",
            },
            {
              myth: '"You need protein immediately after your workout"',
              truth:
                "The 'anabolic window' is real but much wider than 30 minutes. As long as you eat protein within 2-3 hours before or after training, you're fine.",
            },
            {
              myth: '"Plant protein doesn\'t count as much"',
              truth:
                "Plant proteins are less bioavailable and often incomplete. But if you eat a variety (beans + rice, for example), you get all essential amino acids. You may need ~20% more total grams.",
            },
          ].map((item) => (
            <div
              key={item.myth}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <div className="mb-2 flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm font-bold text-red-400">{item.myth}</p>
              </div>
              <p className="ml-6 text-sm text-zinc-400">{item.truth}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LINKS */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/nutrition/proteinmaxxing-guide"
          className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition-colors hover:border-green-500/40"
        >
          <Dumbbell className="mb-2 h-5 w-5 text-green-400" />
          <div className="text-sm font-bold">Proteinmaxxing Guide</div>
          <div className="text-xs text-zinc-500">
            The complete playbook for hitting 150g+
          </div>
        </Link>
        <Link
          href="/recipes"
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-colors hover:border-red-500/40"
        >
          <Target className="mb-2 h-5 w-5 text-red-400" />
          <div className="text-sm font-bold">30+ High Protein Recipes</div>
          <div className="text-xs text-zinc-500">
            40g+ protein per serving, under $3
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
              "How Much Protein Per Day? Science-Based Guide for Men",
            description:
              "Research-backed protein recommendations by body weight, activity level, and goal.",
            url: "https://proteinbro.net/nutrition/how-much-protein-per-day",
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
