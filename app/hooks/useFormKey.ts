import * as Crypto from "expo-crypto";
import { useCallback, useState } from "react";

export default function useFormKey(count = 1) {
  const generateKeys = () =>
    Array.from({ length: count }, () => Crypto.randomUUID());

  const [keys, setKeys] = useState(generateKeys);

  const resetKeys = useCallback(() => {
    setKeys(generateKeys());
  }, [count]);

  return {
    keys,
    resetKeys,
  };
}
