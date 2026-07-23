# Setup: Give Back / Donations

The `/give` page is built and live, but the **Donate now** button won't do
anything until you connect a real payment link. Until then, it shows a
friendly "not open yet" message — nothing is broken.

## Please read this first: the non-coding part

Before turning on real donations, a few things are worth sorting out —
these aren't website tasks, they're business/legal decisions:

1. **Tax status.** DataSpark Tech LLC is a for-profit LLC, not a registered
   nonprofit. That means donations collected here are **not tax-deductible**
   for the giver unless you route them through a registered charity (a
   501(c)(3) in the US, or the equivalent elsewhere). The page copy is
   written to be upfront about this — please don't remove that disclosure
   without replacing it with something equally honest.
2. **Charitable solicitation registration.** Many US states require
   registration *before* soliciting donations online from their residents —
   this applies even to small operations and even to for-profit entities
   collecting "for" a cause. Rules vary a lot by state. This is genuinely
   worth 30 minutes with a lawyer or accountant before promoting the Give
   Back page widely.
3. **The cleanest path, if you want to start fast:** partner with an
   *existing* registered diabetes charity and link directly to **their**
   donation page instead of collecting the money yourself. That sidesteps
   both issues above — you get the mission-alignment without taking on the
   compliance burden. If you want this route, tell me the NGO's donation
   URL and I'll wire it in as the "Donate now" destination.

## If you decide to collect donations yourselves

The simplest technical path — no custom backend required — is a **Stripe
Payment Link**.

### 1. Create a Stripe account
Sign up at https://stripe.com (free to create; Stripe takes a small % per
transaction, no monthly fee).

### 2. Create a Payment Link
- Stripe Dashboard → **Payment Links** → **New**
- Set it up as a donation: no fixed price, let the donor choose an amount
  (Stripe supports "customer chooses price")
- Name it something like "MyHealthyGlucose — Give Back"
- Save it — you'll get a URL like `https://buy.stripe.com/xxxxx`

### 3. Add it to the site
Add a GitHub Actions **Variable**:
- Name: `VITE_DONATION_LINK`
- Value: your Stripe Payment Link URL

Then make sure it's passed into the build step in
`.github/workflows/deploy.yml` (ask me to do this — it's a one-line
addition, same pattern as the other `VITE_` variables).

### 4. Redeploy
Once deployed, the Donate button on `/give` will link straight to your
Stripe checkout page. Stripe handles all payment processing — the site
never touches card details.

## Alternatives to Stripe
- **PayPal Giving Fund / PayPal.me** — simple, widely trusted
- **Razorpay** (India) — if you want an India-specific option alongside or
  instead of Stripe, since Stripe's donation features work best for
  US-based collection
- Any of these work the same way: create a hosted payment link, drop the
  URL into `VITE_DONATION_LINK`

## What the page tracks (or doesn't, yet)
Right now there's no automated "funds raised" counter — that would need a
webhook from Stripe to a backend (an edge function, similar to how the AI
assistant works) to record each donation. That's a reasonable next step
once real donations are flowing, not needed to launch.
