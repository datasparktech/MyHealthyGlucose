import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/images";

const tools = [
  {
    to: "/tools/carb-calculator",
    icon: "🍲",
    title: "Carb Calculator",
    body: "Search Indian, Western and staple foods and build a meal to see the running carb total.",
    tag: "Most popular",
  },
  {
    to: "/tools/bmi-calculator",
    icon: "⚖️",
    title: "BMI Calculator",
    body: "Estimate your Body Mass Index with real context on what it means for diabetes risk.",
  },
  {
    to: "/tools/a1c-converter",
    icon: "🔄",
    title: "A1C ↔ Average Glucose",
    body: "Translate an HbA1c percentage into an everyday average glucose number, and back.",
  },
  {
    to: "/tools/risk-quiz",
    icon: "📋",
    title: "Diabetes Risk Quiz",
    body: "Six quick questions on the risk factors clinicians look at — a prompt to see a doctor.",
  },
  {
    to: "/tools/glycemic-index",
    icon: "📈",
    title: "Glycemic Index & Load",
    body: "See how fast a food raises blood sugar — and the glycemic load for a real serving size.",
  },
  {
    to: "/tools/meal-simulator",
    icon: "🍽️",
    title: "Meal Glycemic Simulator",
    body: "Build a full meal and see its estimated glucose impact, with smart lower-GI swaps.",
  },
  {
    to: "/tools/cgm-analyzer",
    icon: "📁",
    title: "CGM Data Visualizer",
    body: "Drop in a Dexcom/Libre CSV to see your glucose curve and time-in-range — 100% private.",
  },
  {
    to: "/tools/carb-target",
    icon: "🎯",
    title: "Daily Carb & Fiber Target",
    body: "Estimate your daily carbohydrate and fiber targets from your calorie intake.",
  },
  {
    to: "/tools/post-meal-target",
    icon: "⏱️",
    title: "Post-Meal Target Finder",
    body: "See the general after-meal glucose targets and check a reading against them.",
  },
  {
    to: "/tools/insulin-ratio",
    icon: "💉",
    title: "Insulin-to-Carb Ratio",
    body: "Estimate a mealtime insulin dose from your carb ratio and correction factor.",
  },
  {
    to: "/tools/water-intake",
    icon: "💧",
    title: "Hydration Calculator",
    body: "A daily water target based on your weight and activity level.",
  },
  {
    to: "/tools/emergency-guide",
    icon: "🚨",
    title: "Emergency Guide",
    body: "Clear, printable steps for high and low blood sugar emergencies.",
  },
];

export default function ToolsHub() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Free tools
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Calculators worth bookmarking.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Fast, free, and no login required. Every tool works anonymously — nothing you enter
            is stored.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
            <img
              src={IMAGES.mealPrep}
              alt="Healthy meal-prep containers with balanced portions"
              loading="lazy"
              className="h-48 w-full object-cover sm:h-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <p className="absolute bottom-5 left-6 right-6 font-display text-lg font-semibold text-ink sm:text-xl">
              Plan meals, count carbs, and understand your numbers — in a couple of taps.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {tools.map((t, i) => (
            <Reveal key={t.to} delay={i * 0.08}>
              <Link
                to={t.to}
                className="group glass flex h-full flex-col rounded-2xl p-7 transition-colors duration-300 hover:bg-card-hover"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{t.icon}</span>
                  {t.tag && (
                    <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 ring-1 ring-orange-400/25">
                      {t.tag}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">{t.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.body}</p>
                <span className="mt-4 text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                  Open →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-sm text-muted">
            More tools are added regularly — have one in mind?{" "}
            <a href="/contact" className="text-teal-300 hover:text-teal-200">Suggest it →</a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
