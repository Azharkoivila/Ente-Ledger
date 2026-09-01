import Spinner from "@/app/components/spinner";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { FListProps, Summary } from "@/src/types";
import getCalender from "../../src/utils/date/getCalender";
import getReportService from "../../src/utils/db/services/reportService";
import { defaultOptions } from "../constants";
import CustomPieChart from "./pieChart";
import TransactionContainer from "./transactionContainer";

function OverviewCard({ transactions }: FListProps) {
  const [summary, setSummary] = useState<Summary>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    //! what is does do?
    async function loadSummary() {
      setLoading(true);

      try {
        const monthlySummary = await getReportService(
          getCalender(defaultOptions.MONTHLY),
        );

        if (!cancelled) {
          setSummary(monthlySummary);
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
        <Spinner />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomPieChart summary={summary!} />

      <TransactionContainer transactions={transactions} />
    </View>
  );
}

export default OverviewCard;
