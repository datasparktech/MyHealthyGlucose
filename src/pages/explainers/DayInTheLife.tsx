import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";

interface Point {
  t: number; // 0-24 hours
  time: string;
  label: string;
  glucose: number;
  note: string;
}

const POINTS: Point[] = [
  { t: 6, time: "6:00 AM", label: "Wake up", glucose: 95, note: "A normal fasting level. Some people see a small natural rise here from the 'dawn phenomenon' — hormones preparing the body to wake up." },
  { t: 8, time: "8:00 AM", label: "Breakfast", glucose: 95, note: "Eating starts the rise — carbs are digesting and glucose is entering the bloodstream." },
  { t: 9, time: "9:00 AM", label: "Post-breakfast peak", glucose: 155, note: "Blood sugar typically peaks 1–2 hours after eating, then insulin starts bringing it back down." },
  { t: 11, time: "11:00 AM", label: "Back to baseline", glucose: 105, note: "Levels settle back toward a normal range between meals." },
  { t: 12.5, time: "12:30 PM", label: "Lunch", glucose: 105, note: "The same rise-and-fall pattern repeats with each meal." },
  { t: 13.5, time: "1:30 PM", label: "Post-lunch peak", glucose: 145, note: "A smaller peak than breakfast here — meal composition changes the shape of the curve." },
  { t: 15, time: "3:00 PM", label: "Afternoon walk", glucose: 110, note: "Exercise pulls glucose into muscles for energy — often independent of insulin — which is why activity lowers blood sugar." },
  { t: 16, time: "4:00 PM", label: "Post-exercise", glucose: 90, note: "The effect of activity can continue lowering glucose for a while afterward." },
  { t: 19, time: "7:00 PM", label: "Dinner", glucose: 90, note: "Another meal, another rise beginning." },
  { t: 20, time: "8:00 PM", label: "Post-dinner peak", glucose: 150, note: "Evening meals can sometimes cause a higher peak, depending on portion and timing before sleep." },
  { t: 22, time: "10:00 PM", label: "Evening", glucose: 115, note: "Settling down as the evening goes on." },
  { t: 24, time: "Midnight", label: "Asleep", glucose: 100, note: "Blood sugar is normally quite stable overnight in someone without diabetes." },
  { t: 27, time: "3:00 AM", label: "Overnight low point", glucose: 85, note: "Glucose is typically at its lowest point in the very early hours, before rising again toward wake-up." },
];

const CHART_W = 900;
const CHART_H = 220;
const PAD = 36;
const MIN_G = 60;
const MAX_G = 180;
const totalHours = 30; // 6am to noon next day, wraps the overnight dip in

function xFor(t: number) {
  return PAD + ((t - 6) / totalHours) * (CHART_W - PAD * 2);
}
function yFor(g: number) {
  return CHART_H - PAD - ((g - MIN_G) / (MAX_G - MIN_G)) * (CHART_H - PAD * 2);
}

const pathD = POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.t).toFixed(1)} ${yFor(p.glucose).toFixed(1)}`).join(" ");

export default function DayInTheLife() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (active >= POINTS.length - 1) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setActive((a) => a + 1), 1400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, active]);

  function togglePlay() {
    if (playing) {
      setPlaying(false);
    } else {
      if (active >= POINTS.length - 1) setActive(0);
      setPlaying(true);
    }
  }

  const current = POINTS[active];

  return (
    <ExplainerShell
      eyebrow="Visual Explainer · Interactive"
      title="A day in the life of blood sugar."
      intro="Meals, exercise, and sleep all leave a mark on a glucose curve. Press play, or tap any point on the timeline, to see how a typical day unfolds — this example shows someone without diabetes, whose body keeps things in range automatically."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted">24-hour glucose curve</p>
          <button
            onClick={togglePlay}
            className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
          >
            {playing ? "⏸ Pause" : active >= POINTS.length - 1 ? "↻ Replay" : "▶ Play the day"}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full min-w-[700px]">
            {/* Target range band */}
            <rect
              x={PAD} y={yFor(140)} width={CHART_W - PAD * 2} height={yFor(70) - yFor(140)}
              fill="#2dd4bf" opacity="0.06"
            />
            <line x1={PAD} y1={yFor(140)} x2={CHART_W - PAD} y2={yFor(140)} stroke="#2dd4bf" strokeOpacity="0.25" strokeDasharray="4" />
            <line x1={PAD} y1={yFor(70)} x2={CHART_W - PAD} y2={yFor(70)} stroke="#2dd4bf" strokeOpacity="0.25" strokeDasharray="4" />

            {/* Full curve, dim */}
            <path d={pathD} fill="none" stroke="#334155" strokeWidth="2" />

            {/* Curve drawn up to current point */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#fb923c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1"
              initial={false}
              animate={{ pathLength: (active + 1) / POINTS.length }}
              style={{ pathLength: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Point markers */}
            {POINTS.map((p, i) => (
              <g key={i} onClick={() => { setPlaying(false); setActive(i); }} className="cursor-pointer">
                <circle cx={xFor(p.t)} cy={yFor(p.glucose)} r="14" fill="transparent" />
                <motion.circle
                  cx={xFor(p.t)}
                  cy={yFor(p.glucose)}
                  r={i === active ? 7 : 4}
                  fill={i <= active ? "#fb923c" : "#475569"}
                  animate={{ r: i === active ? 7 : 4 }}
                />
              </g>
            ))}

            {/* Y axis labels */}
            {[70, 120, 180].map((g) => (
              <text key={g} x="4" y={yFor(g) + 4} fontSize="11" fill="#8b95a5">{g}</text>
            ))}
          </svg>
        </div>

        {/* Timeline labels */}
        <div className="mt-2 flex gap-1 overflow-x-auto pb-2">
          {POINTS.map((p, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); setActive(i); }}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                i === active
                  ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                  : "text-muted hover:text-ink"
              }`}
            >
              {p.time}
            </button>
          ))}
        </div>

        {/* Active point info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-xl bg-bg-elevated/40 px-5 py-4"
          >
            <div className="flex items-baseline justify-between">
              <p className="font-display text-base font-semibold text-ink">
                {current.time} — {current.label}
              </p>
              <p className="font-display text-lg font-semibold text-orange-300">
                {current.glucose} <span className="text-xs text-muted">mg/dL</span>
              </p>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{current.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">Why this shape matters.</p>
        <p className="mt-2">
          For someone with diabetes, the same events happen — meals, exercise, sleep — but the
          rises can be higher and last longer, since the body's own insulin response is reduced or
          absent. That's exactly what tools like{" "}
          <a href="/tools/cgm-analyzer" className="text-teal-300 hover:text-teal-200">
            a CGM
          </a>{" "}
          help you see in your own data, and what{" "}
          <a href="/info/how-insulin-works" className="text-teal-300 hover:text-teal-200">
            insulin's normal role
          </a>{" "}
          would otherwise smooth out automatically.
        </p>
      </div>
    </ExplainerShell>
  );
}
