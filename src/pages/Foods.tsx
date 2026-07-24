import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import {
  searchCatalog,
  CATEGORIES,
  DIETS,
  carbLevel,
  CATALOG_WITH_SLUG,
} from "../data/catalogHelpers";

const dietLabel = (d: string) =>
  d === "non-veg" ? "Non-veg" : d === "egg" ? "Egg" : d === "veg" ? "Veg" : d;

export default function Foods() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [diet, setDiet] = useState("");
  const [limit, setLimit] = useState(48);

  const results = useMemo(() => searchCatalog(q, cat, diet), [q, cat, diet]);
  const shown = results.slice(0, limit);

  return (
    <div className="px-6 py-14">
      <Seo
        title="Food Database — Carbs & Calories for 1,000+ Foods"
        description="Search carbohydrate and calorie values for over a thousand foods across Indian, Thai, Chinese, Italian and Western cuisines. Free diabetes-friendly food reference from MyHealthyGlucose."
        path="/foods"
      />
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Food Database
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Carbs &amp; calories for {CATALOG_WITH_SLUG.length.toLocaleString()}+ foods
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Search the carbohydrate and calorie count of foods across cuisines most
            trackers ignore — from roti and biryani to pad thai and pizza. Tap any food
            for details and glucose-friendly tips.
          </p>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.08} className="mt-10">
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setLimit(48); }}
                placeholder="Search foods…"
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal-400 focus:outline-none"
              />
              <select
                value={cat}
                onChange={(e) => { setCat(e.target.value); setLimit(48); }}
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink focus:border-teal-400 focus:outline-none"
              >
                <option value="">All cuisines / categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={diet}
                onChange={(e) => { setDiet(e.target.value); setLimit(48); }}
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink focus:border-teal-400 focus:outline-none"
              >
                <option value="">Any diet</option>
                {DIETS.map((d) => <option key={d} value={d}>{dietLabel(d)}</option>)}
              </select>
            </div>
            <p className="mt-3 text-xs text-muted">
              {results.length.toLocaleString()} food{results.length === 1 ? "" : "s"} found
            </p>
          </div>
        </Reveal>

        {/* Results */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((f) => {
            const lvl = carbLevel(f.carbs);
            return (
              <Link
                key={f.slug}
                to={`/foods/${f.slug}`}
                className="group glass card-lift flex flex-col rounded-2xl p-5 transition-colors duration-300 hover:bg-card-hover"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-base font-semibold text-ink">{f.name}</h2>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${lvl.tone}`}>
                    {lvl.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{f.cat} · {dietLabel(f.diet)}</p>
                <div className="mt-3 flex items-end gap-4">
                  <div>
                    <div className="font-display text-2xl font-semibold text-teal-300">{f.carbs}g</div>
                    <div className="text-[11px] text-muted">carbs</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-ink">{f.cal}</div>
                    <div className="text-[11px] text-muted">kcal</div>
                  </div>
                  <div className="ml-auto text-right text-[11px] text-muted">{f.serving}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">No foods match your filters.</p>
        )}

        {limit < results.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setLimit((l) => l + 48)}
              className="rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Show more foods
            </button>
          </div>
        )}

        <Reveal delay={0.1} className="mt-14">
          <div className="glass flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-semibold text-ink">Track what you eat, automatically</p>
              <p className="mt-1 text-sm text-muted">Log meals against these foods and see your glucose respond, in the free app.</p>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
            >
              Get the app
            </a>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted">
          Values are rounded estimates for education — not lab-precise. Individual glucose response varies.
        </p>
      </div>
    </div>
  );
}
