import { motion } from "framer-motion";
import Reveal from "./Reveal";
import featureGraphic from "../assets/feature-graphic.png";

export default function AppShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            All in one place
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Glucose, meals &amp; meds — without the juggling.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-dim">
            No more paper logbooks, scattered spreadsheets, and sticky notes. See your blood
            glucose, carbs, and calories at a glance — with smart reminders, doctor-ready
            reports, and travel-friendly tools built in.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Blood glucose with clear in-range view",
              "Carbs & calories from real food, at a glance",
              "Reminders that don't punish a missed day",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-ink-dim"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs text-teal-300 ring-1 ring-teal-400/25">
                  ✓
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-teal-500/10 blur-2xl" />
            <img
              src={featureGraphic}
              alt="MyHealthyGlucose app showing blood glucose, carbs and calories"
              className="relative w-full rounded-[1.5rem] shadow-2xl shadow-black/08 ring-1 ring-line"
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
