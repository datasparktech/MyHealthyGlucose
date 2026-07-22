-- Newsletter subscribers. Run in Supabase SQL Editor.

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table public.subscribers enable row level security;

-- Anyone can subscribe (insert their email)
drop policy if exists "anyone subscribes" on public.subscribers;
create policy "anyone subscribes"
  on public.subscribers for insert with check (true);

-- Only the team can read the subscriber list
drop policy if exists "team reads subscribers" on public.subscribers;
create policy "team reads subscribers"
  on public.subscribers for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));
