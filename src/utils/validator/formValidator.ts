import { FormValidateParam, isAnyErrorParam } from "../../types";

function formValidate({
  amount,
  category,
  date,
  note,
  transactionType,
}: FormValidateParam) {
  return {
    amount: isEmpty(amount),
    category: isEmpty(category),
    date: isEmpty(date),
    transactionType: isEmpty(transactionType),
    // note: isEmpty(notes),
  };
}

function isEmpty(val: any) {
  if (!val || val.toString().trim() === "") {
    return true;
  } else {
    return false;
  }
}

function isAnyError(errorObj: isAnyErrorParam) {
  return Object.values(errorObj).some((val) => val);
}

export { formValidate, isAnyError };
