import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const handlepRess = (e) => {
  console.log(e);
  //bad practice
};
function FList({ data }) {
  const router = useRouter();
  return (
    <View style={{ flex: 1, marginTop: 3 }}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/modules/(edit)/[id]",
                params: { id: item._raw.id },
              });
            }}
            onLongPress={() => handlepRess(item.id)}
          >
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                margin: 3,
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  backgroundColor: "rgb(219, 234, 254)",
                  fontSize: 30,
                  alignContent: "center",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                💰
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 6,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.category}
                </Text>
                <Text style={{ marginLeft: 20, marginTop: 6, color: "gray" }}>
                  {dayjs(item.date).format("DD/MMMM/YYYY")}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: item.txn_type === "income" ? "green" : "red",
                  }}
                >
                  {item.txn_type === "income"
                    ? `+ ${item.amount}`
                    : `- ${item.amount}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default FList;
