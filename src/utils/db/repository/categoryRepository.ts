import database from "@/src/db/database";

// indexing need <---

class CategoryRepository {
  observeCategory() {
    return database.get("category").query().observe(); //!change to observe coloumn and remove key
  }
}

export default new CategoryRepository();
