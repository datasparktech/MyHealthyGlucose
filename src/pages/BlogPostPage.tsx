import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchPostBySlug, type BlogPost } from "../lib/blog";
import { isSupabaseConfigured } from "../lib/supabase";
import { getSeedPost } from "../data/seedPosts";
import Reveal from "../components/Reveal";
import Disclaimer from "../components/Disclaimer";
import Seo from "../components/Seo";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    // Built-in seed posts render even without the database
    const seed = getSeedPost(slug);
    if (seed) {
      setPost({
        id: seed.slug,
        slug: seed.slug,
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        cover_url: seed.cover_url,
        category: seed.category,
        author_email: null,
        published: true,
        created_at: seed.created_at,
        updated_at: seed.created_at,
      });
      setLoading(false);
      return;
    }
    if (!isSupabaseConfigured) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    fetchPostBySlug(slug)
      .then((p) => {
        if (p && p.published) setPost(p);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
      </div>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  return (
    <article className="px-6 py-14">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover_url ?? undefined}
      />
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link to="/blog" className="text-sm font-medium text-muted hover:text-teal-300">
            ← Blog
          </Link>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted">
            <span className="rounded-full bg-teal-500/10 px-2 py-0.5 font-semibold text-teal-300 ring-1 ring-teal-400/25">
              {post.category}
            </span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {post.title}
          </h1>
        </Reveal>

        {post.cover_url && (
          <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-2xl ring-1 ring-line">
            <img src={post.cover_url} alt="" className="w-full" />
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="prose-blog mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </Reveal>

        <Disclaimer className="mt-10" />
      </div>
    </article>
  );
}
