function formValidate({ amount, category, date, notes, txnType }) {
  return {
    amount: isEmpty(amount),
    category: isEmpty(category),
    date: isEmpty(date),
    // txnType: isEmpty(txnType),
  };
}

function isEmpty(val) {
  if (!val || val.toString().trim() === "") {
    return true;
  } else {
    return false;
  }
}

function isanyError(errorObj) {
  return Object.values(errorObj).some((val) => val);
}

export { formValidate, isanyError };
