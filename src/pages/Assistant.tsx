import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { isDiabetesRelated, matchFaq } from "../data/faq";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What is the difference between type 1 and type 2 diabetes?",
  "What foods have a low glycemic index?",
  "What are the early signs of diabetes?",
  "How does exercise affect blood sugar?",
];

const DISALLOWED = [
  /how much insulin/i,
  /what dose/i,
  /should i (take|stop|change)/i,
  /can i stop taking/i,
];

export default function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setError(null);

    // Client-side guard against personal dosing/medical-decision questions
    if (DISALLOWED.some((re) => re.test(q))) {
      setMessages((m) => [
        ...m,
        { role: "user", content: q },
        {
          role: "assistant",
          content:
            "That's a question about your personal treatment or dosing, and it's not something I can safely answer — those decisions must come from your own doctor or care team, who knows your full history. I'm happy to explain the general concepts behind it, though.",
        },
      ]);
      setInput("");
      return;
    }

    // Topic gate — off-topic questions never reach the API (saves credits)
    if (!isDiabetesRelated(q)) {
      setMessages((m) => [
        ...m,
        { role: "user", content: q },
        {
          role: "assistant",
          content:
            "I'm set up specifically to help with questions about diabetes, blood sugar, and related health and nutrition topics — so I can't help with that one. Try asking me something about managing diabetes, food and carbs, symptoms, or staying healthy, and I'll do my best!",
        },
      ]);
      setInput("");
      return;
    }

    // FAQ-first — answer common questions instantly, no API credits used
    const faq = matchFaq(q);
    if (faq) {
      setMessages((m) => [
        ...m,
        { role: "user", content: q },
        { role: "assistant", content: `${faq.answer}\n\nSource: ${faq.source}` },
      ]);
      setInput("");
      return;
    }

    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      if (!isSupabaseConfigured || !supabase) throw new Error("not-configured");
      const { data, error } = await supabase.functions.invoke("diabetes-assistant", {
        body: { messages: next },
      });
      if (error) throw error;
      const reply = (data?.reply as string) || "Sorry, I couldn't generate a response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setError(
        "The assistant isn't available right now. In the meantime, our Info Hub has clear, doctor-reviewed guides on most diabetes basics.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="px-6 py-14">
      <Seo
        title="Ask about Diabetes — AI Assistant"
        description="Ask general questions about diabetes and get clear, plain-language answers. Educational only — not medical advice."
        path="/assistant"
      />
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            AI Assistant · Beta
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Ask about diabetes.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-dim">
            Plain-language answers to general questions about diabetes, blood sugar, food, and
            health. This is educational only — it can&rsquo;t give personal medical advice,
            diagnose, or recommend doses.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="glass flex h-[28rem] flex-col rounded-2xl">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted">Try asking:</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-line px-3.5 py-2 text-left text-xs text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-teal-500 text-bg"
                          : "bg-bg-elevated/70 text-ink-dim ring-1 ring-line"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))
              )}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-bg-elevated/70 px-4 py-3 ring-1 ring-line">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-teal-400" />
                    </div>
                  </div>
                </div>
              )}
              {error && <p className="text-sm text-orange-300">{error}</p>}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-line p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask a general question about diabetes…"
                  className="flex-1 rounded-full border border-line bg-bg-elevated/60 px-4 py-2.5 text-sm text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none"
                  disabled={busy}
                />
                <button
                  onClick={() => send(input)}
                  disabled={busy || !input.trim()}
                  className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-lg text-center text-xs leading-relaxed text-muted-2">
          This assistant provides general educational information only and is not a substitute for
          professional medical advice, diagnosis, or treatment. Always seek the guidance of your
          doctor or qualified health provider. In an emergency, contact your local emergency
          services.
        </p>
      </div>
    </div>
  );
}
