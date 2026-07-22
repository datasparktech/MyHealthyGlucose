import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { GLOSSARY } from "../data/glossary";

export default function Glossary() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (t) =>
        t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link
            to="/info"
            className="text-sm font-medium text-muted transition-colors hover:text-teal-300"
          >
            ← Info Hub
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Diabetes Glossary
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            The terms, defined simply.
          </h1>
          <p className="mt-4 text-ink-dim">
            Every word you&rsquo;ll come across in diabetes care, in plain language.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            className="w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none"
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
              No terms match &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <dl className="space-y-4">
              {filtered.map((t) => (
                <div key={t.term} className="glass rounded-2xl p-5">
                  <dt className="font-display text-base font-semibold text-ink">{t.term}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{t.definition}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>
    </div>
  );
}
