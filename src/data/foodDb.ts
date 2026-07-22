/**
 * Expanded food database with carbohydrate, glycemic index, protein and fat.
 * Covers many regional cuisines under-served by Western trackers.
 *
 * All values are rounded, real-world estimates for EDUCATION — not lab-precise,
 * and individual glycemic response varies. GI is on the standard 0–100 scale
 * (glucose = 100); items with negligible carbs use gi: 0.
 */

export type Cuisine =
  | "Indian"
  | "East Asian"
  | "Southeast Asian"
  | "Middle Eastern"
  | "Mexican"
  | "African"
  | "Western"
  | "Staple"
  | "Protein"
  | "Fat"
  | "Vegetable"
  | "Fruit"
  | "Snack"
  | "Drink";

export interface Food {
  name: string;
  carbs: number; // g per serving
  gi: number; // glycemic index (0–100); 0 = negligible carb
  protein: number; // g per serving
  fat: number; // g per serving
  serving: string;
  cuisine: Cuisine;
}

export const FOOD_DB: Food[] = [
  // ---------------- Indian / South Asian ----------------
  { name: "Roti / Chapati", carbs: 15, gi: 62, protein: 3, fat: 0.4, serving: "1 medium", cuisine: "Indian" },
  { name: "Plain Naan", carbs: 45, gi: 71, protein: 9, fat: 5, serving: "1 piece", cuisine: "Indian" },
  { name: "Paratha (plain)", carbs: 30, gi: 62, protein: 5, fat: 10, serving: "1 piece", cuisine: "Indian" },
  { name: "Puri", carbs: 18, gi: 70, protein: 3, fat: 8, serving: "1 piece", cuisine: "Indian" },
  { name: "Dal (cooked lentils)", carbs: 20, gi: 32, protein: 9, fat: 1, serving: "1 cup", cuisine: "Indian" },
  { name: "Dal Makhani", carbs: 30, gi: 34, protein: 11, fat: 12, serving: "1 cup", cuisine: "Indian" },
  { name: "Chana Masala", carbs: 45, gi: 28, protein: 12, fat: 8, serving: "1 cup", cuisine: "Indian" },
  { name: "Rajma (kidney beans)", carbs: 40, gi: 24, protein: 13, fat: 6, serving: "1 cup", cuisine: "Indian" },
  { name: "Paneer (cubes)", carbs: 4, gi: 27, protein: 14, fat: 20, serving: "100 g", cuisine: "Indian" },
  { name: "Palak Paneer", carbs: 12, gi: 30, protein: 11, fat: 18, serving: "1 cup", cuisine: "Indian" },
  { name: "Idli", carbs: 12, gi: 60, protein: 2, fat: 0.3, serving: "1 piece", cuisine: "Indian" },
  { name: "Dosa (plain)", carbs: 30, gi: 62, protein: 4, fat: 4, serving: "1 medium", cuisine: "Indian" },
  { name: "Masala Dosa", carbs: 50, gi: 62, protein: 6, fat: 12, serving: "1 medium", cuisine: "Indian" },
  { name: "Poha", carbs: 40, gi: 68, protein: 5, fat: 6, serving: "1 cup", cuisine: "Indian" },
  { name: "Upma", carbs: 38, gi: 66, protein: 6, fat: 8, serving: "1 cup", cuisine: "Indian" },
  { name: "Samosa", carbs: 24, gi: 55, protein: 4, fat: 12, serving: "1 piece", cuisine: "Indian" },
  { name: "Vegetable Biryani", carbs: 55, gi: 58, protein: 8, fat: 12, serving: "1 cup", cuisine: "Indian" },
  { name: "Chicken Curry", carbs: 8, gi: 30, protein: 22, fat: 14, serving: "1 cup", cuisine: "Indian" },
  { name: "Aloo Sabzi", carbs: 25, gi: 70, protein: 3, fat: 7, serving: "1 cup", cuisine: "Indian" },
  { name: "Plain Yogurt (dahi)", carbs: 12, gi: 35, protein: 9, fat: 4, serving: "1 cup", cuisine: "Indian" },
  { name: "Gulab Jamun", carbs: 30, gi: 75, protein: 3, fat: 8, serving: "1 piece", cuisine: "Indian" },

  // ---------------- East Asian ----------------
  { name: "White Rice (cooked)", carbs: 45, gi: 73, protein: 4, fat: 0.4, serving: "1 cup", cuisine: "East Asian" },
  { name: "Jasmine Rice", carbs: 45, gi: 68, protein: 4, fat: 0.4, serving: "1 cup", cuisine: "East Asian" },
  { name: "Fried Rice", carbs: 50, gi: 72, protein: 8, fat: 12, serving: "1 cup", cuisine: "East Asian" },
  { name: "Sushi Roll (6 pcs)", carbs: 30, gi: 68, protein: 8, fat: 4, serving: "6 pieces", cuisine: "East Asian" },
  { name: "Ramen (with broth)", carbs: 55, gi: 60, protein: 16, fat: 14, serving: "1 bowl", cuisine: "East Asian" },
  { name: "Udon Noodles", carbs: 48, gi: 62, protein: 8, fat: 1, serving: "1 cup", cuisine: "East Asian" },
  { name: "Congee (rice porridge)", carbs: 30, gi: 78, protein: 4, fat: 1, serving: "1 cup", cuisine: "East Asian" },
  { name: "Tofu (firm)", carbs: 3, gi: 15, protein: 15, fat: 8, serving: "100 g", cuisine: "East Asian" },
  { name: "Dumplings (steamed)", carbs: 25, gi: 60, protein: 8, fat: 6, serving: "4 pieces", cuisine: "East Asian" },
  { name: "Bao Bun", carbs: 28, gi: 68, protein: 6, fat: 5, serving: "1 bun", cuisine: "East Asian" },

  // ---------------- Southeast Asian ----------------
  { name: "Pho (beef noodle soup)", carbs: 45, gi: 60, protein: 20, fat: 6, serving: "1 bowl", cuisine: "Southeast Asian" },
  { name: "Pad Thai", carbs: 55, gi: 65, protein: 14, fat: 16, serving: "1 plate", cuisine: "Southeast Asian" },
  { name: "Nasi Goreng", carbs: 52, gi: 70, protein: 10, fat: 14, serving: "1 plate", cuisine: "Southeast Asian" },
  { name: "Rice Noodles", carbs: 44, gi: 61, protein: 3, fat: 0.4, serving: "1 cup", cuisine: "Southeast Asian" },
  { name: "Green Curry (with veg)", carbs: 14, gi: 45, protein: 8, fat: 18, serving: "1 cup", cuisine: "Southeast Asian" },
  { name: "Spring Rolls (fresh)", carbs: 20, gi: 50, protein: 5, fat: 3, serving: "2 rolls", cuisine: "Southeast Asian" },

  // ---------------- Middle Eastern ----------------
  { name: "Pita Bread", carbs: 33, gi: 68, protein: 6, fat: 1, serving: "1 large", cuisine: "Middle Eastern" },
  { name: "Hummus", carbs: 14, gi: 25, protein: 6, fat: 10, serving: "1/2 cup", cuisine: "Middle Eastern" },
  { name: "Falafel", carbs: 16, gi: 40, protein: 7, fat: 9, serving: "3 pieces", cuisine: "Middle Eastern" },
  { name: "Tabbouleh", carbs: 16, gi: 35, protein: 3, fat: 7, serving: "1 cup", cuisine: "Middle Eastern" },
  { name: "Chicken Shawarma", carbs: 30, gi: 55, protein: 26, fat: 16, serving: "1 wrap", cuisine: "Middle Eastern" },
  { name: "Lentil Soup", carbs: 30, gi: 30, protein: 12, fat: 4, serving: "1 bowl", cuisine: "Middle Eastern" },

  // ---------------- Mexican / Latin ----------------
  { name: "Corn Tortilla", carbs: 12, gi: 52, protein: 2, fat: 1, serving: "1 tortilla", cuisine: "Mexican" },
  { name: "Flour Tortilla", carbs: 24, gi: 66, protein: 4, fat: 4, serving: "1 medium", cuisine: "Mexican" },
  { name: "Black Beans", carbs: 40, gi: 30, protein: 15, fat: 1, serving: "1 cup", cuisine: "Mexican" },
  { name: "Chicken Burrito", carbs: 60, gi: 60, protein: 26, fat: 18, serving: "1 burrito", cuisine: "Mexican" },
  { name: "Guacamole", carbs: 9, gi: 15, protein: 2, fat: 15, serving: "1/2 cup", cuisine: "Mexican" },
  { name: "Beef Taco", carbs: 20, gi: 55, protein: 12, fat: 12, serving: "1 taco", cuisine: "Mexican" },

  // ---------------- African ----------------
  { name: "Jollof Rice", carbs: 52, gi: 70, protein: 6, fat: 10, serving: "1 cup", cuisine: "African" },
  { name: "Ugali (maize)", carbs: 40, gi: 70, protein: 4, fat: 1, serving: "1 cup", cuisine: "African" },
  { name: "Injera", carbs: 30, gi: 55, protein: 6, fat: 1, serving: "1 piece", cuisine: "African" },
  { name: "Fufu", carbs: 45, gi: 68, protein: 2, fat: 0.5, serving: "1 cup", cuisine: "African" },
  { name: "Plantain (fried)", carbs: 38, gi: 55, protein: 2, fat: 6, serving: "1 cup", cuisine: "African" },

  // ---------------- Western staples ----------------
  { name: "Brown Rice (cooked)", carbs: 45, gi: 68, protein: 5, fat: 1.8, serving: "1 cup", cuisine: "Staple" },
  { name: "Quinoa (cooked)", carbs: 39, gi: 53, protein: 8, fat: 3.6, serving: "1 cup", cuisine: "Staple" },
  { name: "Whole Wheat Bread", carbs: 12, gi: 74, protein: 4, fat: 1, serving: "1 slice", cuisine: "Staple" },
  { name: "White Bread", carbs: 14, gi: 75, protein: 2, fat: 1, serving: "1 slice", cuisine: "Staple" },
  { name: "Pasta (cooked)", carbs: 43, gi: 49, protein: 8, fat: 1, serving: "1 cup", cuisine: "Staple" },
  { name: "Oatmeal (cooked)", carbs: 27, gi: 55, protein: 6, fat: 3, serving: "1 cup", cuisine: "Staple" },
  { name: "Potato (boiled)", carbs: 26, gi: 78, protein: 3, fat: 0.2, serving: "1 medium", cuisine: "Staple" },
  { name: "Sweet Potato (baked)", carbs: 24, gi: 63, protein: 2, fat: 0.1, serving: "1 medium", cuisine: "Staple" },

  // ---------------- Proteins ----------------
  { name: "Grilled Chicken Breast", carbs: 0, gi: 0, protein: 31, fat: 4, serving: "100 g", cuisine: "Protein" },
  { name: "Salmon", carbs: 0, gi: 0, protein: 25, fat: 13, serving: "100 g", cuisine: "Protein" },
  { name: "Eggs", carbs: 1, gi: 0, protein: 13, fat: 11, serving: "2 large", cuisine: "Protein" },
  { name: "Beef (lean)", carbs: 0, gi: 0, protein: 26, fat: 15, serving: "100 g", cuisine: "Protein" },
  { name: "Shrimp", carbs: 1, gi: 0, protein: 24, fat: 1, serving: "100 g", cuisine: "Protein" },
  { name: "Lentils (cooked)", carbs: 20, gi: 32, protein: 9, fat: 0.4, serving: "1 cup", cuisine: "Protein" },

  // ---------------- Fats ----------------
  { name: "Olive Oil", carbs: 0, gi: 0, protein: 0, fat: 14, serving: "1 tbsp", cuisine: "Fat" },
  { name: "Butter", carbs: 0, gi: 0, protein: 0, fat: 11, serving: "1 tbsp", cuisine: "Fat" },
  { name: "Avocado", carbs: 9, gi: 15, protein: 2, fat: 15, serving: "1/2 fruit", cuisine: "Fat" },
  { name: "Almonds", carbs: 6, gi: 15, protein: 6, fat: 14, serving: "1 oz", cuisine: "Fat" },
  { name: "Peanut Butter", carbs: 6, gi: 14, protein: 8, fat: 16, serving: "2 tbsp", cuisine: "Fat" },

  // ---------------- Vegetables ----------------
  { name: "Broccoli (cooked)", carbs: 11, gi: 15, protein: 4, fat: 0.3, serving: "1 cup", cuisine: "Vegetable" },
  { name: "Cauliflower Rice", carbs: 5, gi: 15, protein: 2, fat: 0.3, serving: "1 cup", cuisine: "Vegetable" },
  { name: "Spinach (cooked)", carbs: 7, gi: 15, protein: 5, fat: 0.5, serving: "1 cup", cuisine: "Vegetable" },
  { name: "Mixed Salad", carbs: 5, gi: 15, protein: 2, fat: 0.2, serving: "1 bowl", cuisine: "Vegetable" },
  { name: "Zucchini Noodles", carbs: 6, gi: 15, protein: 2, fat: 0.4, serving: "1 cup", cuisine: "Vegetable" },
  { name: "Cabbage (cooked)", carbs: 8, gi: 15, protein: 2, fat: 0.1, serving: "1 cup", cuisine: "Vegetable" },

  // ---------------- Fruit ----------------
  { name: "Apple", carbs: 25, gi: 36, protein: 0.5, fat: 0.3, serving: "1 medium", cuisine: "Fruit" },
  { name: "Banana", carbs: 27, gi: 51, protein: 1.3, fat: 0.4, serving: "1 medium", cuisine: "Fruit" },
  { name: "Berries (mixed)", carbs: 17, gi: 40, protein: 1, fat: 0.5, serving: "1 cup", cuisine: "Fruit" },
  { name: "Mango", carbs: 25, gi: 51, protein: 1.4, fat: 0.6, serving: "1 cup", cuisine: "Fruit" },
  { name: "Orange", carbs: 15, gi: 43, protein: 1, fat: 0.2, serving: "1 medium", cuisine: "Fruit" },
  { name: "Watermelon", carbs: 11, gi: 76, protein: 0.9, fat: 0.2, serving: "1 cup", cuisine: "Fruit" },

  // ---------------- Snacks & drinks ----------------
  { name: "Potato Chips", carbs: 15, gi: 56, protein: 2, fat: 10, serving: "1 oz", cuisine: "Snack" },
  { name: "Dark Chocolate", carbs: 13, gi: 40, protein: 2, fat: 12, serving: "1 oz", cuisine: "Snack" },
  { name: "Orange Juice", carbs: 26, gi: 50, protein: 2, fat: 0.5, serving: "1 cup", cuisine: "Drink" },
  { name: "Cola", carbs: 39, gi: 63, protein: 0, fat: 0, serving: "12 oz", cuisine: "Drink" },
  { name: "Whole Milk", carbs: 12, gi: 39, protein: 8, fat: 8, serving: "1 cup", cuisine: "Drink" },
  { name: "Sweetened Chai", carbs: 20, gi: 55, protein: 3, fat: 3, serving: "1 cup", cuisine: "Drink" },
];

