import { View } from "react-native";
import WithAnimation from "../hoc/withAnimation";
import CategoriesModule from "../modules/Categories";
function Categories() {
  return (
    <View className="px-3 pt-3" style={{ flex: 1 }}>
      <CategoriesModule></CategoriesModule>
    </View>
  );
}

const animatedCategories = WithAnimation(Categories);

export default animatedCategories;
