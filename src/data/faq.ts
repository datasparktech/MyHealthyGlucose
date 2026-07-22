/**
 * Local FAQ knowledge base for the Ask-AI assistant.
 *
 * Two jobs, both to save API credits:
 *  1. isDiabetesRelated() — detects off-topic questions so they never hit the API.
 *  2. matchFaq() — answers common questions instantly from vetted content (0 credits).
 * Anything on-topic but not matched falls through to the AI.
 */

export interface Faq {
  id: string;
  // keywords: if a question contains ANY of these (as whole-ish tokens), it may match
  keywords: string[];
  // require: optional — at least one of these must ALSO be present (disambiguation)
  answer: string;
}

// ---- Topic gate ---------------------------------------------------------

// Words that signal the question is within our scope (diabetes / health / nutrition).
const ON_TOPIC = [
  "diabet", "glucose", "sugar", "insulin", "hba1c", "a1c", "blood pressure", "bp",
  "carb", "carbohydrate", "hypo", "hyper", "hypoglyc", "hyperglyc", "prediabet",
  "metformin", "glp", "sglt", "pancreas", "ketone", "ketoacidosis", "dka",
  "gestational", "type 1", "type 2", "type1", "type2", "neuropathy", "retinopath",
  "kidney", "nephropath", "foot", "cgm", "monitor", "glycemic", "glycaemic",
  "diet", "food", "meal", "eat", "nutrition", "calorie", "weight", "bmi", "obese",
  "exercise", "activity", "walk", "fasting", "medication", "medicine", "dose",
  "symptom", "sign", "diagnos", "thirst", "urinat", "fatigue", "blurred", "vision",
  "health", "healthy", "wellness", "doctor", "sugar level", "blood sugar",
  "rice", "roti", "bread", "fruit", "sweet", "snack", "drink", "water",
  "hydration", "cholesterol", "heart", "complication", "risk", "manage", "control",
];

// Obvious off-topic signals that should short-circuit even if a stray word matches.
const OFF_TOPIC_STRONG = [
  "write a poem", "write me", "code", "javascript", "python", "essay", "story",
  "joke", "song", "lyrics", "movie", "football", "cricket", "stock", "crypto",
  "weather", "capital of", "translate", "homework", "math problem",
];

export function isDiabetesRelated(question: string): boolean {
  const q = question.toLowerCase();
  if (OFF_TOPIC_STRONG.some((p) => q.includes(p))) return false;
  return ON_TOPIC.some((w) => q.includes(w));
}

// ---- FAQ matching -------------------------------------------------------

