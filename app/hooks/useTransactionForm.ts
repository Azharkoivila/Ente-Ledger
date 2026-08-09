import { useReducer } from "react";
import { updateDispatch } from "../../src/utils/db/services/transactionService";
const initialState = {
  category: "",
  amount: "",
  date: "",
  txnType: "income",
  notes: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return initialState;
    case "SET_FORM":
      return action.payload;
    case "UPDATE_FORM":
      return action.payload;

    default:
      return state;
  }
};

export default function useFormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  function updateForm(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.name,
      value: e.value,
    });
  }
  function resetForm() {
    dispatch({ type: "RESET_FORM" }); //! memmorixe it
  }

  function setForm(txn, id) {
    dispatch({
      type: "UPDATE_FORM",
      payload: updateDispatch(txn, id),
    });
  }

  return { state, updateForm, resetForm, setForm };
}
