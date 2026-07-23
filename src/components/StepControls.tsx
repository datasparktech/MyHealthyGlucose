import { motion, AnimatePresence } from "framer-motion";

export interface Step {
  title: string;
  body: string;
}

export default function StepControls({
  steps,
  step,
  setStep,
}: {
  steps: Step[];
  step: number;
  setStep: (n: number) => void;
}) {
  return (
    <div className="mt-6">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-6 bg-teal-400" : "w-2 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Current step text */}
      <div className="mt-5 min-h-[5rem] text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-display text-lg font-semibold text-ink">
              {step + 1}. {steps[step].title}
            </p>
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-ink-dim">
              {steps[step].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300 disabled:opacity-30"
        >
          ← Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-30 disabled:hover:scale-100"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
