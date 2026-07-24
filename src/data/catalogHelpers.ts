import { CATALOG, type CatalogFood } from "./catalog";

export type CatalogFoodWithSlug = CatalogFood & { slug: string };

export const foodSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Deduplicate by slug so each food maps to one page.
const bySlug = new Map<string, CatalogFoodWithSlug>();
for (const f of CATALOG) {
  const slug = foodSlug(f.name);
  if (!bySlug.has(slug)) bySlug.set(slug, { ...f, slug });
}
export const CATALOG_WITH_SLUG: CatalogFoodWithSlug[] = Array.from(bySlug.values());

export const CATEGORIES: string[] = Array.from(new Set(CATALOG.map((f) => f.cat))).sort();
export const DIETS: string[] = Array.from(new Set(CATALOG.map((f) => f.diet))).sort();

export function findFoodBySlug(slug: string): CatalogFoodWithSlug | undefined {
  return CATALOG_WITH_SLUG.find((f) => f.slug === slug);
}

export function searchCatalog(q: string, cat: string, diet: string): CatalogFoodWithSlug[] {
  const s = q.trim().toLowerCase();
  return CATALOG_WITH_SLUG.filter(
    (f) =>
      (!cat || f.cat === cat) &&
      (!diet || f.diet === diet) &&
      (!s || f.name.toLowerCase().includes(s))
  );
}

// Simple carb "impact" label for education (not medical advice).
export function carbLevel(carbs: number): { label: string; tone: string } {
  if (carbs <= 10) return { label: "Low carb", tone: "text-teal-300 ring-teal-400/30 bg-teal-500/10" };
  if (carbs <= 30) return { label: "Moderate carb", tone: "text-amber-300 ring-amber-400/30 bg-amber-500/10" };
  return { label: "Higher carb", tone: "text-orange-300 ring-orange-400/30 bg-orange-500/10" };
}

export function relatedFoods(food: CatalogFoodWithSlug, limit = 6): CatalogFoodWithSlug[] {
  return CATALOG_WITH_SLUG.filter((f) => f.cat === food.cat && f.slug !== food.slug).slice(0, limit);
}
