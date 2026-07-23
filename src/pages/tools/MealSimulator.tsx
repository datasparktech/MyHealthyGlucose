import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";
import { FOOD_DB, glycemicLoad, findSwaps, type Food } from "../../data/foodDb";

interface MealItem {
  id: number;
  food: Food;
  qty: number;
}

function glBand(gl: number) {
  if (gl <= 10) return { label: "Low", color: "#0B8161" };
  if (gl <= 19) return { label: "Medium", color: "#C85A2A" };
  return { label: "High", color: "#B8481B" };
}

export default function MealSimulator() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState<MealItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const totals = meal.reduce(
    (acc, m) => {
      acc.carbs += m.food.carbs * m.qty;
      acc.protein += m.food.protein * m.qty;
      acc.fat += m.food.fat * m.qty;
      acc.gl += glycemicLoad(m.food) * m.qty;
      return acc;
    },
    { carbs: 0, protein: 0, fat: 0, gl: 0 },
  );

  // Collect swap suggestions for items in the meal
  const suggestions = meal.flatMap((m) =>
    findSwaps(m.food.name).map((s) => {
      const target = FOOD_DB.find((f) => f.name === s.to);
      if (!target) return null;
      const currentGL = glycemicLoad(m.food) * m.qty;
      const newGL = glycemicLoad(target) * m.qty;
      const drop = currentGL > 0 ? Math.round(((currentGL - newGL) / currentGL) * 100) : 0;
      return { ...s, drop, itemId: m.id };
    }).filter(Boolean),
  );

  function addFood(food: Food) {
    setMeal((m) => [...m, { id: nextId, food, qty: 1 }]);
    setNextId((n) => n + 1);
    setQuery("");
  }
  function setQty(id: number, qty: number) {
    setMeal((m) => m.map((e) => (e.id === id ? { ...e, qty: Math.max(0.5, qty) } : e)));
  }
  function remove(id: number) {
    setMeal((m) => m.filter((e) => e.id !== id));
  }
  function applySwap(itemId: number, toName: string) {
    const target = FOOD_DB.find((f) => f.name === toName);
    if (!target) return;
    setMeal((m) => m.map((e) => (e.id === itemId ? { ...e, food: target } : e)));
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";
  const band = glBand(totals.gl);

  return (
    <ToolShell
      eyebrow={t("tools.pages.mealSim.eyebrow")}
      title={t("tools.pages.mealSim.title")}
      intro={t("tools.pages.mealSim.intro")}
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <label className="relative block">
          <span className="mb-1.5 block text-sm text-muted">Add a food</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “rice”, “chicken”, “naan”, “pho”…"
            className={inputCls}
          />
          <AnimatePresence>
            {matches.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-line bg-card shadow-2xl shadow-black/10"
              >
                {matches.map((f) => (
                  <li key={f.name}>
                    <button
                      onClick={() => addFood(f)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-card-hover"
                    >
                      <span>
                        <span className="text-sm font-medium text-ink">{f.name}</span>
                        <span className="ml-2 text-xs text-muted">{f.serving}</span>
                      </span>
                      <span className="text-xs text-muted">GL {glycemicLoad(f)}</span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </label>

        {/* Meal list */}
        <div className="mt-6 space-y-2">
          <AnimatePresence>
            {meal.map((e) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 rounded-xl bg-bg-elevated/50 px-4 py-3 ring-1 ring-line"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{e.food.name}</p>
                  <p className="text-xs text-muted">
                    {e.food.serving} · {Math.round(e.food.carbs * e.qty)}g carb · GL{" "}
                    {glycemicLoad(e.food) * e.qty}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setQty(e.id, e.qty - 0.5)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-muted hover:text-ink" aria-label="Decrease">−</button>
                  <span className="w-8 text-center text-sm tabular-nums text-ink">{e.qty}×</span>
                  <button onClick={() => setQty(e.id, e.qty + 0.5)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-muted hover:text-ink" aria-label="Increase">+</button>
                </div>
                <button onClick={() => remove(e.id)} className="text-muted-2 hover:text-orange-300" aria-label="Remove">✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {meal.length === 0 && (
          <p className="mt-6 rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            Search above to build a meal and see its glucose impact.
          </p>
        )}

        {/* Totals */}
        {meal.length > 0 && (
          <div className="mt-6 border-t border-line pt-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-bg-elevated/50 p-4 text-center ring-1 ring-line">
                <p className="text-xs text-muted">Glycemic Load</p>
                <p className="mt-1 font-display text-2xl font-semibold" style={{ color: band.color }}>
                  {Math.round(totals.gl)}
                </p>
                <p className="text-[11px] font-semibold" style={{ color: band.color }}>{band.label}</p>
              </div>
              <div className="rounded-xl bg-bg-elevated/50 p-4 text-center ring-1 ring-line">
                <p className="text-xs text-muted">Carbs</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">{Math.round(totals.carbs)}<span className="text-sm text-muted">g</span></p>
              </div>
              <div className="rounded-xl bg-bg-elevated/50 p-4 text-center ring-1 ring-line">
                <p className="text-xs text-muted">Protein</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">{Math.round(totals.protein)}<span className="text-sm text-muted">g</span></p>
              </div>
              <div className="rounded-xl bg-bg-elevated/50 p-4 text-center ring-1 ring-line">
                <p className="text-xs text-muted">Fat</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">{Math.round(totals.fat)}<span className="text-sm text-muted">g</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Smart swaps */}
        {suggestions.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-teal-400">
              💡 Smart swaps
            </p>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-teal-500/8 px-4 py-3 ring-1 ring-teal-400/15">
                  <p className="text-sm text-ink-dim">
                    {s!.note}{" "}
                    {s!.drop > 0 && (
                      <span className="font-semibold text-teal-300">(~{s!.drop}% lower glycemic load)</span>
                    )}
                  </p>
                  <button
                    onClick={() => applySwap(s!.itemId, s!.to)}
                    className="shrink-0 rounded-full bg-teal-500 px-4 py-1.5 text-xs font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
                  >
                    Swap
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Disclaimer className="mt-8" />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">How to read glycemic load.</p>
        <p className="mt-2">
          Glycemic load (GL) estimates a food&rsquo;s real-world blood-sugar impact by combining
          how fast it raises glucose (GI) with how much carbohydrate is in your serving. Roughly:
          10 or under is low, 11–19 is medium, 20+ is high. These are population estimates —
          your own response varies, so use this as a guide, not a rule.
        </p>
      </div>
    </ToolShell>
  );
}
