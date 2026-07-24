import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { findFoodBySlug, relatedFoods, carbLevel } from "../data/catalogHelpers";

const dietLabel = (d: string) =>
  d === "non-veg" ? "Non-veg" : d === "egg" ? "Egg" : d === "veg" ? "Vegetarian" : d;

export default function FoodDetail() {
  const { slug = "" } = useParams();
  const food = findFoodBySlug(slug);

  if (!food) {
    return (
      <div className="px-6 py-20 text-center">
        <Seo title="Food not found" description="This food isn't in our database yet." path={`/foods/${slug}`} />
        <p className="text-ink-dim">We couldn't find that food.</p>
        <Link to="/foods" className="mt-4 inline-block text-teal-300 hover:text-teal-200">← Back to the food database</Link>
      </div>
    );
  }

  const lvl = carbLevel(food.carbs);
  const related = relatedFoods(food);
  const stats: { label: string; value: string }[] = [
    { label: "Carbohydrates", value: `${food.carbs} g` },
    { label: "Calories", value: `${food.cal} kcal` },
    ...(food.protein != null ? [{ label: "Protein", value: `${food.protein} g` }] : []),
    ...(food.fiber != null ? [{ label: "Fiber", value: `${food.fiber} g` }] : []),
  ];

  return (
    <div className="px-6 py-14">
      <Seo
        title={`Carbs in ${food.name} — ${food.carbs}g per ${food.serving}`}
        description={`${food.name} has about ${food.carbs}g of carbs and ${food.cal} kcal per ${food.serving}. See diabetes-friendly tips and how it may affect blood glucose.`}
        path={`/foods/${food.slug}`}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/foods" className="text-sm font-medium text-muted transition-colors hover:text-teal-300">
            ← All foods
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            {food.cat} · {dietLabel(food.diet)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">{food.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${lvl.tone}`}>{lvl.label}</span>
            <span className="text-sm text-ink-dim">Per {food.serving}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 text-center">
                <div className="font-display text-2xl font-semibold text-teal-300">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-ink">How {food.name} may affect your glucose</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              With about <strong>{food.carbs}g of carbohydrate</strong> per {food.serving}, {food.name} is a{" "}
              {lvl.label.toLowerCase()} choice. Carbohydrate is the main driver of post-meal blood-sugar rises, so
              portion size matters. Pairing it with protein, healthy fat or fiber, and taking a short walk afterward,
              can blunt the spike. If you use insulin, count these carbs into your dose as advised by your care team.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/tools/carb-calculator" className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400">
                Carb calculator
              </Link>
              <Link to="/tools/glycemic-index" className="rounded-full px-4 py-2 text-sm font-semibold text-teal-300 ring-1 ring-line transition-colors hover:bg-card-hover">
                Glycemic index tool
              </Link>
            </div>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal delay={0.2} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink">More {food.cat} foods</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/foods/${r.slug}`} className="glass card-lift flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-card-hover">
                  <span className="text-sm font-semibold text-ink">{r.name}</span>
                  <span className="text-sm text-teal-300">{r.carbs}g carbs</span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        <p className="mt-10 text-center text-xs text-muted">
          Values are rounded estimates for education — not medical advice. Individual glucose response varies.
        </p>
      </div>
    </div>
  );
}
