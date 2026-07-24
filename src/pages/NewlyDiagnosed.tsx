import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

type StepLink = { to: string; label: string; external?: boolean };
type Step = { n: number; title: string; body: string; links: StepLink[] };

const STEPS: Step[] = [
  {
    n: 1,
    title: "Understand your diagnosis",
    body: "Type 1, type 2, prediabetes and gestational diabetes are different conditions with different care. Start by learning which one you have and what it means day to day.",
    links: [
      { to: "/info/type-1-vs-type-2", label: "Type 1 vs Type 2" },
      { to: "/info/glossary", label: "Diabetes glossary" },
      { to: "/tools/risk-quiz", label: "Prediabetes risk quiz" },
    ],
  },
  {
    n: 2,
    title: "Learn your numbers",
    body: "Blood glucose and HbA1c are the two numbers you'll hear most. Learn what the targets are, what 'time in range' means, and how food and digestion move your glucose.",
    links: [
      { to: "/info/hba1c-explained", label: "HbA1c explained" },
      { to: "/tools/a1c-converter", label: "A1c ↔ average glucose" },
      { to: "/info/digestion-and-glucose", label: "Digestion & glucose" },
    ],
  },
  {
    n: 3,
    title: "Get the food basics right",
    body: "Carbohydrate is the biggest driver of blood-sugar spikes. You don't have to give up the foods you love — you learn portions, pairings and timing. Our food database and recipes make it practical.",
    links: [
      { to: "/foods", label: "Food database" },
      { to: "/tools/carb-calculator", label: "Carb calculator" },
      { to: "/recipes", label: "Diabetes-friendly recipes" },
    ],
  },
  {
    n: 4,
    title: "Understand medications & insulin",
    body: "Whether it's metformin, other tablets, or insulin, knowing how your treatment works helps you use it well and spot lows early. Always follow your care team's specific advice.",
    links: [
      { to: "/info/how-insulin-works", label: "How insulin works" },
      { to: "/info/complications-body-map", label: "Why control matters" },
    ],
  },
  {
    n: 5,
    title: "Build habits & track them",
    body: "Small, steady habits beat big changes that don't last. Log your glucose, meals and meds so patterns become obvious — and bring a clear report to your appointments.",
    links: [
      { to: "https://app.myhealthyglucose.com", label: "Open the web dashboard", external: true },
      { to: "https://play.google.com/store/apps/details?id=com.glucosecompass.app", label: "Get the app", external: true },
    ],
  },
];

export default function NewlyDiagnosed() {
  return (
    <div className="px-6 py-14">
      <Seo
        title="Newly Diagnosed with Diabetes? Start Here"
        description="A calm, step-by-step guide for anyone newly diagnosed with diabetes or prediabetes: understand your diagnosis, learn your numbers, get the food basics, and build habits that stick."
        path="/newly-diagnosed"
      />
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Start Here</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Just diagnosed? Take a breath.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Diabetes is manageable, and you don't have to figure it out all at once. Here's a
            simple five-step path — do them in order, at your own pace.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {STEPS.map((s) => (
            <Reveal key={s.n} delay={s.n * 0.05}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/15 font-display text-base font-bold text-teal-300">
                    {s.n}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.links.map((l) =>
                    l.external ? (
                      <a key={l.label} href={l.to} target="_blank" rel="noreferrer"
                        className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400">
                        {l.label}
                      </a>
                    ) : (
                      <Link key={l.label} to={l.to}
                        className="rounded-full px-4 py-2 text-sm font-semibold text-teal-300 ring-1 ring-line transition-colors hover:bg-card-hover">
                        {l.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-12">
          <div className="glass rounded-2xl p-6 text-center">
            <p className="font-display text-lg font-semibold text-ink">You've got this.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Have a question you can't find an answer to? Ask our assistant or reach out — we're here to help.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link to="/assistant" className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400">Ask the AI assistant</Link>
              <Link to="/community" className="rounded-full px-5 py-2.5 text-sm font-semibold text-teal-300 ring-1 ring-line transition-colors hover:bg-card-hover">Join the community</Link>
            </div>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted">
          Educational information only — not a substitute for personalized medical advice from your care team.
        </p>
      </div>
    </div>
  );
}
