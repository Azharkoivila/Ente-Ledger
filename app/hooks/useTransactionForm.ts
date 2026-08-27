import { FormAction, TransactionData } from "@/src/types";
import { useReducer } from "react";
const initialState: TransactionData = {
  category: "",
  amount: 0,
  date: Date.now(),
  transactionType: "income",
  note: "",
};
function updateDispatch(transaction: TransactionData, id: string) {
  return {
    category: transaction.category,
    amount: Number(transaction.amount),
    date: Number(transaction.date),
    transactionType: transaction.transactionType,
    note: transaction.note,
    id,
  };
}

const formReducer = (state: TransactionData, action: FormAction) => {
  console.log(state);

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
  function updateForm(e: any) {
    console.log(e);

    if (!e?.name && !e?.value) {
      return;
    }
    dispatch({
      type: "UPDATE_FIELD",
      field: e?.name,
      value: e?.value,
    });
  }
  function resetForm() {
    dispatch({ type: "RESET_FORM" }); //! memorize it
  }

  function setForm(transaction: TransactionData, id: string) {
    dispatch({
      type: "UPDATE_FORM",
      payload: updateDispatch(transaction, id),
    });
  }

  return { state, updateForm, resetForm, setForm };
}
