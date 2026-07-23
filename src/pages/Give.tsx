import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { IMAGES } from "../data/images";
import { fetchSetting } from "../lib/settings";
import { isSupabaseConfigured } from "../lib/supabase";

const ENV_FALLBACK = import.meta.env.VITE_DONATION_LINK as string | undefined;

export default function Give() {
  const [allocation, setAllocation] = useState<"kits" | "ngo">("kits");
  const [donationLink, setDonationLink] = useState<string | undefined>(ENV_FALLBACK);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchSetting("donation_link").then((v) => {
      if (v) setDonationLink(v);
    });
  }, []);

  return (
    <div className="px-6 py-16">
      <Seo
        title="Give Back — Help Fund Free Diabetes Kits"
        description="Your donation helps fund free diabetes starter kits for people who can't afford them, and supports partner organizations doing this work on the ground."
        path="/give"
      />
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Give Back
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Diabetes care shouldn&rsquo;t depend on what you can afford.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Test strips, meters, and basic supplies are out of reach for a lot of people managing
            diabetes. Your donation helps change that — one kit at a time.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 overflow-hidden rounded-[1.75rem] ring-1 ring-line">
          <img
            src={IMAGES.doctorPatient}
            alt="A healthcare provider supporting a patient"
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
        </Reveal>

        {/* Where it goes */}
        <Reveal delay={0.1} className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Where your donation goes</h2>
          <p className="mt-2 text-sm text-muted">
            We split contributions between two paths — pick which resonates with you, or leave it
            as a general gift and we&rsquo;ll direct it where it&rsquo;s needed most.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setAllocation("kits")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                allocation === "kits"
                  ? "border-teal-400/50 bg-teal-500/10"
                  : "border-line bg-bg-elevated/40 hover:border-teal-400/30"
              }`}
            >
              <p className="text-2xl">🧰</p>
              <p className="mt-2 font-display text-base font-semibold text-ink">
                Free diabetes kits
              </p>
              <p className="mt-1 text-sm text-muted">
                Funds a starter kit — meter, strips, lancets — for someone who can&rsquo;t afford
                one, distributed through partner clinics and community health workers.
              </p>
            </button>
            <button
              onClick={() => setAllocation("ngo")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                allocation === "ngo"
                  ? "border-teal-400/50 bg-teal-500/10"
                  : "border-line bg-bg-elevated/40 hover:border-teal-400/30"
              }`}
            >
              <p className="text-2xl">🤝</p>
              <p className="mt-2 font-display text-base font-semibold text-ink">
                NGO partner support
              </p>
              <p className="mt-1 text-sm text-muted">
                Goes to an established diabetes-focused nonprofit already doing this work on the
                ground — supporting their reach rather than duplicating it.
              </p>
            </button>
          </div>
        </Reveal>

        {/* Donate CTA */}
        <Reveal delay={0.12} className="mt-10">
          <div className="glass rounded-2xl p-6 text-center sm:p-8">
            {donationLink ? (
              <a
                href={donationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
              >
                Donate now →
              </a>
            ) : (
              <div className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
                Online donations aren&rsquo;t open yet — check back soon, or{" "}
                <a href="/contact" className="underline hover:text-orange-100">
                  contact us
                </a>{" "}
                if you&rsquo;d like to help another way.
              </div>
            )}
            <p className="mt-4 text-xs text-muted">
              Every donation, big or small, goes toward the {allocation === "kits" ? "kits program" : "NGO partner"}.
            </p>
          </div>
        </Reveal>

        {/* Transparency */}
        <Reveal delay={0.15} className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Being upfront with you</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-dim">
            <p>
              MyHealthyGlucose is run by DataSpark Tech LLC, a small independent team — we are{" "}
              <strong className="text-ink">not currently a registered nonprofit</strong>. That
              means donations here are <strong className="text-ink">not tax-deductible</strong>{" "}
              unless we say otherwise for a specific campaign.
            </p>
            <p>
              We&rsquo;ll always be clear about where money goes, and we&rsquo;re actively looking
              at the right long-term structure for this program — including partnering with or
              routing funds through an established registered charity.
            </p>
            <p>
              Questions about how a donation is used? Reach out any time — we&rsquo;re happy to
              talk it through.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-14 text-center">
          <a
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
          >
            Know an NGO we should partner with? Tell us →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
