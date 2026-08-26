import { CustomPieChartProps } from "@/src/types";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function CustomPieChart({ summary }: CustomPieChartProps) {
  const total = summary?.totalIncome + summary?.totalExpense;

  const IncomePercentage = Math.round((summary?.totalIncome / total) * 100);
  const ExpensePercentage = Math.round((summary?.totalExpense / total) * 100);

  const renderLegend = (
    text: string,
    dotColor: string,
    tintClass: string,
    amount: number,
    percent: number,
  ) => {
    return (
      <View
        className={`flex-1 flex-row items-center rounded-xl py-2.5 px-3 mx-1 ${tintClass}`}
      >
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: dotColor,
          }}
          className="mr-2"
        />
        <View>
          <Text className="text-typography-500 text-[11px] font-medium">
            {text || ""} · {percent || 0}%
          </Text>
          <Text className="text-typography-900 text-[15px] font-bold mt-0.5">
            ₹{(amount || 0).toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
    );
  };

  const isSurplus = IncomePercentage > ExpensePercentage;

  return (
    <View
      className="bg-background-0 rounded-2xl border border-outline-200 pb-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}
    >
      <View className="pt-[18px] px-[18px] flex-row items-center justify-between">
        <View>
          <Text className="text-typography-900 text-base font-bold">
            Monthly overview
          </Text>
          <Text className="text-typography-500 text-xs mt-0.5">
            Income vs expense split
          </Text>
        </View>
        {total ? (
          <View
            className={`px-2.5 py-1 rounded-full ${
              isSurplus ? "bg-success-50" : "bg-error-50"
            }`}
          >
            <Text
              className={`text-[11px] font-semibold ${
                isSurplus ? "text-success-700" : "text-error-700"
              }`}
            >
              {isSurplus ? "Surplus" : "Overspending"}
            </Text>
          </View>
        ) : null}
      </View>

      {total ? (
        <View className="mt-2 py-2 items-center">
          <PieChart
            strokeColor="white"
            isAnimated
            animationDuration={200}
            strokeWidth={3}
            donut
            data={[
              { value: IncomePercentage, color: "#16A34A" },
              { value: ExpensePercentage, color: "#DC2626" },
            ]}
            innerCircleColor="#F7F8FA"
            innerCircleBorderWidth={2}
            innerCircleBorderColor="#FFFFFF"
            innerRadius={72}
            showValuesAsLabels={false}
            showText
            textSize={18}
            showTextBackground={false}
            centerLabelComponent={() => {
              return (
                <View style={{ alignItems: "center" }}>
                  <LottieView
                    source={
                      isSurplus
                        ? require("@/assets/lottie/partyFace.json")
                        : require("@/assets/lottie/sad.json")
                    }
                    autoPlay
                    loop
                    style={{ width: 92, height: 92 }}
                  />
                </View>
              );
            }}
          />

          {/*********************    Custom Legend component      ********************/}
          <View className="flex-row mt-5 px-3.5 w-full">
            {renderLegend(
              "Income",
              "#16A34A",
              "bg-success-50",
              summary?.totalIncome,
              IncomePercentage,
            )}
            {renderLegend(
              "Expense",
              "#DC2626",
              "bg-error-50",
              summary?.totalExpense,
              ExpensePercentage,
            )}
          </View>
          {/****************************************************************************/}
        </View>
      ) : (
        <View className="items-center py-8 px-4">
          <LottieView
            source={require("@/assets/lottie/orangutan.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text className="text-typography-900 text-sm font-semibold">
            No transactions yet
          </Text>
          <Text className="text-typography-500 text-xs mt-1 text-center">
            Add a transaction to see your income and expense split
          </Text>
        </View>
      )}
    </View>
  );
}
