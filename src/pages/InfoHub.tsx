import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { GUIDES } from "../data/guides";
import { EXPLAINERS } from "../data/explainers";
import { IMAGES } from "../data/images";

const categoryColors: Record<string, string> = {
  Basics: "text-teal-300 bg-teal-500/10 ring-teal-400/20",
  Managing: "text-teal-200 bg-teal-400/10 ring-teal-300/20",
  Food: "text-orange-300 bg-orange-500/10 ring-orange-400/20",
  Emergencies: "text-orange-300 bg-orange-500/10 ring-orange-400/25",
  "Getting started": "text-teal-300 bg-teal-500/10 ring-teal-400/20",
};

export default function InfoHub() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Diabetes Info Hub
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Clear answers, not jargon.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Plain-language guides on the questions that come up most — written to be understood,
            not to impress. Educational only, never a substitute for your doctor.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
            <img
              src={IMAGES.doctorPatient}
              alt="A doctor explaining results to a patient"
              loading="lazy"
              className="h-48 w-full object-cover sm:h-56"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {GUIDES.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.07}>
              <Link
                to={`/info/${g.slug}`}
                className="group glass card-lift flex h-full flex-col rounded-2xl p-7 transition-colors duration-300 hover:bg-card-hover"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                      categoryColors[g.category]
                    }`}
                  >
                    {g.category}
                  </span>
                  <span className="text-xs text-muted">{g.readMins} min read</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                  {g.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{g.summary}</p>
                <span className="mt-4 text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                  Read →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">🎬 Visual Explainers</h2>
          <p className="mt-2 text-sm text-muted">
            Interactive, step-by-step diagrams for the concepts that are easier to see than read.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {EXPLAINERS.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.07}>
                <Link
                  to={`/info/${e.slug}`}
                  className="group glass card-lift flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:bg-card-hover"
                >
                  <span className="text-3xl">{e.icon}</span>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{e.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{e.summary}</p>
                  <span className="mt-3 text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <Link
            to="/info/glossary"
            className="group glass flex items-center justify-between rounded-2xl p-7 transition-colors duration-300 hover:bg-card-hover"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Diabetes Glossary
              </h2>
              <p className="mt-1 text-sm text-muted">
                An A–Z of the terms you&rsquo;ll come across, defined simply.
              </p>
            </div>
            <span className="text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
              Browse →
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
