import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import {
  detectCountry,
  setCountryOverride,
  type StoreCountry,
} from "../lib/geo";
import { fetchActiveProducts, type DbStoreProduct } from "../lib/store";
import { isSupabaseConfigured } from "../lib/supabase";
import { STORE_PRODUCTS as SEED_PRODUCTS, type StoreProduct } from "../data/storeProducts";

const COUNTRY_LABEL: Record<StoreCountry, string> = {
  US: "🇺🇸 United States",
  IN: "🇮🇳 India",
  OTHER: "🌍 Other",
};

// Normalize both the DB shape and the static-seed shape into one common shape
interface DisplayProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  US?: { priceRange: string; url: string; retailer: string };
  IN?: { priceRange: string; url: string; retailer: string };
}

function fromDb(p: DbStoreProduct): DisplayProduct {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    US: p.us_url ? { priceRange: p.us_price, url: p.us_url, retailer: p.us_retailer } : undefined,
    IN: p.in_url ? { priceRange: p.in_price, url: p.in_url, retailer: p.in_retailer } : undefined,
  };
}
function fromSeed(p: StoreProduct): DisplayProduct {
  return { id: p.id, name: p.name, category: p.category, description: p.description, US: p.US, IN: p.IN };
}

export default function Store() {
  const [country, setCountry] = useState<StoreCountry | null>(null);
  const [category, setCategory] = useState<string>("All");
  const [products, setProducts] = useState<DisplayProduct[]>(SEED_PRODUCTS.map(fromSeed));
  const [loadingProducts, setLoadingProducts] = useState(isSupabaseConfigured);

  useEffect(() => {
    detectCountry().then(setCountry);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchActiveProducts()
      .then((dbProducts) => {
        // If the admin hasn't added any products yet, keep showing the
        // built-in starter catalog rather than an empty store.
        if (dbProducts.length > 0) setProducts(dbProducts.map(fromDb));
      })
      .catch(() => {
        // DB fetch failed (table not migrated yet, etc.) — keep seed catalog
      })
      .finally(() => setLoadingProducts(false));
  }, []);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  function changeCountry(c: StoreCountry) {
    setCountryOverride(c);
    setCountry(c);
  }

  const filteredProducts = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category, products],
  );

  // For "OTHER" countries, default to showing US pricing/links as the broadest option
  const effectiveCountry: "US" | "IN" = country === "IN" ? "IN" : "US";

  return (
    <div className="px-6 py-16">
      <Seo
        title="Diabetes Care Store"
        description="Test strips, meters, lancets, and other diabetes essentials — with pricing and links for your country."
        path="/store"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Store</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Everyday diabetes essentials.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Meters, strips, lancets, and more — priced and linked for where you shop.
          </p>
        </Reveal>

        {/* Country selector */}
        <Reveal delay={0.08} className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Shopping from</p>
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full bg-bg-elevated/60 p-1.5 ring-1 ring-line">
            {(["US", "IN"] as StoreCountry[]).map((c) => (
              <button
                key={c}
                onClick={() => changeCountry(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  effectiveCountry === c ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {COUNTRY_LABEL[c]}
              </button>
            ))}
          </div>
          {country === null && (
            <p className="text-xs text-muted-2">Detecting your location…</p>
          )}
        </Reveal>

        {/* Disclosure — required, always visible */}
        <Reveal delay={0.1} className="mt-8">
          <div className="mx-auto max-w-2xl rounded-xl bg-bg-elevated/40 px-4 py-3 text-center text-xs leading-relaxed text-muted">
            <span className="font-semibold text-ink-dim">Affiliate disclosure:</span> Links below
            go to retailer partners. If you buy through them, we may earn a small commission at no
            extra cost to you. Prices shown are estimates — always confirm the current price and
            check with your pharmacist about what's right for your device or condition.
          </div>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={0.12} className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                    : "text-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid */}
        {loadingProducts ? (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} country={effectiveCountry} delay={(i % 6) * 0.05} />
            ))}
          </div>
        )}

        <Reveal delay={0.1} className="mt-14 text-center">
          <p className="text-sm text-muted">
            Don&rsquo;t see what you need? Check with your local pharmacy — availability and
            pricing vary by region.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  country,
  delay,
}: {
  product: DisplayProduct;
  country: "US" | "IN";
  delay: number;
}) {
  const offer = product[country];
  if (!offer) return null;

  return (
    <motion.a
      href={offer.url}
      target="_blank"
      rel="noreferrer sponsored"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="group glass flex flex-col rounded-2xl p-6 transition-colors hover:bg-card-hover"
    >
      <span className="w-fit rounded-full bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/20">
        {product.category}
      </span>
      <h3 className="mt-3 font-display text-base font-semibold text-ink">{product.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{offer.priceRange}</p>
          <p className="text-[11px] text-muted-2">on {offer.retailer}</p>
        </div>
        <span className="rounded-full bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 transition-transform group-hover:translate-x-0.5">
          View →
        </span>
      </div>
    </motion.a>
  );
}
