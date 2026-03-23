import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Star,
  CheckCircle,
  XCircle,
  Flame,
  CookingPot,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Meal Prep Containers (2026) — Glass vs Plastic, Tested",
  description:
    "Best meal prep containers ranked. Glass vs plastic, single vs multi-compartment. We tested leak resistance, microwave safety, and durability. Top pick: Prep Naturals Glass 3-Pack ($24).",
  keywords: [
    "best meal prep containers",
    "meal prep containers glass",
    "meal prep containers with compartments",
    "best food storage containers",
    "glass meal prep containers",
    "meal prep container set",
    "bodybuilding meal prep containers",
    "best containers for meal prep 2026",
  ],
  openGraph: {
    title: "Best Meal Prep Containers — ProteinBro",
    description:
      "Glass vs plastic tested. Top pick: Prep Naturals Glass ($24).",
    type: "article",
    url: "https://proteinbro.net/gear/meal-prep-containers",
  },
  alternates: {
    canonical: "/gear/meal-prep-containers",
  },
};

const containers = [
  {
    rank: 1,
    name: "Prep Naturals Glass 3-Compartment (5-Pack)",
    price: 24,
    material: "Glass",
    compartments: 3,
    rating: 4.6,
    bestFor: "Best overall for meal prep",
    pros: [
      "Borosilicate glass — won't stain or absorb odors",
      "3 compartments keep protein, carb, side separate",
      "Snap-lock lids are leak-proof",
      "Oven, microwave, freezer, dishwasher safe",
      "5-pack covers a full work week",
    ],
    cons: [
      "Heavier than plastic (glass)",
      "Can break if dropped",
    ],
    verdict:
      "The gold standard. Glass doesn't stain from tomato sauce or curry, compartments keep food separated, and they last years. Worth every penny.",
    badge: "Top Pick",
    badgeColor: "bg-green-500 text-zinc-950",
  },
  {
    rank: 2,
    name: "Rubbermaid Brilliance BPA-Free (10-Piece)",
    price: 19,
    material: "Plastic (Tritan)",
    compartments: 1,
    rating: 4.5,
    bestFor: "Best plastic option",
    pros: [
      "Crystal-clear so you can see what's inside",
      "Modular — lids and bases stack perfectly",
      "100% leak-proof and airtight",
      "BPA-free Tritan plastic",
      "Lighter than glass — better for transport",
    ],
    cons: [
      "Will stain from turmeric/tomato over time",
      "No compartments (single cavity)",
      "Plastic absorbs odors after months",
    ],
    verdict:
      "If you carry your meals in a bag, the lighter weight matters. Great seals, clear design. Just expect staining after 6+ months.",
    badge: "Best Plastic",
    badgeColor: "bg-blue-500 text-zinc-950",
  },
  {
    rank: 3,
    name: "Freshware 15-Pack 1-Compartment",
    price: 13,
    material: "Plastic (BPA-free)",
    compartments: 1,
    rating: 4.3,
    bestFor: "Bulk/disposable option",
    pros: [
      "15 containers for $13 — under $1 each",
      "Microwave and freezer safe",
      "Stackable and space-efficient",
      "Great for batch cooking large quantities",
    ],
    cons: [
      "Thin plastic — not durable long-term",
      "Lids don't seal as tightly",
      "Will warp in dishwasher over time",
      "No compartments",
    ],
    verdict:
      "The cheap bulk option. Use them for a few months, toss when they get gross, buy another set. At $0.87 each, they're practically disposable.",
    badge: "Budget Pick",
    badgeColor: "bg-yellow-500 text-zinc-950",
  },
  {
    rank: 4,
    name: "Bentgo Glass 2-Compartment (4-Pack)",
    price: 32,
    material: "Glass",
    compartments: 2,
    rating: 4.5,
    bestFor: "Compact glass option",
    pros: [
      "Slim design fits in lunch bags better than other glass",
      "Bamboo lid option looks premium",
      "2 compartments (protein + carb)",
      "Leak-proof silicone seal",
    ],
    cons: [
      "Only 4-pack (need a second set for 5 days)",
      "Most expensive per container",
      "2 compartments vs 3 (less separation)",
    ],
    verdict:
      "The premium choice if aesthetics matter to you. Great build quality, but you're paying more per container than Prep Naturals.",
    badge: "Premium Pick",
    badgeColor: "bg-purple-500 text-zinc-950",
  },
];

