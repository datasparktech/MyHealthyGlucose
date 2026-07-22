import { useState } from "react";
import { motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

type Unit = "metric" | "imperial";

export default function WaterIntakeCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(0); // extra minutes of exercise

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  const w = parseFloat(weight);
  let liters: number | null = null;
  if (w > 0) {
    const kg = unit === "metric" ? w : w * 0.453592;
    // ~35 ml per kg baseline + ~0.35 L per 30 min activity
    liters = (kg * 35) / 1000 + (activity / 30) * 0.35;
  }
  const cups = liters ? Math.round((liters * 1000) / 240) : null; // 240ml cup

  return (
    <ToolShell
      eyebrow="Hydration Calculator"
      title="How much water should you drink?"
      intro="Staying hydrated matters for everyone, and especially when managing blood sugar. This gives a general daily target based on your weight and activity."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="mb-6 inline-flex rounded-full bg-bg-elevated/60 p-1 ring-1 ring-line">
          {(["metric", "imperial"] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                unit === u ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "70" : "154"}
            className={inputCls}
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm text-muted">
            Daily exercise: {activity} min
          </span>
          <input
            type="range"
            min={0}
            max={120}
            step={15}
            value={activity}
            onChange={(e) => setActivity(parseInt(e.target.value))}
            className="w-full accent-teal-500"
          />
        </label>

        {liters !== null && cups !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl bg-teal-500/10 p-6 text-center ring-1 ring-teal-400/25"
          >
            <p className="text-sm text-muted">Suggested daily water</p>
            <p className="mt-1 font-display text-4xl font-semibold text-teal-300">
              {liters.toFixed(1)} L
            </p>
            <p className="mt-1 text-sm text-muted">about {cups} cups (240 ml each)</p>
          </motion.div>
        )}

        <div className="mt-6 rounded-xl bg-bg-elevated/40 px-4 py-3 text-sm leading-relaxed text-muted">
          This is a general guide. Your needs change with climate, health conditions, and
          medications — some conditions require fluid limits, so check with your doctor if unsure.
        </div>

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
