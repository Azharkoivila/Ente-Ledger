import { ReportScreenProps, Summary } from "@/src/types";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import getReportService from "../../src/utils/db/services/reportService";
import FilterContainer from "../components/filterContainer";
import FList from "../components/list";
import PrintContainer from "../components/printContainer";
import SummeryCard from "../components/summeryCard";

//two render detected
// use separate card for summery
function ReportScreen({
  transactions,
  calender,
  start,
  end,
  user,
}: ReportScreenProps) {
  const [{ accountName, accountId }] = user;
  const [amount, SetAmount] = useState<Summary>({
    previousBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    periodBalance: 0,
    closingBalance: 0,
  });
  useEffect(() => {
    let cancelled = false;
    async function loadSummary() {
      //! need explanations
      const summery = await getReportService({ start, end });
      if (!cancelled) {
        SetAmount(summery);
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [start, end, transactions]);

  return (
    <View className="px-4 pt-4" style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 2,
              gap: 8,
            }}
          >
            <FilterContainer whenClick={calender} />
          </View>
        </ScrollView>
      </View>
      <View style={{ marginTop: 14 }}>
        <SummeryCard summary={amount} />
      </View>
      <PrintContainer
        transactions={transactions}
        summery={amount}
        accountName={accountName}
        accountId={accountId}
      />
      <View style={{ flex: 1, marginTop: 4 }}>
        <FList transactions={transactions}></FList>
      </View>
    </View>
  );
}

export default ReportScreen;
