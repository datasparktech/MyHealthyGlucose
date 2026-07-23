import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExplainerShell from "../../components/ExplainerShell";
import StepControls, { type Step } from "../../components/StepControls";

const steps: Step[] = [
  { title: "You eat a meal", body: "Carbohydrates in your food are about to become fuel for your body." },
  { title: "Carbs become glucose", body: "Digestion breaks carbohydrates down into glucose — a simple sugar — which enters your bloodstream." },
  { title: "Blood glucose rises", body: "The more glucose enters your blood, the higher your blood sugar reading climbs." },
  { title: "Your pancreas releases insulin", body: "In response, the pancreas releases insulin — a hormone that acts like a key." },
  { title: "Insulin unlocks your cells", body: "Insulin binds to a receptor on the cell, opening a channel so glucose can move out of the blood and into the cell for energy." },
];

const GLUCOSE_POSITIONS = [
  { x: 300, y: 135 }, { x: 340, y: 155 }, { x: 380, y: 130 },
  { x: 420, y: 160 }, { x: 460, y: 138 }, { x: 500, y: 152 },
];

export default function HowInsulinWorks() {
  const [step, setStep] = useState(0);
  const showGlucose = step >= 1;
  const glucoseCount = step === 1 ? 3 : step >= 2 ? 6 : 0;
  const pancreasActive = step >= 3;
  const insulinTravel = step >= 3;
  const gateOpen = step >= 4;
  const glucoseInCell = step >= 4;

  return (
    <ExplainerShell
      eyebrow="Visual Explainer"
      title="How insulin moves sugar from your blood into your cells."
      intro="Insulin is central to diabetes, but the mechanism is rarely explained visually. Step through it below."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        <svg viewBox="0 0 800 300" className="w-full" style={{ maxHeight: 320 }}>
          {/* Pancreas */}
          <g>
            <motion.ellipse
              cx="110" cy="150" rx="70" ry="48"
              fill={pancreasActive ? "#0C9468" : "#E6F3EE"}
              stroke={pancreasActive ? "#0FA377" : "#A9CBC0"}
              strokeWidth="2"
              animate={{
                fill: pancreasActive ? "#0C9468" : "#E6F3EE",
                scale: pancreasActive ? [1, 1.08, 1] : 1,
              }}
              transition={{ duration: 0.8, repeat: pancreasActive ? Infinity : 0, repeatDelay: 0.6 }}
            />
            <text x="110" y="155" textAnchor="middle" fontSize="13" fontWeight="600" fill={pancreasActive ? "#F1FAF7" : "#5C7C76"}>
              Pancreas
            </text>
          </g>

          {/* Blood vessel */}
          <rect x="220" y="110" width="360" height="80" rx="40" fill="#E6F3EE" stroke="#A9CBC0" strokeWidth="2" />
          <text x="400" y="100" textAnchor="middle" fontSize="12" fill="#5C7C76" fontWeight="600" letterSpacing="0.5">
            BLOODSTREAM
          </text>

          {/* Glucose dots in vessel */}
          <AnimatePresence>
            {showGlucose &&
              GLUCOSE_POSITIONS.slice(0, glucoseCount).map((p, i) => (
                <motion.circle
                  key={i}
                  r="7"
                  fill="#fb923c"
                  initial={{ opacity: 0, cx: p.x, cy: p.y, scale: 0 }}
                  animate={{
                    opacity: glucoseInCell && i < 4 ? 0 : 1,
                    cx: glucoseInCell && i < 4 ? 700 : p.x,
                    cy: glucoseInCell && i < 4 ? 150 : p.y,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, delay: glucoseInCell ? i * 0.15 : i * 0.1 }}
                />
              ))}
          </AnimatePresence>

          {/* Insulin (key shapes) traveling from pancreas to cell */}
          <AnimatePresence>
            {insulinTravel &&
              [0, 1, 2].map((i) => (
                <motion.g key={i}>
                  <motion.rect
                    width="16" height="9" rx="3"
                    fill="#0FA377"
                    initial={{ x: 150, y: 145, opacity: 0 }}
                    animate={{
                      x: gateOpen ? 645 : 380 + i * 20,
                      y: 145,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.9, delay: i * 0.15, ease: "easeInOut" }}
                  />
                </motion.g>
              ))}
          </AnimatePresence>

          {/* Cell */}
          <g>
            <circle cx="700" cy="150" r="80" fill="#DCEEE8" stroke="#A9CBC0" strokeWidth="2" />
            <text x="700" y="230" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5C7C76">
              Cell
            </text>

            {/* Receptor gate on the membrane */}
            <motion.rect
              x="612" y="135" width="16" height="30" rx="4"
              fill={gateOpen ? "#0C9468" : "#8FB0A6"}
              animate={{
                width: gateOpen ? 26 : 16,
                fill: gateOpen ? "#0C9468" : "#8FB0A6",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Glucose that made it inside the cell */}
            <AnimatePresence>
              {glucoseInCell &&
                [0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={i}
                    cx={680 + (i % 2) * 30}
                    cy={140 + Math.floor(i / 2) * 30}
                    r="7"
                    fill="#fb923c"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                  />
                ))}
            </AnimatePresence>
          </g>
        </svg>

        <StepControls steps={steps} step={step} setStep={setStep} />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">Why this matters for diabetes.</p>
        <p className="mt-2">
          In type 1 diabetes, the pancreas makes little or no insulin, so this whole process
          can&rsquo;t start without injected insulin. In type 2, the pancreas usually still makes
          insulin, but cells respond to it poorly — the &ldquo;key&rdquo; doesn&rsquo;t open the
          lock as easily, a state called insulin resistance. Either way, glucose builds up in the
          blood instead of reaching the cells that need it.
        </p>
      </div>
    </ExplainerShell>
  );
}
