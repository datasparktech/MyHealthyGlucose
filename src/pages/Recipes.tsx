import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { RECIPES } from "../data/recipes";

const CUISINES = Array.from(new Set(RECIPES.map((r) => r.cuisine))).sort();
const TAGS = Array.from(new Set(RECIPES.flatMap((r) => r.tags))).sort();

export default function Recipes() {
  const [q, setQ] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [tag, setTag] = useState("");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return RECIPES.filter(
      (r) =>
        (!cuisine || r.cuisine === cuisine) &&
        (!tag || r.tags.includes(tag)) &&
        (!s || r.name.toLowerCase().includes(s) || r.summary.toLowerCase().includes(s))
    );
  }, [q, cuisine, tag]);

  return (
    <div className="px-6 py-14">
      <Seo
        title="Diabetes-Friendly Recipes with Carbs per Serving"
        description="Easy, diabetes-friendly recipes with carbohydrate and protein per serving — low-carb, high-protein and balanced meals across cuisines. Free from MyHealthyGlucose."
        path="/recipes"
      />
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Recipes</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Diabetes-friendly recipes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Real meals with the carbs per serving up front — so you can enjoy food you love
            while keeping an eye on your glucose. Filter by cuisine or goal.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search recipes…"
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-teal-400 focus:outline-none"
              />
              <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink focus:border-teal-400 focus:outline-none">
                <option value="">All cuisines</option>
                {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={tag} onChange={(e) => setTag(e.target.value)}
                className="rounded-xl border border-line bg-bg/40 px-4 py-2.5 text-sm text-ink focus:border-teal-400 focus:outline-none">
                <option value="">Any goal</option>
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <Link key={r.slug} to={`/recipes/${r.slug}`}
              className="group glass card-lift flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:bg-card-hover">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-teal-300">{r.cuisine}</span>
                <span className="text-xs text-muted">{r.minutes} min</span>
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold text-ink">{r.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.summary}</p>
              <div className="mt-4 flex items-end gap-4">
                <div>
                  <div className="font-display text-xl font-semibold text-teal-300">{r.carbsPerServing}g</div>
                  <div className="text-[11px] text-muted">carbs / serving</div>
                </div>
                <div>
                  <div className="font-display text-xl font-semibold text-ink">{r.proteinPerServing}g</div>
                  <div className="text-[11px] text-muted">protein</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.slice(0, 3).map((tg) => (
                  <span key={tg} className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-300 ring-1 ring-teal-400/25">{tg}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">No recipes match your filters.</p>
        )}

        <p className="mt-12 text-center text-xs text-muted">
          Nutrition values are rounded estimates for education — not lab-precise. Adjust portions to your plan.
        </p>
      </div>
    </div>
  );
}
