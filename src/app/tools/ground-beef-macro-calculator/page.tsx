import type { Metadata } from "next";
import GroundBeefCalculator from "./calculator";
import { Beef, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RECIPES } from "@/data/recipes";

export const metadata: Metadata = {
  title: "Ground Beef Macro Calculator - Nutrition by Lean/Fat Ratio",
  description:
    "Calculate exact macros for any ground beef ratio (70/30 to 96/4). Protein, fat, calories, iron, zinc, B12 per serving. Compare all grades side by side. Free tool from ProteinBro.",
  keywords: [
    "ground beef macros",
    "ground beef nutrition calculator",
    "ground beef protein",
    "80/20 ground beef macros",
    "93/7 ground beef nutrition",
    "ground beef calories",
    "lean ground beef protein",
    "ground beef macro calculator",
  ],
  openGraph: {
    title: "Ground Beef Macro Calculator",
    description:
      "Calculate exact macros for any ground beef lean/fat ratio. Free tool for gym bros.",
    type: "website",
    url: "https://proteinbro.net/tools/ground-beef-macro-calculator",
  },
  alternates: {
    canonical: "/tools/ground-beef-macro-calculator",
  },
};

const faqData = [
  {
    question: "How much protein is in 80/20 ground beef?",
    answer:
      "Cooked 80/20 ground beef contains approximately 26.1g of protein per 100g (about 44.4g per 6oz serving). It also provides 272 calories, 17.8g total fat, and significant amounts of iron, zinc, and vitamin B12.",
  },
  {
    question: "What is the leanest ground beef you can buy?",
    answer:
      "The leanest widely available ground beef is 96/4 (96% lean, 4% fat), with 29.2g protein and only 5.6g fat per 100g cooked. However, 93/7 is more commonly found in most grocery stores and offers 28.4g protein per 100g.",
  },
  {
    question: "Is 80/20 or 90/10 ground beef better for muscle building?",
    answer:
      "For muscle building (bulking), 80/20 is often better — it has nearly the same protein (26.1g vs 27.6g per 100g) but more calories from fat, making it easier to hit a caloric surplus. For cutting, 90/10 or leaner gives you more protein per calorie.",
  },
  {
    question: "How much does ground beef shrink when cooked?",
    answer:
      "Ground beef typically loses about 25% of its weight during cooking due to moisture and fat loss. So 170g (6oz) of raw ground beef will yield approximately 128g (4.5oz) of cooked beef. All nutrition data in this calculator is based on cooked weight.",
  },
  {
    question: "Does draining ground beef reduce calories?",
    answer:
      "Yes. Draining and rinsing cooked ground beef can remove up to 45% of the fat content. For 80/20 beef, this can reduce calories from about 272 to roughly 215 per 100g while keeping most of the protein intact.",
  },
];

export default function GroundBeefMacroCalculatorPage() {
  const jsonLd = {
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
  };

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

        {/* PAGE HEADER */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-red-500/20 bg-red-500/10">
              <Beef className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-green-500">
                Free Tool
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Ground Beef Macro Calculator
              </h1>
            </div>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-400">
            Pick your grind, set your serving size, get exact macros. All data
            from{" "}
            <span className="text-zinc-300">USDA FoodData Central</span> for
            cooked, pan-browned ground beef. No guessing.
          </p>
        </header>

        {/* CALCULATOR */}
        <GroundBeefCalculator />

        {/* FAQ SECTION */}
        <section className="mt-12 border-t border-zinc-800 pt-10">
          <h2 className="mb-6 text-lg font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((faq) => (
              <div key={faq.question}>
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

        {/* RELATED RECIPES */}
        <section className="mt-12 border-t border-zinc-800 pt-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Ground Beef Recipes
          </h2>
          <div className="space-y-2">
            {RECIPES.filter((r) =>
              r.tags.some((t) => t.toLowerCase().includes("ground beef"))
            )
              .slice(0, 5)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-zinc-800 px-4 py-3 transition-colors hover:border-green-500/30 hover:bg-green-500/[0.03]"
                >
                  <span className="font-heading text-sm font-bold uppercase text-zinc-300 group-hover:text-green-400">
                    {r.title}
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-green-400">{r.perServing.protein}g</span>
                    <span className="font-mono text-yellow-400">${r.costPerServing.toFixed(2)}</span>
                    <ArrowRight className="h-3 w-3 text-zinc-700 group-hover:text-green-400" />
                  </div>
                </Link>
              ))}
          </div>
          <Link
            href="/recipes/ground-beef"
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-400 hover:text-green-300"
          >
            View all ground beef recipes <ArrowRight className="h-3 w-3" />
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            Nutrition data sourced from USDA FoodData Central. Values are for
            cooked (pan-browned), drained ground beef. Individual results may
            vary.
          </p>
          <p className="mt-2">
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
