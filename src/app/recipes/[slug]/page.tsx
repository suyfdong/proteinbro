import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/recipe-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);
  if (!recipe) return {};

  return {
    title: `${recipe.title} — ${recipe.perServing.protein}g Protein, $${recipe.costPerServing.toFixed(2)}/Serving`,
    description: `${recipe.tagline} ${recipe.perServing.calories} calories, ${recipe.perServing.protein}g protein per serving. Ready in ${recipe.prepMinutes + recipe.cookMinutes} minutes. Free recipe from ProteinBro.`,
    keywords: recipe.seoKeywords,
    openGraph: {
      title: `${recipe.title} — ${recipe.perServing.protein}g Protein`,
      description: recipe.tagline,
      type: "article",
      url: `https://proteinbro.net/recipes/${recipe.slug}`,
    },
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);
  if (!recipe) notFound();

  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  // Recipe Schema JSON-LD
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
          {/* Tags */}
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

        {/* RECIPE CARD */}
        <RecipeCard recipe={recipe} />

        {/* RELATED RECIPES */}
        <section className="mt-12 border-t border-zinc-800 pt-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            More Recipes
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RECIPES.filter((r) => r.slug !== recipe.slug)
              .slice(0, 4)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group rounded-xl border-2 border-zinc-800 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/5"
                >
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
                </Link>
              ))}
          </div>
        </section>

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
