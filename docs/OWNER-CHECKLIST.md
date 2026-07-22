# MyHealthyGlucose — Owner Action Checklist

One place for every outstanding setup step. Most features are already built and
deployed; they show a graceful "not connected yet" state until you complete the
matching step below. Nothing here is urgent or blocking — the core site is live
and working.

Check items off as you go.

---

## ✅ Already done
- [x] Domain live (myhealthyglucose.com) with HTTPS
- [x] GitHub Actions auto-deploy working
- [x] Supabase connected (login, blog, community tables)
- [x] Login working (admin + editor)
- [x] Contact form + Formspree → connect@myhealthyglucose.com
- [x] Mailbox connect@myhealthyglucose.com exists
- [x] Main blog schema run

---

## 1. Switch on remaining Supabase features (SQL copy-paste, ~5 min)
Run each file's contents in **Supabase → SQL Editor → New query → paste → Run**.
(Files are in the repo under `docs/`.)

- [ ] **Newsletter** — run `docs/supabase-newsletter.sql`
      (Activates the footer newsletter signup → stores subscribers.)
- [ ] **Testimonial reject button** — run `docs/supabase-testimonial-delete-policy.sql`
      (Lets you reject/delete testimonials from the admin dashboard.)
- [ ] **Community features** — run `docs/supabase-schema-phase5.sql` *(if not already done)*
      (Activates cuisine voting, feature board, testimonials on /community.)

## 2. AI Assistant (already deployed — just keep it healthy)
- [x] Edge function deployed with `--no-verify-jwt`
- [ ] **Redeploy after latest changes** (source citations + topic gate):
      from your `repo` folder: `git pull` then
      `supabase functions deploy diabetes-assistant --no-verify-jwt`
- [ ] **Set an Anthropic spending cap** at console.anthropic.com → Limits
      (Protects against runaway costs — important since the function is public.)

## 3. Analytics (optional, free, ~5 min)
Cloudflare Web Analytics — free, cookieless, no cookie banner needed.
- [ ] Go to dash.cloudflare.com → **Web Analytics** → **Add a site**
- [ ] Enter `myhealthyglucose.com`. Cloudflare gives you a **site token**
      (a string in the snippet, shown as `token: "..."`)
- [ ] Add GitHub Actions **Variable**: `VITE_CF_ANALYTICS_TOKEN` = that token
- [ ] Redeploy; visit the site, then check the Cloudflare Web Analytics
      dashboard for your visit
      (Note: you do NOT need to move your domain's DNS to Cloudflare — the
      free "add a site" beacon method works on any host, including GitHub Pages.)

## 4. Legal review (recommended for a health brand)
- [ ] Have a lawyer review the Privacy Policy, Terms of Use, and Medical
      Disclaimer at /legal/* before relying on them. They're a solid starting
      point but were not written by a lawyer.

## 5. Email consistency (outside the website)
The contact form already routes correctly. These are for consistency only:
- [ ] Update developer contact email on the **Google Play** listing
- [ ] Update support email **inside the app** (if hardcoded)
- [ ] Update contact info on the **old site** (myhealthyglucose.datasparktech.com)
- [ ] Confirm Formspree destination change was **verified** (click its email)

## 6. Housekeeping (security)
- [ ] **Rotate the GitHub token** used during development
      (It appeared in the build chat history; rotating is good hygiene.)
      GitHub → Settings → Developer settings → Personal access tokens.
- [ ] Keep the second Supabase account's login saved in a password manager.

---

## How to add content going forward
- **Blog posts:** log in at /login → New post → write in Markdown → Publish.
  (These appear alongside the built-in starter posts.)
- **Approve testimonials:** they show in the admin dashboard once submitted;
  Approve/Reject there (after step 1's delete policy is run).
- **Expand the AI's free FAQ:** ask to add more entries to `src/data/faq.ts` —
  more coverage = fewer API credits used.

## Where things live
- **Repo:** github.com/datasparktech/MyHealthyGlucose
- **Setup guides:** `docs/` folder (login/blog/contact, AI assistant, schemas)
- **This checklist:** `docs/OWNER-CHECKLIST.md`
- **Roadmap:** `docs/MyHealthyGlucose_Website_Roadmap.docx`
