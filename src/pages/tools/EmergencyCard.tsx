import { useTranslation } from "react-i18next";
import ToolShell from "../../components/ToolShell";
import Reveal from "../../components/Reveal";

export default function EmergencyCard() {
  const { t } = useTranslation();
  return (
    <ToolShell
      eyebrow={t("tools.pages.emergency.eyebrow")}
      title={t("tools.pages.emergency.title")}
      intro={t("tools.pages.emergency.intro")}
    >
      <div className="space-y-6">
        {/* Hypo */}
        <Reveal>
          <div className="glass overflow-hidden rounded-2xl">
            <div className="bg-orange-500/10 px-6 py-4 ring-1 ring-orange-400/20">
              <h2 className="font-display text-xl font-semibold text-orange-200">
                🔻 Low blood sugar (Hypoglycemia)
              </h2>
              <p className="mt-1 text-sm text-orange-100/70">Usually below 70 mg/dL — acts fast</p>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-ink">Signs</p>
              <p className="mt-1 text-sm text-muted">
                Shakiness, sweating, sudden hunger, confusion, irritability, fast heartbeat,
                dizziness.
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">The 15-15 rule</p>
              <ol className="mt-2 space-y-2 text-sm text-ink-dim">
                <li className="flex gap-3">
                  <span className="font-semibold text-teal-300">1.</span>
                  Take ~15 g of fast-acting carbs (½ cup juice, glucose tablets, regular soda).
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-teal-300">2.</span>
                  Wait 15 minutes, then recheck your blood sugar.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-teal-300">3.</span>
                  Still low? Repeat. Once stable, eat a small balanced snack.
                </li>
              </ol>
              <p className="mt-4 rounded-lg bg-orange-500/10 px-3 py-2 text-sm text-orange-200">
                <span className="font-semibold">Emergency:</span> if the person can&rsquo;t swallow
                or is unconscious, do not give food or drink — call emergency services immediately.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Hyper */}
        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-2xl">
            <div className="bg-teal-500/10 px-6 py-4 ring-1 ring-teal-400/20">
              <h2 className="font-display text-xl font-semibold text-teal-200">
                🔺 High blood sugar (Hyperglycemia)
              </h2>
              <p className="mt-1 text-sm text-teal-100/70">Builds more slowly</p>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-ink">Signs</p>
              <p className="mt-1 text-sm text-muted">
                Excessive thirst, frequent urination, fatigue, blurred vision, headache.
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">What to do</p>
              <ul className="mt-2 space-y-2 text-sm text-ink-dim">
                <li className="flex gap-3"><span className="text-teal-300">•</span> Drink water to stay hydrated.</li>
                <li className="flex gap-3"><span className="text-teal-300">•</span> Follow your care plan for medication timing.</li>
                <li className="flex gap-3"><span className="text-teal-300">•</span> Light activity can help, if you're well enough.</li>
                <li className="flex gap-3"><span className="text-teal-300">•</span> Check for ketones if your plan advises it.</li>
              </ul>
              <p className="mt-4 rounded-lg bg-orange-500/10 px-3 py-2 text-sm text-orange-200">
                <span className="font-semibold">Seek urgent care</span> if you have nausea, vomiting,
                trouble breathing, or confusion — these can signal a serious complication.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <button
            onClick={() => window.print()}
            className="w-full rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
          >
            🖨 Print this guide
          </button>
        </Reveal>
      </div>
    </ToolShell>
  );
}
