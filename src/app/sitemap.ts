import { RECIPES } from "@/data/recipes";
import { COMBOS } from "@/data/combos";
import { CATEGORIES } from "@/data/categories";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://proteinbro.net";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/recipes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/boy-kibble`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/ground-beef-macro-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/protein-per-dollar-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/meal-prep-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const recipePages: MetadataRoute.Sitemap = RECIPES.map((recipe) => ({
    url: `${base}/recipes/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = COMBOS.map((combo) => ({
    url: `${base}/recipes/${combo.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${base}/recipes/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages, ...comboPages, ...categoryPages];
}
