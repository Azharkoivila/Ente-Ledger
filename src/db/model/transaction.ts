// src/db/Transaction.ts
import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export default class Transaction extends Model {
  static table = "transactions";

  @field("transaction_id") transactionId!: string;
  @field("category") category!: string;
  @field("amount") amount!: number;
  @date("date") date!: number;
  @field("transaction_type") transactionType!: string;
  @field("note") note!: string;
}
