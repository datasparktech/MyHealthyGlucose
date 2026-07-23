import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

export default function InsulinRatioCalculator() {
  const { t } = useTranslation();
  const [carbs, setCarbs] = useState("");
  const [ratio, setRatio] = useState("");
  const [correction, setCorrection] = useState("");
  const [currentBG, setCurrentBG] = useState("");
  const [targetBG, setTargetBG] = useState("");

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  const carbNum = parseFloat(carbs);
  const ratioNum = parseFloat(ratio);
  const mealDose = carbNum > 0 && ratioNum > 0 ? carbNum / ratioNum : null;

  const corrNum = parseFloat(correction);
  const curNum = parseFloat(currentBG);
  const tgtNum = parseFloat(targetBG);
  const correctionDose =
    corrNum > 0 && curNum > 0 && tgtNum > 0 && curNum > tgtNum
      ? (curNum - tgtNum) / corrNum
      : null;

  const total =
    (mealDose ?? 0) + (correctionDose ?? 0) > 0
      ? (mealDose ?? 0) + (correctionDose ?? 0)
      : null;

  return (
    <ToolShell
      eyebrow={t("tools.pages.insulinRatio.eyebrow")}
      title={t("tools.pages.insulinRatio.title")}
      intro={t("tools.pages.insulinRatio.intro")}
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
          <span className="font-semibold">Important:</span> Never change your insulin dosing based
          on this tool. Use only the ratios your doctor gave you, and confirm every dose with them.
        </div>

        <h2 className="mt-6 font-display text-lg font-semibold text-ink">Mealtime dose</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Carbs in meal (g)</span>
            <input type="number" inputMode="decimal" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="60" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Your carb ratio (1 unit per __ g)</span>
            <input type="number" inputMode="decimal" value={ratio} onChange={(e) => setRatio(e.target.value)} placeholder="10" className={inputCls} />
          </label>
        </div>

        <h2 className="mt-8 font-display text-lg font-semibold text-ink">
          Correction dose <span className="text-sm font-normal text-muted">(optional)</span>
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Correction factor (1 unit per __ mg/dL)</span>
            <input type="number" inputMode="decimal" value={correction} onChange={(e) => setCorrection(e.target.value)} placeholder="50" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Current BG (mg/dL)</span>
            <input type="number" inputMode="decimal" value={currentBG} onChange={(e) => setCurrentBG(e.target.value)} placeholder="180" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Target BG (mg/dL)</span>
            <input type="number" inputMode="decimal" value={targetBG} onChange={(e) => setTargetBG(e.target.value)} placeholder="110" className={inputCls} />
          </label>
        </div>

        {total !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl bg-teal-500/10 p-6 ring-1 ring-teal-400/25"
          >
            <div className="flex items-end justify-between">
              <span className="text-sm text-muted">Estimated total dose</span>
              <span className="font-display text-4xl font-semibold text-teal-300">
                {total.toFixed(1)}
                <span className="ml-1 text-lg text-muted">units</span>
              </span>
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted">
              {mealDose !== null && <p>Meal: {mealDose.toFixed(1)} units</p>}
              {correctionDose !== null && <p>Correction: {correctionDose.toFixed(1)} units</p>}
            </div>
          </motion.div>
        )}

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