/** Glycemic load for a food = GI × carbs / 100. */
export function glycemicLoad(f: Food): number {
  return Math.round((f.gi * f.carbs) / 100);
}

/** Smart-swap suggestions: maps a higher-GI food to a lower-GI alternative. */
export interface Swap {
  from: string; // food name to match
  to: string; // suggested alternative (name in FOOD_DB)
  note: string;
}

export const SWAPS: Swap[] = [
  { from: "White Rice (cooked)", to: "Cauliflower Rice", note: "Swap white rice for cauliflower rice to cut carbs dramatically and flatten the glucose peak." },
  { from: "White Rice (cooked)", to: "Brown Rice (cooked)", note: "Brown rice has a lower GI and more fiber than white rice." },
  { from: "Jasmine Rice", to: "Quinoa (cooked)", note: "Quinoa has a much lower GI and adds protein." },
  { from: "Fried Rice", to: "Cauliflower Rice", note: "Cauliflower rice slashes carbs and the glucose spike." },
  { from: "White Bread", to: "Whole Wheat Bread", note: "A modest fiber upgrade — pairing with protein helps more." },
  { from: "Pasta (cooked)", to: "Zucchini Noodles", note: "Zucchini noodles cut carbs by roughly 85%." },
  { from: "Potato (boiled)", to: "Sweet Potato (baked)", note: "Sweet potato has a lower GI than white potato." },
  { from: "Plain Naan", to: "Roti / Chapati", note: "A whole-wheat roti has fewer carbs and a lower GI than naan." },
  { from: "Flour Tortilla", to: "Corn Tortilla", note: "Corn tortillas are smaller, lower-carb and lower-GI." },
  { from: "Cola", to: "Orange Juice", note: "Still sugary — best is water or a diet drink, but juice at least adds some nutrients." },
  { from: "Udon Noodles", to: "Rice Noodles", note: "Similar carbs; pairing with protein and vegetables slows the rise most." },
  { from: "Congee (rice porridge)", to: "Oatmeal (cooked)", note: "Oatmeal has a lower GI and more fiber than rice congee." },
];

export function findSwaps(foodName: string): Swap[] {
  return SWAPS.filter((s) => s.from === foodName);
}
