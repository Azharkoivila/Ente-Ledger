import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import database from "../../src/db/database";
const handleDeleteCategory = async (id) => {
  await database.write(async () => {
    const record = await database.get("category").find(id);
    console.log(record);

    await record.destroyPermanently();
  });
};

//! render controll
function CategoryFList({ category, handleUpdate }) {
  return (
    <View style={{ flex: 1, marginTop: 3 }}>
      <FlashList
        data={category}
        keyExtractor={(item) => `${item._raw.id}-${item._raw.cat_name}`}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 3,
              padding: 10,
              borderRadius: 20,
              justifyContent: "space-between",
            }}
          >
            <View style={{ margin: 8, justifyContent: "center" }}>
              <Text>{item._raw.cat_name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", margin: 8, alignItems: "center" }}
            >
              <Feather
                style={{ margin: 8 }}
                name="edit"
                size={24}
                color="green"
                onPress={() => {
                  handleUpdate(item);
                }}
              />
              <AntDesign
                style={{ margin: 8 }}
                name="delete"
                size={24}
                color="red"
                onPress={() => {
                  handleDeleteCategory(item._raw.id);
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default CategoryFList;
