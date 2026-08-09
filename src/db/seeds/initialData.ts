import * as Crypto from "expo-crypto";
export const DEFAULT_CATEGORIES = [
  {
    category_id: Crypto.randomUUID(),
    cat_name: "SALARY",
    cat_value: "salary",
  },
  {
    category_id: Crypto.randomUUID(),
    cat_name: "EMI",
    cat_value: "emi",
  },
];
