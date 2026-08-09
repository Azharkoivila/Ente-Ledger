import { withObservables } from "@nozbe/watermelondb/react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import CategoryRepository from "../../../src/utils/db/repository/categoryRepository";
import WithAnimation from "../../hoc/withAnimation";
import TransactionForm from "../../modules/transactionForm";
const ObservableNewEntry = withObservables([], () => ({
  categoryList: CategoryRepository.observeCategory(),
}))(TransactionForm);
function Entry() {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({
        headerLeft: () => null,
        title: "New Entry",
        swipeEnabled: false,
      });

      return () => {
        parent?.setOptions({
          title: "എന്റെ ലെഡ്ജർ",
          headerLeft: undefined,
          swipeEnabled: true,
        });
      };
    }, [navigation]),
  );

  return <ObservableNewEntry />;
}
const AddNewEntry = WithAnimation(Entry);

export default AddNewEntry;
