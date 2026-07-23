/**
 * Lightweight client-side country detection for the affiliate store.
 * Uses ipwho.is — free, no API key required, commercial-use friendly.
 * Falls back gracefully to a manual selector if detection fails or times out.
 * Result is cached in sessionStorage so we only call the API once per visit.
 */

export type StoreCountry = "US" | "IN" | "OTHER";

const CACHE_KEY = "mhg-detected-country";
const OVERRIDE_KEY = "mhg-country-override";

function mapCountryCode(code: string | undefined): StoreCountry {
  if (code === "US") return "US";
  if (code === "IN") return "IN";
  return "OTHER";
}

export function getCountryOverride(): StoreCountry | null {
  const v = localStorage.getItem(OVERRIDE_KEY);
  return v === "US" || v === "IN" || v === "OTHER" ? v : null;
}

export function setCountryOverride(country: StoreCountry) {
  localStorage.setItem(OVERRIDE_KEY, country);
}

export function clearCountryOverride() {
  localStorage.removeItem(OVERRIDE_KEY);
}

/**
 * Resolves the shopper's country: manual override first, then a cached
 * detection result, then a fresh API call (with a 3s timeout), then "OTHER".
 */
export async function detectCountry(): Promise<StoreCountry> {
  const override = getCountryOverride();
  if (override) return override;

  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached === "US" || cached === "IN" || cached === "OTHER") return cached;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error("geo lookup failed");
    const data = await res.json();
    const country = mapCountryCode(data?.country_code);
    sessionStorage.setItem(CACHE_KEY, country);
    return country;
  } catch {
    // Network blocked, timed out, or ad-blocker interference — degrade gracefully
    sessionStorage.setItem(CACHE_KEY, "OTHER");
    return "OTHER";
  }
}
