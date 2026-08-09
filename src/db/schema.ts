// src/db/schema.ts
import { appSchema, tableSchema } from "@nozbe/watermelondb";
// check all filed
export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "transactions",
      columns: [
        { name: "txn_id", type: "string" },
        { name: "category", type: "string" },
        { name: "amount", type: "number" },
        { name: "date", type: "number", isIndexed: true },
        { name: "txn_type", type: "string" },
        { name: "note", type: "string" },
      ],
    }),
    tableSchema({
      name: "account",
      columns: [
        { name: "acc_name", type: "string" },
        { name: "created_at", type: "number", isIndexed: true },
      ],
    }),
    tableSchema({
      name: "month_snapshot",
      columns: [
        { name: "month", type: "string" },
        { name: "balance", type: "number" },
        { name: "status", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "category",
      columns: [
        { name: "category_id", type: "string" },
        { name: "cat_name", type: "string" },
        { name: "cat_value", type: "string" },
      ],
    }),
  ],
});
