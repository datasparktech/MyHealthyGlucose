import { motion } from "framer-motion";
import Reveal from "./Reveal";
import appQr from "../assets/app-qr.svg";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.glucosecompass.app";

const highlights = [
  { icon: "🍛", label: "1,000+ regional foods" },
  { icon: "📊", label: "Glucose, HbA1c & BP trends" },
  { icon: "🔔", label: "Smart reminders" },
  { icon: "📄", label: "One-tap doctor reports" },
];

export default function AppLandingZone() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Get the app
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
            Your pocket diabetes companion.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            All the tracking, none of the hassle. Scan to install on your phone, or tap through on
            mobile.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: QR + badge + highlights */}
          <Reveal>
            <div className="glass rounded-[2rem] p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="shrink-0 rounded-2xl bg-white p-3 shadow-lg shadow-black/30">
                  <img src={appQr} alt="QR code to download MyHealthyGlucose" className="h-32 w-32" />
                  <p className="mt-2 text-center text-[11px] font-medium text-gray-500">Scan to install</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    Scan with your phone camera
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Point your camera at the code to open the app on Google Play instantly — no
                    typing needed.
                  </p>
                  <a
                    href={PLAY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-white transition-transform hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1L13 12.1v-.2L3.7 2.2l-.1.1z" fill="#00d4ff" />
                      <path d="M16.3 15.4L13 12.1v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2z" fill="#ffce00" />
                      <path d="M16.4 15.3L13 12 3.6 21.7c.4.4 1 .4 1.7.1l11.1-6.5" fill="#ff3d47" />
                      <path d="M16.4 8.7L5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 12l3.4-3.3z" fill="#00f076" />
                    </svg>
                    <span className="text-left">
                      <span className="block text-[10px] leading-none opacity-80">GET IT ON</span>
                      <span className="block text-sm font-semibold leading-tight">Google Play</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-center gap-2.5 rounded-xl bg-bg-elevated/50 px-3 py-2.5 ring-1 ring-line">
                    <span className="text-lg">{h.icon}</span>
                    <span className="text-sm text-ink-dim">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: phone mockups */}
          <Reveal delay={0.12}>
            <div className="flex items-center justify-center gap-4">
              <PhoneMock className="mt-8" hue="teal" label="Today" value="112" caption="mg/dL · in range" />
              <PhoneMock hue="orange" label="HbA1c" value="6.4%" caption="est. trend ↓" big />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhoneMock({
  className = "",
  hue,
  label,
  value,
  caption,
  big,
}: {
  className?: string;
  hue: "teal" | "orange";
  label: string;
  value: string;
  caption: string;
  big?: boolean;
}) {
  const accent = hue === "teal" ? "#2dd4bf" : "#fb923c";
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative ${big ? "w-40 sm:w-48" : "w-36 sm:w-44"} ${className}`}
    >
      <div className="overflow-hidden rounded-[2rem] border-4 border-bg-elevated bg-bg shadow-2xl shadow-black/40 ring-1 ring-line">
        <div className="flex h-6 items-center justify-center bg-bg-elevated">
          <div className="h-1 w-10 rounded-full bg-line" />
        </div>
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wide text-muted">{label}</p>
          <div className="mt-6 flex flex-col items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(${accent} 78%, rgba(255,255,255,0.06) 0)` }}
            >
              <div className="flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full bg-bg">
                <span className="font-display text-xl font-bold text-ink">{value}</span>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted">{caption}</p>
          </div>
          <div className="mt-4 space-y-1.5">
            {[70, 45, 60].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-bg-elevated" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
