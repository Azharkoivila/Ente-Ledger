import { withObservables } from "@nozbe/watermelondb/react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import transactionRepository from "../../../src/utils/db/repository/txnRepository";
import OverviewCard from "../../components/overviewCard";
import WithAnimation from "../../hoc/withAnimation";
const ObservableOverview = withObservables([], () => ({
  transactions: transactionRepository.observeMonth(),
}))(OverviewCard);

function Overview() {
  useFocusEffect(
    useCallback(() => {
      console.log("screen focused");

      return () => {
        console.log("screen unfocused");
      };
    }, []),
  );

  return (
    <View className="px-3 pt-3" style={{ flex: 1 }}>
      <ObservableOverview />
    </View>
  );
}

const animatedOverView = WithAnimation(Overview);
export default animatedOverView;
