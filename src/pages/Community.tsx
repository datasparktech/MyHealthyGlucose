import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/images";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  fetchCuisineTallies,
  castCuisineVote,
  fetchFeatureRequests,
  submitFeatureRequest,
  upvoteFeature,
  fetchApprovedTestimonials,
  submitTestimonial,
  getVoterKey,
  type CuisineTally,
  type FeatureRequest,
  type Testimonial,
} from "../lib/community";

const CUISINES = [
  "Filipino", "Mexican", "Middle Eastern", "Thai", "Vietnamese",
  "Nigerian", "Ethiopian", "Korean", "Japanese", "Caribbean",
];

const inputCls =
  "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

function NotConfigured() {
  return (
    <div className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
      This is connecting soon — check back shortly.
    </div>
  );
}

// ---------- Cuisine voting ----------
function CuisineVoting() {
  const [tallies, setTallies] = useState<CuisineTally[]>([]);
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) return setLoading(false);
    fetchCuisineTallies().then(setTallies).catch(() => {}).finally(() => setLoading(false));
    setVoted(localStorage.getItem("mhg-voted-cuisine"));
  }, []);

  const total = tallies.reduce((s, t) => s + t.count, 0) || 1;
  const countFor = (c: string) => tallies.find((t) => t.cuisine === c)?.count ?? 0;

  async function vote(c: string) {
    if (voted) return;
    getVoterKey();
    const { error } = await castCuisineVote(c);
    if (!error || error === "already-voted") {
      localStorage.setItem("mhg-voted-cuisine", c);
      setVoted(c);
      setTallies((prev) => {
        const found = prev.find((t) => t.cuisine === c);
        if (found) return prev.map((t) => (t.cuisine === c ? { ...t, count: t.count + 1 } : t));
        return [...prev, { cuisine: c, count: 1 }];
      });
    }
  }

  if (!isSupabaseConfigured) return <NotConfigured />;
  if (loading) return <div className="h-40 animate-pulse rounded-2xl bg-card" />;

  const ranked = [...CUISINES].sort((a, b) => countFor(b) - countFor(a));

  return (
    <div className="space-y-2.5">
      {ranked.map((c) => {
        const count = countFor(c);
        const pct = Math.round((count / total) * 100);
        const isVote = voted === c;
        return (
          <button
            key={c}
            onClick={() => vote(c)}
            disabled={!!voted}
            className={`relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors ${
              isVote ? "border-teal-400/50 bg-teal-500/10" : "border-line bg-bg-elevated/50"
            } ${!voted ? "hover:border-teal-400/40 hover:bg-card-hover" : ""}`}
          >
            {voted && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-teal-500/10"
              />
            )}
            <div className="relative flex items-center justify-between">
              <span className="text-sm font-medium text-ink">
                {c} {isVote && <span className="text-teal-300">· your pick</span>}
              </span>
              {voted && (
                <span className="text-sm tabular-nums text-muted">
                  {pct}% <span className="text-muted-2">({count})</span>
                </span>
              )}
            </div>
          </button>
        );
      })}
      {!voted && (
        <p className="pt-2 text-center text-xs text-muted">
          Tap a cuisine to vote. One vote per person.
        </p>
      )}
    </div>
  );
}

