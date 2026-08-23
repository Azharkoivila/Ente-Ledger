import { isEmpty } from "./formValidator";

export default function validateNoteForm(title, body) {
  return {
    title: isEmpty(title),
    body: isEmpty(body),
  };
}
