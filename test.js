import dayjs from "dayjs";

// Start of the week (Sunday at 00:00:00)
const startOfWeek = dayjs().startOf("week");

// End of the week (Saturday at 23:59:59)
const endOfWeek = dayjs().endOf("week");

console.log(startOfWeek.format("YYYY-MM-DD"));
console.log(endOfWeek.format("YYYY-MM-DD"));
// const obj = { amount: true, category: true, date: true, txnType: true };
// console.log(Object.values(obj).some((val) => val));

// export interface FormValues {
//   category: string;
//   amount: number | undefined;
//   date: string | undefined;
//   txnType: string;
//   notes?: string | number | undefined;
// }

// export interface FormErrors {
//   category: boolean;
//   amount: boolean;
//   date: boolean;
//   txnType: boolean;
// }

// const isEmpty = (value: string | number | undefined): boolean =>
//   !value || value.toString().trim() === "";

// export function validateForm(values: FormValues): FormErrors {
//   return {
//     category: !isEmpty(values.category),
//     amount: !isEmpty(values.amount),
//     date: !isEmpty(values.date),
//     txnType: !isEmpty(values.txnType),
//   };
// }

// export function hasErrors(errors: FormErrors): boolean {
//   return Object.values(errors).some((valid) => !valid);
//}
