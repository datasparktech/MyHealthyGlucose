import { useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 1000, suffix: "+", label: "Indian regional dishes" },
  { value: 4, suffix: "-in-1", label: "Glucose · HbA1c · BP · Meds" },
  { value: 9, suffix: "", label: "Languages for voice logging" },
  { value: 0, suffix: "", label: "Ads, ever" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-ink md:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-line bg-bg-elevated/40 px-6 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-xs font-medium leading-snug text-muted md:text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
