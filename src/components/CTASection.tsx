import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center shadow-2xl shadow-black/30 sm:px-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/20 blur-[100px]" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Free, forever, where it matters
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
            Take the guesswork out of managing diabetes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Download MyHealthyGlucose today — glucose, meals, medications, and your care team,
            all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-bg shadow-lg shadow-teal-500/25 transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Get it on Google Play
            </a>
            <span className="text-sm text-muted">iOS coming soon</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
