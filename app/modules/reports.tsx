import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import getReportService from "../../src/utils/reportService";
import FilterContainer from "../components/filterContainer";
import FList from "../components/list";
import PrintContainer from "../components/printContainer";
import SummeryCard from "../components/summeryCard";

//two render detected
// use seperate card for summery
function ReportScreen({ transactions, calender, ...dates }) {
  const [amount, Setamount] = useState({});
  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      const summery = await getReportService(dates);
      if (!cancelled) {
        Setamount(summery);
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [dates, transactions]);

  return (
    <View className="px-3 pt-3" style={{ flex: 1 }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 4,
            }}
          >
            <FilterContainer whenClick={calender} />
          </View>
        </ScrollView>
      </View>
      <SummeryCard summery={amount} />
      <PrintContainer transactions={transactions} summery={amount} />
      <View style={{ flex: 1 }}>
        <FList data={transactions}></FList>
      </View>
    </View>
  );
}

export default ReportScreen;
