import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { View } from "react-native";

import getCalender from "../../src/utils/date/getCalender";
import getReportService from "../../src/utils/reportService";
import CustomPieChart from "../components/pieChart";
import TransactionContainer from "../components/transactionContainer";

function OverviewCard({ transactions }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    //! what is does do?
    async function loadSummary() {
      setLoading(true);

      try {
        const result = await getReportService(getCalender("Monthly"));

        if (!cancelled) {
          setSummary(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [transactions]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomPieChart summery={summary} />

      <TransactionContainer transactions={transactions} />
    </View>
  );
}

export default OverviewCard;
