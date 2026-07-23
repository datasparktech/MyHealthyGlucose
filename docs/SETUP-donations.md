# Setup: Give Back (NGO Pass-Through)

The `/give` page links directly to a nonprofit partner's own donation page.
**DataSpark Tech LLC never collects, holds, or processes any donations** —
no payment processor, no Stripe account, nothing to set up on that front.
This was a deliberate choice: it sidesteps the charitable-solicitation and
tax-deductibility questions that come with collecting funds directly (see
the earlier conversation notes if useful context) and gets a real,
already-registered charity's receipt to every donor.

## What you need to do

### 1. Choose an NGO partner
Look for a diabetes-focused nonprofit (or a broader health-access charity)
that's a legitimate, registered organization. Worth verifying before
linking:
- **US**: check GuideStar or Charity Navigator for their registration and
  standing
- **India**: check Darpan registration and 80G status (for tax-deductible
  receipts) — and FCRA registration specifically if they'll receive
  donations from outside India
- Elsewhere: your country's charity registry equivalent

### 2. Get their donation page URL
Most nonprofits have a dedicated "Donate" page on their own site — that's
the link you need. No API, no integration, just the URL.

### 3. Add it from the admin panel — no code changes needed
1. Run `docs/supabase-schema-admin.sql` in Supabase, if you haven't already
2. Log in and go to **/admin/settings**
3. Fill in:
   - **NGO partner name** — e.g. "Beyond Type 1" or whichever org you pick
   - **NGO donation link** — their donation page URL
4. Save — the Give Back page updates immediately, no redeploy needed

Until both are set, the page shows a friendly "finalizing our partnership"
message — nothing is broken in the meantime.

## Why this is simpler than collecting donations directly
- No payment processor account to create or maintain
- No question of DataSpark being a fiduciary holding other people's money
- Donors get a real receipt from an established, registered charity —
  often genuinely tax-deductible, which collecting through a for-profit
  LLC would not have been
- Much lower compliance burden — you're linking to a charity's own
  donation flow, not soliciting funds through your own platform

## If you ever want to revisit direct collection later
The Stripe Payment Link approach is still an option down the road if you
want more control (e.g., funding a kits-distribution program you run
yourselves). That would mean re-introducing the legal considerations this
setup avoids — worth a proper legal consult at that point, not before.
