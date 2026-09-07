import accountRepository from "@/src/utils/db/repository/accountRepository";
import notesRepository from "@/src/utils/db/repository/notesRepository";
import { withObservables } from "@nozbe/watermelondb/react";
import NoteList from "../modules/notes";

const ObservableNotes = withObservables([], () => ({
  notes: notesRepository.observeNotes(),
  user: accountRepository.observeUser(),
}))(NoteList);

export default ObservableNotes;
