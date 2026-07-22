import ComingSoon from "./ComingSoon";

export default function InfoHub() {
  return (
    <ComingSoon
      eyebrow="Diabetes info hub"
      title="Clear answers, not jargon."
      body="Evergreen guides on the topics people search most — written in plain language, reviewed for accuracy."
      items={[
        "Type 1 vs Type 2 vs Gestational vs Prediabetes",
        "Understanding HbA1c & Time-in-Range",
        "Hypoglycemia vs Hyperglycemia — symptoms & emergency response",
        "Diabetic diet basics, by cuisine",
        "Newly diagnosed starter checklist",
      ]}
    />
  );
}
