import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/images";

const toolRoutes = [
  { to: "/tools/carb-calculator", icon: "🍲", key: "carb" },
  { to: "/tools/bmi-calculator", icon: "⚖️", key: "bmi" },
  { to: "/tools/a1c-converter", icon: "🔄", key: "a1c" },
  { to: "/tools/risk-quiz", icon: "📋", key: "riskQuiz" },
  { to: "/tools/glycemic-index", icon: "📈", key: "glycemicIndex" },
  { to: "/tools/meal-simulator", icon: "🍽️", key: "mealSimulator" },
  { to: "/tools/cgm-analyzer", icon: "📁", key: "cgmAnalyzer" },
  { to: "/tools/carb-target", icon: "🎯", key: "carbTarget" },
  { to: "/tools/post-meal-target", icon: "⏱️", key: "postMealTarget" },
  { to: "/tools/insulin-ratio", icon: "💉", key: "insulinRatio" },
  { to: "/tools/water-intake", icon: "💧", key: "waterIntake" },
  { to: "/tools/emergency-guide", icon: "🚨", key: "emergencyGuide" },
];

export default function ToolsHub() {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            {t("tools.hub.eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            {t("tools.hub.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            {t("tools.hub.subtitle")}
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
              {t("tools.hub.imageCaption")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {toolRoutes.map((tr, i) => (
            <Reveal key={tr.to} delay={i * 0.08}>
              <Link
                to={tr.to}
                className="group glass flex h-full flex-col rounded-2xl p-7 transition-colors duration-300 hover:bg-card-hover"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{tr.icon}</span>
                  {t(`tools.cards.${tr.key}.tag`, { defaultValue: "" }) && (
                    <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 ring-1 ring-orange-400/25">
                      {t(`tools.cards.${tr.key}.tag`)}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  {t(`tools.cards.${tr.key}.title`)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`tools.cards.${tr.key}.body`)}
                </p>
                <span className="mt-4 text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                  {t("tools.hub.open")}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-sm text-muted">
            {t("tools.hub.suggestPrefix")}{" "}
            <a href="/contact" className="text-teal-300 hover:text-teal-200">
              {t("tools.hub.suggestCta")}
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
