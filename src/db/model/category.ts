import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Category extends Model {
  static table = "category";

  @field("category_id") category_id;
  @field("cat_name") cat_name;
  @field("cat_value") cat_value;
}
