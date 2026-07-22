import { motion } from "framer-motion";

/**
 * Slow-drifting gradient orbs + a subtle dot-grid.
 * Ambient only — never distracts from foreground content.
 */
export default function GlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <motion.div
        aria-hidden
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-teal-500/25 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-orange-500/15 blur-[130px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-teal-400/15 blur-[140px]"
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
