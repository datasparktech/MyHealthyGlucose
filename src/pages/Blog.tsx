import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedPosts, type BlogPost } from "../lib/blog";
import { isSupabaseConfigured } from "../lib/supabase";
import Reveal from "../components/Reveal";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Blog</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Stories, recipes &amp; updates.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Practical writing on living well with diabetes — recipes with real carb counts,
            myth-busting, and what&rsquo;s new in the app.
          </p>
        </Reveal>

        <div className="mt-14">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <p className="text-muted">No posts published yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:bg-card-hover"
                  >
                    {p.cover_url && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={p.cover_url}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="rounded-full bg-teal-500/10 px-2 py-0.5 font-semibold text-teal-300 ring-1 ring-teal-400/25">
                          {p.category}
                        </span>
                        <span>{new Date(p.created_at).toLocaleDateString()}</span>
                      </div>
                      <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                        {p.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                      <span className="mt-4 text-sm font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                        Read →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
