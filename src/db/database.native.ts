// src/db/index.ts
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import Category from "./model/category";
import Notes from "./model/notes";
import Transaction from "./model/transaction";
import schema from "./schema/schema";

const adapter = new SQLiteAdapter({
  schema,
  jsi: true, // Enables maximum execution speeds over C++
  onSetUpError: (error) => console.error("DB failed to initialize:", error),
});

const database = new Database({
  adapter,
  modelClasses: [Transaction, Category, Notes],
});

export default database;
