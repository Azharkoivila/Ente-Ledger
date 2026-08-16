import * as Crypto from "expo-crypto";
export const DEFAULT_CATEGORIES = [
  {
    categoryId: Crypto.randomUUID(),
    categoryName: "SALARY",
    categoryValue: "salary",
  },
  {
    categoryId: Crypto.randomUUID(),
    categoryName: "EMI",
    categoryValue: "emi",
  },
];
