import { supabase } from "./supabase";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  category: string;
  author_email: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type NewBlogPost = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "content" | "cover_url" | "category" | "published"
>;

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createPost(post: NewBlogPost): Promise<BlogPost> {
  if (!supabase) throw new Error("Not configured");
  const { data, error } = await supabase.from("posts").insert(post).select().single();
  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<NewBlogPost>): Promise<BlogPost> {
  if (!supabase) throw new Error("Not configured");
  const { data, error } = await supabase
    .from("posts")
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  if (!supabase) throw new Error("Not configured");
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
