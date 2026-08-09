import dayjs from "dayjs";

// maybe error throws
// put day js check date obj on switch
export default function getCalender(calender) {
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
      return {
        start: dayjs(calender.start).valueOf(),
        end: dayjs(calender.end).valueOf(),
      };
  }
}
