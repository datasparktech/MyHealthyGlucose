import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";

interface Hotspot {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  name: string;
  mechanism: string;
  tip: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "eyes",
    label: "Eyes",
    icon: "👁️",
    x: 150,
    y: 55,
    name: "Diabetic Retinopathy",
    mechanism: "Prolonged high blood sugar can damage the tiny blood vessels in the retina, the light-sensing tissue at the back of the eye. It often causes no symptoms until it's advanced.",
    tip: "An annual dilated eye exam catches it early — often before you'd notice any change in vision.",
  },
  {
    id: "heart",
    label: "Heart",
    icon: "❤️",
    x: 150,
    y: 148,
    name: "Cardiovascular Risk",
    mechanism: "Diabetes roughly doubles the risk of heart disease and stroke. High blood sugar over time damages blood vessels and speeds up plaque buildup in arteries.",
    tip: "Managing blood pressure and cholesterol matters just as much as glucose for heart risk.",
  },
  {
    id: "kidneys",
    label: "Kidneys",
    icon: "🫘",
    x: 150,
    y: 205,
    name: "Diabetic Nephropathy",
    mechanism: "Kidneys filter blood through millions of tiny vessels. Prolonged high glucose can damage these filters, gradually reducing the kidneys' ability to clear waste.",
    tip: "A simple annual urine test (checking for protein) catches this stage, often years before symptoms.",
  },
  {
    id: "nerves",
    label: "Nerves & Feet",
    icon: "🦶",
    x: 150,
    y: 440,
    name: "Diabetic Neuropathy",
    mechanism: "High blood sugar can damage nerves over time, most often starting in the feet. This can cause tingling, numbness, or pain — and reduced sensation means an injury might go unnoticed.",
    tip: "Daily foot checks and comfortable, well-fitting shoes are simple, high-value habits.",
  },
  {
    id: "skin",
    label: "Skin & Wounds",
    icon: "🩹",
    x: 205,
    y: 330,
    name: "Slow Wound Healing",
    mechanism: "High blood sugar impairs circulation and immune response, so cuts, sores, and infections heal more slowly and are more prone to complications.",
    tip: "Any wound that isn't healing after a few days is worth showing your doctor promptly.",
  },
];

export default function ComplicationsBodyMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeSpot = HOTSPOTS.find((h) => h.id === active);

  return (
    <ExplainerShell
      eyebrow="Visual Explainer · Interactive"
      title="Where diabetes shows up in the body."
      intro="Tap a highlighted area to see what's happening there, and what actually helps reduce the risk. All of these are manageable with steady blood sugar, blood pressure, and regular screening."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
          {/* Body silhouette */}
          <div className="mx-auto w-full max-w-[220px]">
            <svg viewBox="0 0 300 500" className="w-full">
              {/* Head */}
              <circle cx="150" cy="55" r="38" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              {/* Neck */}
              <rect x="138" y="88" width="24" height="20" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              {/* Torso */}
              <rect x="95" y="105" width="110" height="160" rx="30" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              {/* Arms */}
              <rect x="55" y="115" width="34" height="150" rx="17" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              <rect x="211" y="115" width="34" height="150" rx="17" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              {/* Legs */}
              <rect x="105" y="262" width="38" height="190" rx="18" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              <rect x="157" y="262" width="38" height="190" rx="18" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              {/* Feet */}
              <ellipse cx="124" cy="465" rx="24" ry="14" fill="#1e2b38" stroke="#334155" strokeWidth="2" />
              <ellipse cx="176" cy="465" rx="24" ry="14" fill="#1e2b38" stroke="#334155" strokeWidth="2" />

              {/* Hotspots */}
              {HOTSPOTS.map((h) => (
                <g key={h.id} onClick={() => setActive(h.id)} className="cursor-pointer">
                  {active !== h.id && (
                    <motion.circle
                      cx={h.x}
                      cy={h.y}
                      r="16"
                      fill="none"
                      stroke="#fb923c"
                      strokeWidth="2"
                      animate={{ r: [16, 26, 16], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  <motion.circle
                    cx={h.x}
                    cy={h.y}
                    r="16"
                    fill={active === h.id ? "#2dd4bf" : "#fb923c"}
                    stroke={active === h.id ? "#5eead4" : "#fdba74"}
                    strokeWidth="2"
                    animate={{ scale: active === h.id ? 1.15 : 1 }}
                  />
                  <text
                    x={h.x}
                    y={h.y + 5}
                    textAnchor="middle"
                    fontSize="14"
                    style={{ pointerEvents: "none" }}
                  >
                    {h.icon}
                  </text>
                </g>
              ))}
            </svg>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(h.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    active === h.id
                      ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                      : "bg-bg-elevated/50 text-muted hover:text-ink"
                  }`}
                >
                  {h.icon} {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeSpot ? (
                <motion.div
                  key={activeSpot.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-bg-elevated/40 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                    {activeSpot.label}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {activeSpot.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {activeSpot.mechanism}
                  </p>
                  <div className="mt-4 rounded-xl bg-teal-500/10 px-4 py-3 text-sm text-teal-200 ring-1 ring-teal-400/20">
                    💡 {activeSpot.tip}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 text-center"
                >
                  <p className="text-sm text-muted">
                    Tap a glowing spot on the body — or a label below it — to learn what&rsquo;s
                    happening there.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">The common thread.</p>
        <p className="mt-2">
          Every one of these traces back to the same root cause: blood vessels and nerves exposed
          to high glucose over months and years. That's exactly why keeping blood sugar, blood
          pressure, and cholesterol in range — and not smoking — meaningfully lowers the risk of
          every single one of these, and why regular screening catches problems early, when
          they're most treatable.
        </p>
      </div>
    </ExplainerShell>
  );
}
