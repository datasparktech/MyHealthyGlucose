export interface ExplainerMeta {
  slug: string;
  title: string;
  summary: string;
  icon: string;
}

export const EXPLAINERS: ExplainerMeta[] = [
  {
    slug: "how-insulin-works",
    title: "How Insulin Works",
    summary: "Step through how insulin moves glucose out of your blood and into your cells.",
    icon: "🔑",
  },
  {
    slug: "digestion-and-glucose",
    title: "How Digestion Affects Blood Sugar",
    summary: "See why some foods spike blood sugar fast while others raise it gently.",
    icon: "🍽️",
  },
  {
    slug: "type-1-vs-type-2",
    title: "Type 1 vs. Type 2 — What's Different",
    summary: "An interactive side-by-side of what's actually happening in the body.",
    icon: "⚖️",
  },
  {
    slug: "complications-body-map",
    title: "Where Complications Happen",
    summary: "Tap around an interactive body map to see where diabetes affects the body — and how to lower the risk.",
    icon: "🧍",
  },
  {
    slug: "day-in-the-life",
    title: "A Day in the Life of Blood Sugar",
    summary: "Press play and watch a full 24-hour glucose curve respond to meals, exercise, and sleep.",
    icon: "🕐",
  },
  {
    slug: "glycemic-race",
    title: "The Glycemic Index Race",
    summary: "Pick foods and watch their glucose curves race side by side.",
    icon: "🏁",
  },
  {
    slug: "hba1c-explained",
    title: "What HbA1c Actually Measures",
    summary: "Drag a live slider to see how average glucose becomes your A1C percentage.",
    icon: "🩸",
  },
];
