import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { IMAGES } from "../data/images";

const rows = [
  {
    image: IMAGES.indianThali,
    alt: "A traditional Indian thali with rice, dal, and vegetables",
    eyebrow: "Real food, real numbers",
    title: "Built around how you actually eat.",
    body: "From dal and roti to a full thali, log the food you grew up with and get real carb estimates — not a shrug because your dinner wasn't in some Western database.",
    reverse: false,
  },
  {
    image: IMAGES.doctorPatient,
    alt: "A doctor discussing results with a patient",
    eyebrow: "Care team ready",
    title: "Turn your data into something your doctor can use.",
    body: "One tap creates a clean, plain-language PDF of your trends — glucose, HbA1c, blood pressure and medications — so your next appointment starts with clarity, not guesswork.",
    reverse: true,
  },
  {
    image: IMAGES.healthyBowl,
    alt: "A colorful healthy salad bowl",
    eyebrow: "Everyday wellness",
    title: "Small, sustainable habits — not crash diets.",
    body: "Balance a plate, count carbs, and build gentle streaks that don't punish a missed day. The tools meet you where you are and grow with you.",
    reverse: false,
  },
];

export default function PhotoBands() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
              r.reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="group relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-bg/50 via-transparent to-transparent" />
                <motion.img
                  src={r.image}
                  alt={r.alt}
                  loading="lazy"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                {r.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                {r.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-dim">{r.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
