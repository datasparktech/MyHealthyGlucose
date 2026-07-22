/**
 * Comprehensive local FAQ knowledge base for the Ask-AI assistant.
 *
 * Purpose (saves API credits AND improves trust/accuracy):
 *  1. isDiabetesRelated() — off-topic questions never hit the API.
 *  2. matchFaq() — common questions answered instantly from vetted content.
 *
 * Every answer includes a `source` pointing to an authoritative body
 * (ADA, CDC, NHS, WHO, Mayo Clinic). Answers are general education aligned
 * with current (2025–2026) guidance — NOT personalized medical advice.
 */

export interface Faq {
  id: string;
  keywords: string[];
  answer: string;
  source: string;
}

// ---- Topic gate ---------------------------------------------------------

const ON_TOPIC = [
  "diabet", "glucose", "sugar", "insulin", "hba1c", "a1c", "blood pressure", "bp",
  "carb", "carbohydrate", "hypo", "hyper", "hypoglyc", "hyperglyc", "prediabet",
  "metformin", "glp", "sglt", "ozempic", "mounjaro", "pancreas", "ketone",
  "ketoacidosis", "dka", "gestational", "type 1", "type 2", "type1", "type2",
  "neuropath", "retinopath", "kidney", "nephropath", "foot", "cgm", "monitor",
  "glycemic", "glycaemic", "diet", "food", "meal", "eat", "nutrition", "calorie",
  "weight", "bmi", "obese", "exercise", "activity", "walk", "fasting", "medication",
  "medicine", "dose", "symptom", "sign", "diagnos", "thirst", "urinat", "fatigue",
  "blurred", "vision", "health", "healthy", "wellness", "doctor", "sugar level",
  "blood sugar", "rice", "roti", "bread", "fruit", "sweet", "snack", "drink",
  "water", "hydration", "cholesterol", "heart", "complication", "risk", "manage",
  "control", "fibre", "fiber", "protein", "fat", "alcohol", "smoking", "pregnan",
  "stress", "sleep", "wound", "infection", "eye", "nerve", "amputation", "cure",
  "reverse", "remission", "lada", "mody", "c-peptide", "antibod", "glucometer",
  "finger prick", "lancet", "strip", "hemoglobin", "haemoglobin", "semaglutide",
  "tirzepatide", "wegovy",
];

const OFF_TOPIC_STRONG = [
  "write a poem", "write me", "write a", "code", "javascript", "python", "essay",
  "story", "joke", "song", "lyrics", "movie", "film", "football", "cricket",
  "basketball", "stock", "crypto", "bitcoin", "weather", "capital of", "translate",
  "homework", "math problem", "who is the president", "recipe for a cake",
];

export function isDiabetesRelated(question: string): boolean {
  const q = question.toLowerCase();
  if (OFF_TOPIC_STRONG.some((p) => q.includes(p))) return false;
  return ON_TOPIC.some((w) => q.includes(w));
}

// ---- FAQ database -------------------------------------------------------

