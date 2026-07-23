import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";
import StepControls, { type Step } from "../../components/StepControls";

const steps: Step[] = [
  { title: "You eat carbohydrates", body: "Rice, bread, fruit, sweets — anything with carbs starts this process." },
  { title: "Digestion breaks them into glucose", body: "Your stomach and small intestine break carbohydrates down into glucose, a simple sugar." },
  { title: "Glucose enters your bloodstream", body: "The intestine absorbs glucose directly into your blood, where it starts to raise your blood sugar." },
  { title: "How fast depends on the food", body: "A fast-digesting food like white rice spikes blood sugar quickly. A slower food like lentils, with more fiber, raises it more gently." },
  { title: "Insulin brings it back down", body: "Insulin moves glucose out of the blood and into your cells, bringing levels back toward baseline." },
];

// Simple path coordinates for two glucose curves across a 460-wide chart area
const FAST_PATH = "M 0 90 L 60 88 L 120 20 L 200 15 L 280 55 L 360 78 L 460 85";
const SLOW_PATH = "M 0 90 L 60 89 L 120 70 L 200 55 L 280 58 L 360 72 L 460 84";

export default function DigestionAndGlucose() {
  const [step, setStep] = useState(0);
  const showFood = step >= 0;
  const showBreakdown = step >= 1;
  const showAbsorb = step >= 2;
  const showCurves = step >= 3;
  const showRecovery = step >= 4;

  return (
    <ExplainerShell
      eyebrow="Visual Explainer"
      title="How digestion turns food into blood sugar."
      intro="Different foods raise blood sugar at very different speeds. Step through the process below to see why."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Left: digestive pathway */}
          <svg viewBox="0 0 300 300" className="w-full">
            {/* Stomach */}
            <motion.circle
              cx="80" cy="90" r="46"
              fill={showFood ? "#E6F3EE" : "#DCEEE8"}
              stroke="#A9CBC0" strokeWidth="2"
            />
            <text x="80" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5C7C76">Stomach</text>
            <AnimatePresence>
              {showFood && (
                <motion.text
                  x="80" y="60" textAnchor="middle" fontSize="22"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 60 }}
                  exit={{ opacity: 0 }}
                >
                  🍚
                </motion.text>
              )}
            </AnimatePresence>

            {/* Intestine tube */}
            <path d="M 80 136 Q 60 200 120 210 Q 180 220 160 260" fill="none" stroke="#A9CBC0" strokeWidth="18" strokeLinecap="round" />
            <text x="150" y="285" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5C7C76">Small intestine</text>

            {/* Glucose dots moving down through intestine into bloodstream (up and to the right conceptually) */}
            <AnimatePresence>
              {showBreakdown &&
                [0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    r="6"
                    fill="#fb923c"
                    initial={{ cx: 80, cy: 140, opacity: 0 }}
                    animate={{
                      cx: showAbsorb ? 250 : 120 + i * 15,
                      cy: showAbsorb ? 60 + i * 10 : 200 + i * 10,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                  />
                ))}
            </AnimatePresence>

            {showAbsorb && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x="230" y="40" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0C9468"
              >
                → into blood
              </motion.text>
            )}
          </svg>

          {/* Right: glucose curve chart */}
          <div>
            <svg viewBox="-10 -10 480 140" className="w-full">
              {/* baseline grid */}
              <line x1="0" y1="90" x2="460" y2="90" stroke="#A9CBC0" strokeDasharray="4" />
              <text x="0" y="105" fontSize="10" fill="#5C7C76">Time after eating →</text>

              {showCurves && (
                <>
                  <motion.path
                    d={FAST_PATH}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: showRecovery ? 1 : 0.6 }}
                    transition={{ duration: 1.2 }}
                  />
                  <motion.path
                    d={SLOW_PATH}
                    fill="none"
                    stroke="#0C9468"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: showRecovery ? 1 : 0.6 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  />
                </>
              )}
            </svg>
            {showCurves && (
              <div className="mt-2 flex justify-center gap-5 text-xs">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="h-2 w-2 rounded-full bg-orange-400" /> Fast (white rice)
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="h-2 w-2 rounded-full bg-teal-400" /> Slower (lentils)
                </span>
              </div>
            )}
          </div>
        </div>

        <StepControls steps={steps} step={step} setStep={setStep} />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">Why this matters day to day.</p>
        <p className="mt-2">
          Foods high in fiber, protein, or fat generally slow this process down, producing a
          gentler rise. This is the whole idea behind{" "}
          <a href="/tools/glycemic-index" className="text-teal-300 hover:text-teal-200">
            glycemic index and load
          </a>
          , and why pairing a carb-heavy food with protein or vegetables often softens its effect.
        </p>
      </div>
    </ExplainerShell>
  );
}
