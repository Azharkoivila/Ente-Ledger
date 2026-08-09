import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import getReportService from "../../src/utils/reportService";
import Customdropdown from "../components/dropdown";
import FilterContainer from "../components/filterContainer";
import FList from "../components/list";
import PrintContainer from "../components/printContainer";
function CatrgoryReports({
  setcalenderFilter,
  setcategoryFilter,
  transactions,
  category,
  categoryList,
  ...dates
}) {
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
    <View
      style={{
        flex: 1,
        paddingTop: 10,
      }}
    >
      <View>
        <Customdropdown
          values={categoryList}
          onChange={setcategoryFilter}
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
            <FilterContainer whenClick={setcalenderFilter} />
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
        <PrintContainer transactions={transactions} summery={amount} />
      </View>
      <View style={{ flex: 1 }}>
        <FList data={transactions}></FList>
      </View>
    </View>
  );
}

export default CatrgoryReports;
