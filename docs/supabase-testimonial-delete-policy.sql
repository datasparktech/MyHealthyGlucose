-- Small addendum: allow team (admin/editor) to delete testimonials (for "reject").
-- Run this in Supabase SQL Editor. Safe to run even if you've run the rest.

drop policy if exists "team deletes testimonials" on public.testimonials;
create policy "team deletes testimonials"
  on public.testimonials for delete
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin','editor'));
