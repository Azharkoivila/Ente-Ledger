import { Text, View } from "react-native";
import FList from "./list";

function TransactionContainer({ transactions }) {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        Transactions
      </Text>
      <FList data={transactions} />
    </View>
  );
}

export default TransactionContainer;