export const FAQS: Faq[] = [
  // Basics
  {
    id: "what-is-diabetes",
    keywords: ["what is diabetes", "define diabetes", "meaning of diabetes", "explain diabetes", "diabetes definition"],
    answer:
      "Diabetes is a condition where blood glucose (sugar) is too high because the body can't make enough insulin or can't use it effectively. Insulin is the hormone that moves glucose from the blood into cells for energy. Over time, high blood sugar can damage the heart, blood vessels, eyes, kidneys, and nerves — but it's very manageable with monitoring, food awareness, activity, and often medication.",
    source: "World Health Organization (WHO), Diabetes fact sheet",
  },
  {
    id: "types",
    keywords: ["type 1 vs", "type 2 vs", "difference between type", "types of diabetes", "type 1 and type 2", "type1 vs type2", "how many types"],
    answer:
      "The main types are: Type 1 — an autoimmune condition where the body makes little or no insulin, requiring insulin therapy; it isn't caused by lifestyle. Type 2 — the most common form (around 90–95% of cases), where the body resists or underproduces insulin, managed with lifestyle and medication. Gestational diabetes — develops in pregnancy and usually resolves after birth. Prediabetes — higher-than-normal glucose that hasn't yet become diabetes and is often reversible.",
    source: "Centers for Disease Control and Prevention (CDC), Diabetes Basics",
  },
  {
    id: "type1-cause",
    keywords: ["what causes type 1", "cause of type 1", "why type 1", "type 1 caused"],
    answer:
      "Type 1 diabetes is an autoimmune reaction where the immune system attacks the insulin-producing cells in the pancreas. It's not caused by diet or lifestyle. The exact trigger isn't fully understood, but genetics and possibly environmental factors play a role. It most often appears in children and young adults, though it can start at any age.",
    source: "American Diabetes Association (ADA)",
  },
  {
    id: "type2-cause",
    keywords: ["what causes type 2", "cause of type 2", "why type 2", "type 2 caused", "causes diabetes", "what causes diabetes"],
    answer:
      "Type 2 diabetes develops when the body becomes resistant to insulin and/or doesn't produce enough. Key risk factors include family history, being over 45, higher body weight, physical inactivity, and certain ethnic backgrounds (including South Asian, African, and Hispanic populations, who face higher risk at lower body weights). Lifestyle matters, but genetics play a large role too.",
    source: "CDC / American Diabetes Association (ADA)",
  },

  // Symptoms & diagnosis
  {
    id: "symptoms",
    keywords: ["signs of diabetes", "symptoms of diabetes", "early signs", "warning signs", "how do i know if i have diabetes", "diabetes symptoms"],
    answer:
      "Common signs include increased thirst, frequent urination (especially at night), unexplained fatigue, blurred vision, slow-healing cuts, unexpected weight loss, and tingling in the hands or feet. Type 1 symptoms often come on quickly; type 2 can develop slowly with few symptoms. Prediabetes usually has no symptoms at all. If these sound familiar, see a doctor for a simple blood test — a symptom list isn't a diagnosis.",
    source: "NHS (UK) / American Diabetes Association",
  },
  {
    id: "diagnosis-numbers",
    keywords: ["diagnosed", "diagnostic criteria", "what a1c is diabetes", "what level is diabetes", "blood sugar level diabetes", "how is diabetes diagnosed", "what number is diabetes"],
    answer:
      "Diabetes is diagnosed by any of: an A1C of 6.5% or higher; a fasting plasma glucose of 126 mg/dL (7.0 mmol/L) or higher; a 2-hour glucose of 200 mg/dL (11.1 mmol/L) or higher during a glucose tolerance test; or a random glucose of 200 mg/dL or higher with symptoms. Prediabetes is an A1C of 5.7–6.4%, or fasting glucose of 100–125 mg/dL. Diagnosis should always be confirmed by a healthcare professional.",
    source: "American Diabetes Association, Standards of Care in Diabetes—2025",
  },
  {
    id: "newly-diagnosed",
    keywords: ["just diagnosed", "newly diagnosed", "what to do when diagnosed", "diagnosed with diabetes", "just found out"],
    answer:
      "First, take a breath — millions manage diabetes well. Helpful early steps: understand which type you have; learn your target glucose range and A1C goal; build a care team (doctor, diabetes educator, dietitian); start simple habits like logging food, taking medications on schedule, and moving most days; and look after the emotional side, which is a normal part of adjusting. You don't have to do everything at once.",
    source: "American Diabetes Association / CDC",
  },

  // Numbers & monitoring
  {
    id: "hba1c",
    keywords: ["what is hba1c", "what is a1c", "hba1c mean", "a1c mean", "understand a1c", "hemoglobin a1c"],
    answer:
      "HbA1c ('A1C') reflects your average blood glucose over roughly the past 2–3 months, shown as a percentage. It's useful because it smooths out daily ups and downs. For many nonpregnant adults, a common A1C goal is below 7%, though your personal target should be set with your doctor. A1C pairs well with 'time-in-range' from a CGM.",
    source: "American Diabetes Association, Standards of Care—2025",
  },
  {
    id: "target-range",
    keywords: ["target blood sugar", "normal blood sugar", "what should my blood sugar be", "good glucose level", "target range", "ideal blood sugar", "healthy blood sugar", "normal glucose"],
    answer:
      "General ADA targets for many nonpregnant adults are: 80–130 mg/dL (4.4–7.2 mmol/L) before meals, and under 180 mg/dL (10.0 mmol/L) about 1–2 hours after starting a meal. For people using a CGM, a common goal is spending over 70% of time in the 70–180 mg/dL range. These are general targets — your own goals may differ and should be set with your care team.",
    source: "American Diabetes Association, Standards of Care—2025",
  },
  {
    id: "time-in-range",
    keywords: ["time in range", "tir", "what is time in range"],
    answer:
      "Time-in-range (TIR) is the percentage of time your glucose stays within a target band, usually 70–180 mg/dL. It captures day-to-day stability that A1C alone can hide. A common goal for many nonpregnant adults is over 70% time-in-range, which roughly corresponds to an A1C around 7%. It's most easily tracked with a continuous glucose monitor (CGM).",
    source: "American Diabetes Association / International Consensus on Time in Range",
  },
  {
    id: "monitoring",
    keywords: ["how often check blood sugar", "how often test", "monitor blood sugar", "check glucose", "test my sugar", "how often should i check"],
    answer:
      "How often to check depends on your treatment. People on insulin often check multiple times a day (or use a CGM for continuous readings); those managing with lifestyle or some oral medications may check less often. Your doctor will recommend a schedule based on your medications and goals. A CGM can reduce the need for finger-prick checks for many people.",
    source: "American Diabetes Association / NHS",
  },
  {
    id: "cgm",
    keywords: ["what is cgm", "continuous glucose monitor", "cgm mean", "flash glucose"],
    answer:
      "A CGM (continuous glucose monitor) is a small wearable sensor that measures glucose in the fluid under your skin every few minutes and shows real-time readings and trends on a phone or reader. It helps you see how food, activity, and medication affect your glucose, and can reduce finger-prick testing. Many CGMs also alert you to highs and lows.",
    source: "American Diabetes Association",
  },

  // Highs & lows
  {
    id: "hypo",
    keywords: ["hypoglycemia", "low blood sugar", "blood sugar too low", "sugar dropped", "sugar too low", "treat a low"],
    answer:
      "Hypoglycemia is low blood sugar, usually below 70 mg/dL (3.9 mmol/L). Signs include shakiness, sweating, sudden hunger, confusion, and a fast heartbeat. A widely taught approach is the '15-15 rule': take about 15g of fast-acting carbs (juice or glucose tablets), wait 15 minutes, then recheck — repeat if still low. If someone can't swallow or is unconscious, it's an emergency — call emergency services. Always follow your own care plan.",
    source: "American Diabetes Association",
  },
  {
    id: "hyper",
    keywords: ["hyperglycemia", "high blood sugar", "blood sugar too high", "sugar is high", "lower blood sugar quickly", "bring sugar down"],
    answer:
      "Hyperglycemia is high blood sugar, building more slowly than a low. Signs include excessive thirst, frequent urination, fatigue, and blurred vision. Response depends on your care plan — hydration, medication timing, and light activity can help. Seek urgent care for nausea, vomiting, trouble breathing, fruity-smelling breath, or confusion, as these can signal diabetic ketoacidosis (DKA), a medical emergency.",
    source: "American Diabetes Association / NHS",
  },
  {
    id: "dka",
    keywords: ["dka", "ketoacidosis", "ketones", "what are ketones"],
    answer:
      "Ketones are chemicals the body makes when it burns fat for fuel instead of glucose, which can happen when there isn't enough insulin. High ketone levels can lead to diabetic ketoacidosis (DKA) — a serious emergency, more common in type 1. Warning signs include very high blood sugar, nausea, vomiting, abdominal pain, fruity-smelling breath, and rapid breathing. DKA requires immediate medical care.",
    source: "American Diabetes Association / CDC",
  },

  // Food & diet
  {
    id: "diet",
    keywords: ["what should i eat", "diabetic diet", "best foods", "what can i eat", "food for diabetes", "diabetes food", "diet for diabetes"],
    answer:
      "There's no single 'diabetic diet.' Core principles: carbohydrates raise blood sugar most, so be aware of portions; pair carbs with protein, healthy fats, and fiber to slow the rise; favor vegetables, whole grains, legumes, and lean proteins; and choose sustainable changes over crash diets. Traditional balanced meals often already work well — it's usually about portion and balance, not giving up foods you love.",
    source: "American Diabetes Association / Mayo Clinic",
  },
  {
    id: "rice",
    keywords: ["can i eat rice", "rice diabetes", "is rice ok", "rice bad for diabetes", "rice blood sugar"],
    answer:
      "You can usually still enjoy rice — it's about portion and balance, not banning it. Rice is high in carbohydrate (about 45g per cooked cup), so smaller portions, pairing it with protein, vegetables and fiber (like dal and sabzi), and choosing options like basmati or brown rice can soften its effect on blood sugar. Our Carb Calculator can show the carbs for a specific portion.",
    source: "American Diabetes Association (general carbohydrate guidance)",
  },
  {
    id: "sugar-eat",
    keywords: ["can i eat sugar", "eat sweets", "give up sugar", "sugar cause diabetes", "does sugar cause"],
    answer:
      "Eating sugar doesn't directly cause diabetes, and people with diabetes don't have to avoid all sugar — but sugary foods and drinks raise blood glucose quickly and are easy to overdo, so they're usually best limited and paired with other foods. For type 2, the bigger picture (overall diet, weight, and activity) matters more than sugar alone. Sugary drinks are the one item most worth cutting back on.",
    source: "CDC / American Diabetes Association",
  },
  {
    id: "fruit",
    keywords: ["can i eat fruit", "fruit diabetes", "is fruit ok", "fruit blood sugar", "which fruit"],
    answer:
      "Yes — fruit is part of a healthy diet for most people with diabetes. It contains carbohydrate (natural sugar) plus fiber, vitamins, and antioxidants. Whole fruit is better than juice, and lower-sugar options like berries, apples, and citrus are gentle choices. Watch portion sizes and pair fruit with protein or fat if it spikes you. Fruit juice raises blood sugar much faster than whole fruit.",
    source: "American Diabetes Association",
  },
  {
    id: "glycemic-index",
    keywords: ["glycemic index", "glycemic load", "gi of food", "low gi", "what is glycemic"],
    answer:
      "Glycemic index (GI) ranks how quickly a carbohydrate food raises blood sugar. Low-GI foods (legumes, most vegetables, whole grains) cause gentler rises than high-GI foods (white bread, sugary drinks). Glycemic load (GL) adjusts GI for a realistic serving size and is often more practical. Our Glycemic Index tool lets you look up common foods.",
    source: "Mayo Clinic / general nutrition science",
  },
  {
    id: "alcohol",
    keywords: ["can i drink alcohol", "alcohol diabetes", "beer diabetes", "wine diabetes", "drinking alcohol"],
    answer:
      "Many people with diabetes can drink alcohol in moderation, but it carries risks: alcohol can cause low blood sugar (sometimes hours later, especially with insulin or certain medications), and drinks vary in carbohydrate. General advice is to drink with food, in moderation, and monitor your glucose. Because alcohol interacts with several diabetes medications, check with your doctor about what's safe for you.",
    source: "American Diabetes Association / NHS",
  },

  // Lifestyle
  {
    id: "exercise",
    keywords: ["exercise diabetes", "does exercise", "physical activity", "workout blood sugar", "best exercise"],
    answer:
      "Physical activity helps your body use insulin more effectively and can lower blood sugar both immediately and over time. Guidelines suggest around 150 minutes of moderate activity per week, plus some strength training, but even short walks after meals help. If you take insulin or certain medications, exercise can sometimes cause lows, so discuss timing and precautions with your care team.",
    source: "American Diabetes Association / CDC physical activity guidance",
  },
  {
    id: "weight",
    keywords: ["lose weight diabetes", "weight loss diabetes", "does weight matter", "obesity diabetes"],
    answer:
      "For type 2 diabetes, even modest weight loss (around 5–10% of body weight) can meaningfully improve blood sugar, and larger losses can sometimes lead to remission. Weight isn't the whole story — genetics and other factors matter — but combined with activity and balanced eating, it's one of the most effective levers for type 2. A dietitian can help build a realistic plan.",
    source: "American Diabetes Association / CDC",
  },
  {
    id: "stress-sleep",
    keywords: ["stress blood sugar", "does stress", "sleep diabetes", "stress diabetes", "poor sleep"],
    answer:
      "Both stress and poor sleep can raise blood sugar. Stress hormones like cortisol push glucose up, and short or disrupted sleep is linked with insulin resistance and stronger cravings. Managing stress (through activity, relaxation, or support) and aiming for consistent, sufficient sleep are genuine parts of diabetes management, not extras.",
    source: "CDC / American Diabetes Association",
  },
  {
    id: "smoking",
    keywords: ["smoking diabetes", "does smoking", "smoke diabetes"],
    answer:
      "Smoking raises the risk of type 2 diabetes and worsens its complications — it damages blood vessels, increasing the risk of heart disease, kidney disease, nerve damage, and poor circulation. Quitting is one of the most powerful things anyone with diabetes can do for their long-term health. Your doctor can help with support and options to quit.",
    source: "CDC / World Health Organization",
  },

  // Medications
  {
    id: "metformin",
    keywords: ["what is metformin", "metformin", "metformin work", "metformin do"],
    answer:
      "Metformin is the most commonly prescribed first-line medication for type 2 diabetes. It works mainly by reducing the amount of glucose the liver releases and helping the body respond better to insulin. It's generally well tolerated, though some people have digestive side effects at first. It doesn't usually cause low blood sugar on its own. Never start, stop, or change it without your doctor.",
    source: "NHS / American Diabetes Association",
  },
  {
    id: "insulin",
    keywords: ["what is insulin", "insulin work", "why insulin", "insulin do", "insulin types"],
    answer:
      "Insulin is a hormone that lets cells absorb glucose from the blood. People with type 1 diabetes need insulin to live; some people with type 2 also use it. It comes in types that act at different speeds — rapid, short, intermediate, and long-acting — often combined to mimic the body's natural pattern. Insulin doses are highly individual and must be set and adjusted only by your care team.",
    source: "American Diabetes Association / NHS",
  },
  {
    id: "glp1",
    keywords: ["ozempic", "wegovy", "mounjaro", "glp-1", "glp1", "semaglutide", "tirzepatide"],
    answer:
      "GLP-1 receptor agonists (like semaglutide) and dual GIP/GLP-1 medications (like tirzepatide) are injectable medications used for type 2 diabetes, and some for weight management. They help lower blood sugar, slow digestion, and reduce appetite, and several have shown heart and kidney benefits. They're prescription medications with specific uses and side effects — whether one is right for you is a decision for your doctor.",
    source: "American Diabetes Association / FDA prescribing information",
  },

  // Complications
  {
    id: "complications",
    keywords: ["complications", "long term effects", "what can diabetes cause", "diabetes damage", "dangers of diabetes"],
    answer:
      "Over time, poorly controlled diabetes can affect the eyes (retinopathy), kidneys (nephropathy), nerves (neuropathy), and heart and blood vessels, and can slow wound healing. The encouraging news: keeping blood sugar, blood pressure, and cholesterol in target ranges, not smoking, and attending regular screenings substantially lowers these risks. Early detection through routine checks makes a big difference.",
    source: "World Health Organization / American Diabetes Association",
  },
  {
    id: "feet",
    keywords: ["foot care", "diabetic foot", "feet diabetes", "foot problems", "check feet"],
    answer:
      "Diabetes can reduce sensation and circulation in the feet, so small injuries can go unnoticed and heal slowly, occasionally leading to serious problems. Good habits: check your feet daily for cuts, blisters, or color changes; keep them clean and moisturized; wear well-fitting shoes; and never ignore a wound that isn't healing. Report any concerning sores to your doctor promptly.",
    source: "American Diabetes Association / NHS foot care guidance",
  },
  {
    id: "eyes",
    keywords: ["retinopathy", "vision diabetes", "diabetes blindness", "eye exam", "diabetes eye"],
    answer:
      "Diabetes can damage the small blood vessels in the retina (diabetic retinopathy), a leading cause of vision loss that is often preventable or treatable when caught early. That's why regular dilated eye exams are recommended for people with diabetes. Keeping blood sugar and blood pressure in range lowers the risk considerably.",
    source: "American Diabetes Association / CDC",
  },

  // Prevention, cure, special cases
  {
    id: "prevent",
    keywords: ["prevent diabetes", "avoid diabetes", "reduce risk", "lower risk of diabetes", "stop diabetes"],
    answer:
      "Type 1 can't currently be prevented, but type 2 risk can often be reduced — and prediabetes is frequently reversible. The strongest evidence supports regular physical activity, maintaining a healthy weight, eating balanced meals with attention to carbohydrates, and regular check-ups if you have risk factors. Structured programs have been shown to significantly lower the chance of prediabetes progressing to type 2.",
    source: "CDC National Diabetes Prevention Program / ADA",
  },
  {
    id: "cure-reverse",
    keywords: ["cure diabetes", "reverse diabetes", "get rid of diabetes", "remission", "can diabetes be cured", "reverse type 2"],
    answer:
      "There's currently no cure for diabetes. However, some people with type 2 can achieve 'remission' — normal blood sugar without medication — usually through significant weight loss and lifestyle change, especially earlier in the condition. Remission isn't guaranteed and can be lost over time, so ongoing monitoring matters. Type 1 cannot currently be reversed and always requires insulin. Be cautious of anything claiming a 'cure.'",
    source: "American Diabetes Association / Diabetes UK",
  },
  {
    id: "gestational",
    keywords: ["gestational", "diabetes in pregnancy", "pregnant diabetes", "pregnancy diabetes"],
    answer:
      "Gestational diabetes is high blood sugar that develops during pregnancy in people who didn't have diabetes before. It's usually managed with diet, activity, monitoring, and sometimes medication, and typically resolves after birth. It does raise the future risk of type 2 diabetes, so follow-up testing is recommended. Managing it well protects both parent and baby.",
    source: "American Diabetes Association / NHS",
  },
  {
    id: "genetic",
    keywords: ["is diabetes genetic", "hereditary", "runs in family", "inherited", "pass to child"],
    answer:
      "Genetics play a real role in both types. Type 2 has a strong hereditary component — family history is a significant risk factor — though lifestyle also matters. Type 1 involves genetic susceptibility combined with other triggers, but most people who develop it don't have a close relative with it. Having a family history raises risk but doesn't make diabetes certain.",
    source: "American Diabetes Association / CDC",
  },
  {
    id: "children",
    keywords: ["diabetes in children", "child diabetes", "kids diabetes", "my child"],
    answer:
      "Children can develop both type 1 (historically most common in kids) and, increasingly, type 2. Signs in children include increased thirst and urination, fatigue, weight loss, and — for type 1 — sometimes rapid onset. Managing childhood diabetes involves the family, school, and care team together. If you're concerned about a child, see a pediatrician promptly, as type 1 can develop quickly.",
    source: "American Diabetes Association / CDC",
  },
];

/** Returns { answer, source } for a matched FAQ, or null. */
export function matchFaq(question: string): { answer: string; source: string } | null {
  const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  for (const faq of FAQS) {
    if (faq.keywords.some((k) => q.includes(k))) {
      return { answer: faq.answer, source: faq.source };
    }
  }
  return null;
}
