import { FListProps } from "@/src/types";
import { View } from "react-native";
import FList from "./list";

function TransactionContainer({ transactions }: FListProps) {
  return (
    <View style={{ flex: 1 }}>
      <FList transactions={transactions} />
    </View>
  );
}

export default TransactionContainer;
