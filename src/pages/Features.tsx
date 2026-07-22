import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

import todayShot from "../assets/screenshots/today-dashboard.jpg";
import foodShot from "../assets/screenshots/food-diary.jpg";
import barcodeShot from "../assets/screenshots/barcode-scan.jpg";
import medsShot from "../assets/screenshots/meds.jpg";
import preventiveShot from "../assets/screenshots/preventive-care.jpg";
import quickCareShot from "../assets/screenshots/quick-care.jpg";
import familyShot from "../assets/screenshots/family-caregivers.jpg";
import medicalProfileShot from "../assets/screenshots/medical-profile.jpg";
import menuShot from "../assets/screenshots/menu.jpg";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.glucosecompass.app";

interface Screen {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
}

const screens: Screen[] = [
  {
    image: todayShot,
    eyebrow: "Today",
    title: "Your whole day, at a glance.",
    body: "Latest glucose with a clear high/low flag, carbs and calories against your goals, and a meal-by-meal breakdown — all on one screen you can check in seconds.",
  },
  {
    image: foodShot,
    eyebrow: "Food diary",
    title: "Log food the way you actually eat.",
    body: "Search over 1,000 regional dishes — from masala chai to pav bhaji — or build your own recipe from ingredients. Every entry shows carbs and calories instantly.",
    reverse: true,
  },
  {
    image: barcodeShot,
    eyebrow: "Barcode & label scanning",
    title: "Scan a package, get the full picture.",
    body: "Point the camera at a barcode and get calories, carbs, sugar, protein, fat, sodium, and fiber — plus a plain-language verdict like \"Moderate — okay in moderation\" instead of a wall of numbers.",
  },
  {
    image: medsShot,
    eyebrow: "Medications",
    title: "Never lose track of a dose.",
    body: "Add any medication with dosage and times, get reminded when one's due, and mark it taken with a tap. A simple ring shows how many doses are left today.",
    reverse: true,
  },
  {
    image: preventiveShot,
    eyebrow: "Preventive care & screenings",
    title: "The checkups that are easy to forget.",
    body: "Eye exams, kidney function, lipid panels, blood pressure, foot exams — tracked with sensible default intervals and reminders before each one is due.",
  },
  {
    image: quickCareShot,
    eyebrow: "Quick care modes & emergency ID",
    title: "Built for the moments that matter most.",
    body: "Switch on Sick Day Mode for more frequent check-ins, or Exercise Mode for pre/post-workout guidance. Your Emergency Medical ID keeps your diagnosis, medications, and emergency contact ready to share instantly.",
    reverse: true,
  },
  {
    image: familyShot,
    eyebrow: "Family & caregivers",
    title: "Loop in the people who care about you.",
    body: "Share a read-only code with a spouse, parent, or caregiver so they can follow your readings remotely — or follow someone else's. Revoke access anytime; caregivers can view but never change your data.",
  },
  {
    image: medicalProfileShot,
    eyebrow: "Medical profile",
    title: "Your care team, in one place.",
    body: "Emergency contacts, doctors, and upcoming appointments — all kept together so nothing gets lost between visits, with reminders a day ahead and the day of.",
    reverse: true,
  },
  {
    image: menuShot,
    eyebrow: "And a lot more",
    title: "Dexcom CGM, multi-profile, lab scanning, reports.",
    body: "Live Dexcom CGM readings, switch between family profiles, scan a printed lab report straight into your history, and generate a doctor-ready report — it's all in the menu.",
  },
];

export default function Features() {
  return (
    <div className="px-6 py-16">
      <Seo
        title="App Features — See Every Screen"
        description="A visual tour of the MyHealthyGlucose app: food logging, barcode scanning, medications, CGM, family sharing, and more."
        path="/features"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            App Tour
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Every screen, built around real life.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            A closer look at what's inside MyHealthyGlucose — real screens from the app, not
            mockups.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Get it on Google Play
            </a>
            <Link
              to="/about-app"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
            >
              See pricing & plans
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 space-y-20 md:space-y-28">
          {screens.map((s, i) => (
            <div
              key={s.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                s.reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-52 overflow-hidden rounded-[1.8rem] border-4 border-bg-elevated bg-bg shadow-2xl shadow-black/40 ring-1 ring-line sm:w-64"
                  >
                    <img src={s.image} alt={s.title} className="w-full" loading="lazy" />
                  </motion.div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                  {s.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-dim">{s.body}</p>
                {i === 0 && (
                  <p className="mt-4 text-xs text-muted-2">
                    {i + 1} of {screens.length}
                  </p>
                )}
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="mt-24 text-center">
          <div className="glass mx-auto max-w-xl rounded-[2rem] p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Ready to try it yourself?
            </h2>
            <p className="mt-3 text-ink-dim">
              Free to start, with everything you need to track glucose, food, and medications.
            </p>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Get it on Google Play
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
