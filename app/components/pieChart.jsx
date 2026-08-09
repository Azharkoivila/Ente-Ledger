import { Image } from "expo-image";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import happyFace from "../../assets/imojis/happy.webp";
import sadFace from "../../assets/imojis/sad.webp";

export default function CustomPieChart({ summery }) {
  const total = summery?.totalIncome + summery?.totalExpense;

  const IncomePercentage = Math.round((summery?.totalIncome / total) * 100);
  const ExpencePercentage = Math.round((summery?.totalExpense / total) * 100);
  const renderLegend = (text, color, amount) => {
    return (
      <View style={{ flexDirection: "row", margin: 6 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <View>
          <Text style={{ color: "black", fontSize: 16 }}>{text || ""}</Text>
          <Text style={{ color: "black", fontSize: 16 }}>{amount || 0}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Monthly OverView
      </Text>
      {total ? (
        <View
          style={{
            display: "flex",
            marginVertical: 8,
            marginHorizontal: 8,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PieChart
            strokeColor="white"
            isAnimated
            animationDuration={200}
            strokeWidth={3}
            donut
            data={[
              { value: IncomePercentage, color: "#22c55e" },
              { value: ExpencePercentage, color: "#3b82f6" },
            ]}
            innerCircleColor="#565151"
            innerCircleBorderWidth={3}
            innerCircleBorderColor="#ffffff"
            innerRadius={70}
            showValuesAsLabels={false}
            showText
            textSize={18}
            showTextBackground={false}
            centerLabelComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      IncomePercentage > ExpencePercentage ? happyFace : sadFace
                    }
                    style={{ width: 120, height: 120 }}
                  />
                </View>
              );
            }}
          />

          {/*********************    Custom Legend component      ********************/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {renderLegend("Income", "#22c55e", summery?.totalIncome)}
            {renderLegend("Expense", "#3b82f6", summery?.totalExpense)}
          </View>
          {/****************************************************************************/}
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            marginVertical: 8,
            marginHorizontal: 8,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>No Transactions are made by you</Text>
        </View>
      )}
    </View>
  );
}
