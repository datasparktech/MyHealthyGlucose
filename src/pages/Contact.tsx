import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/images";

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  async function submit() {
    setErrMsg("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrMsg("Please fill in your name, email, and message.");
      return;
    }
    if (!FORM_ID) {
      setErrMsg("The contact form isn't connected yet. Email connect@myhealthyglucose.com directly for now.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: subject || "Website contact form",
          message,
          _replyto: email,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setErrMsg("Something went wrong sending your message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Couldn't reach the server. Please check your connection and try again.");
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            We&rsquo;d love to hear from you.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-dim">
            Questions, feedback, a feature you wish existed, or a cuisine you want us to add —
            send it over and it goes straight to our team.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-[1.5rem] ring-1 ring-line">
          <img
            src={IMAGES.doctorPatient}
            alt="A healthcare provider in conversation with a patient"
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 text-2xl text-teal-300 ring-1 ring-teal-400/30">
                ✓
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">Message sent</h2>
              <p className="mt-2 text-sm text-muted">
                Thanks for reaching out — we&rsquo;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-teal-300 hover:text-teal-200"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted">Name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted">Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm text-muted">Subject (optional)</span>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} placeholder="What's this about?" />
              </label>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm text-muted">Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className={inputCls} placeholder="Tell us what's on your mind…" />
              </label>

              {errMsg && <p className="mt-4 text-sm text-orange-300">{errMsg}</p>}

              <button
                onClick={submit}
                disabled={status === "sending"}
                className="mt-6 w-full rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] hover:bg-teal-400 disabled:opacity-50 disabled:hover:scale-100 sm:w-auto sm:px-10"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
