-- MyHealthyGlucose — Phase 5 community features
-- Run this in Supabase SQL Editor AFTER the main schema (supabase-schema.sql).

-- ============ 1. CUISINE VOTES ============
create table if not exists public.cuisine_votes (
  id uuid primary key default gen_random_uuid(),
  cuisine text not null,
  voter_key text not null,            -- anonymous browser key, prevents double-voting client-side
  created_at timestamptz default now(),
  unique (cuisine, voter_key)
);

alter table public.cuisine_votes enable row level security;

-- Anyone can read vote counts
drop policy if exists "anyone reads votes" on public.cuisine_votes;
create policy "anyone reads votes"
  on public.cuisine_votes for select using (true);

-- Anyone (even anonymous) can cast a vote
drop policy if exists "anyone can vote" on public.cuisine_votes;
create policy "anyone can vote"
  on public.cuisine_votes for insert with check (true);


-- ============ 2. FEATURE REQUESTS ============
create table if not exists public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  status text default 'open',         -- open | planned | done
  upvotes int default 0,
  created_at timestamptz default now()
);

alter table public.feature_requests enable row level security;

-- Anyone can read
drop policy if exists "anyone reads requests" on public.feature_requests;
create policy "anyone reads requests"
  on public.feature_requests for select using (true);

-- Anyone can submit a request
drop policy if exists "anyone submits request" on public.feature_requests;
create policy "anyone submits request"
  on public.feature_requests for insert with check (true);

-- Anyone can upvote (update only the upvotes via RPC below)
-- Upvote through a security-definer function so we don't grant broad UPDATE.
create or replace function public.upvote_feature(request_id uuid)
returns void as $$
  update public.feature_requests
  set upvotes = upvotes + 1
  where id = request_id;
$$ language sql security definer;

-- Team can update status (admin/editor)
drop policy if exists "team updates requests" on public.feature_requests;
create policy "team updates requests"
  on public.feature_requests for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));


-- ============ 3. TESTIMONIALS ============
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text default '',
  quote text not null,
  approved boolean default false,     -- team approves before it shows publicly
  created_at timestamptz default now()
);

alter table public.testimonials enable row level security;

-- Public sees only APPROVED testimonials
drop policy if exists "public reads approved" on public.testimonials;
create policy "public reads approved"
  on public.testimonials for select using (approved = true);

-- Team sees all
drop policy if exists "team reads all testimonials" on public.testimonials;
create policy "team reads all testimonials"
  on public.testimonials for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));

-- Anyone can submit (starts unapproved)
drop policy if exists "anyone submits testimonial" on public.testimonials;
create policy "anyone submits testimonial"
  on public.testimonials for insert with check (approved = false);

-- Team can approve/update
drop policy if exists "team updates testimonials" on public.testimonials;
create policy "team updates testimonials"
  on public.testimonials for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));
