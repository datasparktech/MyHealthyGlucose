import { IMAGES } from "./images";

/**
 * Built-in blog posts that always render, even before any database posts exist.
 * These give the blog real content immediately. Database posts (from the admin
 * editor) are shown alongside these. Seed posts use slugs prefixed to avoid
 * collisions and are read-only (not editable from the dashboard).
 */
export interface SeedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_url: string;
  created_at: string;
  content: string;
}

export const SEED_POSTS: SeedPost[] = [
  {
    slug: "what-is-diabetes-explained",
    title: "What Is Diabetes? A Plain-Language Explanation",
    excerpt:
      "Diabetes gets talked about constantly but explained clearly far less often. Here's what's actually happening in the body — no jargon.",
    category: "Basics",
    cover_url: IMAGES.doctorPatient,
    created_at: "2026-07-20T09:00:00Z",
    content: `Diabetes is one of the most common health conditions in the world, yet it's often poorly explained. At its core, it's about one thing: **how your body handles glucose** — the sugar your cells use for energy.

## The role of insulin

When you eat, carbohydrates break down into glucose, which enters your bloodstream. To get that glucose *out* of the blood and *into* your cells, your body uses a hormone called **insulin**, made by the pancreas. Think of insulin as a key that unlocks your cells so glucose can come in.

In diabetes, that system breaks down in one of two ways:

- The body **doesn't make enough insulin** (or any at all), or
- The body **can't use insulin properly** — called insulin resistance.

Either way, glucose builds up in the blood instead of fuelling your cells. Over time, consistently high blood glucose is what causes the damage associated with diabetes.

## Why it matters

High blood sugar over months and years can affect the eyes, kidneys, nerves, heart, and blood vessels. That sounds frightening, but here's the hopeful part: **diabetes is highly manageable.** With the right combination of monitoring, food awareness, activity, and (for many people) medication, people with diabetes live long, full lives.

## The main types, briefly

- **Type 1** — the body makes little or no insulin; requires insulin therapy. Not caused by lifestyle.
- **Type 2** — the most common form; involves insulin resistance. Managed with lifestyle and medication.
- **Gestational** — appears during pregnancy and usually resolves after birth.
- **Prediabetes** — higher-than-normal glucose that hasn't yet crossed into diabetes; often reversible.

## The bottom line

Diabetes isn't a moral failing or a life sentence — it's a manageable condition rooted in how your body processes sugar. Understanding that is the first step to managing it well.

*This article is general education and isn't a substitute for advice from your doctor.*`,
  },
  {
    slug: "early-signs-of-diabetes",
    title: "The Early Signs of Diabetes You Shouldn't Ignore",
    excerpt:
      "Diabetes often develops quietly. Knowing the early warning signs — and acting on them — can make an enormous difference.",
    category: "Basics",
    cover_url: IMAGES.healthyBowl,
    created_at: "2026-07-21T09:00:00Z",
    content: `One of the reasons type 2 diabetes is so common is that it can develop for years without obvious symptoms. But there *are* early signs — and catching them early gives you the best possible head start.

## The classic warning signs

These are the symptoms doctors most often associate with rising blood sugar:

- **Increased thirst** that doesn't seem to go away
- **Frequent urination**, especially at night
- **Unexplained fatigue** — feeling tired even after resting
- **Blurred vision**
- **Slow-healing cuts or wounds**
- **Unexpected weight loss** (more common in type 1)
- **Tingling or numbness** in the hands or feet
- **Frequent infections**, such as gum or skin infections

## Why these happen

Most of these trace back to the same root: excess glucose in the blood. Your kidneys work overtime to flush it out, which pulls water with it — hence the thirst and frequent urination. Meanwhile, your cells aren't getting the fuel they need, which is why you feel tired.

## The tricky part: "silent" prediabetes

Prediabetes often has **no symptoms at all**. That's exactly why screening matters — especially if you have risk factors like a family history of diabetes, being over 40, higher body weight, or a history of gestational diabetes.

## What to do if you notice these signs

Don't panic, and don't self-diagnose from a symptom list — but **do see a doctor.** A simple blood test (fasting glucose or HbA1c) can give you a clear answer. If it's caught at the prediabetes stage, there's often a real opportunity to turn things around.

*If any of these signs sound familiar, treat it as a reason to book a check-up — not a diagnosis. Your doctor is the right person to confirm what's going on.*`,
  },
  {
    slug: "just-diagnosed-with-diabetes",
    title: "Just Diagnosed With Diabetes? Start Here",
    excerpt:
      "A new diagnosis can feel overwhelming. Here's a calm, practical first-steps guide for the days and weeks ahead.",
    category: "Getting started",
    cover_url: IMAGES.mealPrep,
    created_at: "2026-07-22T09:00:00Z",
    content: `Being diagnosed with diabetes can bring a wave of emotions — fear, confusion, maybe even guilt. First, take a breath. Millions of people manage diabetes well, and you can too. You don't need to figure everything out today.

## 1. Understand which type you have

Type 1 and type 2 are managed differently, so make sure you're clear on your diagnosis and what it means for you. Ask your doctor directly if you're unsure — there are no silly questions here.

## 2. Learn your target numbers

Two numbers matter most early on:

- Your **target blood glucose range** (day to day)
- Your **HbA1c goal** (your 3-month average)

Knowing these turns daily tracking from a chore into something with a clear purpose.

## 3. Build your care team

You don't have to do this alone. Beyond your doctor, ask whether you have access to:

- A **diabetes educator**
- A **dietitian**
- An **endocrinologist** (a hormone specialist)

Many people don't realize these resources are available to them.

## 4. Start simple, sustainable habits

You don't need a perfect routine overnight. Start with:

- **Logging what you eat** — even roughly. Patterns matter more than precision.
- **Taking medications on schedule**, if prescribed.
- **Moving a little most days** — even a short walk after meals helps.

## 5. Look after the emotional side

A chronic diagnosis carries real emotional weight, and "diabetes distress" is common and normal. Talking to others who understand — a support group, a counselor, or people living with diabetes — is part of good care, not separate from it.

## You've got this

Diabetes management is a marathon, not a sprint. Small, consistent steps compound over time. The fact that you're reading this means you've already started.

*This is general guidance. Your own care plan should always come from your healthcare team.*`,
  },
  {
    slug: "food-and-blood-sugar-basics",
    title: "How Food Affects Your Blood Sugar (and What to Do About It)",
    excerpt:
      "Not all foods hit your blood sugar the same way. Understanding the basics gives you real control at every meal.",
    category: "Food",
    cover_url: IMAGES.indianThali,
    created_at: "2026-07-19T09:00:00Z",
    content: `If there's one skill that pays off again and again in diabetes management, it's understanding how food affects your blood sugar. The good news: the core ideas are simpler than they seem.

## Carbohydrates are the main driver

Of the three macronutrients — carbs, protein, and fat — **carbohydrates raise blood glucose the most and the fastest.** That includes rice, bread, roti, potatoes, fruit, sweets, and sugary drinks.

This doesn't mean carbs are the enemy. It means being *aware* of how much you're eating and how they're balanced.

## Not all carbs are equal

Two foods with the same carb count can affect you differently depending on their **glycemic impact** — how quickly they raise blood sugar:

- **Faster:** white rice, white bread, sugary drinks, sweets
- **Slower:** whole grains, legumes, most vegetables, foods high in fiber

Slower-digesting carbs generally cause gentler, steadier rises.

## The power of pairing

Here's a practical trick: **pair carbs with protein, fat, or fiber** to slow the glucose rise. A plain bowl of white rice hits differently than the same rice with dal, vegetables, and yogurt alongside it. This is why balanced traditional meals often work better than they get credit for.

## Portion beats prohibition

Very few foods are truly off-limits. What usually matters more is *how much* and *how often*. A smaller serving of a food you love, balanced with protein and vegetables, is almost always more sustainable than cutting it out entirely.

## Putting it into practice

- Learn the rough carb counts of the foods you eat most (our [Carb Calculator](/tools/carb-calculator) helps).
- Balance every plate with some protein and fiber.
- Notice your own patterns — everyone responds a little differently.

*Carb counting for insulin dosing should always be guided by your care team. This article is general education only.*`,
  },
  {
    slug: "exercise-and-diabetes",
    title: "Exercise and Diabetes: Moving in the Right Direction",
    excerpt:
      "Physical activity is one of the most powerful tools for managing blood sugar. Here's how it works and how to start safely.",
    category: "Tips",
    cover_url: IMAGES.healthyBowl,
    created_at: "2026-07-18T09:00:00Z",
    content: `Exercise is sometimes called a "free medicine" for diabetes — and for good reason. It helps in ways that surprise many people.

## Why movement helps

When you're active, your muscles use glucose for energy, pulling it out of your bloodstream. Activity also makes your body **more sensitive to insulin**, so it works better for hours afterward. Over time, regular activity supports weight management, heart health, mood, and sleep — all of which feed back into better blood sugar.

## How much is enough?

General guidance is around **150 minutes of moderate activity per week** — that's about 30 minutes, five days a week — plus a couple of sessions of strength work. But you don't have to start there. Even a **short walk after meals** can noticeably blunt the post-meal glucose rise.

## Finding what you'll actually do

The best exercise is the one you'll keep doing. Walking, cycling, swimming, dancing, gardening, yoga — it all counts. Consistency matters far more than intensity.

## A note on safety

If you take insulin or certain medications, exercise can sometimes cause low blood sugar, occasionally hours later. A few sensible habits:

- Check your blood sugar before and after until you know your patterns.
- Keep fast-acting carbs handy in case of a low.
- Stay hydrated.
- Talk to your care team before starting a big new routine, especially if you have complications.

## Start small, build up

You don't need a gym membership or a dramatic overhaul. Park farther away, take the stairs, walk after dinner. Small, repeated choices compound into real results.

*Always check with your doctor before starting a new exercise program, particularly if you have heart, eye, foot, or nerve complications.*`,
  },
  {
    slug: "understanding-blood-sugar-numbers",
    title: "Making Sense of Your Blood Sugar Numbers",
    excerpt:
      "mg/dL, mmol/L, A1C, time-in-range — the numbers can feel like alphabet soup. Here's what each one actually means.",
    category: "Tips",
    cover_url: IMAGES.mealPrep,
    created_at: "2026-07-17T09:00:00Z",
    content: `When you're managing diabetes, numbers come at you from every direction. Let's make sense of the ones that matter most.

## Blood glucose (the moment-to-moment number)

This is your blood sugar right now, measured either by a finger-prick meter or a continuous glucose monitor (CGM). It's shown in one of two units depending on where you live:

- **mg/dL** (milligrams per deciliter) — used in the US and some other countries
- **mmol/L** (millimoles per liter) — used in much of the world

General targets for many nonpregnant adults are **80–130 mg/dL before meals** and **under 180 mg/dL** a couple of hours after eating — but your personal targets should come from your care team.

## HbA1c (the long-term average)

Your **A1C** reflects your average blood glucose over roughly the past three months, shown as a percentage. Because it smooths out daily ups and downs, it gives a big-picture view. A common goal for many adults is **below 7%**, though this varies by person.

Curious how an A1C translates to an everyday glucose number? Our [A1C converter](/tools/a1c-converter) does the math.

## Time-in-range (the quality measure)

Two people can have the same A1C but very different daily experiences — one steady, one swinging between highs and lows. **Time-in-range** captures that difference: it's the percentage of time you spend in a target band (usually 70–180 mg/dL). A common goal is **over 70%**.

## Putting them together

Think of it this way: blood glucose is the snapshot, A1C is the long-term average, and time-in-range is the day-to-day quality. Watching all three gives you a fuller, fairer picture than any single number alone.

*These are general reference points, not personal targets. Your care team will set goals that fit your situation.*`,
  },
];

export function getSeedPost(slug: string) {
  return SEED_POSTS.find((p) => p.slug === slug);
}
