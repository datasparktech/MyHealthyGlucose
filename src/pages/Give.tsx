import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { IMAGES } from "../data/images";
import { fetchSetting } from "../lib/settings";
import { isSupabaseConfigured } from "../lib/supabase";

export default function Give() {
  const [ngoName, setNgoName] = useState<string | undefined>();
  const [ngoLink, setNgoLink] = useState<string | undefined>();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchSetting("ngo_name").then((v) => v && setNgoName(v));
    fetchSetting("ngo_donation_link").then((v) => v && setNgoLink(v));
  }, []);

  return (
    <div className="px-6 py-16">
      <Seo
        title="Give Back — Help Fund Diabetes Care"
        description="We partner with a registered nonprofit to help fund diabetes care for people who can't afford it. Donations go directly to them — we never collect or handle the funds."
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
            diabetes. We&rsquo;ve partnered with a registered nonprofit working on exactly that.
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

        {/* Donate CTA */}
        <Reveal delay={0.12} className="mt-10">
          <div className="glass rounded-2xl p-6 text-center sm:p-8">
            {ngoLink ? (
              <>
                <p className="text-sm text-muted">
                  Your donation goes directly to{" "}
                  <span className="font-semibold text-ink">{ngoName || "our partner NGO"}</span>
                </p>
                <a
                  href={ngoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
                >
                  Donate to {ngoName || "our partner"} →
                </a>
              </>
            ) : (
              <div className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
                We&rsquo;re finalizing our nonprofit partnership — check back soon, or{" "}
                <a href="/contact" className="underline hover:text-orange-100">
                  contact us
                </a>{" "}
                if you know an NGO doing this work well.
              </div>
            )}
          </div>
        </Reveal>

        {/* How this works */}
        <Reveal delay={0.15} className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">How this works</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-dim">
            <p>
              MyHealthyGlucose (DataSpark Tech LLC) does <strong className="text-ink">not</strong>{" "}
              collect, hold, or process any donations. The link above takes you directly to our
              nonprofit partner&rsquo;s own donation page — they handle payment, receipts, and use
              of funds entirely through their own systems and policies.
            </p>
            <p>
              We chose this route deliberately: it means every dollar goes straight to an
              established organization already doing this work, and you get a proper donation
              receipt directly from a registered charity — including tax-deductibility where
              applicable under their status, not ours.
            </p>
            <p>
              Know a diabetes-focused nonprofit doing great work? We&rsquo;d love to hear about it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 text-center">
          <a
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
          >
            Suggest an NGO partner →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
