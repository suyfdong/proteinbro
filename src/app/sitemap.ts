import { RECIPES } from "@/data/recipes";
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

  return [...staticPages, ...recipePages];
}
