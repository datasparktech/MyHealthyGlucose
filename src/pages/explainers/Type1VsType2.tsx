import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";

type DType = "type1" | "type2";

const GLUCOSE_POSITIONS = [
  { x: 300, y: 135 }, { x: 340, y: 155 }, { x: 380, y: 130 },
  { x: 420, y: 160 }, { x: 460, y: 138 }, { x: 500, y: 152 },
];

const COPY: Record<DType, { headline: string; body: string }> = {
  type1: {
    headline: "The pancreas makes little or no insulin.",
    body: "In type 1 diabetes, the immune system mistakenly attacks the insulin-producing cells in the pancreas. Without insulin, glucose has no way to get out of the blood and into cells — it isn't caused by diet or lifestyle, and it requires insulin therapy to manage.",
  },
  type2: {
    headline: "Insulin is made, but cells resist it.",
    body: "In type 2 diabetes, the pancreas usually still produces insulin, but cells respond to it poorly — a state called insulin resistance. The 'key' doesn't open the 'lock' as easily, so glucose builds up in the blood even though insulin is present. Genetics, weight, and activity level all play a role.",
  },
};

export default function Type1VsType2() {
  const [type, setType] = useState<DType>("type1");
  const isT1 = type === "type1";

  return (
    <ExplainerShell
      eyebrow="Visual Explainer"
      title="Type 1 vs. Type 2 — what's actually different."
      intro="Same symptoms on the surface, very different mechanisms underneath. Toggle between them to see why."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Toggle */}
        <div className="mx-auto flex w-fit rounded-full bg-bg-elevated/60 p-1.5 ring-1 ring-line">
          {(["type1", "type2"] as DType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                type === t ? "bg-teal-500 text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {t === "type1" ? "Type 1" : "Type 2"}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 800 300" className="mt-6 w-full" style={{ maxHeight: 300 }}>
          {/* Pancreas */}
          <g>
            <motion.ellipse
              cx="110" cy="150" rx="70" ry="48"
              animate={{
                fill: isT1 ? "#F4C7C0" : "#0C9468",
                stroke: isT1 ? "#C2704F" : "#0FA377",
              }}
              strokeWidth="2"
              transition={{ duration: 0.4 }}
            />
            <text x="110" y="150" textAnchor="middle" fontSize="13" fontWeight="600" fill={isT1 ? "#8B3A2E" : "#F1FAF7"}>
              Pancreas
            </text>
            <text x="110" y="168" textAnchor="middle" fontSize="10" fill={isT1 ? "#8B3A2E" : "#F1FAF7"}>
              {isT1 ? "attacked / inactive" : "producing insulin"}
            </text>
          </g>

          {/* Blood vessel */}
          <rect x="220" y="110" width="360" height="80" rx="40" fill="#E6F3EE" stroke="#A9CBC0" strokeWidth="2" />
          <text x="400" y="100" textAnchor="middle" fontSize="12" fill="#5C7C76" fontWeight="600" letterSpacing="0.5">
            BLOODSTREAM
          </text>

          {/* Glucose dots — stay in vessel either way (this comparison emphasizes the blockage) */}
          {GLUCOSE_POSITIONS.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y} r="7"
              fill="#fb923c"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            />
          ))}

          {/* Insulin key — only appears for type 2 (type 1 has none) */}
          <AnimatePresence>
            {!isT1 &&
              [0, 1].map((i) => (
                <motion.rect
                  key={i}
                  width="16" height="9" rx="3"
                  fill="#0FA377"
                  initial={{ x: 150, y: 145, opacity: 0 }}
                  animate={{ x: 590, y: 140 + i * 20, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                />
              ))}
          </AnimatePresence>

          {/* Cell */}
          <g>
            <circle cx="700" cy="150" r="80" fill="#DCEEE8" stroke="#A9CBC0" strokeWidth="2" />
            <text x="700" y="230" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5C7C76">
              Cell
            </text>
            {/* Gate — closed for type 1 (no insulin at all); "resistant" (barely budging) for type 2 */}
            <motion.rect
              x="612" y="135" width="16" height="30" rx="4"
              animate={{
                fill: isT1 ? "#8FB0A6" : "#B7D3CA",
                width: isT1 ? 16 : 19,
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.text
              x="700" y="270" textAnchor="middle" fontSize="10" fill="#5C7C76"
              key={type}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isT1 ? "no key to unlock it" : "resists the key"}
            </motion.text>
          </g>
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-xl bg-bg-elevated/40 px-5 py-4"
          >
            <p className="font-display text-base font-semibold text-ink">{COPY[type].headline}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{COPY[type].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">The upshot.</p>
        <p className="mt-2">
          Both end in the same place — glucose stuck in the blood instead of reaching cells — but
          the fix is different. Type 1 always requires insulin, since the body can&rsquo;t make
          enough on its own. Type 2 is often managed first with lifestyle changes and non-insulin
          medications that improve how well the body responds to the insulin it already makes,
          though some people with type 2 use insulin as well.
        </p>
      </div>
    </ExplainerShell>
  );
}
