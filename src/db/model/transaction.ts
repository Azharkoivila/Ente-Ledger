// src/db/Transaction.ts
import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export default class Transaction extends Model {
  static table = "transactions";

  @field("txn_id") txn_id;
  @field("category") category;
  @field("amount") amount;
  @date("date") date;
  @field("txn_type") txn_type;
  @field("note") note;
}
