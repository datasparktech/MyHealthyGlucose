import { useState } from "react";
import { motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

type Group = "general" | "pregnancy" | "older";

const TARGETS: Record<
  Group,
  { label: string; fasting: string; postMeal: string; note: string }
> = {
  general: {
    label: "Most non-pregnant adults",
    fasting: "80–130 mg/dL",
    postMeal: "Under 180 mg/dL",
    note: "General ADA targets, measured 1–2 hours after the start of a meal.",
  },
  pregnancy: {
    label: "During pregnancy",
    fasting: "Under 95 mg/dL",
    postMeal: "Under 140 mg/dL (1 hr) / under 120 mg/dL (2 hr)",
    note: "Pregnancy targets are tighter. These are general figures — your obstetric team sets your specific goals.",
  },
  older: {
    label: "Older adults / complex health",
    fasting: "90–150 mg/dL",
    postMeal: "Often more relaxed",
    note: "For some older adults or those with multiple conditions, looser targets are safer to avoid lows. Your doctor individualizes this.",
  },
};

export default function PostMealTarget() {
  const [group, setGroup] = useState<Group>("general");
  const [reading, setReading] = useState("");

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  const val = parseFloat(reading);
  let verdict: { text: string; color: string } | null = null;
  if (val > 0 && group === "general") {
    if (val < 70) verdict = { text: "Below the typical range (possible low) — treat if you have symptoms and follow your plan.", color: "#f59e0b" };
    else if (val <= 180) verdict = { text: "Within the general post-meal target for most adults.", color: "#2dd4bf" };
    else verdict = { text: "Above the general post-meal target of 180 mg/dL. One reading isn't a trend — look at patterns with your care team.", color: "#f59e0b" };
  }

  return (
    <ToolShell
      eyebrow="Post-Meal Glucose Target Finder"
      title="Is my after-meal reading in range?"
      intro="See the general post-meal glucose targets for different groups, and check a reading against them. These are educational reference points — your personal targets come from your doctor."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <span className="mb-2 block text-sm text-muted">Which best describes you?</span>
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(TARGETS) as Group[]).map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                group === g
                  ? "border-teal-400/50 bg-teal-500/10 text-ink"
                  : "border-line bg-bg-elevated/40 text-muted hover:border-teal-400/30"
              }`}
            >
              {TARGETS[g].label}
            </button>
          ))}
        </div>

        <motion.div
          key={group}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          <div className="rounded-2xl bg-bg-elevated/50 p-5 ring-1 ring-line">
            <p className="text-sm text-muted">Fasting / before meals</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{TARGETS[group].fasting}</p>
          </div>
          <div className="rounded-2xl bg-teal-500/10 p-5 ring-1 ring-teal-400/25">
            <p className="text-sm text-muted">After meals</p>
            <p className="mt-1 font-display text-xl font-semibold text-teal-300">{TARGETS[group].postMeal}</p>
          </div>
        </motion.div>
        <p className="mt-3 text-sm text-muted">{TARGETS[group].note}</p>

        {group === "general" && (
          <div className="mt-8 border-t border-line pt-6">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Check a post-meal reading (mg/dL)</span>
              <input
                type="number"
                inputMode="numeric"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                placeholder="e.g. 150"
                className={inputCls}
              />
            </label>
            {verdict && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl px-4 py-3 text-sm font-medium"
                style={{ backgroundColor: `${verdict.color}1a`, color: verdict.color }}
              >
                {verdict.text}
              </motion.p>
            )}
          </div>
        )}

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
