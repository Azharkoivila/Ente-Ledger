import { Dispatch, ReactNode, SetStateAction } from "react";
import { DateType } from "react-native-ui-datepicker";
import Category from "../db/model/category";
export type TransactionType = "income" | "expense";
export interface TransactionData {
  id?: string;
  category: string;
  amount: number;
  date: number;
  transactionType: TransactionType;
  note?: string;
}

export interface Summary {
  previousBalance: number;
  totalIncome: number;
  totalExpense: number;
  periodBalance: number;
  closingBalance: number;
}

export interface PlainTransaction {
  id: string;
  amount: number;
  category: string;
  date: number;
  transactionType: string;
  note: string;
}
export interface CategoryFilter {
  name: string;
  value: string;
}

export interface TimeStamp {
  start: number;
  end: number;
}

export interface AccountUser {
  accountName: string;
  accountId: string;
}
export interface CategoryReportsProps {
  setCategoryFilter: Dispatch<SetStateAction<CategoryFilter>>;
  setCalenderFilter: Dispatch<SetStateAction<CalendarFilter>>;
  category: string;
  transactions: readonly PlainTransaction[];
  categoryList: Category[];
  start: number;
  end: number;
  user: AccountUser[];
}

export interface ReportScreenProps {
  transactions: readonly PlainTransaction[];
  calender: Dispatch<SetStateAction<CalendarFilter>>;
  start: number;
  end: number;
  user: AccountUser[];
}

export interface CategoryFListProps {
  category: Category[];
  handleUpdate: (p: object) => void;
}

export interface FListProps {
  transactions: readonly PlainTransaction[];
}

export interface TransactionError {
  category: boolean;
  amount: boolean;
  date: boolean;
  transactionType: boolean;
  note?: boolean;
}
export interface isAnyErrorParam {
  amount: boolean;
  category: boolean;
  date: boolean;
  transactionType: boolean;
  note?: boolean;
}

export interface FormValidateParam {
  amount: number;
  category: string;
  date: number;
  note?: string;
  transactionType: string;
}

export interface CustomDatePickerProps {
  onChange: (p: object) => void;
  value: string;
}

export interface CustomDropDownProps {
  values: readonly Category[];
  onChange: (p: CategoryFilter) => void;
  selectedValue: string;
}

export interface FilterButtonsProps {
  text: string;
  variant?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  btnClass: string | undefined;
  btnTxtClass: string;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
  opt: { index: number };
  whenClick: (p: { start: DateType; end: DateType } | string) => void;
}
export type CalendarFilter =
  | string
  | {
      start: DateType;
      end: DateType;
    };

export interface FilterContainerProps {
  whenClick: (p: CalendarFilter) => void;
}

export interface CustomFormControllerProps {
  Label: string;
  HelperText: string;
  WarningText: string;
  isHelperArea: boolean;
  isInvalid: boolean;
  children: ReactNode;
}

export interface CustomInputProps {
  value: string;
  isNumeric: boolean;
  placeholder: string;
  usedFor: string;
  onChange: (p: { name: string; value: any }) => void;
}

export type FormAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof TransactionData;
      value: TransactionData[keyof TransactionData];
    }
  | { type: "RESET_FORM" }
  | { type: "SET_FORM"; payload: TransactionData }
  | { type: "UPDATE_FORM"; payload: TransactionData };

export interface CustomTextAreaProps {
  isHelperArea: boolean;
  placeholder: string;
  isInvalid: boolean;
  value: string;
  onChange: (p: {}) => void; //! need attention
}

export interface CustomPieChartProps {
  summary: Summary;
}

export interface PrintContainerProps {
  transactions: readonly PlainTransaction[];
  summery: Summary;
  accountName: string;
  accountId: string;
}

export interface CustomRadioButtonProps {
  value: string;
  onChange: (p: { name: string; value: any }) => void;
}

export interface TransactionFormProps {
  categoryList: readonly Category[];
  id: string;
}

export interface TransactionRowProps {
  item: PlainTransaction;
  isPopoverOpen: boolean;
  onPress: (item: string) => void;
  onLongPress: (item: PlainTransaction) => void;
  onClosePopover: () => void;
}
