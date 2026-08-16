import { CategoryFListProps } from "@/src/types";
import { handleDeleteCategory } from "@/src/utils/db/services/transactionService";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { Text, TouchableOpacity, View } from "react-native";

//! render control
function CategoryFList({ category, handleUpdate }: CategoryFListProps) {
  return (
    <View style={{ flex: 1, marginTop: 4 }}>
      <FlashList
        data={category}
        keyExtractor={(item) => `${item.id}-${item.categoryName}`}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
              marginVertical: 4,
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF0F2",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Jakarta-Medium",
                  color: "#111827",
                }}
              >
                {item.categoryName}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleUpdate(item);
                }}
                activeOpacity={0.5}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                style={{
                  padding: 8,
                  borderRadius: 10,
                  backgroundColor: "#F0FDFA",
                }}
              >
                <Feather name="edit-2" size={16} color="#0F766E" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleDeleteCategory(item.id);
                }}
                activeOpacity={0.5}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                style={{
                  padding: 8,
                  borderRadius: 10,
                  backgroundColor: "#FEF2F2",
                }}
              >
                <AntDesign name="delete" size={16} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default CategoryFList;
