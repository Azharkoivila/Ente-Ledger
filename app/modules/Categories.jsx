import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import {
  addCategory,
  updateCategory,
} from "@/src/utils/db/services/transactionService";
import { withObservables } from "@nozbe/watermelondb/react";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import CategoryRepository from "../../src/utils/db/repository/categoryRepository";
import CategoryFList from "../components/categoryFList";
import CustomFormController from "../components/formController";
import CustomInput from "../components/input";

const ObservableCategoryList = withObservables([], () => ({
  category: CategoryRepository.observeCategory(),
}))(CategoryFList);

function Categories() {
  const [input, setInput] = useState({});
  const [key, setKey] = useState(0);
  useFocusEffect(() => {
    return () => {
      setInput({}); //! need types and initial value
    };
  });
  const handleUpdate = (record) => {
    setInput({
      name: "category",
      value: record.categoryValue,
      mode: "edit",
      id: record.id,
    });
  };
  const handleChange = (e) => {
    //! parse on here for universal is good approach
    let id;
    if (input.id) {
      id = input.id;
    }
    if (input.mode === "edit") {
      console.log(id); //! empty edit parse
      setInput({ name: "category", value: e.value, mode: "edit", id }); //! duplicate detected
    } else {
      setInput({ name: "category", value: e.value, mode: "add" }); //! duplicate detected
    }
  };
  const handleSubmit = async () => {
    if (!input) {
      console.log("empty");
    } else if (input?.mode === "edit") {
      updateCategory(input);
      console.log(input);
      setInput("");
      setKey((prev) => key + 1);
    } else if (input?.mode === "add") {
      setInput("");
      addCategory(input);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomFormController Label="Category Name">
        <CustomInput
          usedFor="category"
          onChange={handleChange}
          value={input?.value?.toUpperCase()}
        ></CustomInput>
        <Button size="lg" className="mt-3 bg-[#0F766E]" onPress={handleSubmit}>
          <ButtonText>
            {input.mode === "edit" ? "EDIT CATEGORY" : "ADD CATEGORY"}
          </ButtonText>
          <ButtonIcon as={AddIcon} className="ml-2" />
        </Button>
      </CustomFormController>
      <View style={{ flex: 1 }}>
        <ObservableCategoryList
          key={key}
          handleUpdate={handleUpdate}
        ></ObservableCategoryList>
      </View>
    </View>
  );
}

export default Categories;
