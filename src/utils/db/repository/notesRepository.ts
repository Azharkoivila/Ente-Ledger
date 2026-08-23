import database from "@/src/db/database";
import Note from "@/src/db/model/notes";
import { map } from "@nozbe/watermelondb/utils/rx";
import { decode } from "html-entities";
import { Observable } from "rxjs";

export interface NoteListItem {
  id: string;
  noteTitle: string;
  noteBody: string;
  createdAt: number;
  updatedAt: number;
}

const getHtmlPreview = (
  html: string | null | undefined,
  limit = 80,
): string => {
  if (!html) {
    return "";
  }
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]*>/g, "");

  return decode(text).replace(/\s+/g, " ").trim();
};

class NotesRepository {
  private readonly collection = database.get<Note>("notes");

  observeNotes(): Observable<NoteListItem[]> {
    return this.collection
      .query()
      .observeWithColumns([
        "note_title",
        "note_body",
        "created_at",
        "updated_at",
      ])
      .pipe(
        map((notes) =>
          notes.map((note) => ({
            id: note.id,
            noteTitle: note.noteTitle,
            noteBody: getHtmlPreview(note.noteBody),
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          })),
        ),
      );
  }
}

export default new NotesRepository();
