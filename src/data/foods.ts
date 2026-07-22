export interface FoodItem {
  name: string;
  /** grams of carbohydrate per serving */
  carbs: number;
  /** human-readable serving description */
  serving: string;
  cuisine: "Indian" | "Western" | "Staple" | "Snack" | "Drink";
}

/**
 * A broad starter database of carb values per common serving.
 * Values are rounded, real-world estimates for education — not lab-precise.
 * Expandable: add entries here and they appear in the calculator automatically.
 */
export const FOODS: FoodItem[] = [
  // Indian
  { name: "Roti / Chapati", carbs: 15, serving: "1 medium (6 in)", cuisine: "Indian" },
  { name: "Plain Naan", carbs: 45, serving: "1 piece", cuisine: "Indian" },
  { name: "Dal (cooked lentils)", carbs: 20, serving: "1 cup", cuisine: "Indian" },
  { name: "Dal Makhani", carbs: 30, serving: "1 cup", cuisine: "Indian" },
  { name: "Chana Masala", carbs: 45, serving: "1 cup", cuisine: "Indian" },
  { name: "Rajma (kidney beans)", carbs: 40, serving: "1 cup", cuisine: "Indian" },
  { name: "Idli", carbs: 12, serving: "1 piece", cuisine: "Indian" },
  { name: "Dosa (plain)", carbs: 30, serving: "1 medium", cuisine: "Indian" },
  { name: "Masala Dosa", carbs: 50, serving: "1 medium", cuisine: "Indian" },
  { name: "Aloo Sabzi", carbs: 25, serving: "1 cup", cuisine: "Indian" },
  { name: "Vegetable Biryani", carbs: 55, serving: "1 cup", cuisine: "Indian" },
  { name: "Poha", carbs: 40, serving: "1 cup", cuisine: "Indian" },
  { name: "Upma", carbs: 38, serving: "1 cup", cuisine: "Indian" },
  { name: "Samosa", carbs: 24, serving: "1 piece", cuisine: "Indian" },
  { name: "Paratha (plain)", carbs: 30, serving: "1 piece", cuisine: "Indian" },
  { name: "Gulab Jamun", carbs: 30, serving: "1 piece", cuisine: "Indian" },

  // Staples / grains
  { name: "White Rice (cooked)", carbs: 45, serving: "1 cup", cuisine: "Staple" },
  { name: "Brown Rice (cooked)", carbs: 45, serving: "1 cup", cuisine: "Staple" },
  { name: "Quinoa (cooked)", carbs: 39, serving: "1 cup", cuisine: "Staple" },
  { name: "Whole Wheat Bread", carbs: 12, serving: "1 slice", cuisine: "Staple" },
  { name: "White Bread", carbs: 14, serving: "1 slice", cuisine: "Staple" },
  { name: "Pasta (cooked)", carbs: 43, serving: "1 cup", cuisine: "Staple" },
  { name: "Oatmeal (cooked)", carbs: 27, serving: "1 cup", cuisine: "Staple" },
  { name: "Potato (boiled)", carbs: 26, serving: "1 medium", cuisine: "Staple" },
  { name: "Sweet Potato (baked)", carbs: 24, serving: "1 medium", cuisine: "Staple" },
  { name: "Corn", carbs: 27, serving: "1 cup", cuisine: "Staple" },

  // Western
  { name: "Cheese Pizza", carbs: 36, serving: "1 slice", cuisine: "Western" },
  { name: "Cheeseburger", carbs: 33, serving: "1 burger", cuisine: "Western" },
  { name: "French Fries", carbs: 48, serving: "medium (117 g)", cuisine: "Western" },
  { name: "Caesar Salad", carbs: 10, serving: "1 bowl", cuisine: "Western" },
  { name: "Grilled Chicken Breast", carbs: 0, serving: "1 breast", cuisine: "Western" },
  { name: "Scrambled Eggs", carbs: 2, serving: "2 eggs", cuisine: "Western" },
  { name: "Pancakes", carbs: 22, serving: "1 pancake", cuisine: "Western" },
  { name: "Bagel", carbs: 48, serving: "1 medium", cuisine: "Western" },
  { name: "Mac & Cheese", carbs: 47, serving: "1 cup", cuisine: "Western" },

  // Fruit / veg
  { name: "Apple", carbs: 25, serving: "1 medium", cuisine: "Staple" },
  { name: "Banana", carbs: 27, serving: "1 medium", cuisine: "Staple" },
  { name: "Orange", carbs: 15, serving: "1 medium", cuisine: "Staple" },
  { name: "Grapes", carbs: 27, serving: "1 cup", cuisine: "Staple" },
  { name: "Mango", carbs: 25, serving: "1 cup", cuisine: "Staple" },
  { name: "Broccoli (cooked)", carbs: 11, serving: "1 cup", cuisine: "Staple" },

  // Snacks & drinks
  { name: "Potato Chips", carbs: 15, serving: "1 oz (28 g)", cuisine: "Snack" },
  { name: "Chocolate Chip Cookie", carbs: 20, serving: "1 large", cuisine: "Snack" },
  { name: "Plain Yogurt", carbs: 12, serving: "1 cup", cuisine: "Snack" },
  { name: "Orange Juice", carbs: 26, serving: "1 cup", cuisine: "Drink" },
  { name: "Cola", carbs: 39, serving: "12 oz can", cuisine: "Drink" },
  { name: "Sweetened Chai", carbs: 20, serving: "1 cup", cuisine: "Drink" },
  { name: "Milk (whole)", carbs: 12, serving: "1 cup", cuisine: "Drink" },
];
