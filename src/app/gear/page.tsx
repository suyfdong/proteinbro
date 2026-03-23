import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Wrench,
  Flame,
  CookingPot,
  Package,
  Star,
  DollarSign,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Kitchen Gear for Meal Prep — Air Fryers, Rice Cookers & Containers",
  description:
    "The only kitchen gear a gym bro actually needs. Best air fryers, rice cookers, and meal prep containers reviewed for high protein cooking. No fluff, just what works.",
  keywords: [
    "best air fryer for meal prep",
    "best rice cooker",
    "meal prep containers",
    "kitchen gear for bodybuilding",
    "best air fryer 2026",
    "meal prep essentials",
    "gym bro kitchen",
    "cooking gear for meal prep",
  ],
  openGraph: {
    title: "Kitchen Gear Guide — ProteinBro",
    description:
      "Air fryers, rice cookers, and containers. The only gear a gym bro needs.",
    type: "website",
    url: "https://proteinbro.net/gear",
  },
  alternates: {
    canonical: "/gear",
  },
};

const gearCategories = [
  {
    title: "Best Air Fryers",
    desc: "Cook chicken, salmon, and pork chops with zero oil. Crispy outside, juicy inside, every time.",
    href: "/gear/best-air-fryers",
    icon: Flame,
    topPick: "Cosori Pro II",
    topPrice: "$89",
    color: "orange",
    borderColor: "border-orange-500/20",
    bgColor: "bg-orange-500/5",
    textColor: "text-orange-400",
    why: "Fastest cook time, fits 2 lbs chicken",
  },
  {
    title: "Best Rice Cookers",
    desc: "Set it, forget it. Perfect rice every time. The foundation of every boy kibble plate.",
    href: "/gear/best-rice-cookers",
    icon: CookingPot,
    topPick: "Aroma 8-Cup",
    topPrice: "$29",
    color: "blue",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/5",
    textColor: "text-blue-400",
    why: "Best value, steams veggies too",
  },
  {
    title: "Meal Prep Containers",
    desc: "Glass or plastic? How many compartments? Microwave safe? We tested them all.",
    href: "/gear/meal-prep-containers",
    icon: Package,
    topPick: "Prep Naturals Glass 3-Pack",
    topPrice: "$24",
    color: "green",
    borderColor: "border-green-500/20",
    bgColor: "bg-green-500/5",
    textColor: "text-green-400",
    why: "Glass, leak-proof, dishwasher safe",
  },
];

export default function GearHub() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* NAV */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      {/* HEADER */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-orange-500/20 bg-orange-500/10">
            <Wrench className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Gear
            </div>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Kitchen <span className="text-orange-400">Gear</span>
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-zinc-400">
          You don&apos;t need a $500 Vitamix or a 12-piece knife set. You need
          three things: an air fryer, a rice cooker, and some containers. Total
          investment: ~$140. Total return: infinite gains.
        </p>
      </header>

      {/* QUICK STAT: TOTAL KIT COST */}
      <div className="mb-10 rounded-2xl border-2 border-orange-500/20 bg-orange-500/5 p-6">
        <h2 className="mb-3 font-heading text-lg font-bold uppercase text-orange-400">
          The Complete Gym Bro Kitchen: ~$142
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {gearCategories.map((cat) => (
            <div key={cat.title} className="text-center">
              <cat.icon className={`mx-auto mb-1 h-6 w-6 ${cat.textColor}`} />
              <div className="font-mono text-lg font-bold text-zinc-200">
                {cat.topPrice}
              </div>
              <div className="text-[10px] text-zinc-500">{cat.topPick}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">
          One-time investment. Pays for itself in 2 weeks vs eating out.
        </p>
      </div>

      {/* GEAR CARDS */}
      <div className="mb-10 space-y-4">
        {gearCategories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`hover-lift group block overflow-hidden rounded-2xl border-2 ${cat.borderColor} ${cat.bgColor} p-6 transition-colors`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${cat.borderColor} ${cat.bgColor}`}
              >
                <cat.icon className={`h-6 w-6 ${cat.textColor}`} />
              </div>
              <div className="flex-1">
                <h2 className="mb-1 font-heading text-xl font-bold uppercase">
                  {cat.title}
                </h2>
                <p className="mb-3 text-sm text-zinc-400">{cat.desc}</p>

                {/* Top Pick Preview */}
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-zinc-300">
                      Top Pick: {cat.topPick}
                    </span>
                    <span className="ml-2 text-xs text-zinc-500">
                      — {cat.why}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-yellow-400">
                    {cat.topPrice}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                  See full review <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* WHY THESE 3 */}
      <section className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="mb-4 font-heading text-lg font-bold uppercase">
          Why Only <span className="text-orange-400">3 Items</span>?
        </h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>
            Most kitchen gear is designed for people who cook elaborate meals.
            You&apos;re not making beef bourguignon — you&apos;re cooking chicken
            and rice.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-3">
              <Flame className="mb-1 h-4 w-4 text-orange-400" />
              <div className="text-xs font-bold text-zinc-300">Air Fryer</div>
              <div className="text-xs text-zinc-500">
                Replaces: oven, stovetop pan, grill. Cooks protein in 15-20 min
                with no oil.
              </div>
            </div>
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-3">
              <CookingPot className="mb-1 h-4 w-4 text-blue-400" />
              <div className="text-xs font-bold text-zinc-300">Rice Cooker</div>
              <div className="text-xs text-zinc-500">
                Replaces: pot, timer, attention. One button → perfect rice every
                time.
              </div>
            </div>
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-3">
              <Package className="mb-1 h-4 w-4 text-green-400" />
              <div className="text-xs font-bold text-zinc-300">Containers</div>
              <div className="text-xs text-zinc-500">
                Replaces: plastic bags, foil, &quot;I&apos;ll just eat out.&quot;
                Portion control built in.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS LINKS */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/recipes"
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
        >
          <Target className="mb-2 h-5 w-5 text-red-400" />
          <div className="text-sm font-bold">30+ Recipes</div>
          <div className="text-xs text-zinc-500">
            Put your new gear to work
          </div>
        </Link>
        <Link
          href="/meal-prep"
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
        >
          <DollarSign className="mb-2 h-5 w-5 text-yellow-400" />
          <div className="text-sm font-bold">Meal Prep Guide</div>
          <div className="text-xs text-zinc-500">
            Weekly plans & shopping lists
          </div>
        </Link>
      </div>
    </div>
  );
}
