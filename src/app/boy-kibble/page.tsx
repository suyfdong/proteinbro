import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Dumbbell,
  Beef,
  ChefHat,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calculator,
  Zap,
} from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "What is Boy Kibble? The Complete Guide to the TikTok Meal Trend (2026)",
  description:
    "Boy Kibble = ground beef + white rice. The TikTok gym bro meal that went viral in 2026. Full nutrition breakdown, macros, cost analysis, recipe, and variations. Everything you need to know.",
  keywords: [
    "boy kibble",
    "what is boy kibble",
    "boy kibble recipe",
    "boy kibble tiktok",
    "boy kibble meal",
    "boy kibble nutrition",
    "boy kibble macros",
    "ground beef and rice",
    "gym bro meal",
    "boy kibble trend",
  ],
  openGraph: {
    title: "What is Boy Kibble? The Complete Guide (2026)",
    description:
      "Ground beef + white rice. The viral TikTok gym bro meal explained — with full macros, cost breakdown, and recipes.",
    type: "article",
    url: "https://proteinbro.net/boy-kibble",
  },
  alternates: {
    canonical: "/boy-kibble",
  },
};

const faqData = [
  {
    question: "What is boy kibble?",
    answer:
      "Boy kibble is a simple meal of seasoned ground beef served over white rice. The term went viral on TikTok in early 2026 as a humorous way to describe the default meal many young men eat — cheap, high in protein, easy to make, and not particularly fancy. Think of it as the male equivalent of 'girl dinner.'",
  },
  {
    question: "Where did the term 'boy kibble' come from?",
    answer:
      "The term originated on TikTok in late 2025 / early 2026. It's a joke comparing the simplicity and repetitiveness of the meal to dog kibble — but for boys. The name caught on because it perfectly captures the no-frills approach many gym bros take to eating: functional fuel, not gourmet food.",
  },
  {
    question: "Is boy kibble healthy?",
    answer:
      "A standard serving of boy kibble (170g of 85/15 ground beef + 200g cooked white rice) provides approximately 52g protein, 680 calories, and costs about $2.30. It's a solid macro-friendly meal that covers protein needs. For better micronutrient balance, add vegetables or swap white rice for brown rice occasionally.",
  },
  {
    question: "How much protein is in boy kibble?",
    answer:
      "A typical plate of boy kibble has 45-55g of protein depending on the beef ratio and serving size. Using 170g of 85/15 ground beef gives you about 46g protein from the beef alone, plus 4-6g from the rice, totaling around 50-52g per plate.",
  },
  {
    question: "How much does boy kibble cost per serving?",
    answer:
      "Boy kibble costs approximately $2.00-3.00 per serving depending on beef prices in your area and the lean/fat ratio you buy. 80/20 ground beef is the cheapest option. Buying in bulk or on sale can bring the cost under $2.00 per meal.",
  },
  {
    question: "What's the difference between boy kibble and girl dinner?",
    answer:
      "Girl dinner (viral in 2023) typically refers to a random assortment of snacks, cheese, crackers, and small bites assembled as a meal. Boy kibble is the opposite: a single, protein-heavy, utilitarian dish designed for function over aesthetics. Girl dinner is about variety and vibes; boy kibble is about protein and efficiency.",
  },
];

