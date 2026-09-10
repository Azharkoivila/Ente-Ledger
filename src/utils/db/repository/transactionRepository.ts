import database from "@/src/db/database";
import Transaction from "@/src/db/model/transaction";
import { Q } from "@nozbe/watermelondb";
import { map } from "@nozbe/watermelondb/utils/rx";
import dayjs from "dayjs";
function toDTO(record: Transaction) {
  return {
    id: record.id,
    amount: record.amount,
    category: record.category,
    date: record.date,
    transactionType: record.transactionType,
    note: record.note,
  };
}
// indexing need <---
const monthStart = dayjs().startOf("month").valueOf();
const monthEnd = dayjs().endOf("month").valueOf();

class TransactionRepository {
  observeRange(start: number, end: number) {
    return database
      .get<Transaction>("transactions")
      .query(
        Q.where("date", Q.gte(start)),
        Q.where("date", Q.lt(end)),
        Q.sortBy("date", Q.asc),
      )
      .observeWithColumns(["amount", "category", "date", "transaction_type"])
      .pipe(map((record) => record.map(toDTO)));
  }
  observeMonth() {
    return database
      .get<Transaction>("transactions")
      .query(
        Q.where("date", Q.gte(monthStart)),
        Q.where("date", Q.lt(monthEnd)),
        Q.sortBy("date", Q.asc),
      )
      .observeWithColumns(["amount", "category", "date", "transaction_type"]);
  }
  observeRangeWithCategory(start: number, end: number, category: string) {
    return database
      .get<Transaction>("transactions")
      .query(
        Q.where("date", Q.gte(start)),
        Q.where("date", Q.lt(end)),
        Q.where("category", category),
        Q.sortBy("date", Q.asc),
      )
      .observeWithColumns(["amount", "category", "date", "transaction_type"])
      .pipe(map((record) => record.map(toDTO)));
  }
}

export default new TransactionRepository();