export const FAQS: Faq[] = [
  {
    id: "what-is-diabetes",
    keywords: ["what is diabetes", "define diabetes", "meaning of diabetes", "explain diabetes"],
    answer:
      "Diabetes is a condition where the body can't properly control the amount of glucose (sugar) in the blood. Normally, a hormone called insulin moves glucose from your blood into your cells for energy. In diabetes, either the body doesn't make enough insulin or can't use it well, so glucose builds up in the blood. Over time, consistently high blood sugar can affect the eyes, kidneys, nerves, and heart — but with monitoring, food awareness, activity, and (for many people) medication, it's very manageable. For a fuller explanation, see our Info Hub guide on the types of diabetes.",
  },
  {
    id: "types",
    keywords: ["type 1 vs", "type 2 vs", "difference between type", "types of diabetes", "type 1 and type 2", "type1 vs type2"],
    answer:
      "The main types are: Type 1 (an autoimmune condition where the body makes little or no insulin — it needs insulin therapy and isn't caused by lifestyle); Type 2 (the most common form, where the body resists or under-produces insulin — managed with lifestyle and medication); Gestational (appears in pregnancy, usually resolves after birth); and Prediabetes (higher-than-normal glucose that hasn't yet become diabetes, and is often reversible). Our Info Hub has a full guide comparing all four.",
  },
  {
    id: "symptoms",
    keywords: ["signs of diabetes", "symptoms of diabetes", "early signs", "warning signs", "how do i know if i have diabetes"],
    answer:
      "Common early signs include increased thirst, frequent urination (especially at night), unexplained fatigue, blurred vision, slow-healing cuts, unexpected weight loss, and tingling in the hands or feet. Prediabetes often has no symptoms at all, which is why screening matters if you have risk factors. If these sound familiar, it's worth seeing a doctor for a simple blood test — but a symptom list isn't a diagnosis.",
  },
  {
    id: "just-diagnosed",
    keywords: ["just diagnosed", "newly diagnosed", "what to do when diagnosed", "diagnosed with diabetes"],
    answer:
      "First, take a breath — millions of people manage diabetes well. Early steps that help: understand which type you have; learn your target glucose range and HbA1c goal; build a care team (doctor, diabetes educator, dietitian); start simple habits like logging food, taking medications on schedule, and moving a little most days; and look after the emotional side, which is a normal part of managing a diagnosis. Our Info Hub has a full 'newly diagnosed' checklist.",
  },
  {
    id: "hba1c",
    keywords: ["what is hba1c", "what is a1c", "hba1c mean", "a1c mean", "understand a1c"],
    answer:
      "HbA1c (or 'A1C') reflects your average blood glucose over roughly the past three months, shown as a percentage. It's useful because it smooths out day-to-day ups and downs. It pairs well with 'time-in-range' (how often you stay within your target band), which captures the daily stability that A1C alone can hide. You can convert between A1C and average glucose with our free A1C converter tool.",
  },
  {
    id: "hypo",
    keywords: ["hypoglycemia", "low blood sugar", "blood sugar too low", "sugar dropped"],
    answer:
      "Hypoglycemia means low blood sugar (usually below 70 mg/dL). Signs include shakiness, sweating, sudden hunger, confusion, and a fast heartbeat. A common approach is the '15-15 rule': take about 15g of fast-acting carbs (juice or glucose tablets), wait 15 minutes, and recheck — repeat if still low. If someone can't swallow or is unconscious, it's an emergency — call emergency services. Always follow the specific plan your own care team gives you.",
  },
  {
    id: "hyper",
    keywords: ["hyperglycemia", "high blood sugar", "blood sugar too high", "sugar is high"],
    answer:
      "Hyperglycemia means high blood sugar. It builds more slowly than a low, with signs like excessive thirst, frequent urination, fatigue, and blurred vision. Response depends on your care plan — staying hydrated, medication timing, and light activity can help. Seek urgent care if you have nausea, vomiting, trouble breathing, or confusion, as these can signal a serious complication.",
  },
  {
    id: "rice",
    keywords: ["can i eat rice", "rice diabetes", "is rice ok", "rice bad for diabetes"],
    answer:
      "You can usually still enjoy rice — it's about portion and balance rather than banning it. Rice is high in carbohydrate (about 45g per cooked cup), so smaller portions, pairing it with protein, vegetables and fiber (like dal and sabzi), and choosing options like basmati or brown rice can all soften its effect on blood sugar. Our Carb Calculator can show you the carbs for a specific portion.",
  },
  {
    id: "diet",
    keywords: ["what should i eat", "diabetic diet", "best foods", "what can i eat", "food for diabetes", "diabetes food"],
    answer:
      "There's no single 'diabetic diet.' The core ideas: carbohydrates raise blood sugar most, so be aware of portions; pair carbs with protein, healthy fat, and fiber to slow the rise; and favor sustainable changes over crash diets. Traditional balanced meals often already work well — it's usually about portion and balance, not giving up the food you love. Our Info Hub has diet-basics guides, and the Carb Calculator helps with specific foods.",
  },
  {
    id: "exercise",
    keywords: ["exercise diabetes", "does exercise", "physical activity", "workout blood sugar"],
    answer:
      "Physical activity helps your body use insulin more effectively and can lower blood sugar, both right away and over time. Even a short walk after meals can help. If you take insulin or certain medications, exercise can sometimes cause lows, so it's worth discussing timing and any precautions with your care team.",
  },
  {
    id: "prevent",
    keywords: ["prevent diabetes", "avoid diabetes", "reduce risk", "lower risk of diabetes"],
    answer:
      "Type 1 can't currently be prevented, but the risk of type 2 can often be reduced — and prediabetes is frequently reversible. The biggest levers are staying physically active, maintaining a healthy weight, eating balanced meals with attention to carbohydrates, and regular check-ups if you have risk factors like family history or being over 40. Our Diabetes Risk Quiz can give you a quick read on your risk factors.",
  },
];

/** Returns a matched FAQ answer, or null if nothing matches confidently. */
export function matchFaq(question: string): string | null {
  const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  for (const faq of FAQS) {
    if (faq.keywords.some((k) => q.includes(k))) {
      return faq.answer;
    }
  }
  return null;
}
