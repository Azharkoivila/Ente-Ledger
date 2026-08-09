import { useState } from "react";

const defaultFormStratus = {
  category: false,
  amount: false,
  date: false,
  txnType: false,
};
export default function useError() {
  const [error, setError] = useState(defaultFormStratus);
  const removeError = () => {
    setError(defaultFormStratus);
  };
  return { error, setError, removeError };
}
