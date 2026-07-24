/**
 * Diabetes-friendly recipes with carbs-per-serving.
 * Values are rounded estimates for education — not lab-precise.
 */

export interface Recipe {
  slug: string;
  name: string;
  cuisine: string;
  tags: string[]; // e.g. "Low-carb", "High-protein", "Vegetarian", "Breakfast"
  servings: number;
  carbsPerServing: number; // g
  calPerServing: number; // kcal
  proteinPerServing: number; // g
  minutes: number;
  summary: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
}

export const RECIPES: Recipe[] = [
  {
    slug: "paneer-veggie-bhurji",
    name: "Paneer & Veggie Bhurji",
    cuisine: "Indian",
    tags: ["Low-carb", "High-protein", "Vegetarian", "Breakfast"],
    servings: 2,
    carbsPerServing: 9,
    calPerServing: 260,
    proteinPerServing: 18,
    minutes: 20,
    summary: "A protein-packed scramble of crumbled paneer with peppers and tomato — a low-carb start that keeps morning glucose steady.",
    ingredients: [
      "200g paneer, crumbled",
      "1 small onion, finely chopped",
      "1 tomato, chopped",
      "1/2 bell pepper, diced",
      "1 tsp oil",
      "1/2 tsp cumin, turmeric, chilli to taste",
      "Fresh coriander",
    ],
    steps: [
      "Heat oil, add cumin, then onion; sauté until soft.",
      "Add tomato, pepper and spices; cook 3–4 minutes.",
      "Stir in crumbled paneer; cook 3 minutes until heated through.",
      "Finish with coriander. Serve with a small whole-wheat roti or on its own.",
    ],
    tip: "Swap paneer for tofu to lower saturated fat while keeping protein high.",
  },
  {
    slug: "grilled-chicken-quinoa-bowl",
    name: "Grilled Chicken & Quinoa Bowl",
    cuisine: "Western",
    tags: ["High-protein", "Balanced", "Lunch"],
    servings: 2,
    carbsPerServing: 32,
    calPerServing: 420,
    proteinPerServing: 34,
    minutes: 30,
    summary: "Lean grilled chicken over fiber-rich quinoa and greens — balanced carbs with plenty of protein to soften the glucose curve.",
    ingredients: [
      "250g chicken breast",
      "1/2 cup dry quinoa",
      "2 cups mixed greens",
      "1/2 cucumber, cherry tomatoes",
      "1 tbsp olive oil, lemon, herbs",
    ],
    steps: [
      "Cook quinoa per packet; cool slightly.",
      "Season and grill chicken until cooked through; slice.",
      "Toss greens with olive oil and lemon.",
      "Build bowls: quinoa, greens, chicken; season and serve.",
    ],
    tip: "Cooling the quinoa raises resistant starch, which can blunt the post-meal spike a little.",
  },
  {
    slug: "moong-dal-cheela",
    name: "Moong Dal Cheela",
    cuisine: "Indian",
    tags: ["High-protein", "Vegetarian", "Breakfast"],
    servings: 3,
    carbsPerServing: 20,
    calPerServing: 190,
    proteinPerServing: 12,
    minutes: 25,
    summary: "Savoury lentil pancakes — naturally high in protein and fiber, gentler on glucose than wheat-based breakfasts.",
    ingredients: [
      "1 cup moong dal, soaked 3 hours",
      "1 inch ginger, 1 green chilli",
      "Coriander, cumin, salt",
      "Oil for the pan",
    ],
    steps: [
      "Blend soaked dal with ginger, chilli and a little water to a pourable batter.",
      "Stir in cumin, salt and coriander.",
      "Pour onto a hot non-stick pan; cook both sides until golden.",
      "Serve with mint chutney or plain yogurt.",
    ],
  },
  {
    slug: "tofu-veggie-stir-fry",
    name: "Tofu & Veggie Stir-Fry",
    cuisine: "East Asian",
    tags: ["Low-carb", "Vegetarian", "Dinner"],
    servings: 2,
    carbsPerServing: 14,
    calPerServing: 280,
    proteinPerServing: 16,
    minutes: 20,
    summary: "Crisp tofu and non-starchy vegetables in a light savoury sauce — a low-carb dinner that's fast and filling.",
    ingredients: [
      "200g firm tofu, cubed",
      "3 cups mixed vegetables (broccoli, pepper, beans)",
      "1 tbsp soy sauce, 1 tsp sesame oil",
      "Garlic, ginger, chilli flakes",
    ],
    steps: [
      "Pan-fry tofu until golden; set aside.",
      "Stir-fry aromatics, then vegetables, 4–5 minutes.",
      "Return tofu, add soy and sesame; toss 1 minute.",
      "Serve as-is, or with a small portion of brown rice.",
    ],
    tip: "Keep rice to about 1/2 cup and load the plate with vegetables to keep carbs in check.",
  },
  {
    slug: "greek-yogurt-berry-bowl",
    name: "Greek Yogurt Berry Bowl",
    cuisine: "Western",
    tags: ["High-protein", "Vegetarian", "Breakfast", "Snack"],
    servings: 1,
    carbsPerServing: 18,
    calPerServing: 230,
    proteinPerServing: 20,
    minutes: 5,
    summary: "Thick Greek yogurt with berries and nuts — high protein, moderate carbs, and no cooking.",
    ingredients: [
      "3/4 cup plain Greek yogurt",
      "1/2 cup mixed berries",
      "1 tbsp chopped nuts",
      "1 tsp chia seeds (optional)",
    ],
    steps: [
      "Spoon yogurt into a bowl.",
      "Top with berries, nuts and chia.",
      "Eat right away — no added sugar needed.",
    ],
    tip: "Choose unsweetened yogurt; the fruit adds plenty of natural sweetness.",
  },
  {
    slug: "chana-salad",
    name: "Protein Chana (Chickpea) Salad",
    cuisine: "Indian",
    tags: ["High-fiber", "Vegetarian", "Lunch", "Snack"],
    servings: 2,
    carbsPerServing: 30,
    calPerServing: 260,
    proteinPerServing: 12,
    minutes: 15,
    summary: "A tangy chickpea salad — high fiber slows carb absorption, making it a steady-energy lunch.",
    ingredients: [
      "1.5 cups cooked chickpeas",
      "1 tomato, 1/2 onion, 1/2 cucumber, chopped",
      "Lemon juice, chaat masala, coriander",
    ],
    steps: [
      "Combine chickpeas with chopped vegetables.",
      "Dress with lemon, chaat masala and salt.",
      "Fold in coriander and serve chilled.",
    ],
  },
  {
    slug: "baked-salmon-greens",
    name: "Baked Salmon with Greens",
    cuisine: "Western",
    tags: ["Low-carb", "High-protein", "Dinner"],
    servings: 2,
    carbsPerServing: 8,
    calPerServing: 380,
    proteinPerServing: 32,
    minutes: 25,
    summary: "Omega-3-rich salmon with sautéed greens — very low carb and heart-friendly.",
    ingredients: [
      "2 salmon fillets",
      "4 cups spinach or greens",
      "1 tbsp olive oil, garlic, lemon",
    ],
    steps: [
      "Season salmon; bake at 200°C for 12–15 minutes.",
      "Sauté garlic and greens in olive oil until wilted.",
      "Plate greens, top with salmon and a squeeze of lemon.",
    ],
  },
  {
    slug: "vegetable-omelette",
    name: "Loaded Vegetable Omelette",
    cuisine: "Western",
    tags: ["Low-carb", "High-protein", "Breakfast"],
    servings: 1,
    carbsPerServing: 6,
    calPerServing: 240,
    proteinPerServing: 18,
    minutes: 12,
    summary: "Eggs with plenty of vegetables — a near-zero-carb breakfast that keeps you full.",
    ingredients: [
      "2–3 eggs",
      "1/2 cup chopped peppers, onion, spinach",
      "1 tsp oil, salt, pepper",
    ],
    steps: [
      "Sauté vegetables briefly in oil.",
      "Pour in beaten eggs; cook until set.",
      "Fold and serve with a side salad.",
    ],
  },
  {
    slug: "lentil-vegetable-soup",
    name: "Lentil & Vegetable Soup",
    cuisine: "Middle Eastern",
    tags: ["High-fiber", "Vegetarian", "Dinner"],
    servings: 4,
    carbsPerServing: 24,
    calPerServing: 200,
    proteinPerServing: 11,
    minutes: 35,
    summary: "A hearty, high-fiber soup — lentils deliver slow carbs and steady energy.",
    ingredients: [
      "1 cup red lentils",
      "1 carrot, 1 celery, 1 onion, chopped",
      "4 cups stock, cumin, garlic",
    ],
    steps: [
      "Sauté onion, carrot, celery and garlic.",
      "Add lentils, stock and cumin; simmer 25 minutes.",
      "Blend partly for texture; season and serve.",
    ],
  },
  {
    slug: "cauliflower-fried-rice",
    name: "Cauliflower Fried Rice",
    cuisine: "East Asian",
    tags: ["Low-carb", "Vegetarian", "Dinner"],
    servings: 2,
    carbsPerServing: 12,
    calPerServing: 210,
    proteinPerServing: 9,
    minutes: 20,
    summary: "Riced cauliflower stands in for rice — a fraction of the carbs, same satisfying stir-fry.",
    ingredients: [
      "1 small cauliflower, riced",
      "2 eggs, 1 cup mixed vegetables",
      "1 tbsp soy sauce, sesame oil, spring onion",
    ],
    steps: [
      "Scramble eggs; set aside.",
      "Stir-fry vegetables, then riced cauliflower, 5 minutes.",
      "Return eggs, add soy and sesame; toss and serve.",
    ],
    tip: "Great swap when you crave fried rice but want to keep the spike small.",
  },
];
