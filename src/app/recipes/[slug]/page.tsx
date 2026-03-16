import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RECIPES } from "@/data/recipes";
import { COMBOS, getRelatedCombos } from "@/data/combos";
import { CATEGORIES, getCategoryContent } from "@/data/categories";
import RecipeCard from "@/components/recipe-card";
import ComboCard from "@/components/combo-card";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Zap,
  DollarSign,
  Clock,
  TrendingUp,
  Crown,
} from "lucide-react";
import Link from "next/link";

// Merge all slugs for static generation
export function generateStaticParams() {
  const recipeSlugs = RECIPES.map((r) => ({ slug: r.slug }));
  const comboSlugs = COMBOS.map((c) => ({ slug: c.slug }));
  const categorySlugs = CATEGORIES.map((c) => ({ slug: c.slug }));
  return [...recipeSlugs, ...comboSlugs, ...categorySlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check recipes first
  const recipe = RECIPES.find((r) => r.slug === slug);
  if (recipe) {
    return {
      title: `${recipe.title} — ${recipe.perServing.protein}g Protein, $${recipe.costPerServing.toFixed(2)}/Serving`,
      description: `${recipe.tagline} ${recipe.perServing.calories} calories, ${recipe.perServing.protein}g protein per serving. Ready in ${recipe.prepMinutes + recipe.cookMinutes} minutes. Free recipe from ProteinBro.`,
      keywords: recipe.seoKeywords,
      openGraph: {
        title: `${recipe.title} — ${recipe.perServing.protein}g Protein`,
        description: recipe.tagline,
        type: "article",
        url: `https://proteinbro.net/recipes/${recipe.slug}`,
        images: [`/recipes/${recipe.slug}.webp`],
      },
      alternates: {
        canonical: `/recipes/${recipe.slug}`,
      },
    };
  }

  // Check combos
  const combo = COMBOS.find((c) => c.slug === slug);
  if (combo) {
    return {
      title: `${combo.title} — ${combo.totalPerServing.protein}g Protein, $${combo.totalCost.toFixed(2)}/Plate`,
      description: `${combo.tagline} ${combo.totalPerServing.calories} calories per serving. Step-by-step guide with macros and cost breakdown. Free from ProteinBro.`,
      keywords: combo.seoKeywords,
      openGraph: {
        title: `${combo.title} — ${combo.totalPerServing.protein}g Protein`,
        description: combo.tagline,
        type: "article",
        url: `https://proteinbro.net/recipes/${combo.slug}`,
      },
      alternates: {
        canonical: `/recipes/${combo.slug}`,
      },
    };
  }

  // Check categories
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (category) {
    const { stats } = getCategoryContent(category);
    return {
      title: `${category.name} Recipes — ${stats.totalPages} High Protein Meals`,
      description: category.description,
      keywords: category.seoKeywords,
      openGraph: {
        title: `${category.name} Recipes — ProteinBro`,
        description: category.tagline,
        type: "website",
        url: `https://proteinbro.net/recipes/${category.slug}`,
      },
      alternates: {
        canonical: `/recipes/${category.slug}`,
      },
    };
  }

  return {};
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try recipe first
  const recipe = RECIPES.find((r) => r.slug === slug);
  if (recipe) {
    return <RecipePageContent recipe={recipe} />;
  }

  // Try combo
  const combo = COMBOS.find((c) => c.slug === slug);
  if (combo) {
    return <ComboPageContent combo={combo} />;
  }

  // Try category
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (category) {
    return <CategoryPageContent category={category} />;
  }

  notFound();
}

// ========== RECIPE PAGE (unchanged logic) ==========
function RecipePageContent({ recipe }: { recipe: (typeof RECIPES)[number] }) {
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.tagline,
    prepTime: `PT${recipe.prepMinutes}M`,
    cookTime: `PT${recipe.cookMinutes}M`,
    totalTime: `PT${totalMinutes}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: "Main Course",
    recipeCuisine: "American",
    keywords: recipe.seoKeywords.join(", "),
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.amount} ${ing.name}`
    ),
    recipeInstructions: recipe.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step.text,
    })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.perServing.calories} calories`,
      proteinContent: `${recipe.perServing.protein}g`,
      fatContent: `${recipe.perServing.fat}g`,
      carbohydrateContent: `${recipe.perServing.carbs}g`,
    },
    author: {
      "@type": "Organization",
      name: "ProteinBro",
      url: "https://proteinbro.net",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* NAV */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Recipes
          </Link>
        </div>

        {/* HEADER */}
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            {recipe.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-2 font-heading text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="text-lg text-zinc-400">{recipe.tagline}</p>
        </header>

        {/* HERO IMAGE */}
        <div className="mb-8 overflow-hidden rounded-2xl border-2 border-zinc-800">
          <Image
            src={`/recipes/${recipe.slug}.webp`}
            alt={recipe.title}
            width={800}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        {/* RECIPE CARD */}
        <RecipeCard recipe={recipe} />

        {/* RELATED RECIPES — matched by shared tags */}
        <section className="mt-12 border-t border-zinc-800 pt-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            More Recipes
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RECIPES.filter((r) => r.slug !== recipe.slug)
              .map((r) => ({
                ...r,
                _shared: r.tags.filter((t) => recipe.tags.includes(t)).length,
              }))
              .sort((a, b) => b._shared - a._shared)
              .slice(0, 4)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group overflow-hidden rounded-xl border-2 border-zinc-800 transition-colors hover:border-green-500/30 hover:bg-green-500/5"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={`/recipes/${r.slug}.webp`}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-heading text-lg font-bold uppercase text-zinc-200 group-hover:text-green-400">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="font-mono font-bold text-green-400">
                        {r.perServing.protein}g protein
                      </span>
                      <span>•</span>
                      <span className="font-mono font-bold text-yellow-400">
                        ${r.costPerServing.toFixed(2)}
                      </span>
                      <span>•</span>
                      <span>{r.prepMinutes + r.cookMinutes} min</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* CATEGORY LINKS */}
        {(() => {
          const matchingCats = CATEGORIES.filter((cat) =>
            cat.recipeTagMatch.some((tag) =>
              recipe.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
            )
          );
          if (matchingCats.length === 0) return null;
          return (
            <section className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Browse more:
                </span>
                {matchingCats.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/recipes/${cat.slug}`}
                    className="flex items-center gap-1 rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400 transition-colors hover:border-green-500/30 hover:text-green-400"
                  >
                    <span>{cat.emoji}</span> {cat.name} Recipes
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            Nutrition data from USDA FoodData Central. Costs are US national
            averages. Macros are approximate.
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

