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
  const [calender, setCalender] = useState("Weekly");
  const data = getStamp(calender);

  return (
    <View style={{ flex: 1 }}>
      <ObservableReport
        start={data.start}
        end={data.end}
        calender={setCalender}
      />
    </View>
  );
}
const animatedReport = WithAnimation(Reports);
export default animatedReport;
