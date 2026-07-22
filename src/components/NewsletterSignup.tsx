import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function subscribe() {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setMsg("Newsletter isn't connected yet.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("subscribers").insert({ email: trimmed });
    if (error) {
      if (error.code === "23505") {
        setStatus("done");
        setMsg("You're already subscribed — thank you!");
        return;
      }
      setStatus("error");
      setMsg("Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
    setMsg("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <div className={compact ? "" : "glass rounded-2xl p-6 sm:p-8"}>
      {!compact && (
        <>
          <h3 className="font-display text-lg font-semibold text-ink">
            Get tips &amp; new guides in your inbox
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Occasional, practical, and never spammy. Unsubscribe anytime.
          </p>
        </>
      )}
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm text-teal-300 ${compact ? "" : "mt-4"}`}
          >
            ✓ {msg}
          </motion.p>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col gap-2 sm:flex-row ${compact ? "" : "mt-4"}`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && subscribe()}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-line bg-bg-elevated/60 px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none"
            />
            <button
              onClick={subscribe}
              disabled={status === "sending"}
              className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
            >
              {status === "sending" ? "…" : "Subscribe"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {status === "error" && <p className="mt-2 text-sm text-orange-300">{msg}</p>}
    </div>
  );
}
