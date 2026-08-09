import database from "@/src/db/database";
import { Q } from "@nozbe/watermelondb";
import dayjs from "dayjs";

// export default async function getWeek({ start, end }) {
//   console.log(start);
//   console.log(end);

//   const transactions = await database
//     .get("transactions")
//     .query(Q.where("date", Q.gte(start)), Q.where("date", Q.lt(end)))
//     .fetch();
//   console.log(transactions);
// }

// indexing need <---
const monthStart = dayjs().startOf("month").valueOf();
const monthEnd = dayjs().endOf("month").valueOf();

export class TransactionRepository {
  observeRange(start: number, end: number) {
    return database
      .get("transactions")
      .query(
        Q.where("date", Q.gte(start)),
        Q.where("date", Q.lt(end)),
        Q.sortBy("date", Q.asc),
      )
      .observe();
  }
  observeMonth() {
    return database
      .get("transactions")
      .query(
        Q.where("date", Q.gte(monthStart)),
        Q.where("date", Q.lt(monthEnd)),
        Q.sortBy("date", Q.asc),
      )
      .observe();
  }
  obseerveRangeWithCategery(start, end, category) {
    return database
      .get("transactions")
      .query(
        Q.where("date", Q.gte(start)),
        Q.where("date", Q.lt(end)),
        Q.where("category", category),
        Q.sortBy("date", Q.asc),
      )
      .observe();
  }
}

export default new TransactionRepository();
