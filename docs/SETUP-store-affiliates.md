# Setup: Store Affiliate Links

The `/store` page is live with ~12 diabetes-care products, auto-detects
whether a visitor is shopping from the US or India, and shows the right
pricing/links for each. **It works today** — but the links currently point
to generic Amazon search results, not real affiliate links, so purchases
don't earn any commission yet. Here's how to turn that on.

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
Each product in `src/data/storeProducts.ts` currently has a URL like:
```
url: amazonSearch("com", "blood glucose meter kit")
```
Once you have a tracking ID, that becomes a real affiliate link — either:
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
Everything lives in `src/data/storeProducts.ts` — each product has a name,
category, description, and per-country pricing/link. Adding a product is
adding one object to that array; ask me anytime you want the catalog
expanded or adjusted.
