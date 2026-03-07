// Common protein sources with USDA nutrition data per 100g (cooked unless noted)
export interface ProteinSource {
  id: string;
  name: string;
  category: "meat" | "dairy" | "plant" | "seafood" | "supplement";
  per100g: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  defaultPricePer: {
    amount: number; // USD
    unit: string; // "lb", "dozen", "scoop", "can", etc.
    gramsPerUnit: number;
  };
}

export const PROTEIN_SOURCES: ProteinSource[] = [
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "meat",
    per100g: { calories: 165, protein: 31.0, fat: 3.6, carbs: 0 },
    defaultPricePer: { amount: 3.99, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "chicken-thigh",
    name: "Chicken Thigh",
    category: "meat",
    per100g: { calories: 209, protein: 26.0, fat: 10.9, carbs: 0 },
    defaultPricePer: { amount: 2.49, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "ground-beef-80-20",
    name: "Ground Beef 80/20",
    category: "meat",
    per100g: { calories: 272, protein: 26.1, fat: 17.8, carbs: 0 },
    defaultPricePer: { amount: 5.49, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "ground-beef-93-7",
    name: "Ground Beef 93/7",
    category: "meat",
    per100g: { calories: 196, protein: 28.4, fat: 8.4, carbs: 0 },
    defaultPricePer: { amount: 7.29, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "ground-turkey-93-7",
    name: "Ground Turkey 93/7",
    category: "meat",
    per100g: { calories: 170, protein: 21.1, fat: 9.4, carbs: 0 },
    defaultPricePer: { amount: 5.49, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "pork-chop",
    name: "Pork Chop",
    category: "meat",
    per100g: { calories: 231, protein: 25.7, fat: 13.5, carbs: 0 },
    defaultPricePer: { amount: 3.99, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "eggs",
    name: "Whole Eggs",
    category: "dairy",
    per100g: { calories: 155, protein: 12.6, fat: 10.6, carbs: 1.1 },
    defaultPricePer: { amount: 3.49, unit: "dozen (600g)", gramsPerUnit: 600 },
  },
  {
    id: "egg-whites",
    name: "Egg Whites",
    category: "dairy",
    per100g: { calories: 52, protein: 10.9, fat: 0.2, carbs: 0.7 },
    defaultPricePer: { amount: 4.99, unit: "32oz carton", gramsPerUnit: 907 },
  },
  {
    id: "greek-yogurt",
    name: "Greek Yogurt (nonfat)",
    category: "dairy",
    per100g: { calories: 59, protein: 10.2, fat: 0.4, carbs: 3.6 },
    defaultPricePer: { amount: 5.99, unit: "32oz tub", gramsPerUnit: 907 },
  },
  {
    id: "cottage-cheese",
    name: "Cottage Cheese (2%)",
    category: "dairy",
    per100g: { calories: 84, protein: 11.8, fat: 2.3, carbs: 4.3 },
    defaultPricePer: { amount: 3.99, unit: "16oz tub", gramsPerUnit: 453.6 },
  },
  {
    id: "milk-whole",
    name: "Whole Milk",
    category: "dairy",
    per100g: { calories: 61, protein: 3.2, fat: 3.3, carbs: 4.8 },
    defaultPricePer: { amount: 4.29, unit: "gallon", gramsPerUnit: 3785 },
  },
  {
    id: "canned-tuna",
    name: "Canned Tuna (in water)",
    category: "seafood",
    per100g: { calories: 116, protein: 25.5, fat: 0.8, carbs: 0 },
    defaultPricePer: { amount: 1.29, unit: "5oz can", gramsPerUnit: 142 },
  },
  {
    id: "canned-salmon",
    name: "Canned Salmon",
    category: "seafood",
    per100g: { calories: 167, protein: 23.6, fat: 7.5, carbs: 0 },
    defaultPricePer: { amount: 3.49, unit: "6oz can", gramsPerUnit: 170 },
  },
  {
    id: "tilapia",
    name: "Tilapia",
    category: "seafood",
    per100g: { calories: 128, protein: 26.2, fat: 2.7, carbs: 0 },
    defaultPricePer: { amount: 4.99, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "shrimp",
    name: "Shrimp",
    category: "seafood",
    per100g: { calories: 99, protein: 24.0, fat: 0.3, carbs: 0.2 },
    defaultPricePer: { amount: 8.99, unit: "lb", gramsPerUnit: 453.6 },
  },
  {
    id: "whey-protein",
    name: "Whey Protein Powder",
    category: "supplement",
    per100g: { calories: 380, protein: 75.0, fat: 5.0, carbs: 12.0 },
    defaultPricePer: { amount: 0.90, unit: "scoop (33g)", gramsPerUnit: 33 },
  },
  {
    id: "tofu-firm",
    name: "Tofu (firm)",
    category: "plant",
    per100g: { calories: 144, protein: 17.3, fat: 8.7, carbs: 2.8 },
    defaultPricePer: { amount: 2.49, unit: "14oz block", gramsPerUnit: 397 },
  },
  {
    id: "black-beans",
    name: "Black Beans (canned)",
    category: "plant",
    per100g: { calories: 132, protein: 8.9, fat: 0.5, carbs: 23.7 },
    defaultPricePer: { amount: 1.09, unit: "15oz can", gramsPerUnit: 425 },
  },
  {
    id: "lentils",
    name: "Lentils (cooked)",
    category: "plant",
    per100g: { calories: 116, protein: 9.0, fat: 0.4, carbs: 20.1 },
    defaultPricePer: { amount: 1.99, unit: "lb dry", gramsPerUnit: 453.6 },
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    category: "plant",
    per100g: { calories: 588, protein: 25.1, fat: 50.4, carbs: 19.6 },
    defaultPricePer: { amount: 3.99, unit: "16oz jar", gramsPerUnit: 453.6 },
  },
];
