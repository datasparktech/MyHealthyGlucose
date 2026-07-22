# Setup: Login, Blog & Contact Form

The website code for login, the blog admin, and the contact form is all built and
deployed. To switch these features **on**, do the one-time setup below (~15 min).
Until then, the site works fine — those features just show a friendly "not
connected yet" message.

---

## Part 1 — Supabase (login + blog database)

### 1. Create a free Supabase project
1. Go to https://supabase.com and sign up (free tier is plenty).
2. Click **New project**. Give it a name (e.g. `myhealthyglucose`), set a database
   password (save it somewhere), pick a region near your users, and create it.
3. Wait ~2 minutes for it to provision.

### 2. Create the blog table
1. In your project, open **SQL Editor** → **New query**.
2. Open the file `docs/supabase-schema.sql` from this repo, copy all of it, paste
   it into the editor, and click **Run**. You should see "Success."

### 3. Create your two team accounts
1. Go to **Authentication** → **Users** → **Add user** → **Create new user**.
2. Create the **admin** account (e.g. `connect@myhealthyglucose.com`) with a password.
   Tick "Auto Confirm User."
3. Create the **editor** account the same way (a second email, or the same person's
   alternate email).

### 4. Give each account its role
Roles live in each user's `app_metadata` (secure — can't be changed from the browser).
For each user, in **SQL Editor** run (replace the email):

```sql
-- Make the admin
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'connect@myhealthyglucose.com';

-- Make the editor
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"editor"}'
where email = 'editor@myhealthyglucose.com';
```

> **admin** can do everything, including delete posts.
> **editor** can create, edit, and publish posts, but not delete.

### 5. Grab your two keys
In your project: **Settings** → **API**. Copy:
- **Project URL** (looks like `https://abcd1234.supabase.co`)
- **anon public** key (a long string — this one is safe to expose publicly)

---

## Part 2 — Formspree (contact form email delivery)

1. Go to https://formspree.io and sign up (free tier allows 50 submissions/month).
2. Create a new form. For the destination email, enter **connect@myhealthyglucose.com**.
3. Formspree gives you a form endpoint like `https://formspree.io/f/abcdwxyz`.
   You just need the ID at the end — `abcdwxyz`.
4. Confirm the destination email when Formspree sends its verification.

---

## Part 3 — Add the keys to GitHub (so the live site uses them)

The site is built by GitHub Actions, so the keys go in the repo as **variables**
(they're all public-safe, so variables — not secrets — is correct):

1. In GitHub: repo → **Settings** → **Secrets and variables** → **Actions** →
   **Variables** tab → **New repository variable**. Add these three:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | your Supabase Project URL |
   | `VITE_SUPABASE_ANON_KEY` | your Supabase anon public key |
   | `VITE_FORMSPREE_ID` | your Formspree form ID |

2. Tell me once these are added and I'll update the deploy workflow to pass them
   into the build (one small change to `.github/workflows/deploy.yml`), then push.
   After the next deploy, login/blog/contact all go live.

### Local development (optional)
If you ever run the site locally, copy `.env.example` to `.env.local` and fill in
the same three values.

---

## How to use it once live

- **Log in:** go to `myhealthyglucose.com/login` with your admin or editor account.
- **Write a post:** after login you land on the dashboard → **+ New post** → write
  in Markdown → **Publish** (or save as draft). Published posts appear instantly on
  `myhealthyglucose.com/blog`.
- **Edit/delete:** from the dashboard. (Only admin can delete.)
- **Contact form:** anyone can use `myhealthyglucose.com/contact`; submissions email
  straight to connect@myhealthyglucose.com.