function TableOfContents() {
  const sections = [
    { id: "what", label: "What is Boy Kibble?" },
    { id: "origin", label: "Where It Came From" },
    { id: "recipe", label: "The Original Recipe" },
    { id: "nutrition", label: "Full Nutrition Breakdown" },
    { id: "cost", label: "Cost Analysis" },
    { id: "variations", label: "Variations & Upgrades" },
    { id: "mistakes", label: "Common Mistakes" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav className="rounded-xl border-2 border-zinc-800 bg-zinc-900/50 p-5">
      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        In this guide
      </div>
      <ol className="space-y-2">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-green-400"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-800 font-mono text-[10px] font-bold text-zinc-500">
                {i + 1}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function NutritionTable() {
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-zinc-800">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">
              Component
            </th>
            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
              Beef (170g, 85/15)
            </th>
            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">
              Rice (200g cooked)
            </th>
            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-green-500/70">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Calories", beef: "413", rice: "260", total: "673", highlight: false },
            { label: "Protein", beef: "45.9g", rice: "5.4g", total: "51.3g", highlight: true },
            { label: "Fat", beef: "24.5g", rice: "0.6g", total: "25.1g", highlight: false },
            { label: "Carbs", beef: "0g", rice: "57g", total: "57g", highlight: false },
            { label: "Fiber", beef: "0g", rice: "0.8g", total: "0.8g", highlight: false },
            { label: "Iron", beef: "5.1mg", rice: "3.6mg", total: "8.7mg", highlight: false },
            { label: "Zinc", beef: "11.7mg", rice: "1.6mg", total: "13.3mg", highlight: false },
          ].map((row) => (
            <tr key={row.label} className={`border-b border-zinc-800/60 ${row.highlight ? "bg-green-500/5" : ""}`}>
              <td className={`px-4 py-2.5 font-semibold ${row.highlight ? "text-green-400" : "text-zinc-300"}`}>
                {row.label}
              </td>
              <td className="px-4 py-2.5 text-right font-mono tabular-nums text-zinc-400">{row.beef}</td>
              <td className="px-4 py-2.5 text-right font-mono tabular-nums text-zinc-400">{row.rice}</td>
              <td className={`px-4 py-2.5 text-right font-mono font-bold tabular-nums ${row.highlight ? "text-green-400" : "text-zinc-200"}`}>
                {row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BoyKibblePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What is Boy Kibble? The Complete Guide to the TikTok Meal Trend",
      description:
        "Comprehensive guide to boy kibble — the viral TikTok gym bro meal of ground beef and rice. Nutrition, macros, cost, recipe, and variations.",
      author: { "@type": "Organization", name: "ProteinBro" },
      publisher: { "@type": "Organization", name: "ProteinBro" },
      datePublished: "2026-03-08",
      dateModified: "2026-03-08",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* NAV */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          ProteinBro
        </Link>

        {/* HEADER */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs font-semibold text-orange-400">
              <Flame className="h-3 w-3" />
              Trending
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-400">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
            <span className="text-xs text-zinc-600">Updated March 2026</span>
          </div>

          <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            What is <span className="text-orange-400">Boy Kibble</span>?
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            The complete guide to the TikTok meal trend that has every gym bro
            eating ground beef and rice — and every girlfriend questioning their
            life choices. Full nutrition breakdown, macros, cost analysis, the
            original recipe, and 10+ variations.
          </p>
        </header>

        {/* TABLE OF CONTENTS */}
        <div className="mb-10">
          <TableOfContents />
        </div>

        {/* TLDR BOX */}
        <div className="mb-10 rounded-xl border-2 border-green-500/20 bg-green-500/5 p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-400">
            <Zap className="h-4 w-4" />
            TL;DR
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Boy kibble = seasoned ground beef + white rice. It went viral on
            TikTok in January 2026 as a joke about the default gym bro meal.
            One plate gives you <strong className="text-green-400">~52g protein for ~$2.30</strong>.
            It&apos;s cheap, easy, high-protein, and proudly
            ugly. Think of it as the male answer to &quot;girl dinner.&quot;
          </p>
        </div>

        {/* ========== ARTICLE BODY ========== */}
        <article className="space-y-10">
          {/* SECTION 1: WHAT */}
          <section id="what">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <Flame className="h-5 w-5 text-orange-400" />
              What is Boy Kibble?
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                Boy kibble is ground beef — usually seasoned with basic spices —
                served over white rice. That&apos;s it. No garnish, no plating, no
                Instagram filter. Just protein and carbs in a bowl, eaten
                standing over the kitchen counter.
              </p>
              <p>
                The term &quot;boy kibble&quot; is intentionally self-deprecating. It
                compares the meal to{" "}
                <strong className="text-zinc-200">dog food (kibble)</strong> —
                because let&apos;s be honest, a pile of brown meat on white rice
                doesn&apos;t exactly look like a Michelin-star dish. But that&apos;s the
                whole point.
              </p>
              <p>
                Boy kibble isn&apos;t about aesthetics. It&apos;s about{" "}
                <strong className="text-zinc-200">function</strong>:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Dumbbell, color: "text-green-400", border: "border-green-500/20", bg: "bg-green-500/5", label: "40-55g protein", sub: "per plate" },
                  { icon: DollarSign, color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5", label: "$2-3", sub: "per serving" },
                  { icon: Clock, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5", label: "15-20 min", sub: "total cook time" },
                ].map((stat) => (
                  <div key={stat.label} className={`flex flex-col items-center rounded-xl border ${stat.border} ${stat.bg} p-4 text-center`}>
                    <stat.icon className={`mb-2 h-5 w-5 ${stat.color}`} />
                    <div className={`font-mono text-lg font-bold ${stat.color}`}>{stat.label}</div>
                    <div className="text-xs text-zinc-500">{stat.sub}</div>
                  </div>
                ))}
              </div>
              <p>
                If &quot;girl dinner&quot; (the 2023 TikTok trend of aesthetic snack
                plates) was about vibes, boy kibble is the anti-vibe meal. It&apos;s
                what happens when you optimize purely for protein-per-dollar and
                don&apos;t care what anyone thinks about your plate.
              </p>
            </div>
          </section>

          {/* SECTION 2: ORIGIN */}
          <section id="origin">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Where Did Boy Kibble Come From?
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                The boy kibble trend exploded on TikTok in{" "}
                <strong className="text-zinc-200">January 2026</strong>, though
                the concept has existed forever — gym bros have been eating
                ground beef and rice since bodybuilding became a thing.
              </p>
              <p>
                What changed was the{" "}
                <strong className="text-zinc-200">name</strong>. Once someone
                called it &quot;boy kibble,&quot; the meme took off. The humor resonated
                because it acknowledged something millions of guys already knew:
                their go-to meal looks like pet food, and they genuinely don&apos;t
                care.
              </p>

              <div className="rounded-xl border-2 border-zinc-800 bg-zinc-900/50 p-5">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Timeline
                </div>
                <div className="space-y-3">
                  {[
                    { date: "Late 2025", event: "Early TikTok videos joking about 'what guys eat' featuring ground beef + rice" },
                    { date: "Jan 2026", event: "The term 'boy kibble' coined and goes viral. Videos hit millions of views." },
                    { date: "Feb 2026", event: "Mainstream media picks it up — Fortune, CNN, Newsweek all cover the trend." },
                    { date: "Mar 2026", event: "Google Trends shows 'boy kibble' as a breakout search term. You're reading this article." },
                  ].map((item) => (
                    <div key={item.date} className="flex gap-3">
                      <div className="w-20 shrink-0 font-mono text-xs font-bold text-green-400">{item.date}</div>
                      <div className="text-sm text-zinc-400">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The trend sits at the intersection of several bigger cultural
                currents:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  "The proteinmaxxing movement — 71% of Americans are actively trying to eat more protein (2024 data)",
                  "Male cooking content breaking away from the 'chef' aesthetic toward functional, no-BS meals",
                  "Gen Z humor that's self-aware and anti-pretentious",
                  "Rising food costs pushing people toward simple, budget-friendly meals",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 3: RECIPE */}
          <section id="recipe">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <ChefHat className="h-5 w-5 text-red-400" />
              The Original Boy Kibble Recipe
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                This is the canonical boy kibble recipe. No fancy techniques. If
                you can brown meat and boil water, you&apos;re qualified.
              </p>
              <Link
                href="/boy-kibble/original-recipe"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300"
              >
                Full recipe with meal prep instructions & ratio guide <ArrowRight className="h-3 w-3" />
              </Link>

              {/* Recipe card */}
              <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold uppercase text-zinc-100">
                    Classic Boy Kibble
                  </h3>
                  <div className="flex gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 20 min
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> ~$2.30
                    </span>
                  </div>
                </div>

                {/* Macro bar */}
                <div className="mb-5 grid grid-cols-4 gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
                  {[
                    { label: "Calories", value: "673", color: "text-orange-400" },
                    { label: "Protein", value: "51g", color: "text-green-400" },
                    { label: "Fat", value: "25g", color: "text-zinc-300" },
                    { label: "Carbs", value: "57g", color: "text-zinc-300" },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className={`font-mono text-lg font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Ingredients */}
                <div className="mb-5">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Ingredients
                  </h4>
                  <ul className="space-y-1.5 text-sm text-zinc-300">
                    {[
                      "1 lb (450g) ground beef, 80/20 or 85/15",
                      "2 cups white rice (uncooked) — makes ~4 servings of rice",
                      "Salt, pepper, garlic powder",
                      "Optional: soy sauce, onion powder, paprika",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Instructions
                  </h4>
                  <ol className="space-y-3 text-sm text-zinc-300">
                    {[
                      { step: "Cook rice", detail: "Start your rice cooker or bring 4 cups water to boil, add 2 cups rice, cover, simmer 18 min. Done." },
                      { step: "Brown the beef", detail: "Medium-high heat. Skillet. Dump in the beef. Break it up with a spatula. Cook 8-10 minutes until browned. Drain the fat if you're cutting." },
                      { step: "Season", detail: "Salt, pepper, garlic powder. That's the base. Want more flavor? Add soy sauce and onion powder. Still not rocket science." },
                      { step: "Combine", detail: "Scoop rice into a bowl. Pile beef on top. Eat. Don't bother with a photo." },
                    ].map((item, i) => (
                      <li key={item.step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 font-mono text-xs font-bold text-green-400">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-zinc-200">{item.step}</div>
                          <div className="text-zinc-400">{item.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: NUTRITION */}
          <section id="nutrition">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <Dumbbell className="h-5 w-5 text-green-400" />
              Full Nutrition Breakdown
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                Here&apos;s the complete nutritional profile of one serving of boy
                kibble (170g cooked 85/15 ground beef + 200g cooked white rice):
              </p>

              <NutritionTable />

              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-bold text-green-400">
                  <Dumbbell className="h-4 w-4" />
                  The Protein Math
                </div>
                <p className="text-sm text-zinc-300">
                  At 51g protein per plate, eating boy kibble twice a day gives you{" "}
                  <strong>102g protein</strong> — already 60-65% of the daily
                  needs for a 180 lb lifter (0.8-1g per lb). Add a protein shake
                  and you&apos;re done.
                </p>
              </div>

              <p>
                <strong className="text-zinc-200">How does the beef ratio affect macros?</strong>{" "}
                The leaner the grind, the more protein and less fat per serving.
                But the difference isn&apos;t as dramatic as you&apos;d think:
              </p>

              <div className="overflow-x-auto rounded-xl border-2 border-zinc-800">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/80">
                      <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Ratio</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-widest text-green-500/70">Protein</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">Fat</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-widest text-zinc-500">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ratio: "73/27", protein: "48.1g", fat: "39.5g", cal: "785" },
                      { ratio: "80/20", protein: "49.8g", fat: "30.9g", cal: "722" },
                      { ratio: "85/15", protein: "51.3g", fat: "25.1g", cal: "673" },
                      { ratio: "90/10", protein: "52.3g", fat: "19.5g", cal: "629" },
                      { ratio: "93/7", protein: "53.7g", fat: "14.9g", cal: "593" },
                    ].map((row) => (
                      <tr key={row.ratio} className="border-b border-zinc-800/60">
                        <td className="px-4 py-2.5 font-mono font-bold text-zinc-300">{row.ratio}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums text-green-400">{row.protein}</td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums text-zinc-400">{row.fat}</td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums text-zinc-400">{row.cal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-zinc-600">
                * All values include 200g cooked white rice. Beef is 170g cooked weight.
              </p>

              <p>
                Want to dial in the exact numbers for your serving size?{" "}
                <Link href="/tools/ground-beef-macro-calculator" className="font-semibold text-green-400 underline decoration-green-500/30 underline-offset-2 transition-colors hover:text-green-300">
                  Use our Ground Beef Macro Calculator
                </Link>
                .
              </p>
            </div>
          </section>

          {/* SECTION 5: COST */}
          <section id="cost">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              Cost Analysis: How Cheap is Boy Kibble?
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                One of the biggest reasons boy kibble took off is the price. In
                a world where a Chipotle bowl costs $12+, boy kibble is
                aggressively cheap.
              </p>

              <div className="rounded-2xl border-2 border-yellow-500/20 bg-yellow-500/5 p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow-400">
                  Cost Breakdown (1 serving)
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: "Ground beef (170g of 80/20 @ $5.49/lb)", cost: "$2.06" },
                    { item: "White rice (75g uncooked @ $1.50/lb)", cost: "$0.25" },
                    { item: "Seasoning", cost: "$0.05" },
                  ].map((row) => (
                    <div key={row.item} className="flex items-center justify-between border-b border-yellow-500/10 pb-2">
                      <span className="text-zinc-300">{row.item}</span>
                      <span className="font-mono font-bold text-yellow-400">{row.cost}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-zinc-100">Total per serving</span>
                    <span className="font-mono text-lg font-black text-yellow-400">$2.36</span>
                  </div>
                </div>
              </div>

              <p>
                That&apos;s <strong className="text-zinc-200">51g of protein for $2.36</strong>.
                For context:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  "Chipotle chicken bowl: ~42g protein for $12-14",
                  "Chick-fil-A 12-ct nuggets: ~40g protein for $7.25",
                  "Protein shake (2 scoops): ~50g protein for $2-3",
                  "Boy kibble: ~51g protein for $2.36",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Boy kibble wins on protein-per-dollar against almost everything
                except eggs and canned tuna. But unlike eggs, it actually scales
                — you can meal prep 5 days of boy kibble in 30 minutes.
              </p>
            </div>
          </section>

          {/* SECTION 6: VARIATIONS */}
          <section id="variations">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <Beef className="h-5 w-5 text-red-400" />
              Boy Kibble Variations & Upgrades
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                Classic boy kibble is great, but even gym bros get bored. Here
                are 10 variations that keep the spirit (cheap, easy, high
                protein) while changing the flavor profile:
              </p>
              <Link
                href="/boy-kibble/variations"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300"
              >
                See all variations with full macros & comparison table <ArrowRight className="h-3 w-3" />
              </Link>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Korean Kibble", desc: "Add gochujang, sesame oil, green onion. Top with a fried egg.", tag: "+5g protein" },
                  { name: "Taco Kibble", desc: "Taco seasoning, salsa, shredded cheese. Optional: hot sauce.", tag: "Fan favorite" },
                  { name: "Teriyaki Kibble", desc: "Soy sauce, brown sugar, ginger, garlic. Broccoli on the side.", tag: "+fiber" },
                  { name: "Italian Kibble", desc: "Marinara sauce, Italian seasoning, parmesan. Basically deconstructed bolognese.", tag: "Comfort" },
                  { name: "Curry Kibble", desc: "Curry powder, coconut milk, diced tomatoes. Serve over jasmine rice.", tag: "Level up" },
                  { name: "Philly Kibble", desc: "Sauteed peppers & onions, provolone melted on top. No bun needed.", tag: "+flavor" },
                  { name: "Sriracha Lime Kibble", desc: "Sriracha, lime juice, cilantro. Light and spicy.", tag: "Fresh" },
                  { name: "BBQ Kibble", desc: "BBQ sauce, caramelized onions. Add cheddar if bulking.", tag: "Easy" },
                  { name: "Greek Kibble", desc: "Tzatziki, diced cucumber, feta. Swap rice for pita if you want.", tag: "Different" },
                  { name: "Breakfast Kibble", desc: "Scrambled eggs mixed in, everything bagel seasoning. AM gains.", tag: "+15g protein" },
                ].map((v) => (
                  <div key={v.name} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-semibold text-zinc-200">{v.name}</h4>
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-500">{v.tag}</span>
                    </div>
                    <p className="text-sm">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: MISTAKES */}
          <section id="mistakes">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Common Boy Kibble Mistakes
            </h2>
            <div className="space-y-3 text-zinc-400">
              {[
                {
                  icon: XCircle,
                  iconColor: "text-red-400",
                  title: "Not draining the fat (when cutting)",
                  desc: "If you're trying to lose weight, drain the grease from 80/20 beef. It removes ~45% of the fat. If you're bulking, keep it.",
                },
                {
                  icon: XCircle,
                  iconColor: "text-red-400",
                  title: "Weighing raw instead of cooked",
                  desc: "Beef loses ~25% weight when cooked. If your meal plan says 170g beef, that's cooked weight. 170g raw becomes ~128g cooked.",
                },
                {
                  icon: XCircle,
                  iconColor: "text-red-400",
                  title: "No vegetables ever",
                  desc: "Boy kibble is fine as a base, but eating only beef and rice long-term means missing fiber, vitamin C, and other micronutrients. Throw in some frozen broccoli or spinach. It takes 3 minutes.",
                },
                {
                  icon: XCircle,
                  iconColor: "text-red-400",
                  title: "Using the cheapest beef for flavor",
                  desc: "70/30 has the most fat and the most 'beefy' flavor, but it's also the least protein-dense. If you're eating this for the macros, 85/15 is the sweet spot of flavor and function.",
                },
                {
                  icon: CheckCircle,
                  iconColor: "text-green-400",
                  title: "Pro move: batch cook on Sunday",
                  desc: "Brown 3-4 lbs of beef, make a huge pot of rice, portion into containers. 30 minutes of work = 5 days of meals. This is the way.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <item.icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.iconColor}`} />
                  <div>
                    <div className="mb-1 text-sm font-semibold text-zinc-200">{item.title}</div>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA: Calculator */}
          <div className="rounded-2xl border-2 border-green-500/20 bg-gradient-to-r from-green-500/10 to-zinc-900 p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-heading text-lg font-bold uppercase">
                    Dial in your macros
                  </div>
                  <p className="text-sm text-zinc-400">
                    Calculate exact nutrition for any beef ratio and serving size.
                  </p>
                </div>
              </div>
              <Link
                href="/tools/ground-beef-macro-calculator"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400"
              >
                Beef Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* SECTION 8: FAQ */}
          <section id="faq">
            <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div key={faq.question} className="border-b border-zinc-800/60 pb-5 last:border-0">
                  <h3 className="mb-2 font-semibold text-zinc-200">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* NEWSLETTER CTA */}
        <div className="mt-12 rounded-2xl border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 via-zinc-900 to-zinc-950 p-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-2 font-heading text-2xl font-bold uppercase">
              Weekly <span className="text-green-500">Kibble</span>
            </h2>
            <p className="mb-5 text-sm text-zinc-400">
              One email per week. 5-meal rotation, shopping list, protein
              spotlight. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            <Link href="/" className="text-zinc-500 hover:text-zinc-300">
              ProteinBro.net
            </Link>{" "}
            — Simple High Protein Meals for Men
          </p>
        </footer>
      </div>
    </>
  );
}
