import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function GiveBackBand() {
  return (
    <section className="px-6 py-14">
      <Reveal>
        <div className="glass mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-[2rem] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
              Give back
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
              Help fund diabetes care through our nonprofit partner.
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              Test strips and meters are out of reach for a lot of people. Your donation goes
              directly to a registered NGO doing this work — we never touch the funds.
            </p>
          </div>
          <Link
            to="/give"
            className="shrink-0 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-orange-400"
          >
            Give back →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