// ========== COMBO PAGE ==========
function ComboPageContent({ combo }: { combo: (typeof COMBOS)[number] }) {
  const related = getRelatedCombos(combo, 4);

  // HowTo + FAQPage schema
  const comboJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: combo.title,
      description: combo.tagline,
      totalTime: `PT${combo.totalMinutes}M`,
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: combo.totalCost.toFixed(2),
      },
      step: combo.cookSpec.steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: step,
      })),
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${combo.totalPerServing.calories} calories`,
        proteinContent: `${combo.totalPerServing.protein}g`,
        fatContent: `${combo.totalPerServing.fat}g`,
        carbohydrateContent: `${combo.totalPerServing.carbs}g`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much protein is in ${combo.method.name.toLowerCase()} ${combo.protein.name.toLowerCase()} with ${combo.side.name.toLowerCase()}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `One serving of ${combo.method.name.toLowerCase()} ${combo.protein.name.toLowerCase()} with ${combo.side.name.toLowerCase()} has ${combo.totalPerServing.protein}g protein, ${combo.totalPerServing.calories} calories, and costs approximately $${combo.totalCost.toFixed(2)}.`,
          },
        },
        {
          "@type": "Question",
          name: `How long does it take to make ${combo.title.toLowerCase()}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `About ${combo.totalMinutes} minutes total (${combo.method.prepMinutes} min prep + ${combo.cookSpec.cookMinutes} min cook time at ${combo.cookSpec.temp}).`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comboJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* NAV */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Recipes
          </Link>
        </div>

        {/* HEADER */}
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-green-500/20 bg-green-500/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
              {combo.method.name}
            </span>
            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {combo.protein.shortName}
            </span>
            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {combo.side.shortName}
            </span>
          </div>

          <h1 className="mb-2 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            {combo.title}
          </h1>
          <p className="text-base text-zinc-400 sm:text-lg">{combo.tagline}</p>
        </header>

        {/* HERO IMAGE */}
        <div className="mb-8 overflow-hidden rounded-2xl border-2 border-zinc-800">
          <Image
            src={`/recipes/${combo.slug}.webp`}
            alt={combo.title}
            width={800}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        {/* COMBO CARD (interactive component) */}
        <ComboCard combo={combo} />

        {/* RELATED COMBOS */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-zinc-800 pt-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              More Combos
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group rounded-xl border-2 border-zinc-800 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">{r.protein.icon}</span>
                    <span className="text-lg">{r.side.icon}</span>
                  </div>
                  <h3 className="mb-1 font-heading text-base font-bold uppercase text-zinc-200 group-hover:text-green-400">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="font-mono font-bold text-green-400">
                      {r.totalPerServing.protein}g
                    </span>
                    <span>•</span>
                    <span className="font-mono font-bold text-yellow-400">
                      ${r.totalCost.toFixed(2)}
                    </span>
                    <span>•</span>
                    <span>{r.totalMinutes} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CATEGORY LINK */}
        {(() => {
          const matchingCat = CATEGORIES.find((cat) =>
            cat.comboProteinMatch.includes(combo.protein.id)
          );
          if (!matchingCat) return null;
          return (
            <section className="mt-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Browse more:
                </span>
                <Link
                  href={`/recipes/${matchingCat.slug}`}
                  className="flex items-center gap-1 rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400 transition-colors hover:border-green-500/30 hover:text-green-400"
                >
                  <span>{matchingCat.emoji}</span> All {matchingCat.name} Recipes
                </Link>
              </div>
            </section>
          );
        })()}

        {/* FOOTER */}
        <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          <p>
            Nutrition data from USDA FoodData Central. Costs are US national
            averages (March 2026). Macros are approximate.
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

