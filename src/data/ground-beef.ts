// USDA FoodData Central data for ground beef per 100g (cooked, pan-browned)
export interface BeefGrade {
  label: string;
  leanPct: number;
  fatPct: number;
  per100g: {
    calories: number;
    protein: number;
    fat: number;
    saturatedFat: number;
    cholesterol: number;
    iron: number;
    zinc: number;
    b12: number;
  };
}

export const BEEF_GRADES: BeefGrade[] = [
  {
    label: "70/30",
    leanPct: 70,
    fatPct: 30,
    per100g: {
      calories: 332,
      protein: 24.5,
      fat: 25.5,
      saturatedFat: 10.1,
      cholesterol: 94,
      iron: 2.7,
      zinc: 6.4,
      b12: 2.7,
    },
  },
  {
    label: "73/27",
    leanPct: 73,
    fatPct: 27,
    per100g: {
      calories: 312,
      protein: 25.1,
      fat: 22.9,
      saturatedFat: 9.1,
      cholesterol: 92,
      iron: 2.8,
      zinc: 6.5,
      b12: 2.8,
    },
  },
  {
    label: "80/20",
    leanPct: 80,
    fatPct: 20,
    per100g: {
      calories: 272,
      protein: 26.1,
      fat: 17.8,
      saturatedFat: 7.0,
      cholesterol: 89,
      iron: 2.9,
      zinc: 6.7,
      b12: 2.9,
    },
  },
  {
    label: "85/15",
    leanPct: 85,
    fatPct: 15,
    per100g: {
      calories: 243,
      protein: 27.0,
      fat: 14.4,
      saturatedFat: 5.7,
      cholesterol: 86,
      iron: 3.0,
      zinc: 6.9,
      b12: 3.0,
    },
  },
  {
    label: "90/10",
    leanPct: 90,
    fatPct: 10,
    per100g: {
      calories: 217,
      protein: 27.6,
      fat: 11.1,
      saturatedFat: 4.4,
      cholesterol: 84,
      iron: 3.1,
      zinc: 7.1,
      b12: 3.1,
    },
  },
  {
    label: "93/7",
    leanPct: 93,
    fatPct: 7,
    per100g: {
      calories: 196,
      protein: 28.4,
      fat: 8.4,
      saturatedFat: 3.3,
      cholesterol: 82,
      iron: 3.2,
      zinc: 7.3,
      b12: 3.2,
    },
  },
  {
    label: "96/4",
    leanPct: 96,
    fatPct: 4,
    per100g: {
      calories: 174,
      protein: 29.2,
      fat: 5.6,
      saturatedFat: 2.2,
      cholesterol: 80,
      iron: 3.3,
      zinc: 7.5,
      b12: 3.3,
    },
  },
];
