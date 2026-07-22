import { useParams, Link, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import Disclaimer from "../components/Disclaimer";
import Seo from "../components/Seo";
import { getGuide, GUIDES } from "../data/guides";

export default function Guide() {
  const { slug } = useParams();
  const guide = slug ? getGuide(slug) : undefined;

  if (!guide) return <Navigate to="/info" replace />;

  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <article className="px-6 py-14">
      <Seo
        title={guide.title}
        description={guide.summary}
        path={`/info/${guide.slug}`}
      />
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link
            to="/info"
            className="text-sm font-medium text-muted transition-colors hover:text-teal-300"
          >
            ← Info Hub
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted">
            <span className="font-semibold uppercase tracking-[0.14em] text-teal-400">
              {guide.category}
            </span>
            <span>·</span>
            <span>{guide.readMins} min read</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">{guide.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-10">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-3">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-dim">
                    {p}
                  </p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-dim">
                      <span className="mt-0.5 text-teal-400">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </Reveal>

        {/* Key takeaways */}
        <Reveal delay={0.15} className="mt-12">
          <div className="glass rounded-2xl p-7">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-teal-400">
              Key takeaways
            </p>
            <ul className="mt-4 space-y-2.5">
              {guide.keyTakeaways.map((k, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-dim">
                  <span className="mt-0.5 text-teal-400">✓</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Disclaimer className="mt-8" />

        {/* Related tool CTA */}
        {guide.relatedTool && (
          <Reveal delay={0.2} className="mt-8">
            <Link
              to={guide.relatedTool.to}
              className="group glass flex items-center justify-between rounded-2xl p-6 transition-colors hover:bg-card-hover"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                  Try it yourself
                </p>
                <p className="mt-1 font-display text-base font-semibold text-ink">
                  {guide.relatedTool.label}
                </p>
              </div>
              <span className="text-teal-300 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        )}

        {/* More guides */}
        <Reveal delay={0.25} className="mt-16 border-t border-line pt-10">
          <p className="mb-5 font-display text-sm font-semibold uppercase tracking-wide text-muted">
            Keep reading
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/info/${o.slug}`}
                className="group glass rounded-2xl p-5 transition-colors hover:bg-card-hover"
              >
                <p className="font-display text-sm font-semibold text-ink">{o.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{o.summary}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