// ---------- Feature requests ----------
function FeatureBoard() {
  const [requests, setRequests] = useState<FeatureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [busy, setBusy] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  function load() {
    fetchFeatureRequests().then(setRequests).catch(() => {}).finally(() => setLoading(false));
  }
  useEffect(() => {
    if (!isSupabaseConfigured) return setLoading(false);
    load();
    setUpvoted(new Set(JSON.parse(localStorage.getItem("mhg-upvoted") || "[]")));
  }, []);

  async function submit() {
    if (!title.trim()) return;
    setBusy(true);
    await submitFeatureRequest(title.trim(), desc.trim());
    setTitle("");
    setDesc("");
    setBusy(false);
    load();
  }

  async function up(id: string) {
    if (upvoted.has(id)) return;
    await upvoteFeature(id);
    const next = new Set(upvoted).add(id);
    setUpvoted(next);
    localStorage.setItem("mhg-upvoted", JSON.stringify([...next]));
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r)));
  }

  const statusColor: Record<string, string> = {
    open: "text-muted bg-card ring-line",
    planned: "text-teal-300 bg-teal-500/10 ring-teal-400/25",
    done: "text-orange-300 bg-orange-500/10 ring-orange-400/25",
  };

  if (!isSupabaseConfigured) return <NotConfigured />;

  return (
    <div>
      <div className="glass rounded-2xl p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A feature you'd love to see…"
          className={inputCls}
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Optional: a little more detail"
          rows={2}
          className={`${inputCls} mt-3`}
        />
        <button
          onClick={submit}
          disabled={busy || !title.trim()}
          className="mt-3 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit idea"}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="h-24 animate-pulse rounded-2xl bg-card" />
        ) : requests.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
            No ideas yet — be the first to suggest one.
          </p>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="glass flex items-start gap-4 rounded-2xl p-5">
              <button
                onClick={() => up(r.id)}
                disabled={upvoted.has(r.id)}
                className={`flex shrink-0 flex-col items-center rounded-xl border px-3 py-2 transition-colors ${
                  upvoted.has(r.id)
                    ? "border-teal-400/50 bg-teal-500/10 text-teal-300"
                    : "border-line text-muted hover:border-teal-400/40 hover:text-teal-300"
                }`}
              >
                <span className="text-sm">▲</span>
                <span className="text-sm font-semibold tabular-nums">{r.upvotes}</span>
              </button>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base font-semibold text-ink">{r.title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${statusColor[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
                {r.description && <p className="mt-1 text-sm text-muted">{r.description}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---------- Testimonials ----------
function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return setLoading(false);
    fetchApprovedTestimonials().then(setItems).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function submit() {
    if (!name.trim() || !quote.trim()) return;
    setBusy(true);
    await submitTestimonial(name.trim(), location.trim(), quote.trim());
    setBusy(false);
    setSent(true);
    setName(""); setLocation(""); setQuote("");
  }

  if (!isSupabaseConfigured) return <NotConfigured />;

  return (
    <div>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-32 animate-pulse rounded-2xl bg-card" />
          <div className="h-32 animate-pulse rounded-2xl bg-card" />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          No stories yet — share yours below and it&rsquo;ll appear once approved.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((t) => (
            <figure key={t.id} className="glass rounded-2xl p-6">
              <blockquote className="text-ink-dim">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-ink">{t.name}</span>
                {t.location && <span className="text-muted"> · {t.location}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-6">
        {sent ? (
          <p className="rounded-xl bg-teal-500/10 px-4 py-3 text-sm text-teal-200 ring-1 ring-teal-400/20">
            Thank you! Your story will appear here once our team reviews it.
          </p>
        ) : !open ? (
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
          >
            Share your story
          </button>
        ) : (
          <div className="glass rounded-2xl p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / country (optional)" className={inputCls} />
            </div>
            <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="What's your experience been like?" rows={3} className={`${inputCls} mt-3`} />
            <button
              onClick={submit}
              disabled={busy || !name.trim() || !quote.trim()}
              className="mt-3 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
            >
              {busy ? "Sending…" : "Submit story"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Community
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Shape what we build next.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            MyHealthyGlucose grows one cuisine and one feature at a time — and you get a real say
            in the order.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-[1.5rem] ring-1 ring-line">
          <img
            src={IMAGES.indianThali}
            alt="A shared meal representing the regional cuisines the community helps prioritize"
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">
            🌍 Which cuisine should we add next?
          </h2>
          <p className="mt-2 text-sm text-muted">
            We build each region properly before moving on. Your vote sets the queue.
          </p>
          <div className="mt-5">
            <CuisineVoting />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink">💡 Feature request board</h2>
          <p className="mt-2 text-sm text-muted">
            Suggest an idea, or upvote the ones you want most.
          </p>
          <div className="mt-5">
            <FeatureBoard />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink">💬 Stories from the community</h2>
          <p className="mt-2 text-sm text-muted">
            Real experiences from people using MyHealthyGlucose.
          </p>
          <div className="mt-5">
            <Testimonials />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
