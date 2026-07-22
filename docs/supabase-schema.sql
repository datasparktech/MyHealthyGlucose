-- MyHealthyGlucose — Supabase schema for the blog + admin system
-- Run this in your Supabase project: SQL Editor → New query → paste → Run

-- 1. Posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  content text not null,
  cover_url text,
  category text default 'Tips',
  author_email text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep author_email in sync with whoever inserts
create or replace function public.set_author_email()
returns trigger as $$
begin
  new.author_email = auth.jwt() ->> 'email';
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists set_author_email_trigger on public.posts;
create trigger set_author_email_trigger
  before insert on public.posts
  for each row execute function public.set_author_email();

-- 2. Row Level Security
alter table public.posts enable row level security;

-- Anyone (even logged-out visitors) can read PUBLISHED posts
drop policy if exists "public can read published" on public.posts;
create policy "public can read published"
  on public.posts for select
  using (published = true);

-- Signed-in team members (admin or editor) can read ALL posts (incl. drafts)
drop policy if exists "team can read all" on public.posts;
create policy "team can read all"
  on public.posts for select
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor')
  );

-- Team members can insert
drop policy if exists "team can insert" on public.posts;
create policy "team can insert"
  on public.posts for insert
  to authenticated
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor')
  );

-- Team members can update
drop policy if exists "team can update" on public.posts;
create policy "team can update"
  on public.posts for update
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor')
  );

-- Only ADMIN can delete
drop policy if exists "admin can delete" on public.posts;
create policy "admin can delete"
  on public.posts for delete
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- 3. Index for faster slug lookups
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_published_idx on public.posts (published, created_at desc);
