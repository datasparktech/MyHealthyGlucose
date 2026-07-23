-- MyHealthyGlucose — Admin-manageable settings & store products
-- Run this in Supabase SQL Editor after the main schema.

-- ============ 1. SITE SETTINGS (key/value, admin-editable) ============
create table if not exists public.site_settings (
  key text primary key,
  value text default '',
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;

-- Anyone can read settings (they're used to render public pages, e.g. the
-- donation link on /give — nothing sensitive is stored here)
drop policy if exists "anyone reads settings" on public.site_settings;
create policy "anyone reads settings"
  on public.site_settings for select using (true);

-- Only the team can write settings
drop policy if exists "team writes settings" on public.site_settings;
create policy "team writes settings"
  on public.site_settings for insert
  to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));

drop policy if exists "team updates settings" on public.site_settings;
create policy "team updates settings"
  on public.site_settings for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));


-- ============ 2. STORE PRODUCTS (admin-managed catalog) ============
create table if not exists public.store_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'General',
  description text default '',
  us_price text default '',
  us_url text default '',
  us_retailer text default 'Amazon.com',
  in_price text default '',
  in_url text default '',
  in_retailer text default 'Amazon.in',
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.store_products enable row level security;

-- Anyone can read ACTIVE products (what the public /store page shows)
drop policy if exists "anyone reads active products" on public.store_products;
create policy "anyone reads active products"
  on public.store_products for select
  using (active = true);

-- Team can read everything (including inactive, for the admin manager)
drop policy if exists "team reads all products" on public.store_products;
create policy "team reads all products"
  on public.store_products for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));

-- Team can insert/update/delete
drop policy if exists "team writes products" on public.store_products;
create policy "team writes products"
  on public.store_products for insert
  to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));

drop policy if exists "team updates products" on public.store_products;
create policy "team updates products"
  on public.store_products for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));

drop policy if exists "team deletes products" on public.store_products;
create policy "team deletes products"
  on public.store_products for delete
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));
