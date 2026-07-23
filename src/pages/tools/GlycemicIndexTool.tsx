import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

interface GIFood {
  name: string;
  gi: number;
  carbsPerServing: number;
  serving: string;
}

// GI values are approximate, from published glycemic-index tables.
const GI_FOODS: GIFood[] = [
  { name: "White rice", gi: 73, carbsPerServing: 45, serving: "1 cup cooked" },
  { name: "Brown rice", gi: 68, carbsPerServing: 45, serving: "1 cup cooked" },
  { name: "Basmati rice", gi: 58, carbsPerServing: 45, serving: "1 cup cooked" },
  { name: "White bread", gi: 75, carbsPerServing: 14, serving: "1 slice" },
  { name: "Whole wheat bread", gi: 74, carbsPerServing: 12, serving: "1 slice" },
  { name: "Chapati / roti", gi: 62, carbsPerServing: 15, serving: "1 medium" },
  { name: "Oatmeal", gi: 55, carbsPerServing: 27, serving: "1 cup cooked" },
  { name: "Cornflakes", gi: 81, carbsPerServing: 25, serving: "1 cup" },
  { name: "Potato (boiled)", gi: 78, carbsPerServing: 26, serving: "1 medium" },
  { name: "Sweet potato", gi: 63, carbsPerServing: 24, serving: "1 medium" },
  { name: "Lentils (dal)", gi: 32, carbsPerServing: 20, serving: "1 cup" },
  { name: "Chickpeas", gi: 28, carbsPerServing: 45, serving: "1 cup" },
  { name: "Kidney beans", gi: 24, carbsPerServing: 40, serving: "1 cup" },
  { name: "Apple", gi: 36, carbsPerServing: 25, serving: "1 medium" },
  { name: "Banana", gi: 51, carbsPerServing: 27, serving: "1 medium" },
  { name: "Watermelon", gi: 76, carbsPerServing: 11, serving: "1 cup" },
  { name: "Mango", gi: 51, carbsPerServing: 25, serving: "1 cup" },
  { name: "Carrots", gi: 39, carbsPerServing: 12, serving: "1 cup" },
  { name: "Whole milk", gi: 39, carbsPerServing: 12, serving: "1 cup" },
  { name: "Pasta", gi: 49, carbsPerServing: 43, serving: "1 cup cooked" },
  { name: "Cola", gi: 63, carbsPerServing: 39, serving: "12 oz" },
  { name: "Honey", gi: 61, carbsPerServing: 17, serving: "1 tbsp" },
];

function giBand(gi: number) {
  if (gi <= 55) return { label: "Low", color: "#2dd4bf" };
  if (gi <= 69) return { label: "Medium", color: "#fbbf6b" };
  return { label: "High", color: "#f59e0b" };
}
function glBand(gl: number) {
  if (gl <= 10) return { label: "Low", color: "#2dd4bf" };
  if (gl <= 19) return { label: "Medium", color: "#fbbf6b" };
  return { label: "High", color: "#f59e0b" };
}

export default function GlycemicIndexTool() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<GIFood | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return GI_FOODS.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const gl = selected ? Math.round((selected.gi * selected.carbsPerServing) / 100) : null;

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  return (
    <ToolShell
      eyebrow={t("tools.pages.gi.eyebrow")}
      title={t("tools.pages.gi.title")}
      intro={t("tools.pages.gi.intro")}
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <label className="relative block">
          <span className="mb-1.5 block text-sm text-muted">Search a food</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            placeholder="Try “rice”, “banana”, “dal”…"
            className={inputCls}
          />
          {matches.length > 0 && !selected && (
            <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-line bg-card shadow-2xl shadow-black/50">
              {matches.map((f) => (
                <li key={f.name}>
                  <button
                    onClick={() => {
                      setSelected(f);
                      setQuery(f.name);
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-card-hover"
                  >
                    <span className="text-sm font-medium text-ink">{f.name}</span>
                    <span className="text-sm text-muted">GI {f.gi}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>

        {selected && gl !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-2xl bg-bg-elevated/50 p-6 ring-1 ring-line">
              <p className="text-sm text-muted">Glycemic Index</p>
              <p className="mt-1 font-display text-4xl font-semibold text-ink">{selected.gi}</p>
              <p className="mt-1 text-sm font-semibold" style={{ color: giBand(selected.gi).color }}>
                {giBand(selected.gi).label}
              </p>
            </div>
            <div className="rounded-2xl bg-bg-elevated/50 p-6 ring-1 ring-line">
              <p className="text-sm text-muted">Glycemic Load ({selected.serving})</p>
              <p className="mt-1 font-display text-4xl font-semibold text-ink">{gl}</p>
              <p className="mt-1 text-sm font-semibold" style={{ color: glBand(gl).color }}>
                {glBand(gl).label}
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-6 rounded-xl bg-bg-elevated/40 px-4 py-3 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-ink-dim">GI vs GL:</span> Watermelon has a high GI (76)
          but a low glycemic load, because a serving has few carbs. That&rsquo;s why GL is often the
          more practical guide.
        </div>

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
