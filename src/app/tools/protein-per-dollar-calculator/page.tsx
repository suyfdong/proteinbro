import type { Metadata } from "next";
import ProteinPerDollarCalculator from "./calculator";
import { DollarSign, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, getCategoryContent } from "@/data/categories";

export const metadata: Metadata = {
  title: "Protein Per Dollar Calculator - Find the Cheapest Protein Sources",
  description:
    "Compare 20+ protein sources ranked by grams of protein per dollar. Edit prices to match your local store. Find the cheapest protein for muscle building. Free tool from ProteinBro.",
  keywords: [
    "protein per dollar",
    "cheapest protein source",
    "protein cost comparison",
    "cheapest protein per gram",
    "protein per dollar calculator",
    "cheapest protein for muscle building",
    "protein cost calculator",
    "cheap high protein foods",
    "best protein value",
    "protein price comparison",
  ],
  openGraph: {
    title: "Protein Per Dollar Calculator",
    description:
      "Compare 20+ protein sources ranked by cost efficiency. Find the cheapest gains.",
    type: "website",
    url: "https://proteinbro.net/tools/protein-per-dollar-calculator",
  },
  alternates: {
    canonical: "/tools/protein-per-dollar-calculator",
  },
};

const faqData = [
  {
    question: "What is the cheapest source of protein?",
    answer:
      "Based on US national average prices (March 2026), the cheapest protein sources are: whole eggs (~21g protein per dollar), whole milk (~28g per dollar), chicken thighs (~47g per dollar), and canned tuna (~28g per dollar). However, prices vary significantly by region and store — use our calculator with your local prices for accurate rankings.",
  },
  {
    question: "How do you calculate protein per dollar?",
    answer:
      "We calculate protein per dollar by dividing the total grams of protein in a package by its price. For example, 1 lb of chicken breast at $3.99 contains about 140g of protein (31g per 100g × 453.6g per lb ÷ 100), giving you approximately 35.2g of protein per dollar.",
  },
  {
    question: "Is whey protein powder cheaper than real food?",
    answer:
      "It depends on the brand and serving size. A typical whey protein scoop provides about 25g protein for $0.90, which is 27.5g per dollar. This is competitive with chicken breast and canned tuna but usually more expensive than whole eggs or chicken thighs. Whey is best as a convenience supplement, not a primary protein source.",
  },
  {
    question: "What is the cheapest high-protein food for bodybuilding?",
    answer:
      "For bodybuilding on a budget, the top picks are: chicken thighs (best overall value in meat), whole eggs (cheapest complete protein), canned tuna (highest protein density for the price), cottage cheese (cheap dairy protein), and pork chops (often on sale). Ground beef 80/20 is also excellent when bought in bulk or on sale.",
  },
  {
    question: "Should I buy lean or regular ground beef for protein?",
    answer:
      "Regular 80/20 ground beef gives you more protein per dollar than lean 93/7 because it's significantly cheaper while having nearly the same protein content (26.1g vs 28.4g per 100g). If you're cutting, buy 80/20 and drain the fat — you'll get lean-ground-beef macros at regular-ground-beef prices.",
  },
  {
    question: "Are plant proteins cheaper than animal proteins?",
    answer:
      "Per gram of protein, some plant sources like lentils and black beans are very cheap. However, they also come with significant carbs and are incomplete proteins (missing some essential amino acids). For pure protein-per-dollar, chicken thighs and eggs typically beat plant sources when you factor in protein quality.",
  },
];

export default function ProteinPerDollarPage() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-yellow-500/20 bg-yellow-500/10">
              <DollarSign className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-green-500">
                Free Tool
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Protein Per Dollar Calculator
              </h1>
            </div>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-400">
            20+ protein sources ranked by how much protein you get for every
            dollar. Edit prices to match your local store.{" "}
            <span className="text-zinc-300">
              Higher number = better value.
            </span>{" "}
            Data from USDA FoodData Central.
          </p>
        </header>

        {/* CALCULATOR */}
        <ProteinPerDollarCalculator />

        {/* FAQ */}
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

        {/* BROWSE RECIPES BY PROTEIN */}
        <section className="mt-12 border-t border-zinc-800 pt-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Recipes by Protein Source
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.slice(0, 6).map((cat) => {
              const { stats } = getCategoryContent(cat);
              return (
                <Link
                  key={cat.slug}
                  href={`/recipes/${cat.slug}`}
                  className="group flex items-center gap-2 rounded-xl border border-zinc-800 p-3 transition-colors hover:border-green-500/30 hover:bg-green-500/[0.03]"
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-zinc-300 group-hover:text-green-400">
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-zinc-600">
                      {stats.totalPages} recipes
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/recipes"
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-400 hover:text-green-300"
          >
            View all recipes <ArrowRight className="h-3 w-3" />
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            Nutrition data from USDA FoodData Central. Prices are US national
            averages and may vary by region. Edit prices for accurate local
            rankings.
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
