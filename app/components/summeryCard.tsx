import { CustomPieChartProps } from "@/src/types";
import { Text, View } from "react-native";
function SummeryCard({ summary }: CustomPieChartProps) {
  const isPositiveBalance = (summary.periodBalance || 0) >= 0;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#EEF0F2",
        padding: 14,
        gap: 12,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, color: "#6B7280", fontWeight: "500" }}>
          Previous balance
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#111827",
          }}
        >
          ₹{summary.previousBalance}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#F1F1EF",
        }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "#F0FDF4",
            borderRadius: 12,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "500", color: "#15803D" }}>
            Income
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#16A34A",
            }}
          >
            ₹{summary.totalIncome}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FEF2F2",
            borderRadius: 12,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "500", color: "#B91C1C" }}>
            Expense
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#DC2626",
            }}
          >
            ₹{summary.totalExpense}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#F0FDFA",
            borderRadius: 12,
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingVertical: 12,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "500", color: "#0F766E" }}>
            Balance
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: isPositiveBalance ? "#0F766E" : "#DC2626",
            }}
          >
            ₹{summary.periodBalance}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default SummeryCard;
