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
  if (!val) {
    return true;
  }
  const cleanStr = val.toString().trim();

  if (cleanStr === "" || /^[\s]*<html>[\s]*<\/html>[\s]*$/.test(cleanStr)) {
    return true;
  }

  return false;
}

function isAnyError(errorObj: isAnyErrorParam) {
  return Object.values(errorObj).some((val) => val);
}

export { formValidate, isAnyError, isEmpty };
