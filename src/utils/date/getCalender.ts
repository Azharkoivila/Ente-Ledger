// maybe error throws
// put day js check date obj on switch
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";

export default function getCalender(
  calender: string | { start: DateType; end: DateType },
) {
  if (typeof calender === "string") {
    switch (calender) {
      case "Monthly":
        return {
          start: dayjs().startOf("month").valueOf(),
          end: dayjs().endOf("month").valueOf(),
        };

      case "Weekly":
        return {
          start: dayjs().startOf("week").valueOf(),
          end: dayjs().endOf("week").valueOf(),
        };

      case "Yearly":
        return {
          start: dayjs().startOf("year").valueOf(),
          end: dayjs().endOf("year").valueOf(),
        };

      default:
        throw new Error(`Unknown calendar filter: ${calender}`);
    }
  }

  // At this point TypeScript knows that calender
  // is { start: number; end: number }

  return {
    start: dayjs(calender.start).valueOf(),
    end: dayjs(calender.end).valueOf(),
  };
}
