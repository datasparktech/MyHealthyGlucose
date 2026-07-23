import { motion } from "framer-motion";

/**
 * Ambient background for the "Vital Bloom" theme:
 * - A drifting, glowing glucose-trace line (signature element) — the
 *   site's recurring "living vital sign" motif.
 * - Soft aurora glow blobs (emerald + coral) drifting slowly.
 * - A fine dot-grid texture.
 * Everything here is ambient only and never competes with foreground content.
 */
export default function GlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Soft aurora glow blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-teal-400/20 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-orange-400/12 blur-[140px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-teal-300/14 blur-[150px]"
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Signature: a slowly drifting glucose-trace line */}
      <svg
        aria-hidden
        className="absolute inset-x-0 top-[18%] h-[220px] w-[200%]"
        viewBox="0 0 2400 220"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vitalWaveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0b8161" stopOpacity="0" />
            <stop offset="15%" stopColor="#0c9468" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0fa377" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#d35a28" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d35a28" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          className="vital-wave"
          d="M0,110 C 100,60 200,160 300,110 C 400,60 500,160 600,110
             C 700,60 800,160 900,110 C 1000,60 1100,160 1200,110
             C 1300,60 1400,160 1500,110 C 1600,60 1700,160 1800,110
             C 1900,60 2000,160 2100,110 C 2200,60 2300,160 2400,110"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
