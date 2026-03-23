import type { Metadata } from "next";
import WeeklyMealGenerator from "./generator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Weekly Meal Generator — Auto-Build Your High Protein Meal Plan",
  description:
    "Generate a 5-day high protein meal rotation based on your protein goal and budget. Automatic shopping list, macros, and cost breakdown. Free tool from ProteinBro.",
  keywords: [
    "weekly meal generator",
    "meal plan generator",
    "high protein meal plan",
    "weekly meal planner",
    "meal prep planner",
    "protein meal plan generator",
    "bodybuilding meal plan",
    "weekly kibble generator",
    "free meal plan generator",
    "meal rotation planner",
  ],
  openGraph: {
    title: "Weekly Meal Generator — ProteinBro",
    description:
      "Auto-generate a 5-day meal rotation. Set your protein goal & budget.",
    type: "website",
    url: "https://proteinbro.net/tools/weekly-meal-generator",
  },
  alternates: {
    canonical: "/tools/weekly-meal-generator",
  },
};

const faqData = [
  {
    question: "How does the meal generator work?",
    answer:
      "Set your daily protein target and weekly budget. The generator picks meals from our database of 30+ recipes and 46+ combos that fit your constraints. It optimizes for variety (different proteins each day) while staying within your budget.",
  },
  {
    question: "Can I customize the generated plan?",
    answer:
      "Yes. After generating, you can lock meals you like and re-roll the rest. You can also exclude specific proteins if you have dietary restrictions.",
  },
  {
    question: "Is this really free?",
    answer:
      "Yes. The generator is completely free. No sign-up required. We may add premium features (save plans, export shopping lists) in the future, but the core generator will always be free.",
  },
];

export default function WeeklyMealGeneratorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      {/* Generator Component */}
      <WeeklyMealGenerator />

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-4 font-heading text-xl font-bold uppercase">FAQ</h2>
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
            "@type": "WebApplication",
            name: "Weekly Meal Generator",
            description:
              "Auto-generate a 5-day high protein meal rotation with shopping list.",
            url: "https://proteinbro.net/tools/weekly-meal-generator",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
