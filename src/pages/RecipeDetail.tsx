import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { RECIPES } from "../data/recipes";

export default function RecipeDetail() {
  const { slug = "" } = useParams();
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return (
      <div className="px-6 py-20 text-center">
        <Seo title="Recipe not found" description="This recipe isn't available." path={`/recipes/${slug}`} />
        <p className="text-ink-dim">We couldn't find that recipe.</p>
        <Link to="/recipes" className="mt-4 inline-block text-teal-300 hover:text-teal-200">← Back to recipes</Link>
      </div>
    );
  }

  const related = RECIPES.filter((r) => r.slug !== recipe.slug && (r.cuisine === recipe.cuisine || r.tags.some((t) => recipe.tags.includes(t)))).slice(0, 3);
  const stats = [
    { label: "Carbs / serving", value: `${recipe.carbsPerServing} g` },
    { label: "Calories", value: `${recipe.calPerServing}` },
    { label: "Protein", value: `${recipe.proteinPerServing} g` },
    { label: "Time", value: `${recipe.minutes} min` },
  ];

  return (
    <div className="px-6 py-14">
      <Seo
        title={`${recipe.name} — ${recipe.carbsPerServing}g carbs per serving`}
        description={`${recipe.summary} ${recipe.carbsPerServing}g carbs and ${recipe.proteinPerServing}g protein per serving. A diabetes-friendly recipe from MyHealthyGlucose.`}
        path={`/recipes/${recipe.slug}`}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/recipes" className="text-sm font-medium text-muted transition-colors hover:text-teal-300">← All recipes</Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">{recipe.cuisine} · Serves {recipe.servings}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">{recipe.name}</h1>
          <p className="mt-4 text-ink-dim">{recipe.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {recipe.tags.map((tg) => (
              <span key={tg} className="rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/25">{tg}</span>
            ))}
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

        <div className="mt-10 grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <h2 className="font-display text-lg font-semibold text-ink">Ingredients</h2>
            <ul className="mt-4 space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-dim">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  {ing}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <h2 className="font-display text-lg font-semibold text-ink">Method</h2>
            <ol className="mt-4 space-y-3">
              {recipe.steps.map((st, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-dim">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-300">{i + 1}</span>
                  {st}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {recipe.tip && (
          <Reveal delay={0.15} className="mt-8">
            <div className="glass rounded-2xl p-5">
              <p className="text-sm text-ink-dim"><span className="font-semibold text-teal-300">Glucose tip: </span>{recipe.tip}</p>
            </div>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal delay={0.2} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink">You might also like</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/recipes/${r.slug}`} className="glass card-lift rounded-xl p-4 transition-colors hover:bg-card-hover">
                  <div className="text-sm font-semibold text-ink">{r.name}</div>
                  <div className="mt-1 text-xs text-teal-300">{r.carbsPerServing}g carbs / serving</div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        <p className="mt-10 text-center text-xs text-muted">
          Nutrition values are rounded estimates for education — not medical advice.
        </p>
      </div>
    </div>
  );
}
