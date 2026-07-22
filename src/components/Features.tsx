import Reveal from "./Reveal";

const features = [
  {
    icon: "🍲",
    title: "Log around real food",
    body: "Search 1,000+ regional dishes with real carb estimates, scan a barcode, or log by voice in 9 languages.",
  },
  {
    icon: "📊",
    title: "Glucose, HbA1c & BP",
    body: "Track the full picture together with trend charts and a clear time-in-range view — not just one number.",
  },
  {
    icon: "📸",
    title: "Snap your lab report",
    body: "Photograph a printed lab report and the app reads it on-device. Nothing leaves your phone.",
  },
  {
    icon: "📄",
    title: "Reports your doctor can read",
    body: "One tap turns everything into a clean PDF or CSV, plus a plain-language summary of your own data.",
  },
  {
    icon: "⏰",
    title: "Reminders & gentle streaks",
    body: "Medication reminders and daily goals that don't punish a single missed day.",
  },
  {
    icon: "✈️",
    title: "Travel mode, timezone-aware",
    body: "Pick your destination and the app shifts your medication schedule automatically — no UTC math.",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            What&rsquo;s inside
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
            A whole toolkit, already in your pocket.
          </h2>
          <p className="mt-4 text-ink-dim">
            Everything below is live in the app today — built one real, useful thing at a time.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="group glass h-full rounded-2xl p-6 transition-colors duration-300 hover:bg-card-hover">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
