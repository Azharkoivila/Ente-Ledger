import { CalendarFilter, TimeStamp } from "@/src/types";
import { withObservables } from "@nozbe/watermelondb/react";
import { useState } from "react";
import { View } from "react-native";
import getStamp from "../../../src/utils/date/getCalender";
import transactionRepository from "../../../src/utils/db/repository/txnRepository";
import WithAnimation from "../../hoc/withAnimation";
import ReportScreen from "../../modules/reports";

const ObservableReport = withObservables(
  ["start", "end"],
  ({ start, end }) => ({
    transactions: transactionRepository.observeRange(start, end),
  }),
)(ReportScreen);

function Reports() {
  const [calender, setCalender] = useState<CalendarFilter>("Weekly");
  const time: TimeStamp = getStamp(calender);

  return (
    <View style={{ flex: 1 }}>
      <ObservableReport
        start={time.start}
        end={time.end}
        calender={setCalender}
      />
    </View>
  );
}
const animatedReport = WithAnimation(Reports);
export default animatedReport;
