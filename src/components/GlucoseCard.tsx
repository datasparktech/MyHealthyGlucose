import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const PATH = "M4 54 L34 44 L64 48 L94 30 L124 36 L154 14 L184 20 L214 10";

function useCountUp(target: number, start: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, target, duration]);
  return value;
}

export default function GlucoseCard({ className = "" }: { className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const glucose = useCountUp(112, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: -2 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      className={`glass w-[19rem] rounded-3xl p-6 shadow-2xl shadow-black/40 ${className}`}
      style={{ transformOrigin: "center" }}
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Today&rsquo;s glucose
        </p>
        <span className="rounded-full bg-teal-500/15 px-2.5 py-1 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/30">
          In range
        </span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="font-display text-5xl font-semibold tabular-nums text-ink">{glucose}</span>
        <span className="mb-1.5 text-sm text-muted">mg/dL</span>
      </div>

      <svg viewBox="0 0 220 60" className="mt-4 h-16 w-full overflow-visible">
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#trendGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#fbbf6b" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-4 flex items-center gap-3 rounded-xl bg-orange-500/10 px-3 py-2.5 ring-1 ring-orange-400/20"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs text-bg">
          ✓
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">Dal, Roti &amp; Sabzi logged</p>
          <p className="text-xs text-muted">from 1,000+ Indian foods</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
