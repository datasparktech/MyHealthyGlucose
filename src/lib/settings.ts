import { supabase, isSupabaseConfigured } from "./supabase";

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

/** Known setting keys, for a friendlier admin form. New keys can still be
 * added freely — this is just used to render nice labels/hints. */
export const KNOWN_SETTINGS: { key: string; label: string; hint: string }[] = [
  {
    key: "donation_link",
    label: "Donation link",
    hint: "A Stripe Payment Link (or similar hosted checkout URL). Leave blank to show 'not open yet' on the Give Back page.",
  },
];

export async function fetchSetting(key: string): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return null;
  return data.value;
}

export async function fetchAllSettings(): Promise<SiteSetting[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) throw error;
  return data ?? [];
}

export async function upsertSetting(key: string, value: string) {
  if (!supabase) return { error: "Not configured" };
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  return { error: error ? error.message : null };
}
