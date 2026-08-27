import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Account extends Model {
  static table = "account";

  @field("account_name") accountName!: string;
  @field("created_at") createdAt!: string;
}