// ========== CATEGORY PAGE ==========
function CategoryPageContent({ category }: { category: (typeof CATEGORIES)[number] }) {
  const { recipes, combos, stats } = getCategoryContent(category);

  // Find the "best" recipe (highest protein)
  const bestRecipe = [...recipes].sort((a, b) => b.perServing.protein - a.perServing.protein)[0];
  const bestCombo = [...combos].sort((a, b) => b.totalPerServing.protein - a.totalPerServing.protein)[0];

  // Color mapping
  const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
    red:     { border: "border-red-500/20",     bg: "bg-red-500/5",     text: "text-red-400",     ring: "border-red-500/30" },
    orange:  { border: "border-orange-500/20",  bg: "bg-orange-500/5",  text: "text-orange-400",  ring: "border-orange-500/30" },
    amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/5",   text: "text-amber-400",   ring: "border-amber-500/30" },
    pink:    { border: "border-pink-500/20",    bg: "bg-pink-500/5",    text: "text-pink-400",    ring: "border-pink-500/30" },
    rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/5",    text: "text-rose-400",    ring: "border-rose-500/30" },
    fuchsia: { border: "border-fuchsia-500/20", bg: "bg-fuchsia-500/5", text: "text-fuchsia-400", ring: "border-fuchsia-500/30" },
    yellow:  { border: "border-yellow-500/20",  bg: "bg-yellow-500/5",  text: "text-yellow-400",  ring: "border-yellow-500/30" },
    cyan:    { border: "border-cyan-500/20",    bg: "bg-cyan-500/5",    text: "text-cyan-400",    ring: "border-cyan-500/30" },
    emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400", ring: "border-emerald-500/30" },
  };
  const c = colorMap[category.color] || colorMap.red;

  // Other categories for "Browse more"
  const otherCategories = CATEGORIES.filter((cat) => cat.slug !== category.slug);

  // CollectionPage schema
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Recipes`,
    description: category.description,
    url: `https://proteinbro.net/recipes/${category.slug}`,
    numberOfItems: stats.totalPages,
    publisher: {
      "@type": "Organization",
      name: "ProteinBro",
      url: "https://proteinbro.net",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* NAV */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All Recipes
          </Link>
        </div>

        {/* HERO HEADER */}
        <header className="mb-8">
          <div className={`mb-6 overflow-hidden rounded-2xl border-2 ${c.border} ${c.bg}`}>
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-5xl">{category.emoji}</span>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>
                    {stats.totalPages} recipes & combos
                  </div>
                  <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                    {category.name} Recipes
                  </h1>
                </div>
              </div>
              <p className="max-w-xl text-base text-zinc-400">{category.tagline}</p>
            </div>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border-2 border-green-500/20 bg-green-500/5 p-3 text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-green-400/60">Avg Protein</div>
            <div className="font-mono text-xl font-black text-green-400">{stats.avgProtein}g</div>
          </div>
          <div className="rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/60">Avg Cost</div>
            <div className="font-mono text-xl font-black text-yellow-400">${stats.avgCost.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-3 text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">Cheapest</div>
            <div className="font-mono text-xl font-black text-blue-400">${stats.cheapest.toFixed(2)}</div>
          </div>
          <div className={`rounded-xl border-2 ${c.border} ${c.bg} p-3 text-center`}>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${c.text} opacity-60`}>Max Protein</div>
            <div className={`font-mono text-xl font-black ${c.text}`}>{stats.highestProtein}g</div>
          </div>
        </div>

        {/* BEST PICK */}
        {bestRecipe && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <Crown className="h-4 w-4 text-yellow-400" />
              Top Pick — Full Recipe
            </div>
            <Link
              href={`/recipes/${bestRecipe.slug}`}
              className={`group overflow-hidden rounded-2xl border-2 ${c.ring} transition-colors hover:bg-green-500/[0.03]`}
            >
              <div className="relative h-48 w-full sm:h-56">
                <Image
                  src={`/recipes/${bestRecipe.slug}.webp`}
                  alt={bestRecipe.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-heading text-2xl font-black uppercase text-white group-hover:text-green-400">
                    {bestRecipe.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="font-mono font-bold text-green-400">{bestRecipe.perServing.protein}g protein</span>
                    <span className="font-mono font-bold text-yellow-400">${bestRecipe.costPerServing.toFixed(2)}</span>
                    <span className="text-zinc-400">{bestRecipe.prepMinutes + bestRecipe.cookMinutes} min</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* FULL RECIPES */}
        {recipes.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Full Recipes ({recipes.length})
            </h2>
            <div className="space-y-3">
              {recipes
                .sort((a, b) => b.perServing.protein - a.perServing.protein)
                .map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="group flex items-center gap-4 rounded-xl border-2 border-zinc-800 p-4 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={`/recipes/${recipe.slug}.webp`}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-heading text-base font-bold uppercase text-zinc-200 group-hover:text-green-400">
                      {recipe.title}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-green-400">{recipe.perServing.protein}g</span>
                      <span className="text-zinc-700">•</span>
                      <span className="font-mono text-yellow-400">${recipe.costPerServing.toFixed(2)}</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-zinc-500">{recipe.prepMinutes + recipe.cookMinutes}m</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 group-hover:text-green-400" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* COMBO PAGES */}
        {combos.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Meal Combos ({combos.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {combos
                .sort((a, b) => b.totalPerServing.protein - a.totalPerServing.protein)
                .map((combo) => (
                <Link
                  key={combo.slug}
                  href={`/recipes/${combo.slug}`}
                  className="group overflow-hidden rounded-xl border-2 border-zinc-800 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={`/recipes/${combo.slug}.webp`}
                      alt={combo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute top-2 left-2 rounded-md bg-zinc-900/80 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-400">
                      {combo.method.name}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="mb-1 truncate font-heading text-sm font-bold uppercase text-zinc-200 group-hover:text-green-400">
                      {combo.protein.shortName} with {combo.side.shortName}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="font-mono font-bold text-green-400">{combo.totalPerServing.protein}g</span>
                      <span className="text-zinc-700">•</span>
                      <span className="font-mono text-yellow-400">${combo.totalCost.toFixed(2)}</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-zinc-500">{combo.totalMinutes}m</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* BROWSE OTHER CATEGORIES */}
        <section className="border-t border-zinc-800 pt-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Browse by Protein
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {otherCategories.map((cat) => {
              const catContent = getCategoryContent(cat);
              return (
                <Link
                  key={cat.slug}
                  href={`/recipes/${cat.slug}`}
                  className="group flex items-center gap-3 rounded-xl border-2 border-zinc-800 p-3 transition-all hover:border-green-500/30 hover:bg-green-500/[0.03]"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-zinc-300 group-hover:text-green-400">
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-zinc-600">
                      {catContent.stats.totalPages} recipes
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

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
