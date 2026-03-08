import type { Metadata } from "next";
import MealPrepCostCalculator from "./calculator";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meal Prep Cost Calculator - Weekly Grocery Budget Planner",
  description:
    "Calculate your weekly meal prep cost, per-meal price, and macros. Build a grocery list, adjust prices to match your store, and see exactly what you're spending per meal. Free tool from ProteinBro.",
  keywords: [
    "meal prep cost calculator",
    "meal prep budget",
    "weekly meal prep cost",
    "cheap meal prep",
    "meal prep grocery list",
    "cost per meal calculator",
    "budget meal prep",
    "meal prep cost breakdown",
    "cheap high protein meal prep",
    "meal prep shopping list",
  ],
  openGraph: {
    title: "Meal Prep Cost Calculator",
    description:
      "Build your grocery list and see exactly what you're spending per meal. Free budget planner for gym bros.",
    type: "website",
    url: "https://proteinbro.net/tools/meal-prep-cost-calculator",
  },
  alternates: {
    canonical: "/tools/meal-prep-cost-calculator",
  },
};

const faqData = [
  {
    question: "How much does meal prep cost per week?",
    answer:
      "A typical high-protein meal prep costs $30-60 per week for 10-14 meals, or roughly $2-5 per meal. The exact cost depends on your protein sources (chicken thighs are cheapest, beef is pricier), whether you buy in bulk, and your local grocery prices. Use our calculator with your actual prices for an accurate estimate.",
  },
  {
    question: "What is the cheapest meal prep for bodybuilding?",
    answer:
      "The cheapest high-protein meal prep combines chicken thighs ($2.49/lb), white rice ($0.90/lb), and frozen vegetables ($1.99/bag). This combo gives you about 40g protein per meal at roughly $2.00-2.50 per serving. Ground beef 80/20 with rice (classic boy kibble) is also very budget-friendly at around $2.50-3.00 per meal.",
  },
  {
    question: "How do I calculate cost per meal?",
    answer:
      "Divide your total grocery cost by the number of meals you'll make. For example: $45 in groceries ÷ 10 meals = $4.50 per meal. Our calculator does this automatically — just add your ingredients, set quantities and prices, and choose how many meals you'll portion out.",
  },
  {
    question: "Is meal prepping actually cheaper than eating out?",
    answer:
      "Yes, significantly. A typical restaurant meal costs $12-18, fast food is $8-12, and a home-cooked meal prep serving costs $2-5. Even buying higher-quality ingredients, meal prepping saves 60-80% compared to eating out. For a gym bro eating 3-4 meals per day, that's $200-400/month in savings.",
  },
  {
    question: "How much protein can I get for $50 a week?",
    answer:
      "With $50/week and smart shopping, you can get 800-1200g of protein per week (115-170g/day). Focus on chicken thighs, eggs, canned tuna, and ground beef 80/20. Add rice and frozen vegetables for complete meals. That's enough protein for most lifters at a fraction of the cost of supplements alone.",
  },
  {
    question: "What's included in the macro calculations?",
    answer:
      "Our calculator uses USDA FoodData Central nutrition data for each ingredient. It sums up total calories, protein, carbs, and fat from all your ingredients, then divides by your meal count to show per-meal macros. Note: actual macros may vary slightly based on cooking method, trimming, and exact portion sizes.",
  },
];

export default function MealPrepCostCalculatorPage() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-blue-500/20 bg-blue-500/10">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-green-500">
                Free Tool
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Meal Prep Cost Calculator
              </h1>
            </div>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-400">
            Build your weekly grocery list, adjust prices to match your local
            store, and see exactly what you&apos;re spending{" "}
            <span className="text-zinc-300">per meal</span>. Pre-loaded with a
            classic Boy Kibble cart to get you started.
          </p>
        </header>

        {/* CALCULATOR */}
        <MealPrepCostCalculator />

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

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            Nutrition data from USDA FoodData Central. Prices are US national
            averages and may vary by region. Edit prices for accurate local
            calculations.
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
