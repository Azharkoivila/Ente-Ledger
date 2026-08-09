import database from "@/src/db/database";
import * as Crypto from "expo-crypto";
export async function getTransactionId(id) {
  return await database.get("transactions").find(id);
}

export async function createTransaction(data) {
  await database.write(async () => {
    await database.get("transactions").create((txn) => {
      txn.txn_id = Crypto.randomUUID();
      txn.category = data.category;
      txn.amount = +data.amount;
      txn.date = data.date;
      txn.txn_type = data.txnType;
      txn.note = data.notes;
    });
  });
}

export function updateDispatch(transaction, id) {
  return {
    category: transaction.category,
    amount: String(transaction.amount),
    date: transaction.date,
    txnType: transaction.txn_type,
    notes: transaction.note,
    id,
  };
}
