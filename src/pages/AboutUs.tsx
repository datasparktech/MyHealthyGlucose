import Reveal from "../components/Reveal";

export default function AboutUs() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Why we&rsquo;re building this
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            The food deserved better.
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 space-y-6 text-lg leading-relaxed text-ink-dim">
          <p>
            Most diabetes apps were built around a Western pantry — cereal, sandwiches, pasta —
            and treat everything else as an edge case. If you grew up on dal, adobo, pho, or
            shawarma, you already know what that&rsquo;s like: logging your actual dinner and
            getting a shrug instead of a real number.
          </p>
          <p>
            MyHealthyGlucose started with one region done properly — over 1,000 Indian regional
            dishes, real carb estimates, real cultural context — instead of a thousand cuisines
            done shallowly. Everything we build is about doing that same thing for more of the
            world, one cuisine at a time, without cutting corners to get there faster.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["Every day-to-day essential", "stays free"],
            ["No ads", "ever"],
            ["We never sell", "your data"],
          ].map(([a, b]) => (
            <div key={a} className="glass rounded-2xl p-6 text-center">
              <p className="font-display text-base font-semibold text-ink">{a}</p>
              <p className="mt-1 text-sm text-teal-300">{b}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.3} className="mt-16 border-t border-line pt-10 text-center">
          <p className="text-ink-dim">— The MyHealthyGlucose team, DataSpark Tech LLC</p>
          <p className="mt-2 text-sm text-muted">Princeton, TX · connect@datasparktech.com</p>
        </Reveal>
      </div>
    </div>
  );
}
