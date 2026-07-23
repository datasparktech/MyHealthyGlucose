import { supabase, isSupabaseConfigured } from "./supabase";
import { STORE_PRODUCTS as SEED_PRODUCTS } from "../data/storeProducts";

export interface DbStoreProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  us_price: string;
  us_url: string;
  us_retailer: string;
  in_price: string;
  in_url: string;
  in_retailer: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProductInput = Omit<DbStoreProduct, "id" | "created_at" | "updated_at">;

/** Public fetch — active products only, for the /store page. Falls back to
 * the static seed catalog if Supabase isn't configured or has no products
 * yet, so the store always shows something. */
export async function fetchActiveProducts(): Promise<DbStoreProduct[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("store_products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Admin fetch — everything, including inactive products. */
export async function fetchAllProducts(): Promise<DbStoreProduct[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("store_products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createProduct(input: ProductInput) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase.from("store_products").insert(input);
  return { error: error ? error.message : null };
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase
    .from("store_products")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error ? error.message : null };
}

export async function deleteProduct(id: string) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase.from("store_products").delete().eq("id", id);
  return { error: error ? error.message : null };
}

/** One-click helper: seed the DB with the starter catalog so the admin
 * doesn't have to re-type all 12 products by hand. Safe to run once. */
export async function seedDefaultProducts() {
  if (!supabase) return { error: "Not configured" };
  const rows: ProductInput[] = SEED_PRODUCTS.map((p, i) => ({
    name: p.name,
    category: p.category,
    description: p.description,
    us_price: p.US?.priceRange ?? "",
    us_url: p.US?.url ?? "",
    us_retailer: p.US?.retailer ?? "Amazon.com",
    in_price: p.IN?.priceRange ?? "",
    in_url: p.IN?.url ?? "",
    in_retailer: p.IN?.retailer ?? "Amazon.in",
    active: true,
    sort_order: i,
  }));
  const { error } = await supabase.from("store_products").insert(rows);
  return { error: error ? error.message : null };
}
