import { Dispatch, ReactNode, SetStateAction } from "react";
import { DateType } from "react-native-ui-datepicker";
import Category from "../db/model/category";
import Transaction from "../db/model/transaction";
export interface CategoryFilter {
  name: string;
  value: string;
}

export interface TimeStamp {
  start: number;
  end: number;
}

export interface CategoryReportsProps {
  setCategoryFilter: Dispatch<SetStateAction<CategoryFilter>>;
  setCalenderFilter: Dispatch<SetStateAction<CalendarFilter>>;
  category: string;
  transactions: Transaction[];
  categoryList: Category[];
  start: number;
  end: number;
}

export interface ReportScreenProps {
  transactions: readonly Transaction[];
  calender: Dispatch<SetStateAction<CalendarFilter>>;
  start: number;
  end: number;
}

export interface CategoryFListProps {
  category: Category[];
  handleUpdate: (p: object) => void;
}

export interface FListProps {
  transactions: readonly Transaction[];
}

export interface TransactionError {
  category: boolean;
  amount: boolean;
  date: boolean;
  transactionType: boolean;
  note?: boolean;
}
export interface TransactionData {
  id?: string;
  category: string;
  amount: number;
  date: number;
  transactionType: string;
  note?: string;
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

export interface Summary {
  previousBalance: number;
  totalIncome: number;
  totalExpense: number;
  periodBalance: number;
  closingBalance: number;
}
export interface CustomPieChartProps {
  summery: Summary;
}

export interface PrintContainerProps {
  transactions: readonly Transaction[];
  summery: Summary;
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
  item: Transaction;
  isPopoverOpen: boolean;
  onPress: (item: Transaction) => void;
  onLongPress: (item: Transaction) => void;
  onClosePopover: () => void;
}
