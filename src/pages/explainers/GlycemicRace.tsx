import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";

interface RaceFood {
  name: string;
  gi: number;
  color: string;
  emoji: string;
}

const FOODS: RaceFood[] = [
  { name: "White Rice", gi: 73, color: "#f59e0b", emoji: "🍚" },
  { name: "Brown Rice", gi: 68, color: "#fb923c", emoji: "🍚" },
  { name: "White Bread", gi: 75, color: "#ef4444", emoji: "🍞" },
  { name: "Oatmeal", gi: 55, color: "#a78bfa", emoji: "🥣" },
  { name: "Pasta", gi: 49, color: "#60a5fa", emoji: "🍝" },
  { name: "Apple", gi: 36, color: "#4ade80", emoji: "🍎" },
  { name: "Lentils (Dal)", gi: 32, color: "#2dd4bf", emoji: "🥘" },
  { name: "Glucose Tablet", gi: 100, color: "#f43f5e", emoji: "💊" },
];

const CHART_W = 620;
const CHART_H = 220;
const PAD_L = 40;
const PAD_B = 30;
const MIN_G = 80;
const MAX_G = 200;

function xFor(min: number) {
  return PAD_L + (min / 180) * (CHART_W - PAD_L - 10);
}
function yFor(g: number) {
  return CHART_H - PAD_B - ((g - MIN_G) / (MAX_G - MIN_G)) * (CHART_H - PAD_B - 10);
}

function curvePath(gi: number): { path: string; peak: number } {
  const baseline = 92;
  const peakRise = (gi / 100) * 95;
  const peakTime = 105 - (gi / 100) * 45;
  const width = 22 + (100 - gi) * 0.28;
  let path = "";
  let peak = baseline;
  for (let x = 0; x <= 180; x += 5) {
    const y = baseline + peakRise * Math.exp(-((x - peakTime) ** 2) / (2 * width * width));
    peak = Math.max(peak, y);
    path += `${x === 0 ? "M" : "L"} ${xFor(x).toFixed(1)} ${yFor(y).toFixed(1)} `;
  }
  return { path, peak: Math.round(peak) };
}

export default function GlycemicRace() {
  const [selected, setSelected] = useState<string[]>(["White Rice", "Lentils (Dal)"]);
  const [raceKey, setRaceKey] = useState(0);

  function toggle(name: string) {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 4) return prev; // cap at 4 for readability
      return [...prev, name];
    });
  }

  const active = useMemo(
    () => FOODS.filter((f) => selected.includes(f.name)).map((f) => ({ ...f, ...curvePath(f.gi) })),
    [selected],
  );

  return (
    <ExplainerShell
      eyebrow="Visual Explainer · Interactive"
      title="The glycemic index race."
      intro="Pick up to 4 foods and watch how differently they raise blood sugar. Higher-GI foods spike faster and higher; lower-GI foods raise it more gently. These curves are illustrative averages — your own response varies by portion, pairing, and person."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {/* Food picker */}
        <div className="flex flex-wrap gap-2">
          {FOODS.map((f) => {
            const isOn = selected.includes(f.name);
            return (
              <button
                key={f.name}
                onClick={() => toggle(f.name)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                  isOn
                    ? "text-bg ring-transparent"
                    : "bg-bg-elevated/50 text-muted ring-line hover:text-ink"
                }`}
                style={isOn ? { backgroundColor: f.color } : undefined}
              >
                <span>{f.emoji}</span> {f.name}
                <span className="opacity-70">GI {f.gi}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted">{selected.length}/4 selected</p>
          <button
            onClick={() => setRaceKey((k) => k + 1)}
            disabled={active.length === 0}
            className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-40"
          >
            ▶ Race
          </button>
        </div>

        {/* Chart */}
        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full min-w-[480px]">
            <line x1={PAD_L} y1={CHART_H - PAD_B} x2={CHART_W} y2={CHART_H - PAD_B} stroke="#334155" />
            {[100, 150, 200].map((g) => (
              <g key={g}>
                <line x1={PAD_L} y1={yFor(g)} x2={CHART_W} y2={yFor(g)} stroke="#334155" strokeDasharray="3" opacity="0.4" />
                <text x="4" y={yFor(g) + 4} fontSize="10" fill="#8b95a5">{g}</text>
              </g>
            ))}
            <text x={PAD_L} y={CHART_H - 8} fontSize="10" fill="#8b95a5">Eat</text>
            <text x={CHART_W - 60} y={CHART_H - 8} fontSize="10" fill="#8b95a5">+3 hours</text>

            {active.map((f) => (
              <motion.path
                key={`${f.name}-${raceKey}`}
                d={f.path}
                fill="none"
                stroke={f.color}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
            ))}
          </svg>
        </div>

        {/* Peak summary bars */}
        {active.length > 0 && (
          <div className="mt-5 space-y-2">
            {active
              .slice()
              .sort((a, b) => b.peak - a.peak)
              .map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-xs text-muted">{f.emoji} {f.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                    <motion.div
                      key={raceKey}
                      className="h-full rounded-full"
                      style={{ backgroundColor: f.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${((f.peak - MIN_G) / (MAX_G - MIN_G)) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-xs font-semibold text-ink">{f.peak} mg/dL</span>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">The takeaway.</p>
        <p className="mt-2">
          Notice glucose tablets and white bread spike hard and fast — exactly why glucose tabs
          are used to treat lows quickly. Lentils and other high-fiber foods raise things
          gradually, which is gentler on the body. Want to test your own meals?{" "}
          <a href="/tools/meal-simulator" className="text-teal-300 hover:text-teal-200">
            Try the Meal Simulator
          </a>
          .
        </p>
      </div>
    </ExplainerShell>
  );
}
