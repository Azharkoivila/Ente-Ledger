import database from "@/src/db/database";
import Notes from "@/src/db/model/notes";
import * as Crypto from "expo-crypto";
export async function createNote(entry) {
  try {
    await database.write(async () => {
      await database.get<Notes>("notes").create((record) => {
        record.noteId = Crypto.randomUUID();
        record.noteTitle = entry.noteTitle;
        record.noteBody = entry.noteBody; //! need more accurate data store
        record.createdAt = entry.createdAt;
        record.updatedAt = entry.updatedAt;
      });
    });
    return { status: true, message: "transactionSuccess" };
  } catch (error) {
    return { status: false, error };
  }
}

export async function fetchNote(id) {
  return await database.get<Notes>("notes").find(id);
}

export async function deleteNote(id) {
  await database.write(async () => {
    const record = await database.get("notes").find(id);
    await record.destroyPermanently();
  });
}

export async function updateNote(id, data) {
  await database.write(async () => {
    const post = await database.get<Notes>("notes").find(id);
    await post.update((record) => {
      record.noteTitle = data.noteTitle;
      record.noteBody = data.noteBody;
      record.updatedAt = Date.now();
    });
  });
}
