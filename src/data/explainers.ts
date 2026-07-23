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
];
