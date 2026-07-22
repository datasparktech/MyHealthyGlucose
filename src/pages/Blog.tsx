import ComingSoon from "./ComingSoon";

export default function Blog() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Stories, recipes & updates."
      body="Recipe carb breakdowns, myth-busting posts, and real release notes — the first posts are on the way."
      items={[
        "Recipe carb breakdowns, by cuisine",
        "Myth-busting: does sugar-free mean carb-free?",
        "App update announcements",
        "Community spotlights",
      ]}
    />
  );
}
