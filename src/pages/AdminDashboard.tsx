import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchAllPosts, deletePost, type BlogPost } from "../lib/blog";
import {
  fetchPendingTestimonials,
  approveTestimonial,
  deleteTestimonial,
  type Testimonial,
} from "../lib/community";
import Reveal from "../components/Reveal";
import AdminNav from "../components/AdminNav";

export default function AdminDashboard() {
  const { user, role, signOut, configured } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState<Testimonial[]>([]);

  async function load() {
    try {
      setLoading(true);
      setPosts(await fetchAllPosts());
      try {
        setPending(await fetchPendingTestimonials());
      } catch {
        // testimonials table may not exist yet — ignore
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (configured) load();
    else setLoading(false);
  }, [configured]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deletePost(id);
    load();
  }

  async function handleApprove(id: string) {
    await approveTestimonial(id);
    setPending((p) => p.filter((t) => t.id !== id));
  }

  async function handleReject(id: string) {
    if (!confirm("Reject and delete this testimonial?")) return;
    await deleteTestimonial(id);
    setPending((p) => p.filter((t) => t.id !== id));
  }

  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
                Dashboard
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
                Blog management
              </h1>
              <p className="mt-1 text-sm text-muted">
                Signed in as {user?.email}
                {role && (
                  <span className="ml-2 rounded-full bg-teal-500/10 px-2 py-0.5 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/25">
                    {role}
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/admin/new"
                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
              >
                + New post
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-dim transition-colors hover:border-orange-400/40 hover:text-orange-300"
              >
                Sign out
              </button>
            </div>
          </div>
        </Reveal>

        <AdminNav />

        <Reveal delay={0.1} className="mt-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
            </div>
          ) : err ? (
            <p className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200">{err}</p>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <p className="text-muted">No posts yet.</p>
              <Link to="/admin/new" className="mt-2 inline-block text-sm text-teal-300 hover:text-teal-200">
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-display text-base font-semibold text-ink">
                        {p.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                          p.published
                            ? "bg-teal-500/10 text-teal-300 ring-teal-400/25"
                            : "bg-orange-500/10 text-orange-300 ring-orange-400/25"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted">
                      {p.category} · updated {new Date(p.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/edit/${p.id}`}
                      className="rounded-lg bg-card px-3.5 py-2 text-sm font-medium text-ink-dim transition-colors hover:text-teal-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="rounded-lg bg-card px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-orange-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {pending.length > 0 && (
          <Reveal delay={0.15} className="mt-14">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Pending testimonials
              </h2>
              <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 ring-1 ring-orange-400/25">
                {pending.length} awaiting review
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              These won&rsquo;t appear on the public Community page until you approve them.
            </p>
            <div className="mt-6 space-y-3">
              {pending.map((t) => (
                <div key={t.id} className="glass rounded-2xl p-5">
                  <blockquote className="text-ink-dim">“{t.quote}”</blockquote>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm">
                      <span className="font-semibold text-ink">{t.name}</span>
                      {t.location && <span className="text-muted"> · {t.location}</span>}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(t.id)}
                        className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(t.id)}
                        className="rounded-lg bg-card px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-orange-300"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
