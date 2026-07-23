/**
 * OTC diabetes-care product catalog for the affiliate store.
 *
 * IMPORTANT: `url` fields are PLACEHOLDER links (generic marketplace search
 * results) until real affiliate program approval comes through. They work
 * today — they just don't earn commission yet. Once you have real affiliate
 * tracking IDs, replace the URLs here. See docs/SETUP-store-affiliates.md.
 *
 * Prices are rough estimates for orientation only, not live pricing — real
 * prices show on the retailer's page.
 */

export interface CountryOffer {
  priceRange: string;
  url: string;
  retailer: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  US?: CountryOffer;
  IN?: CountryOffer;
}

function amazonSearch(domain: "com" | "in", query: string) {
  return `https://www.amazon.${domain}/s?k=${encodeURIComponent(query)}`;
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "glucose-meter",
    name: "Blood Glucose Meter (kit)",
    category: "Meters",
    description: "A standard meter kit — usually includes the meter, a starter pack of strips, and lancets.",
    US: { priceRange: "$15 – $30", url: amazonSearch("com", "blood glucose meter kit"), retailer: "Amazon.com" },
    IN: { priceRange: "₹700 – ₹1,500", url: amazonSearch("in", "blood glucose meter kit"), retailer: "Amazon.in" },
  },
  {
    id: "test-strips",
    name: "Glucose Test Strips (50-count)",
    category: "Test Strips",
    description: "Make sure these match your specific meter brand before buying — strips aren't universal.",
    US: { priceRange: "$20 – $45", url: amazonSearch("com", "blood glucose test strips 50 count"), retailer: "Amazon.com" },
    IN: { priceRange: "₹600 – ₹1,200", url: amazonSearch("in", "blood glucose test strips 50 count"), retailer: "Amazon.in" },
  },
  {
    id: "lancets",
    name: "Lancets (100-count)",
    category: "Test Strips",
    description: "Fine-gauge lancets for finger-prick testing, compatible with most standard lancing devices.",
    US: { priceRange: "$6 – $12", url: amazonSearch("com", "diabetic lancets 100 count"), retailer: "Amazon.com" },
    IN: { priceRange: "₹150 – ₹350", url: amazonSearch("in", "diabetic lancets 100 count"), retailer: "Amazon.in" },
  },
  {
    id: "lancing-device",
    name: "Lancing Device",
    category: "Test Strips",
    description: "Adjustable-depth lancing device for more comfortable finger pricks.",
    US: { priceRange: "$8 – $15", url: amazonSearch("com", "lancing device diabetic"), retailer: "Amazon.com" },
    IN: { priceRange: "₹200 – ₹450", url: amazonSearch("in", "lancing device diabetic"), retailer: "Amazon.in" },
  },
  {
    id: "alcohol-swabs",
    name: "Alcohol Prep Swabs (200-count)",
    category: "Skin Prep",
    description: "For cleaning the skin before testing or injecting.",
    US: { priceRange: "$5 – $10", url: amazonSearch("com", "alcohol prep pads 200 count"), retailer: "Amazon.com" },
    IN: { priceRange: "₹150 – ₹300", url: amazonSearch("in", "alcohol prep pads 200 count"), retailer: "Amazon.in" },
  },
  {
    id: "glucose-tabs",
    name: "Glucose Tablets",
    category: "Low Treatment",
    description: "Fast-acting glucose for treating a low — a good fit with the 15-15 rule.",
    US: { priceRange: "$5 – $9", url: amazonSearch("com", "glucose tablets"), retailer: "Amazon.com" },
    IN: { priceRange: "₹200 – ₹400", url: amazonSearch("in", "glucose tablets"), retailer: "Amazon.in" },
  },
  {
    id: "sharps-container",
    name: "Sharps Disposal Container",
    category: "Safety",
    description: "For safely disposing of used lancets and needles at home.",
    US: { priceRange: "$8 – $18", url: amazonSearch("com", "sharps container disposal"), retailer: "Amazon.com" },
    IN: { priceRange: "₹300 – ₹600", url: amazonSearch("in", "sharps disposal container"), retailer: "Amazon.in" },
  },
  {
    id: "diabetic-socks",
    name: "Diabetic Socks (non-binding)",
    category: "Foot Care",
    description: "Seamless, non-constricting socks designed to support circulation and reduce friction.",
    US: { priceRange: "$12 – $25", url: amazonSearch("com", "diabetic socks non binding"), retailer: "Amazon.com" },
    IN: { priceRange: "₹400 – ₹900", url: amazonSearch("in", "diabetic socks"), retailer: "Amazon.in" },
  },
  {
    id: "foot-cream",
    name: "Diabetic Foot Cream",
    category: "Foot Care",
    description: "Moisturizing cream formulated for the extra foot care diabetes calls for.",
    US: { priceRange: "$8 – $15", url: amazonSearch("com", "diabetic foot cream"), retailer: "Amazon.com" },
    IN: { priceRange: "₹250 – ₹500", url: amazonSearch("in", "diabetic foot cream"), retailer: "Amazon.in" },
  },
  {
    id: "carry-case",
    name: "Diabetes Supply Carry Case",
    category: "Accessories",
    description: "An organized case for your meter, strips, lancets, and glucose tabs on the go.",
    US: { priceRange: "$10 – $20", url: amazonSearch("com", "diabetes supply carrying case"), retailer: "Amazon.com" },
    IN: { priceRange: "₹350 – ₹700", url: amazonSearch("in", "diabetes travel case"), retailer: "Amazon.in" },
  },
  {
    id: "cgm-adhesive",
    name: "CGM Sensor Adhesive Patches",
    category: "CGM Accessories",
    description: "Extra adhesive overlays to help a CGM sensor stay put through workouts and showers.",
    US: { priceRange: "$10 – $18", url: amazonSearch("com", "cgm adhesive patches"), retailer: "Amazon.com" },
    IN: { priceRange: "₹500 – ₹900", url: amazonSearch("in", "cgm sensor adhesive patches"), retailer: "Amazon.in" },
  },
  {
    id: "bp-monitor",
    name: "Home Blood Pressure Monitor",
    category: "Monitoring",
    description: "An upper-arm digital BP monitor for tracking alongside glucose at home.",
    US: { priceRange: "$25 – $45", url: amazonSearch("com", "home blood pressure monitor"), retailer: "Amazon.com" },
    IN: { priceRange: "₹1,200 – ₹2,500", url: amazonSearch("in", "blood pressure monitor"), retailer: "Amazon.in" },
  },
];

export const CATEGORIES = [...new Set(STORE_PRODUCTS.map((p) => p.category))];
