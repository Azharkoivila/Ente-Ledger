export default function FormateInputs({
  category,
  amount,
  date,
  notes,
  txnType,
}) {
  return {
    id: crypto.randomUUID(),
    category,
    amount,
    date: date.toISOString().slice(0, 10),
    notes,
    txnType,
  };
}
