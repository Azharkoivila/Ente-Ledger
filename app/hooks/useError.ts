import { TransactionError } from "@/src/types";
import { useState } from "react";

const defaultFormStratus: TransactionError = {
  category: false,
  amount: false,
  date: false,
  transactionType: false,
};
export default function useError() {
  const [error, setError] = useState(defaultFormStratus);
  const removeError = () => {
    setError(defaultFormStratus);
  };
  return { error, setError, removeError };
}
