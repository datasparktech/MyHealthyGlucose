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
    key: "ngo_name",
    label: "NGO partner name",
    hint: "The name of the registered nonprofit you're partnering with (shown on the Give Back page).",
  },
  {
    key: "ngo_donation_link",
    label: "NGO donation link",
    hint: "A direct link to the NGO's own donation page. DataSpark never collects or touches these funds — this just points visitors to the NGO's site.",
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
