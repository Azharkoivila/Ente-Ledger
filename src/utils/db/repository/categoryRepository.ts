import database from "@/src/db/database";

// indexing need <---

export class CategoryRepository {
  observeCategory() {
    return database.get("category").query().observe();
  }
}

export default new CategoryRepository();
