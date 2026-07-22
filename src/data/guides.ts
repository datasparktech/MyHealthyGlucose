export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  category: "Basics" | "Managing" | "Food" | "Emergencies" | "Getting started";
  title: string;
  summary: string;
  readMins: number;
  intro: string;
  sections: GuideSection[];
  keyTakeaways: string[];
  relatedTool?: { label: string; to: string };
}

export const GUIDES: Guide[] = [
  {
    slug: "types-of-diabetes",
    category: "Basics",
    title: "Type 1 vs Type 2 vs Gestational vs Prediabetes",
    summary:
      "The four terms you'll hear most, explained plainly — what's different, what overlaps, and why the distinction matters for treatment.",
    readMins: 6,
    intro:
      "\u201cDiabetes\u201d isn't one condition. It's a family of conditions that all share one feature — blood glucose running higher than it should — but with very different causes and treatments. Knowing which is which changes everything about how it's managed.",
    sections: [
      {
        heading: "Type 1 diabetes",
        paragraphs: [
          "Type 1 is an autoimmune condition: the body's immune system attacks the cells in the pancreas that make insulin, so the body makes little or none. It usually appears in childhood or early adulthood, though it can start at any age.",
          "Because the body can't produce insulin, people with type 1 need to take insulin every day to live. It isn't caused by diet or lifestyle, and it can't be prevented or reversed.",
        ],
      },
      {
        heading: "Type 2 diabetes",
        paragraphs: [
          "Type 2 is the most common form — roughly 9 in 10 cases. Here the body still makes insulin, but either doesn't make enough or can't use it effectively (called insulin resistance).",
          "It develops gradually and is strongly linked with genetics, age, weight, and activity level. Depending on the person, it's managed with lifestyle changes, oral medications, non-insulin injectables, and sometimes insulin. Early on, type 2 can sometimes be put into remission through significant lifestyle change — though this varies a lot person to person.",
        ],
      },
      {
        heading: "Gestational diabetes",
        paragraphs: [
          "Gestational diabetes appears during pregnancy in people who didn't have diabetes before. Pregnancy hormones can cause insulin resistance, and if the body can't keep up, blood glucose rises.",
          "It usually resolves after birth, but it's a signal: people who've had gestational diabetes have a higher lifetime risk of developing type 2 later, so ongoing monitoring matters.",
        ],
      },
      {
        heading: "Prediabetes",
        paragraphs: [
          "Prediabetes means blood glucose is higher than normal but not yet in the diabetes range. It's a warning stage, not a diagnosis of diabetes itself.",
          "It's also the most actionable stage. Many people with prediabetes can bring their numbers back to normal through changes to diet, activity, and weight — which is exactly why catching it early is so valuable.",
        ],
      },
    ],
    keyTakeaways: [
      "Type 1 is autoimmune and requires insulin; it isn't caused by lifestyle.",
      "Type 2 is the most common form and involves insulin resistance.",
      "Gestational diabetes appears in pregnancy and raises future type 2 risk.",
      "Prediabetes is a reversible warning stage — the best time to act.",
    ],
    relatedTool: { label: "Check your risk factors", to: "/tools/risk-quiz" },
  },
  {
    slug: "understanding-hba1c",
    category: "Managing",
    title: "Understanding HbA1c & Time-in-Range",
    summary:
      "Two of the most important numbers in diabetes care — what they measure, how they differ, and why you need both.",
    readMins: 5,
    intro:
      "If you track diabetes, two numbers come up constantly: HbA1c and time-in-range. They answer different questions, and together they tell a fuller story than either alone.",
    sections: [
      {
        heading: "What HbA1c measures",
        paragraphs: [
          "HbA1c (often just \u201cA1C\u201d) reflects your average blood glucose over roughly the previous three months. Glucose sticks to hemoglobin in your red blood cells, and since those cells live about three months, the percentage of \u201csugar-coated\u201d hemoglobin gives a long-run average.",
          "It's reported as a percentage. It's useful precisely because it smooths out day-to-day noise — but that smoothing is also its blind spot.",
        ],
      },
      {
        heading: "Why time-in-range fills the gap",
        paragraphs: [
          "Two people can have the same A1C while living very differently. One might sit steadily near their target; the other might swing between very high and very low, averaging out to the same number. Those are not the same health picture.",
          "Time-in-range measures the percentage of time your glucose stays within a target band (commonly 70\u2013180 mg/dL). It captures the stability that A1C hides.",
        ],
      },
      {
        heading: "Using them together",
        paragraphs: [
          "Think of A1C as the long-term average and time-in-range as the day-to-day quality. A good management plan watches both: a solid A1C with high time-in-range is a much stronger position than a good A1C built on wild swings.",
        ],
      },
    ],
    keyTakeaways: [
      "HbA1c is your ~3-month average glucose, shown as a percentage.",
      "The same A1C can hide very different daily patterns.",
      "Time-in-range measures stability — how often you stay in your target band.",
      "Watching both gives a truer picture than either alone.",
    ],
    relatedTool: { label: "Convert A1C to average glucose", to: "/tools/a1c-converter" },
  },
  {
    slug: "hypo-vs-hyper",
    category: "Emergencies",
    title: "Hypoglycemia vs Hyperglycemia: Symptoms & Response",
    summary:
      "Blood sugar that's too low or too high both need action — but very different action. Here's how to tell them apart and what to do.",
    readMins: 5,
    intro:
      "Two of the most important words in diabetes care sound almost identical but mean opposite things. Confusing them can be dangerous, so it's worth knowing both cold. This is general education — always follow the specific plan your own care team gives you.",
    sections: [
      {
        heading: "Hypoglycemia — blood sugar too low",
        paragraphs: [
          "Hypoglycemia (low blood sugar, typically below 70 mg/dL) can come on quickly. Common signs include shakiness, sweating, sudden hunger, confusion, irritability, a fast heartbeat, and dizziness.",
          "It needs fast-acting sugar. A widely taught approach is the \u201c15-15 rule\u201d: take about 15 grams of fast carbohydrate (such as juice or glucose tablets), wait 15 minutes, and recheck — repeating if still low. Severe hypoglycemia, where someone can't safely swallow or loses consciousness, is an emergency.",
        ],
      },
      {
        heading: "Hyperglycemia — blood sugar too high",
        paragraphs: [
          "Hyperglycemia (high blood sugar) tends to build more slowly. Signs include excessive thirst, frequent urination, fatigue, blurred vision, and headaches.",
          "Response depends on your care plan — it may involve hydration, activity, medication timing, or checking for ketones. Very high glucose with symptoms like nausea, vomiting, or trouble breathing can signal a serious complication and needs urgent medical attention.",
        ],
      },
      {
        heading: "The quick mental model",
        paragraphs: [
          "Low is fast and sudden — treat it fast with sugar. High is slower and steadier — follow your plan and watch for warning signs. When in doubt, or if someone is severely affected, seek medical help rather than guessing.",
        ],
      },
    ],
    keyTakeaways: [
      "Hypo = too low, comes on fast, treat with fast-acting sugar (the 15-15 rule).",
      "Hyper = too high, builds slowly, follow your care plan.",
      "Severe lows (can't swallow, unconscious) are emergencies.",
      "Very high glucose with nausea or breathing trouble needs urgent care.",
    ],
  },
  {
    slug: "diabetic-diet-basics",
    category: "Food",
    title: "Diabetic Diet Basics — Around the World",
    summary:
      "There's no single 'diabetic diet.' The real skill is understanding carbs, balance, and portion — in whatever cuisine you actually eat.",
    readMins: 6,
    intro:
      "Most diabetes diet advice quietly assumes a Western plate. But dal, rice, tortillas, and pho are just as manageable once you understand a few principles that travel across every cuisine.",
    sections: [
      {
        heading: "Carbohydrates matter most",
        paragraphs: [
          "Carbohydrates have the biggest, fastest effect on blood glucose. That doesn't mean avoiding them — it means being aware of how much you're eating and pairing them well. Rice, bread, roti, potatoes, fruit, and sweets all count.",
          "Learning rough carb amounts for the foods you eat regularly is more useful than memorizing a generic food list built around someone else's pantry.",
        ],
      },
      {
        heading: "Balance the plate",
        paragraphs: [
          "Pairing carbohydrates with protein, healthy fats, and fiber slows how quickly glucose rises. A bowl of plain white rice hits differently than the same rice alongside dal, vegetables, and yogurt.",
          "This is why cultural meals often already contain good structure — the trick is portion and balance, not abandoning the food you grew up with.",
        ],
      },
      {
        heading: "Portion over prohibition",
        paragraphs: [
          "Very few foods are strictly off-limits. What usually matters more is how much and how often. A smaller serving of a beloved dish, balanced with protein and vegetables, beats a joyless diet you can't sustain.",
          "Sustainable beats perfect. A plan you'll actually follow for years does more than an ideal one you quit in a month.",
        ],
      },
    ],
    keyTakeaways: [
      "Carbs affect glucose most — awareness matters more than avoidance.",
      "Pairing carbs with protein, fat, and fiber slows glucose spikes.",
      "Cultural meals often already have good structure; adjust portion and balance.",
      "A sustainable plan beats a perfect one you can't keep.",
    ],
    relatedTool: { label: "Estimate carbs in your meal", to: "/tools/carb-calculator" },
  },
  {
    slug: "newly-diagnosed-checklist",
    category: "Getting started",
    title: "Newly Diagnosed: A Starter Checklist",
    summary:
      "A diagnosis is a lot to absorb. Here's a calm, practical list of what actually helps in the first weeks.",
    readMins: 4,
    intro:
      "The days after a diabetes diagnosis can feel overwhelming. You don't have to do everything at once. This is a gentle starting order — not a race.",
    sections: [
      {
        heading: "Build your care team",
        paragraphs: [
          "Your primary doctor is the anchor, but diabetes care often involves others: a diabetes educator, a dietitian, and sometimes an endocrinologist. Ask what's available to you — many people don't realize these resources exist.",
        ],
      },
      {
        heading: "Learn your numbers",
        paragraphs: [
          "Understand what you're aiming for: your target glucose range, your A1C goal, and how and when to check. You don't need to master everything immediately, but knowing your targets gives the daily work a purpose.",
        ],
      },
      {
        heading: "Start simple habits",
        paragraphs: [
          "Small, consistent habits compound: logging what you eat, taking medications on schedule, moving a little most days. Tracking tools help here — the point isn't perfection, it's noticing patterns over time.",
        ],
      },
      {
        heading: "Mind the emotional side",
        paragraphs: [
          "A chronic diagnosis carries a real emotional weight, and \u201cdiabetes distress\u201d is common and normal. Talking to people who understand — a support group, a counselor, or others living with it — is part of managing the condition, not separate from it.",
        ],
      },
    ],
    keyTakeaways: [
      "You don't have to do everything at once.",
      "Build a care team — you may have more support available than you think.",
      "Learn your target ranges so daily tracking has a purpose.",
      "The emotional side is real; support is part of good care.",
    ],
    relatedTool: { label: "Explore the free tools", to: "/tools" },
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
