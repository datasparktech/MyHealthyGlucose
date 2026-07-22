import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

type Unit = "metric" | "imperial";

interface Category {
  label: string;
  range: string;
  color: string;
  note: string;
}

function categorize(bmi: number): Category {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      range: "below 18.5",
      color: "#5eead4",
      note: "Being underweight has its own health considerations — a doctor can help you find a healthy range.",
    };
  if (bmi < 25)
    return {
      label: "Healthy weight",
      range: "18.5 – 24.9",
      color: "#2dd4bf",
      note: "This range is associated with lower risk of type 2 diabetes and related conditions.",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      range: "25 – 29.9",
      color: "#fbbf6b",
      note: "Carrying extra weight can raise the risk of type 2 diabetes. Small, sustained changes help more than crash diets.",
    };
  return {
    label: "Obese",
    range: "30 and above",
    color: "#f59e0b",
    note: "This range is linked with higher risk of type 2 diabetes. A doctor or dietitian can help build a realistic plan.",
  };
}

export default function BMICalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [lbs, setLbs] = useState("");

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (!h || !w || h <= 0) return null;
      return w / (h * h);
    } else {
      const totalIn = parseFloat(ft) * 12 + (parseFloat(inch) || 0);
      const w = parseFloat(lbs);
      if (!totalIn || !w || totalIn <= 0) return null;
      return (w / (totalIn * totalIn)) * 703;
    }
  }, [unit, heightCm, weightKg, ft, inch, lbs]);

  const cat = bmi ? categorize(bmi) : null;
  // gauge position: clamp BMI 12–40 to 0–100%
  const gaugePct = bmi ? Math.min(100, Math.max(0, ((bmi - 12) / 28) * 100)) : 0;

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  return (
    <ToolShell
      eyebrow="BMI Calculator"
      title="Body Mass Index — with real context."
      intro="A quick estimate of where your weight sits, plus what it means for diabetes risk. No login, no data stored."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Unit toggle */}
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

        {unit === "metric" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Height (cm)</span>
              <input
                type="number"
                inputMode="decimal"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="170"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Weight (kg)</span>
              <input
                type="number"
                inputMode="decimal"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="70"
                className={inputCls}
              />
            </label>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Height (ft)</span>
              <input
                type="number"
                inputMode="numeric"
                value={ft}
                onChange={(e) => setFt(e.target.value)}
                placeholder="5"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Height (in)</span>
              <input
                type="number"
                inputMode="numeric"
                value={inch}
                onChange={(e) => setInch(e.target.value)}
                placeholder="7"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Weight (lbs)</span>
              <input
                type="number"
                inputMode="decimal"
                value={lbs}
                onChange={(e) => setLbs(e.target.value)}
                placeholder="154"
                className={inputCls}
              />
            </label>
          </div>
        )}

        {/* Result */}
        {bmi && cat && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 border-t border-line pt-8"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted">Your BMI</p>
                <p className="font-display text-5xl font-semibold text-ink">{bmi.toFixed(1)}</p>
              </div>
              <div className="text-right">
                <p
                  className="font-display text-lg font-semibold"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </p>
                <p className="text-xs text-muted">Healthy: 18.5 – 24.9</p>
              </div>
            </div>

            {/* Gauge */}
            <div className="relative mt-6 h-3 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-300 via-teal-500 to-orange-500" />
              <motion.div
                className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-white shadow-lg"
                initial={{ left: 0 }}
                animate={{ left: `${gaugePct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-2">
              <span>12</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-dim">{cat.note}</p>
          </motion.div>
        )}

        <Disclaimer className="mt-8" />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">A note on BMI&rsquo;s limits.</p>
        <p className="mt-2">
          BMI is a rough screening number, not a diagnosis. It doesn&rsquo;t distinguish muscle
          from fat, and healthy ranges can differ by ancestry — for example, some health bodies
          use lower cutoffs for South Asian populations. Treat it as one signal among many.
        </p>
      </div>
    </ToolShell>
  );
}
