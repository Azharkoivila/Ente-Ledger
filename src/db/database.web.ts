import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import Category from "./model/category";
import Transaction from "./model/transaction";
import schema from "./schema";

const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false, // Fixes worker threading crashes during web development
  useIncrementalIndexedDB: true, // Saves your single DB locally into browser storage
  onSetUpError: (error) => console.error("Web DB failed to initialize:", error),
});

export default new Database({
  adapter,
  modelClasses: [Transaction, Category], // Uses your exact same single model set
});
