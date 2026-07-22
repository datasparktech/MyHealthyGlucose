/**
 * Curated photography — Unsplash CDN (free under the Unsplash License, no
 * attribution required). Every ID below is verified to resolve. Referenced by
 * stable photo IDs with sizing params so they load fast and never bloat the repo.
 */
function img(id: string, w = 1200, extra = ""): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=70&w=${w}${extra}`;
}

export const IMAGES = {
  // Food / cuisine (verified)
  indianThali: img("1742281257707-0c7f7e5ca9c6"),      // traditional Tamil thali
  healthyBowl: img("1512621776951-a57141f2eefd"),       // vegan salad bowl
  mealPrep: img("1569420077790-afb136b3bb8c"),          // meal-prep containers

  // People / care (verified)
  doctorPatient: img("1758691461957-474a7686e388"),     // doctor + patient consultation
} as const;

export type ImageKey = keyof typeof IMAGES;
