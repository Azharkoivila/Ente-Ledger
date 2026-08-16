import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Category extends Model {
  static table = "category";

  @field("category_id") categoryId!: string;
  @field("category_name") categoryName!: string;
  @field("category_value") categoryValue!: string;
}
