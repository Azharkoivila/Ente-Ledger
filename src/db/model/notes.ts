import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Notes extends Model {
  static table = "notes";

  @field("note_id") noteId!: string;
  @field("note_title") noteTitle!: string;
  @field("note_body") noteBody!: string;
  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;
}
