import database from "@/src/db/database";
import Category from "@/src/db/model/category";

// indexing need <---

class CategoryRepository {
  observeCategory() {
    return database.get<Category>("category").query().observe(); //!change to observe coloumn and remove key
  }
}

export default new CategoryRepository();
