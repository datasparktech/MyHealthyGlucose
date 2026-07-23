# Setup: Store Affiliate Links

The `/store` page is live with a starter catalog of ~12 diabetes-care
products, auto-detects whether a visitor is shopping from the US or India,
and shows the right pricing/links for each.

## Managing products is now done from the admin UI
Go to **/admin/store** (after running `docs/supabase-schema-admin.sql` in
Supabase) to add, edit, hide, or delete products — no code changes needed.
First time there, click **"Add 12 starter products"** to load the
built-in catalog into the database so you have something to start editing.

Each product has a name, category, description, and separate price/link/
retailer fields for the US and India. Toggle "Hide" to pull a product from
the public store without deleting it.

Until the database is connected, the store falls back to showing the
built-in starter catalog automatically — nothing breaks either way.

## How geo-detection works
The store uses a free IP-lookup service (ipwho.is) to guess the visitor's
country, with a manual "Shopping from" toggle they can always override.
No API key or account needed on your end — this part is already fully
working with no setup required.

## Getting real affiliate links (the part that needs you)

### Amazon Associates — two separate sign-ups
Amazon runs **separate** affiliate programs per country/domain:
- **US**: https://affiliate-program.amazon.com — sign up, get approved,
  and you'll get a tracking ID like `yoursite-20`
- **India**: https://affiliate-program.amazon.in — a completely separate
  application, separate tracking ID

Approval isn't instant — Amazon typically wants to see the site is live
and reviews the application (can take a few days). Some programs also
require a minimum number of qualifying sales within the first 180 days to
stay active, so it's worth reading the current terms.

### Once approved, update the product links
Go to **/admin/store**, click **Edit** on each product, and paste your real
affiliate link into the US or India link field — either:
- Append `&tag=yoursite-20` to the existing search URL (search-based
  affiliate links still earn commission on Amazon), or
- Replace with a direct product link + your tag, if you want to feature
  specific products rather than search results

Send me your Amazon Associate ID(s) once you have them and I'll wire them
into every product for both countries in one pass.

### Other affiliate programs worth considering
- **India**: 1mg (Tata 1mg), PharmEasy, Netmeds all run affiliate/partner
  programs for pharmacy products — worth checking if they offer better
  rates or product availability than Amazon.in for some categories
- **US**: Walgreens and CVS run affiliate programs through networks like
  CJ Affiliate / Rakuten Advertising, not directly — you'd sign up with
  the network first, then apply to the specific retailer program within it

## Legal: the disclosure is required, not optional
The store page includes an affiliate disclosure ("if you buy through them,
we may earn a commission") near the top. In the US, the FTC requires clear
disclosure of affiliate relationships — please don't remove this even once
real links are live.

## Adding or changing products
Do this from **/admin/store** now — no code or file edits needed. The old
`src/data/storeProducts.ts` file still exists as the starter catalog and
as an automatic fallback if the database isn't connected yet, but once
you're managing products from the admin panel, that file is no longer
what's shown to visitors.
