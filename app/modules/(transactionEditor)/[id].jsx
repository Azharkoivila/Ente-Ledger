import { withObservables } from "@nozbe/watermelondb/react";
import { Stack, useLocalSearchParams } from "expo-router";
import CategoryRepository from "../../../src/utils/db/repository/categoryRepository";
import TransactionForm from "../transactionForm";
const ObservableEditEntry = withObservables([], () => ({
  categoryList: CategoryRepository.observeCategory(),
}))(TransactionForm);
function EditEntryScreen() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Entry",
          headerLeft: () => null,
          animation: "slide_from_right",
        }}
      />
      <ObservableEditEntry id={id} />
    </>
  );
}

export default EditEntryScreen;
