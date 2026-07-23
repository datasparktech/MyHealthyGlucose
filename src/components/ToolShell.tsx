import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

export default function ToolShell({
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
  const { t } = useTranslation();
  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            to="/tools"
            className="text-sm font-medium text-muted transition-colors hover:text-teal-300"
          >
            {t("tools.shell.backToAll")}
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

        <Reveal delay={0.2} className="mt-12">
          <div className="glass flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-semibold text-ink">
                {t("tools.shell.trackTitle")}
              </p>
              <p className="mt-1 text-sm text-muted">
                {t("tools.shell.trackBody")}
              </p>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
            >
              {t("nav.getApp")}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
