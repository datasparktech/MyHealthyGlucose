import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";

interface Option {
  label: string;
  points: number;
}
interface Question {
  id: string;
  prompt: string;
  options: Option[];
}

/**
 * Loosely modeled on the ADA / CDC prediabetes risk-test factors.
 * Points are illustrative for education, not a validated clinical score.
 */
const QUESTIONS: Question[] = [
  {
    id: "age",
    prompt: "How old are you?",
    options: [
      { label: "Under 40", points: 0 },
      { label: "40 – 49", points: 1 },
      { label: "50 – 59", points: 2 },
      { label: "60 or older", points: 3 },
    ],
  },
  {
    id: "family",
    prompt: "Does a parent or sibling have diabetes?",
    options: [
      { label: "No", points: 0 },
      { label: "Yes", points: 1 },
    ],
  },
  {
    id: "bp",
    prompt: "Have you ever been told you have high blood pressure?",
    options: [
      { label: "No", points: 0 },
      { label: "Yes", points: 1 },
    ],
  },
  {
    id: "active",
    prompt: "Are you physically active most days?",
    options: [
      { label: "Yes, regularly", points: 0 },
      { label: "Rarely or never", points: 1 },
    ],
  },
  {
    id: "weight",
    prompt: "How would you describe your weight?",
    options: [
      { label: "Healthy range", points: 0 },
      { label: "Somewhat above", points: 1 },
      { label: "Well above", points: 2 },
    ],
  },
  {
    id: "gestational",
    prompt: "Have you ever had high blood sugar during pregnancy? (if applicable)",
    options: [
      { label: "No / not applicable", points: 0 },
      { label: "Yes", points: 1 },
    ],
  },
];

function bandFor(score: number) {
  if (score <= 2)
    return {
      label: "Lower risk",
      color: "#2dd4bf",
      note: "Your answers suggest a lower risk profile right now. Staying active and eating well keeps it that way — and it&rsquo;s still worth routine checkups.",
    };
  if (score <= 5)
    return {
      label: "Moderate risk",
      color: "#fbbf6b",
      note: "A few risk factors showed up. This is a good moment to talk with a doctor about a simple blood-sugar test and any changes worth making.",
    };
  return {
    label: "Higher risk",
    color: "#f59e0b",
    note: "Several risk factors are present. This doesn&rsquo;t mean you have diabetes — but it&rsquo;s a strong reason to see a doctor for proper screening soon.",
  };
}

export default function RiskQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const q = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;

  function choose(points: number) {
    const next = { ...answers, [q.id]: points };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }
  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const band = bandFor(score);
  const maxScore = QUESTIONS.reduce(
    (sum, qq) => sum + Math.max(...qq.options.map((o) => o.points)),
    0,
  );

  return (
    <ToolShell
      eyebrow="Diabetes Risk Quiz"
      title="A quick read on your risk factors."
      intro="Six questions, modeled on the risk factors clinicians look at. It&rsquo;s a prompt to talk to a doctor — not a diagnosis."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {!done ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-xs text-muted">
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-orange-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-xl font-semibold text-ink">{q.prompt}</h2>
                <div className="mt-5 space-y-2.5">
                  {q.options.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => choose(o.points)}
                      className="w-full rounded-xl border border-line bg-bg-elevated/50 px-4 py-3.5 text-left text-sm font-medium text-ink-dim transition-colors hover:border-teal-400/40 hover:bg-card-hover hover:text-ink"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-sm text-muted transition-colors hover:text-ink"
              >
                ← Back
              </button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl bg-bg-elevated/50 p-6 text-center ring-1 ring-line">
              <p className="text-sm text-muted">Your result</p>
              <p
                className="mt-1 font-display text-3xl font-semibold"
                style={{ color: band.color }}
              >
                {band.label}
              </p>
              <p className="mt-1 text-xs text-muted">
                Score {score} of {maxScore}
              </p>
              <p
                className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-dim"
                dangerouslySetInnerHTML={{ __html: band.note }}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={restart}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
              >
                Retake quiz
              </button>
              <a
                href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
              >
                Start tracking in the app
              </a>
            </div>
          </motion.div>
        )}

        <Disclaimer className="mt-8" />
      </div>
    </ToolShell>
  );
}
