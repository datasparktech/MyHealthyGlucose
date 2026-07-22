import Reveal from "../components/Reveal";

export default function ComingSoon({
  eyebrow,
  title,
  body,
  items,
}: {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className="flex min-h-[70vh] items-center px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-ink-dim">{body}</p>
        </Reveal>

        <Reveal delay={0.15} className="glass mt-10 rounded-2xl p-7 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
            Coming to this page
          </p>
          <ul className="mt-4 space-y-2.5">
            {items.map((it) => (
              <li key={it} className="flex items-start gap-2 text-sm text-ink-dim">
                <span className="mt-0.5 text-teal-400">→</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25} className="mt-8">
          <a
            href="mailto:connect@myhealthyglucose.com?subject=MyHealthyGlucose%20Feedback"
            className="text-sm font-medium text-teal-300 hover:text-teal-200"
          >
            Have an idea for this page? Send us feedback →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
