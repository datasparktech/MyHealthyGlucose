import { useState, Fragment } from "react";
import { motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

type Unit = "mgdl" | "mmol";

// ADAG formula: eAG (mg/dL) = 28.7 × A1C − 46.7
function a1cToMgdl(a1c: number) {
  return 28.7 * a1c - 46.7;
}
function mgdlToA1c(mgdl: number) {
  return (mgdl + 46.7) / 28.7;
}
const mgdlToMmol = (mgdl: number) => mgdl / 18.0182;
const mmolToMgdl = (mmol: number) => mmol * 18.0182;

const reference = [
  { a1c: 6, mgdl: 126 },
  { a1c: 7, mgdl: 154 },
  { a1c: 8, mgdl: 183 },
  { a1c: 9, mgdl: 212 },
  { a1c: 10, mgdl: 240 },
  { a1c: 11, mgdl: 269 },
  { a1c: 12, mgdl: 298 },
];

export default function A1CConverter() {
  const [mode, setMode] = useState<"fromA1c" | "toA1c">("fromA1c");
  const [unit, setUnit] = useState<Unit>("mgdl");
  const [a1c, setA1c] = useState("");
  const [glucose, setGlucose] = useState("");

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  let result: string | null = null;
  if (mode === "fromA1c") {
    const v = parseFloat(a1c);
    if (v > 0) {
      const mgdl = a1cToMgdl(v);
      result = unit === "mgdl" ? `${Math.round(mgdl)} mg/dL` : `${mgdlToMmol(mgdl).toFixed(1)} mmol/L`;
    }
  } else {
    const v = parseFloat(glucose);
    if (v > 0) {
      const mgdl = unit === "mgdl" ? v : mmolToMgdl(v);
      result = `${mgdlToA1c(mgdl).toFixed(1)}%`;
    }
  }

  return (
    <ToolShell
      eyebrow="A1C ↔ Average Glucose"
      title="Translate your A1C into everyday numbers."
      intro="HbA1c reflects your average glucose over ~3 months. This converts between the two using the standard ADAG formula."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Mode toggle */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="inline-flex rounded-full bg-bg-elevated/60 p-1 ring-1 ring-line">
            <button
              onClick={() => setMode("fromA1c")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === "fromA1c" ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
              }`}
            >
              A1C → glucose
            </button>
            <button
              onClick={() => setMode("toA1c")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === "toA1c" ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
              }`}
            >
              Glucose → A1C
            </button>
          </div>
          <div className="inline-flex rounded-full bg-bg-elevated/60 p-1 ring-1 ring-line">
            {(["mgdl", "mmol"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  unit === u ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {u === "mgdl" ? "mg/dL" : "mmol/L"}
              </button>
            ))}
          </div>
        </div>

        {mode === "fromA1c" ? (
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">HbA1c (%)</span>
            <input
              type="number"
              inputMode="decimal"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              placeholder="7.0"
              className={inputCls}
            />
          </label>
        ) : (
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">
              Average glucose ({unit === "mgdl" ? "mg/dL" : "mmol/L"})
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              placeholder={unit === "mgdl" ? "154" : "8.6"}
              className={inputCls}
            />
          </label>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-2xl bg-teal-500/10 p-6 text-center ring-1 ring-teal-400/25"
          >
            <p className="text-sm text-muted">
              {mode === "fromA1c" ? "Estimated average glucose" : "Estimated HbA1c"}
            </p>
            <p className="mt-1 font-display text-4xl font-semibold text-teal-300">{result}</p>
          </motion.div>
        )}

        <Disclaimer className="mt-8" />
      </div>

      {/* Reference table */}
      <div className="mt-8 glass overflow-hidden rounded-2xl">
        <div className="border-b border-line px-6 py-4">
          <p className="font-display text-sm font-semibold text-ink">Quick reference</p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-line text-sm">
          <div className="px-6 py-3 font-medium text-muted">HbA1c</div>
          <div className="px-6 py-3 font-medium text-muted">Avg. glucose</div>
          {reference.map((r) => (
            <Fragment key={r.a1c}>
              <div className="border-t border-line px-6 py-2.5 text-ink-dim">
                {r.a1c}%
              </div>
              <div className="border-t border-line px-6 py-2.5 text-ink-dim">
                {r.mgdl} mg/dL · {mgdlToMmol(r.mgdl).toFixed(1)} mmol/L
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
