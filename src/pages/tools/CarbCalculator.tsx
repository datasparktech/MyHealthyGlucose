import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";
import { FOODS, type FoodItem } from "../../data/foods";

interface Entry {
  id: number;
  food: FoodItem;
  qty: number;
}

const cuisineColors: Record<string, string> = {
  Indian: "text-orange-300 bg-orange-500/10 ring-orange-400/20",
  Western: "text-teal-300 bg-teal-500/10 ring-teal-400/20",
  Staple: "text-teal-200 bg-teal-400/10 ring-teal-300/20",
  Snack: "text-orange-300 bg-orange-500/10 ring-orange-400/20",
  Drink: "text-teal-300 bg-teal-500/10 ring-teal-400/20",
};

export default function CarbCalculator() {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState<Entry[]>([]);
  const [nextId, setNextId] = useState(1);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return FOODS.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const total = meal.reduce((sum, e) => sum + e.food.carbs * e.qty, 0);

  function addFood(food: FoodItem) {
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

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  return (
    <ToolShell
      eyebrow="Carb Calculator"
      title="Count carbs around real food."
      intro="Search common dishes — Indian, Western and everyday staples — and build a meal to see the running carb total."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Search */}
        <label className="relative block">
          <span className="mb-1.5 block text-sm text-muted">Search a food</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “dal”, “rice”, “pizza”…"
            className={inputCls}
          />
          <AnimatePresence>
            {matches.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-line bg-card shadow-2xl shadow-black/50"
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
                      <span className="text-sm font-semibold text-teal-300">{f.carbs}g</span>
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
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-ink">{e.food.name}</p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${
                        cuisineColors[e.food.cuisine]
                      }`}
                    >
                      {e.food.cuisine}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{e.food.serving}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setQty(e.id, e.qty - 0.5)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-muted transition-colors hover:text-ink"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums text-ink">{e.qty}×</span>
                  <button
                    onClick={() => setQty(e.id, e.qty + 0.5)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-muted transition-colors hover:text-ink"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className="w-14 text-right text-sm font-semibold tabular-nums text-teal-300">
                  {Math.round(e.food.carbs * e.qty)}g
                </span>
                <button
                  onClick={() => remove(e.id)}
                  className="text-muted-2 transition-colors hover:text-orange-300"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {meal.length === 0 && (
          <p className="mt-6 rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            Search above to add foods and build your meal.
          </p>
        )}

        {/* Total */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
            Total carbs
          </p>
          <motion.p
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-display text-4xl font-semibold text-ink"
          >
            {Math.round(total)}
            <span className="ml-1 text-lg text-muted">g</span>
          </motion.p>
        </div>

        <Disclaimer className="mt-8" />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">These are estimates.</p>
        <p className="mt-2">
          Real carb counts vary with portion size, recipe and preparation. Use these as a
          starting point — the app&rsquo;s 1,000+ dish database gives finer detail, and your care
          team can help with insulin-to-carb ratios if you count for dosing.
        </p>
      </div>
    </ToolShell>
  );
}
