import { Database } from "@nozbe/watermelondb";
import * as SecureStore from "expo-secure-store";
import { DEFAULT_CATEGORIES } from "./initialData";

const SEED_STORAGE_KEY = "APP_DB_SEEDED_V1";

export async function seedDatabaseIfNeeded(database: Database): Promise<void> {
  try {
    // 1. Thread-safe execution check using native storage
    const hasSeeded = await SecureStore.getItemAsync(SEED_STORAGE_KEY);
    if (hasSeeded === "true") return;

    console.log("[Seeder] Initializing base database records...");

    // 2. Wrap operations inside a strict single write batch
    await database.write(async () => {
      const categoryCollection = database.get("category");

      const prepareOperations = DEFAULT_CATEGORIES.map((category) =>
        categoryCollection.prepareCreate((record: any) => {
          record.categoryId = category.categoryId; // Force fixed IDs to guarantee consistency
          record.categoryName = category.categoryName;
          record.categoryValue = category.categoryValue;

          // CRITICAL: Avoid pushing local seed templates up to backend servers during sync
          record._raw.syncStatus = "synced";
        }),
      );

      // Execute all creations atomically on the SQLite native thread
      await database.batch(...prepareOperations);
    });

    // 3. Persist seeding completion state status
    await SecureStore.setItemAsync(SEED_STORAGE_KEY, "true");
    console.log("[Seeder] Database seeding successfully committed.");
  } catch (error) {
    console.error("[Seeder] Error executing database seed:", error);
    // Real-world fallback: report exception to Sentry / Bugsnag here
  }
}
