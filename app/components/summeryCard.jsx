import { Text, View } from "react-native";
function SummeryCard({ summery }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "10",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 70,
            gap: 10,
            paddingHorizontal: "10",
            width: "100%",
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Previous Balance
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 10,
              color: "green",
            }}
          >
            ₹ {summery.previousBalance}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: 3,
          height: 80,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            borderTopLeftRadius: 0,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Income
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "green",
            }}
          >
            ₹ {summery.totalIncome}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Expence
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "red",
            }}
          >
            ₹ {summery.totalExpense}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            borderTopRightRadius: 0,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Balance
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "green",
            }}
          >
            ₹ {summery.periodBalance}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default SummeryCard;
