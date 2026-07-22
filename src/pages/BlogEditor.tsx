import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  createPost,
  updatePost,
  fetchAllPosts,
  slugify,
  type BlogPost,
} from "../lib/blog";
import Reveal from "../components/Reveal";

const CATEGORIES = ["Recipes", "Tips", "Myth-busting", "App updates", "Stories"];

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [published, setPublished] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loadingPost, setLoadingPost] = useState(editing);

  useEffect(() => {
    if (!editing) return;
    fetchAllPosts()
      .then((posts) => {
        const p = posts.find((x) => x.id === id) as BlogPost | undefined;
        if (p) {
          setTitle(p.title);
          setSlug(p.slug);
          setSlugTouched(true);
          setExcerpt(p.excerpt);
          setContent(p.content);
          setCoverUrl(p.cover_url ?? "");
          setCategory(p.category);
          setPublished(p.published);
        }
      })
      .finally(() => setLoadingPost(false));
  }, [id, editing]);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  async function save(publish: boolean) {
    setErr(null);
    if (!title.trim()) return setErr("A title is required.");
    if (!content.trim()) return setErr("Some content is required.");
    setBusy(true);
    try {
      const payload = {
        title: title.trim(),
        slug: slug || slugify(title),
        excerpt: excerpt.trim(),
        content,
        cover_url: coverUrl.trim() || null,
        category,
        published: publish,
      };
      if (editing && id) await updatePost(id, payload);
      else await createPost(payload);
      navigate("/admin");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to save");
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  if (loadingPost) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
      </div>
    );
  }

  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/admin" className="text-sm font-medium text-muted hover:text-teal-300">
            ← Dashboard
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
            {editing ? "Edit post" : "New post"}
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How to count carbs in a thali"
              className={inputCls}
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">URL slug</span>
              <input
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="how-to-count-carbs"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-bg-elevated">
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Cover image URL (optional)</span>
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://…"
              className={inputCls}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Excerpt</span>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A one or two sentence summary shown on the blog list."
              rows={2}
              className={inputCls}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">
              Content <span className="text-muted-2">(Markdown supported)</span>
            </span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here…"
              rows={16}
              className={`${inputCls} font-mono text-sm leading-relaxed`}
            />
          </label>

          {err && <p className="text-sm text-orange-300">{err}</p>}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => save(true)}
              disabled={busy}
              className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
            >
              {busy ? "Saving…" : published || editing ? "Save & publish" : "Publish"}
            </button>
            <button
              onClick={() => save(false)}
              disabled={busy}
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300 disabled:opacity-50"
            >
              Save as draft
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
