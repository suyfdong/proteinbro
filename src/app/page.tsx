import Link from "next/link";
import {
  Beef,
  Calculator,
  DollarSign,
  ShoppingCart,
  CalendarDays,
  TrendingUp,
  Flame,
  ChefHat,
  Dumbbell,
  Apple,
  Mail,
  ArrowRight,
  Target,
  Clock,
} from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-green-500/40 to-transparent" />
      <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-green-500">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-green-500/40 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* ========== NAV ========== */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-heading text-xl font-black tracking-tight">
              PROTEIN
            </span>
            <span className="font-heading text-xl font-black tracking-tight text-green-500">
              BRO
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-zinc-400 sm:flex">
            <Link href="/tools/ground-beef-macro-calculator" className="transition-colors hover:text-green-400">
              Tools
            </Link>
            <Link href="/recipes" className="transition-colors hover:text-zinc-100">
              Recipes
            </Link>
            <Link href="/nutrition" className="transition-colors hover:text-zinc-100">
              Nutrition
            </Link>
            <Link href="/gear" className="transition-colors hover:text-zinc-100">
              Gear
            </Link>
            <Link href="#newsletter" className="transition-colors hover:text-zinc-100">
              Newsletter
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden border-b border-zinc-800/40">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Green glow */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
          <div className="fade-up max-w-3xl">
            {/* Badge */}
            <div className="fade-up-1 mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs font-semibold text-green-400">
                Boy Kibble is trending — we have the macros
              </span>
            </div>

            {/* Headline */}
            <h1 className="fade-up-2 font-heading text-5xl leading-[0.95] font-black uppercase tracking-tight sm:text-7xl lg:text-8xl">
              High Protein.
              <br />
              <span className="text-green-500">Low Effort.</span>
              <br />
              <span className="text-zinc-500">No Excuses.</span>
            </h1>

            <p className="fade-up-3 mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Macros-first recipes, free calculators, and meal plans built for
              guys who lift. 40g+ protein per serving, under $3, ready in 20
              minutes.
            </p>

            {/* CTA buttons */}
            <div className="fade-up-4 mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/ground-beef-macro-calculator"
                className="glow-pulse inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400"
              >
                <Calculator className="h-4 w-4" />
                Beef Macro Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#boy-kibble"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-zinc-700 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
              >
                What is Boy Kibble?
              </Link>
            </div>
          </div>

          {/* Hero stat pills */}
          <div className="fade-up-5 mt-12 flex flex-wrap gap-3">
            {[
              { icon: Target, label: "40g+ protein/serving", color: "text-green-400" },
              { icon: DollarSign, label: "Under $3/meal", color: "text-yellow-400" },
              { icon: Clock, label: "20 min or less", color: "text-blue-400" },
              { icon: Flame, label: "Macros on everything", color: "text-orange-400" },
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
        </div>
      </section>

      {/* ========== TOOLS ========== */}
      <section className="stripe-pattern border-b border-zinc-800/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Free Tools</SectionLabel>
          <h2 className="mb-3 text-center font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Calculators That Actually{" "}
            <span className="text-green-500">Help</span>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-center text-sm text-zinc-500">
            No sign-up. No paywall. Just punch in your numbers and get answers.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Live tool */}
            <Link
              href="/tools/ground-beef-macro-calculator"
              className="hover-lift group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-gradient-to-b from-green-500/10 to-zinc-900 p-6"
            >
              <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-950">
                Live
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                <Beef className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold uppercase">
                Ground Beef Macros
              </h3>
              <p className="text-sm text-zinc-400">
                Exact nutrition for every lean/fat ratio. 70/30 to 96/4.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                Use now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            {/* Live tool 2 */}
            <Link
              href="/tools/protein-per-dollar-calculator"
              className="hover-lift group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-gradient-to-b from-green-500/10 to-zinc-900 p-6"
            >
              <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-950">
                Live
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold uppercase">
                Protein Per Dollar
              </h3>
              <p className="text-sm text-zinc-400">
                Compare protein sources by cost efficiency. Find the cheapest gains.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                Use now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            {/* Live tool 3 */}
            <Link
              href="/tools/meal-prep-cost-calculator"
              className="hover-lift group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-gradient-to-b from-green-500/10 to-zinc-900 p-6"
            >
              <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-950">
                Live
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold uppercase">
                Meal Prep Cost
              </h3>
              <p className="text-sm text-zinc-400">
                Build your grocery list, get weekly and per-meal cost breakdowns with macros.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                Use now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            {/* Live tool 4 */}
            <Link
              href="/tools/weekly-meal-generator"
              className="hover-lift group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-gradient-to-b from-green-500/10 to-zinc-900 p-6"
            >
              <div className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-950">
                Live
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                <CalendarDays className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold uppercase">
                Weekly Kibble Generator
              </h3>
              <p className="text-sm text-zinc-400">
                Auto-generate a 5-meal rotation based on your protein goals and budget.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-400 transition-colors group-hover:text-green-300">
                Use now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BOY KIBBLE ========== */}
      <section id="boy-kibble" className="border-b border-zinc-800/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-zinc-900 to-zinc-950">
            <div className="grid items-center gap-8 p-8 sm:grid-cols-2 sm:p-12">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">
                    Trending on TikTok
                  </span>
                </div>
                <h2 className="mb-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                  WTF is{" "}
                  <span className="text-orange-400">Boy Kibble</span>?
                </h2>
                <p className="mb-4 text-zinc-400">
                  Ground beef + white rice. The meal that broke TikTok in 2026.
                  Simple, cheap, high protein — the ultimate gym bro dinner
                  that&apos;s become a whole movement.
                </p>
                <p className="mb-6 text-sm text-zinc-500">
                  We break down the nutrition, the variations, the memes, and
                  why your girlfriend is calling your dinner &quot;dog food.&quot;
                </p>
                <Link
                  href="/boy-kibble"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-orange-500/30 bg-orange-500/10 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-orange-300 transition-all hover:border-orange-500/50 hover:bg-orange-500/20"
                >
                  Read the full guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Visual: stylized nutrition label */}
              <div className="rounded-xl border-2 border-zinc-700 bg-zinc-950 p-6 font-mono">
                <div className="mb-3 border-b-8 border-zinc-300 pb-1 text-center font-heading text-2xl font-black uppercase text-zinc-100">
                  Nutrition Facts
                </div>
                <div className="mb-2 text-xs text-zinc-400">
                  Serving: 1 plate of Boy Kibble (450g)
                </div>
                <div className="border-t-4 border-zinc-300 pt-2">
                  <div className="flex justify-between border-b border-zinc-700 py-1.5 text-sm">
                    <span className="font-bold">Calories</span>
                    <span className="font-bold text-orange-400">680</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-700 py-1.5 text-sm">
                    <span className="font-bold text-green-400">Protein</span>
                    <span className="font-bold text-green-400">52g</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-700 py-1.5 text-sm">
                    <span>Total Fat</span>
                    <span className="text-zinc-400">18g</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-700 py-1.5 text-sm">
                    <span>Carbs</span>
                    <span className="text-zinc-400">64g</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-sm">
                    <span className="text-yellow-400">Cost</span>
                    <span className="font-bold text-yellow-400">$2.30</span>
                  </div>
                </div>
                <div className="mt-3 border-t border-zinc-800 pt-2 text-center text-[10px] uppercase tracking-widest text-zinc-600">
                  85/15 ground beef + white rice
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section id="categories" className="stripe-pattern border-b border-zinc-800/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Content</SectionLabel>
          <h2 className="mb-10 text-center font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Everything a Gym Bro{" "}
            <span className="text-green-500">Needs</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ChefHat,
                iconColor: "text-red-400",
                borderColor: "border-red-500/20 hover:border-red-500/40",
                bg: "from-red-500/5",
                title: "Recipes",
                desc: "Ground beef, chicken, eggs, tuna. Every recipe has macros, cost, and cook time. No life stories.",
                tag: "10 Recipes Live",
                link: "/recipes",
              },
              {
                icon: Dumbbell,
                iconColor: "text-blue-400",
                borderColor: "border-blue-500/20 hover:border-blue-500/40",
                bg: "from-blue-500/5",
                title: "Meal Prep",
                desc: "Sunday batch cooking guides. Weekly plans. Shopping lists. Spend 2 hours, eat all week.",
                tag: "Live",
                link: "/meal-prep",
              },
              {
                icon: Apple,
                iconColor: "text-green-400",
                borderColor: "border-green-500/20 hover:border-green-500/40",
                bg: "from-green-500/5",
                title: "Nutrition",
                desc: "Proteinmaxxing guides. Cheapest protein sources ranked. How much protein you actually need.",
                tag: "Live",
                link: "/nutrition",
              },
            ].map((cat) => {
              const isLive = !cat.tag.includes("Coming Soon");
              const inner = (
                <>
                  <cat.icon className={`mb-4 h-8 w-8 ${cat.iconColor}`} />
                  <h3 className="mb-2 font-heading text-xl font-bold uppercase">
                    {cat.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                    {cat.desc}
                  </p>
                  <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${isLive ? "border-green-500/30 text-green-400" : "border-zinc-700 text-zinc-500"}`}>
                    {cat.tag}
                  </span>
                </>
              );
              const cls = `hover-lift rounded-2xl border-2 ${cat.borderColor} bg-gradient-to-b ${cat.bg} to-zinc-900/50 p-6 transition-colors`;

              return isLive ? (
                <Link key={cat.title} href={cat.link} className={cls}>
                  {inner}
                </Link>
              ) : (
                <div key={cat.title} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section id="newsletter" className="border-b border-zinc-800/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 via-zinc-900 to-zinc-950 p-8 sm:p-12">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-500/10 blur-[60px]" />

            <div className="relative mx-auto max-w-lg text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 p-3">
                <Mail className="h-6 w-6 text-green-400" />
              </div>
              <h2 className="mb-3 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Weekly <span className="text-green-500">Kibble</span>
              </h2>
              <p className="mb-6 text-zinc-400">
                One email per week. 5-meal rotation + shopping list + protein
                source spotlight. No spam, no fluff, just gains.
              </p>
              <NewsletterForm />
              <p className="mt-3 text-xs text-zinc-600">
                Join 0 bros. We&apos;re just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-1">
              <div className="mb-3 font-heading text-lg font-black tracking-tight">
                PROTEIN<span className="text-green-500">BRO</span>
              </div>
              <p className="text-sm text-zinc-500">
                Simple high protein meals for men. Macros first, taste second,
                looks never.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                Tools
              </h4>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <Link
                  href="/tools/ground-beef-macro-calculator"
                  className="transition-colors hover:text-zinc-300"
                >
                  Beef Macro Calculator
                </Link>
                <Link
                  href="/tools/protein-per-dollar-calculator"
                  className="transition-colors hover:text-zinc-300"
                >
                  Protein Per Dollar
                </Link>
                <Link
                  href="/tools/meal-prep-cost-calculator"
                  className="transition-colors hover:text-zinc-300"
                >
                  Meal Prep Cost
                </Link>
                <Link
                  href="/tools/weekly-meal-generator"
                  className="transition-colors hover:text-zinc-300"
                >
                  Weekly Generator
                </Link>
              </div>
            </div>

            {/* Content */}
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                Content
              </h4>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <Link
                  href="/boy-kibble"
                  className="transition-colors hover:text-zinc-300"
                >
                  What is Boy Kibble?
                </Link>
                <Link
                  href="/recipes"
                  className="transition-colors hover:text-zinc-300"
                >
                  Recipes
                </Link>
                <Link
                  href="/meal-prep"
                  className="transition-colors hover:text-zinc-300"
                >
                  Meal Prep
                </Link>
                <Link
                  href="/nutrition"
                  className="transition-colors hover:text-zinc-300"
                >
                  Nutrition
                </Link>
                <Link
                  href="/gear"
                  className="transition-colors hover:text-zinc-300"
                >
                  Gear
                </Link>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                Connect
              </h4>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <span className="text-zinc-700">TikTok (soon)</span>
                <span className="text-zinc-700">YouTube (soon)</span>
                <Link
                  href="#newsletter"
                  className="transition-colors hover:text-zinc-300"
                >
                  Newsletter
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-800/60 pt-6 text-center text-xs text-zinc-700">
            <p>
              ProteinBro.net — Built for bros who lift and eat. Not medical
              advice. Eat your vegetables too.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
