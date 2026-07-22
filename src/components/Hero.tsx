import { motion } from "framer-motion";
import GlucoseCard from "./GlucoseCard";

const cuisines = ["दाल · Dal", "Phở", "Adobo", "شاورما · Shawarma", "Undhiyu", "Tacos", "Injera"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-16 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/25"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            Live on Google Play · Open Testing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            Diabetes care that finally{" "}
            <span className="text-gradient-brand">speaks your food&rsquo;s language.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-dim"
          >
            Glucose, HbA1c, blood pressure, meals and medication — tracked around the food
            you actually eat, with free tools and guides for everyone else along the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-bg shadow-lg shadow-teal-500/20 transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Get it on Google Play
            </a>
            <a
              href="/tools"
              className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
            >
              Try the free tools →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 overflow-hidden"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">
              Built for real food, everywhere
            </p>
            <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                className="flex shrink-0 gap-8 pr-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {[...cuisines, ...cuisines].map((c, i) => (
                  <span key={i} className="whitespace-nowrap text-sm font-medium text-ink-dim/70">
                    {c}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            <GlucoseCard />
            <motion.div
              initial={{ opacity: 0, x: 20, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="glass absolute -bottom-8 -left-10 hidden w-40 rounded-2xl p-3.5 sm:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Reminder</p>
              <p className="mt-1 text-sm font-semibold text-ink">Metformin · 8:00</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
