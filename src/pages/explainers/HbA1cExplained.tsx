import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";

// ADAG formula, inverted: A1C = (avgGlucose + 46.7) / 28.7
function glucoseToA1c(avg: number) {
  return (avg + 46.7) / 28.7;
}

function band(a1c: number) {
  if (a1c < 5.7) return { label: "Normal range", color: "#0C9468" };
  if (a1c < 6.5) return { label: "Prediabetes range", color: "#fbbf6b" };
  return { label: "Diabetes range", color: "#f59e0b" };
}

export default function HbA1cExplained() {
  const [avgGlucose, setAvgGlucose] = useState(130);
  const a1c = useMemo(() => glucoseToA1c(avgGlucose), [avgGlucose]);
  const b = band(a1c);
  // Map A1C (roughly 4%-14% clinically) to a 0-1 "coating intensity"
  const coating = Math.min(1, Math.max(0, (a1c - 4) / 10));

  return (
    <ExplainerShell
      eyebrow="Visual Explainer · Interactive"
      title="What HbA1c actually measures."
      intro="A1C isn't a separate blood sugar reading — it's a reflection of your average glucose over the past ~3 months, measured through your red blood cells. Drag the slider to see how average glucose translates into an A1C percentage."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Slider */}
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">Average blood glucose</span>
            <span className="font-display text-lg font-semibold text-ink">{avgGlucose} mg/dL</span>
          </div>
          <input
            type="range"
            min={80}
            max={260}
            step={5}
            value={avgGlucose}
            onChange={(e) => setAvgGlucose(parseInt(e.target.value))}
            className="mt-3 w-full accent-teal-500"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-2">
            <span>80 (low-normal)</span>
            <span>260 (very high)</span>
          </div>
        </label>

        {/* Result */}
        <motion.div
          key={Math.round(a1c * 10)}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-2xl p-6 text-center"
          style={{ backgroundColor: `${b.color}1a`, boxShadow: `inset 0 0 0 1px ${b.color}40` }}
        >
          <p className="text-sm text-muted">Estimated A1C</p>
          <p className="mt-1 font-display text-5xl font-bold" style={{ color: b.color }}>
            {a1c.toFixed(1)}%
          </p>
          <p className="mt-1 text-sm font-semibold" style={{ color: b.color }}>{b.label}</p>
        </motion.div>

        {/* Red blood cell visualization */}
        <div className="mt-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-muted">
            Your red blood cells, visualized
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 22 22">
                <circle cx="11" cy="11" r="9" fill="#E8998A" />
                <motion.circle
                  cx="11" cy="11" r="9"
                  fill="#fb923c"
                  animate={{ opacity: coating * 0.85 }}
                  transition={{ duration: 0.3 }}
                />
                <circle cx="11" cy="11" r="4" fill="#8B3A2E" opacity="0.4" />
              </svg>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            The orange tint represents glucose attaching to hemoglobin (glycation) — more average
            glucose means more coating, which is literally what the A1C test measures.
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">Why 3 months?</p>
        <p className="mt-2">
          Red blood cells live for about three months. Glucose in your blood attaches to the
          hemoglobin inside them throughout that lifespan — more glucose means more attaches. The
          A1C test measures what percentage of your hemoglobin is coated this way, giving a
          long-term average that a single finger-prick reading can't. That's also why it changes
          slowly: today's reading mostly reflects the last few months, not just today.
        </p>
        <p className="mt-3">
          Want to convert in the other direction, or between mg/dL and mmol/L?{" "}
          <a href="/tools/a1c-converter" className="text-teal-300 hover:text-teal-200">
            Use the A1C ↔ Average Glucose converter
          </a>
          .
        </p>
      </div>
    </ExplainerShell>
  );
}
