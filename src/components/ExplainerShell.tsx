import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Disclaimer from "./Disclaimer";

export default function ExplainerShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            to="/info"
            className="text-sm font-medium text-muted transition-colors hover:text-teal-300"
          >
            ← Info Hub
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-ink-dim">{intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {children}
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <Disclaimer />
        </Reveal>
      </div>
    </div>
  );
}
