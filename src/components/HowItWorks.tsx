import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Log what you eat",
    body: "Search real dishes, scan a barcode, or log by voice. Glucose, BP and meds take a single tap.",
  },
  {
    n: "02",
    title: "See your patterns",
    body: "Trend charts, time-in-range, and reflections drawn from your own history — never a lecture.",
  },
  {
    n: "03",
    title: "Share with your doctor",
    body: "One tap turns everything into a clean, plain-language PDF or CSV your doctor can actually use.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
            Care that fits into your day.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative text-center md:text-left">
              <span className="font-display text-sm font-semibold text-teal-400">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