const faqData = [
  {
    question: "Glass or plastic meal prep containers?",
    answer:
      "Glass if you mainly eat at home or work (won't stain, lasts longer, microwave-safe). Plastic if you carry meals in a bag (lighter, won't break). Best compromise: glass for home, cheap plastic for travel.",
  },
  {
    question: "How many meal prep containers do I need?",
    answer:
      "Minimum 5 (one per workday). Ideally 10 — so you can prep a full week while last week's containers are in the dishwasher. At $13-24 per set, just buy two sets.",
  },
  {
    question: "Are compartments necessary?",
    answer:
      "Not required, but helpful. Compartments keep rice from getting soggy from meat juices, and prevent sauce from mixing with sides. If you meal prep bowls (everything mixed), single compartment is fine.",
  },
];

export default function MealPrepContainersPage() {
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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1">
          <Package className="h-3.5 w-3.5 text-green-400" />
          <span className="text-xs font-semibold text-green-400">
            Updated March 2026
          </span>
        </div>
        <h1 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Best <span className="text-green-500">Meal Prep</span> Containers
        </h1>
        <p className="text-zinc-400">
          You spent 2 hours cooking on Sunday. Don&apos;t ruin it with
          containers that leak, stain, or fall apart. Here&apos;s what actually
          works.
        </p>
      </header>

      {/* TL;DR */}
      <section className="mb-10 rounded-2xl border-2 border-green-500/20 bg-green-500/5 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-green-400">
          TL;DR — Quick Picks
        </h2>
        <div className="space-y-2">
          {containers.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/40 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.badgeColor}`}>
                  {c.badge}
                </span>
                <span className="text-sm font-medium">{c.name.split(" (")[0]}</span>
              </div>
              <span className="font-mono text-sm font-bold text-yellow-400">
                ${c.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GLASS VS PLASTIC */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase">
          Glass vs <span className="text-blue-400">Plastic</span>
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-zinc-400">
                  Factor
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-green-400">
                  Glass
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase text-blue-400">
                  Plastic
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: "Staining", glass: "Never", plastic: "Over time" },
                { factor: "Weight", glass: "Heavy", plastic: "Light" },
                { factor: "Durability", glass: "Breakable", plastic: "Durable" },
                { factor: "Microwave", glass: "Excellent", plastic: "Good (BPA-free)" },
                { factor: "Lifespan", glass: "5+ years", plastic: "1-2 years" },
                { factor: "Price", glass: "$4-8 each", plastic: "$1-3 each" },
                { factor: "Odor", glass: "None", plastic: "Absorbs over time" },
              ].map((row) => (
                <tr
                  key={row.factor}
                  className="border-b border-zinc-800/60 last:border-0"
                >
                  <td className="px-4 py-2.5 font-medium">{row.factor}</td>
                  <td className="px-4 py-2.5 text-center text-zinc-400">
                    {row.glass}
                  </td>
                  <td className="px-4 py-2.5 text-center text-zinc-400">
                    {row.plastic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DETAILED REVIEWS */}
      <section className="mb-10 space-y-6">
        {containers.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${c.badgeColor}`}>
                  {c.badge}
                </span>
                <h3 className="font-heading text-xl font-bold uppercase">
                  #{c.rank} {c.name.split(" (")[0]}
                </h3>
                <p className="text-sm text-zinc-500">{c.bestFor}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-yellow-400">
                  ${c.price}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {c.rating}/5
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-zinc-300">
                  {c.material}
                </div>
                <div className="text-[10px] text-zinc-600">material</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-zinc-300">
                  {c.compartments}
                </div>
                <div className="text-[10px] text-zinc-600">compartments</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-2 text-center">
                <div className="font-mono text-sm font-bold text-yellow-400">
                  ${c.price}
                </div>
                <div className="text-[10px] text-zinc-600">set price</div>
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-green-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Pros
                </h4>
                <ul className="space-y-1 text-sm text-zinc-400">
                  {c.pros.map((pro) => (
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
                  {c.cons.map((con) => (
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
                <strong className="text-zinc-300">Verdict:</strong> {c.verdict}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <Link
          href="/gear/best-air-fryers"
          className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 transition-colors hover:border-orange-500/40"
        >
          <Flame className="mb-2 h-5 w-5 text-orange-400" />
          <div className="text-sm font-bold">Best Air Fryers</div>
          <div className="text-xs text-zinc-500">Cook the protein</div>
        </Link>
        <Link
          href="/gear/best-rice-cookers"
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 transition-colors hover:border-blue-500/40"
        >
          <CookingPot className="mb-2 h-5 w-5 text-blue-400" />
          <div className="text-sm font-bold">Best Rice Cookers</div>
          <div className="text-xs text-zinc-500">Cook the carbs</div>
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
            headline: "Best Meal Prep Containers (2026)",
            description:
              "Glass vs plastic meal prep containers tested and ranked.",
            url: "https://proteinbro.net/gear/meal-prep-containers",
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
