import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { withObservables } from "@nozbe/watermelondb/react";
import * as Crypto from "expo-crypto";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import database from "../../src/db/database";
import CategoryRepository from "../../src/utils/db/repository/categoryRepository";
import CategoryFList from "../components/categoryFList";
import CustomFormController from "../components/formController";
import CustomInput from "../components/input";

const ObservableCategoryList = withObservables([], () => ({
  category: CategoryRepository.observeCategory(),
}))(CategoryFList);

function Categerys() {
  const [input, setInput] = useState({});
  const [key, setkey] = useState(0);
  useFocusEffect(() => {
    return () => {
      setInput({}); //! need types and initial value
    };
  });
  const handleUpdate = (data) => {
    setInput({
      name: "category",
      value: data._raw.cat_value,
      mode: "edit",
      id: data._raw.id,
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
      await database.write(async () => {
        const post = await database.get("category").find(input.id);
        await post.update((record) => {
          record.cat_name = input.value.toUpperCase();
          record.cat_value = input.value;
        });
      });

      console.log(input);
      setInput("");
      setkey((prev) => key + 1);
      console.log("db data");
      const txns = database.get("category");
      const records = await txns.query().fetch();
      records.forEach((record) => {
        console.log(record._raw);
      });
    } else if (input?.mode === "add") {
      await database.write(async () => {
        const newTxn = await database.get("category").create((category) => {
          category.category_id = Crypto.randomUUID();
          category.cat_name = input.value.toUpperCase();
          category.cat_value = input.value;
        });
      });
      setInput("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomFormController Label="Hello world">
        <CustomInput
          usedFor="category"
          onChange={handleChange}
          value={input.value}
        ></CustomInput>
        <Button size="lg" className="rounded-full mt-3" onPress={handleSubmit}>
          <ButtonText>{input.mode === "edit" ? "Edit" : "Add"}</ButtonText>
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

export default Categerys;
