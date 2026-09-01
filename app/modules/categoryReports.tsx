import { CategoryReportsProps, Summary } from "@/src/types";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import getReportService from "../../src/utils/db/services/reportService";
import CustomDropDown from "../components/dropdown";
import FilterContainer from "../components/filterContainer";
import FList from "../components/list";
import PrintContainer from "../components/printContainer";
function CategoryReports({
  setCategoryFilter,
  setCalenderFilter,
  transactions,
  category,
  categoryList,
  start,
  end,
  user,
}: CategoryReportsProps) {
  const [{ accountName, accountId }] = user;
  const [categoryReport, setCategoryReport] = useState<Summary>({
    previousBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    periodBalance: 0,
    closingBalance: 0,
  });
  useEffect(() => {
    let cancelled = false;
    async function loadSummary() {
      //! how i do types
      const summery = await getReportService({ start, end });
      if (!cancelled) {
        setCategoryReport(summery);
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [start, end, transactions]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
      }}
    >
      <View>
        <CustomDropDown
          values={categoryList}
          onChange={setCategoryFilter}
          selectedValue={category}
        />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <FilterContainer whenClick={setCalenderFilter} />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <PrintContainer
          transactions={transactions}
          summery={categoryReport}
          accountName={accountName}
          accountId={accountId}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FList transactions={transactions}></FList>
      </View>
    </View>
  );
}

export default CategoryReports;
