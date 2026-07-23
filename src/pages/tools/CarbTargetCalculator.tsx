import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

export default function CarbTargetCalculator() {
  const { t } = useTranslation();
  const [calories, setCalories] = useState("2000");
  const [carbPct, setCarbPct] = useState(45); // % of calories from carbs

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  const cal = parseFloat(calories);
  const carbGrams = cal > 0 ? Math.round((cal * (carbPct / 100)) / 4) : null; // 4 cal/g
  const perMeal = carbGrams ? Math.round(carbGrams / 3) : null;
  // Fiber: ~14g per 1000 kcal (Dietary Guidelines)
  const fiberTarget = cal > 0 ? Math.round((cal / 1000) * 14) : null;

  return (
    <ToolShell
      eyebrow={t("tools.pages.carbTarget.eyebrow")}
      title={t("tools.pages.carbTarget.title")}
      intro={t("tools.pages.carbTarget.intro")}
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Daily calories</span>
          <input
            type="number"
            inputMode="numeric"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="2000"
            className={inputCls}
          />
        </label>

        <label className="mt-6 block">
          <span className="mb-1.5 flex items-center justify-between text-sm text-muted">
            <span>Carbs as % of calories</span>
            <span className="font-semibold text-teal-300">{carbPct}%</span>
          </span>
          <input
            type="range"
            min={30}
            max={60}
            step={5}
            value={carbPct}
            onChange={(e) => setCarbPct(parseInt(e.target.value))}
            className="w-full accent-teal-500"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-2">
            <span>Lower-carb (30%)</span>
            <span>Moderate (45%)</span>
            <span>Higher (60%)</span>
          </div>
        </label>

        {carbGrams !== null && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-teal-500/10 p-6 text-center ring-1 ring-teal-400/25">
              <p className="text-sm text-muted">Daily carbs</p>
              <p className="mt-1 font-display text-3xl font-semibold text-teal-300">{carbGrams}<span className="text-base text-muted">g</span></p>
            </div>
            <div className="rounded-2xl bg-bg-elevated/50 p-6 text-center ring-1 ring-line">
              <p className="text-sm text-muted">Per meal (÷3)</p>
              <p className="mt-1 font-display text-3xl font-semibold text-ink">{perMeal}<span className="text-base text-muted">g</span></p>
            </div>
            <div className="rounded-2xl bg-bg-elevated/50 p-6 text-center ring-1 ring-line">
              <p className="text-sm text-muted">Daily fiber</p>
              <p className="mt-1 font-display text-3xl font-semibold text-ink">{fiberTarget}<span className="text-base text-muted">g</span></p>
            </div>
          </motion.div>
        )}

        <div className="mt-6 rounded-xl bg-bg-elevated/40 px-4 py-3 text-sm leading-relaxed text-muted">
          These are general estimates using common formulas (carbs at 4 cal/g; fiber at roughly
          14g per 1,000 calories). The right carbohydrate amount for you depends on your goals,
          medications, and activity — a registered dietitian can personalize it.
        </div>

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
