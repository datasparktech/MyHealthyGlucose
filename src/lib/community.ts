import { supabase } from "./supabase";

// ---------- anonymous voter key (for cuisine votes) ----------
export function getVoterKey(): string {
  const KEY = "mhg-voter-key";
  let v = localStorage.getItem(KEY);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(KEY, v);
  }
  return v;
}

// ---------- cuisine votes ----------
export interface CuisineTally {
  cuisine: string;
  count: number;
}

export async function fetchCuisineTallies(): Promise<CuisineTally[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("cuisine_votes").select("cuisine");
  if (error) throw error;
  const counts = new Map<string, number>();
  (data ?? []).forEach((r: { cuisine: string }) => {
    counts.set(r.cuisine, (counts.get(r.cuisine) ?? 0) + 1);
  });
  return [...counts.entries()].map(([cuisine, count]) => ({ cuisine, count }));
}

export async function castCuisineVote(cuisine: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase
    .from("cuisine_votes")
    .insert({ cuisine, voter_key: getVoterKey() });
  if (error) {
    if (error.code === "23505") return { error: "already-voted" };
    return { error: error.message };
  }
  return { error: null };
}

// ---------- feature requests ----------
export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  status: "open" | "planned" | "done";
  upvotes: number;
  created_at: string;
}

export async function fetchFeatureRequests(): Promise<FeatureRequest[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("feature_requests")
    .select("*")
    .order("upvotes", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function submitFeatureRequest(title: string, description: string) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase.from("feature_requests").insert({ title, description });
  return { error: error ? error.message : null };
}

export async function upvoteFeature(id: string) {
  if (!supabase) return;
  await supabase.rpc("upvote_feature", { request_id: id });
}

// ---------- testimonials ----------
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  approved: boolean;
  created_at: string;
}

export async function fetchApprovedTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function submitTestimonial(name: string, location: string, quote: string) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase.from("testimonials").insert({ name, location, quote });
  return { error: error ? error.message : null };
}
