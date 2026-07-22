import { useParams, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { getLegalDoc } from "../data/legal";

export default function Legal() {
  const { slug } = useParams();
  const doc = slug ? getLegalDoc(slug) : undefined;

  if (!doc) return <Navigate to="/" replace />;

  return (
    <div className="px-6 py-16">
      <Seo title={doc.title} description={doc.intro} path={`/legal/${doc.slug}`} />
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h1 className="font-display text-4xl font-semibold text-ink">{doc.title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated: {doc.updated}</p>
          <p className="mt-6 leading-relaxed text-ink-dim">{doc.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-dim">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <p className="rounded-xl bg-bg-elevated/40 px-4 py-3 text-xs leading-relaxed text-muted">
            This document is provided as general information and does not constitute legal or
            medical advice. Please consult a qualified professional for advice specific to your
            situation.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
