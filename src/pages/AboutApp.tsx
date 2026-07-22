import Reveal from "../components/Reveal";
import featureGraphic from "../assets/feature-graphic.png";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Glucose, HbA1c & blood-pressure logging",
      "1,000+ dish food database, barcode & voice logging",
      "Medication reminders & daily goals",
      "Lab-report photo scanning",
      "90 days of history",
      "2 doctor reports each month",
      "Secure Google sync across devices",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$1.99",
    period: "/month",
    sub: "or $19.99/yr · India ₹99/mo · ₹799/yr",
    features: [
      "Everything in Free, plus —",
      "Unlimited history, well beyond 90 days",
      "Unlimited PDF & CSV doctor reports",
      "Pattern Insights & trend analysis",
      "Caregiver & family sharing",
      "Full data export, any time",
      "Live Dexcom CGM readings + trend arrow",
    ],
    highlight: true,
  },
];

const releaseNotes = [
  {
    tag: "Latest · Jul 2026",
    items: [
      "Family Multi-Profile — one account, separate profiles for the people you care for",
      "Live Dexcom CGM — connect your sensor for real-time glucose and trend, right in the app",
      "Voice logging, now in 9 languages — accent-aware and forgiving of mis-hearings",
      "Lab report photo import — scan a printed report, pulled straight in, on-device",
      "Premium plans live — 14-day free trial, then $1.99/mo or $19.99/yr",
    ],
  },
  {
    tag: "Pilot launch · Jul 2026",
    items: [
      "Blood glucose, HbA1c and blood-pressure logging with trend charts",
      "Food diary with 1,000+ regional dishes, plus barcode scanning",
      "Medication tracking with reminders and forgiving adherence streaks",
      "Emergency medical ID, foot checks, ketones and preventive-screening reminders",
      "Secure Google sign-in with automatic cloud sync, full data export & account deletion",
    ],
  },
];

export default function AboutApp() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            About the app
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Everything MyHealthyGlucose does today.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
            One app for glucose, HbA1c, blood pressure, meals and medication — built around how
            you actually eat, live, and travel.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-3xl ring-1 ring-line">
          <img src={featureGraphic} alt="MyHealthyGlucose app preview" className="w-full" />
        </Reveal>

        {/* Pricing */}
        <div className="mt-24">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">Pricing</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
              Free where it matters. Premium for depth.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-dim">
              Every day-to-day essential stays free. Premium unlocks the deeper, long-term
              picture — with a 14-day free trial.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div
                  className={`h-full rounded-3xl p-8 ${
                    p.highlight
                      ? "glass shadow-2xl shadow-teal-500/10 ring-1 ring-teal-400/30"
                      : "glass"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-semibold text-ink">{p.name}</h3>
                    {p.highlight && (
                      <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 ring-1 ring-orange-400/30">
                        Most depth
                      </span>
                    )}
                  </div>
                  <p className="mt-4">
                    <span className="font-display text-4xl font-semibold text-ink">{p.price}</span>
                    <span className="text-sm text-muted"> {p.period}</span>
                  </p>
                  {p.sub && <p className="mt-1 text-xs text-muted">{p.sub}</p>}
                  <ul className="mt-6 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink-dim">
                        <span className="mt-0.5 text-teal-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-2">
            Prices are set per country in Google Play, so you&rsquo;ll always see your local
            currency at checkout. Cancel anytime.
          </p>
        </div>

        {/* Release notes */}
        <div className="mt-24">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Release notes
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
              What&rsquo;s shipped so far.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-8">
            {releaseNotes.map((r, i) => (
              <Reveal key={r.tag} delay={i * 0.1}>
                <div className="glass rounded-2xl p-7">
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                    {r.tag}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-ink-dim">
                        <span className="mt-0.5 text-teal-400">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-20 text-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-bg shadow-lg shadow-teal-500/25 transition-transform hover:scale-105 hover:bg-teal-400"
          >
            Get it on Google Play
          </a>
        </Reveal>
      </div>
    </div>
  );
}
