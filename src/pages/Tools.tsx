import ComingSoon from "./ComingSoon";

export default function Tools() {
  return (
    <ComingSoon
      eyebrow="Free tools"
      title="Calculators worth bookmarking."
      body="A carb calculator, BMI calculator, A1C converter and diabetes risk quiz are next up — free, fast, and no login required."
      items={[
        "Carb Calculator — searchable dish database with real carb estimates",
        "BMI Calculator — with diabetes-risk context, not just a raw number",
        "A1C ↔ Average Glucose Converter",
        "Diabetes Risk Score Quiz",
      ]}
    />
  );
}
