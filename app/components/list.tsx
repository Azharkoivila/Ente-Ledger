import { Button, ButtonText } from "@/components/ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { FListProps, PlainTransaction, TransactionRowProps } from "@/src/types";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { memo, useCallback, useState } from "react";
import { TouchableOpacity, Vibration, View } from "react-native";

const TransactionRow = memo(function TransactionRow({
  item,
  isPopoverOpen,
  onPress,
  onLongPress,
  onClosePopover,
}: TransactionRowProps) {
  const isIncome = item.transactionType === "income";

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={onClosePopover}
      placement="top"
      trigger={(triggerProps) => (
        <TouchableOpacity
          {...triggerProps}
          activeOpacity={0.7}
          onPress={() => onPress(item.id!)}
          onLongPress={() => onLongPress(item)}
        >
          <View className="bg-background-0 flex-row items-center my-1 p-3 rounded-2xl border border-outline-200">
            <View
              className={`w-[42px] h-[42px] rounded-xl items-center justify-center ${
                isIncome ? "bg-success-50" : "bg-error-50"
              }`}
            >
              <Feather
                name={isIncome ? "arrow-down-left" : "arrow-up-right"}
                size={19}
                color={isIncome ? "#16A34A" : "#DC2626"}
              />
            </View>

            <View className="flex-1 justify-center ml-3">
              <Text className="text-sm font-semibold text-typography-900">
                {item.category}
              </Text>
              <Text className="text-xs text-typography-500 mt-0.5">
                {dayjs(item.date).format("DD MMM YYYY")}
              </Text>
            </View>

            <View className="justify-center items-end">
              <Text
                className={`text-[15px] font-bold ${
                  isIncome ? "text-success-600" : "text-error-600"
                }`}
              >
                {isIncome ? `+₹${item.amount}` : `-₹${item.amount}`}
              </Text>
              <Text className="text-[10px] text-typography-400 mt-0.5 capitalize">
                {item.transactionType}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    >
      <PopoverBackdrop />
      <PopoverContent style={{ backgroundColor: "white" }}>
        <PopoverArrow style={{ backgroundColor: "red" }} />
        <PopoverBody
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <Text style={{ color: "black" }}>
              Do You Want To Delete This Transaction ?
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onPress={onClosePopover}>
              <ButtonText className="bg-[]">NO</ButtonText>
            </Button>
            <Button>
              <ButtonText>YES</ButtonText>
            </Button>
          </View>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});

function FList({ transactions }: FListProps) {
  const router = useRouter();
  const [openItemId, setOpenItemId] = useState<string | number | null>(null);

  const handlePress = useCallback(
    (id: string) => {
      router.push({
        pathname: "/modules/(transactionEditor)/[id]",
        params: { id },
      });
    },
    [router],
  );

  const handleLongPress = useCallback((item: PlainTransaction) => {
    Vibration.vibrate(15);
    setOpenItemId(item.id!);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenItemId(null);
  }, []);

  if (!transactions.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("@/assets/lottie/bee.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-typography-900 text-sm font-semibold">
          No transactions yet
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 mt-1">
      <Text
        style={{
          fontSize: 20,
          marginTop: 3,
          marginBottom: 3,
          fontFamily: "ubuntu-Regular",
        }}
      >
        Transactions
      </Text>
      <FlashList
        data={transactions}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <TransactionRow
            item={item}
            isPopoverOpen={openItemId === item.id}
            onPress={handlePress}
            onLongPress={handleLongPress}
            onClosePopover={handleClosePopover}
          />
        )}
      />
    </View>
  );
}

export default FList;
