import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { TransactionFormProps } from "@/src/types";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  createTransaction,
  getTransaction,
  updateTransaction,
} from "../../src/utils/db/services/transactionService";
import {
  formValidate,
  isAnyError,
} from "../../src/utils/validator/formValidator";
import CustomDatePicker from "../components/datepicker";
import CustomDropDown from "../components/dropdown";
import CustomFormController from "../components/formController";
import CustomInput from "../components/input";
import CustomTextArea from "../components/inputArea";
import CustomRadioButton from "../components/radioBtn";
import { hamdlermdb, handledb, handlenotes } from "../dev/db";
import useError from "../hooks/useError";
import useFormKey from "../hooks/useFormKey";
import useFormReducer from "../hooks/useTransactionForm";
export default function TransactionForm({
  id,
  categoryList,
}: TransactionFormProps) {
  const { state, updateForm, resetForm, setForm } = useFormReducer();
  const { keys, resetKeys } = useFormKey(2);
  const { error, setError, removeError } = useError();
  useFocusEffect(
    useCallback(() => {
      async function load() {
        if (!id) return;
        resetKeys();
        const transaction = await getTransaction(id);
        setForm(transaction, id);
      }

      load();
    }, [id]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!id) {
        return () => {
          console.log("unfocus");
          removeError();
          resetForm();
          resetKeys();
        };
      }
    }, [id, resetForm]),
  );

  const handleSubmit = async () => {
    const response = formValidate(state);
    setError(response);
    if (isAnyError(response)) {
      return;
    }
    resetForm();
    resetKeys();
    if (state.id) {
      console.log("edit data");
      await updateTransaction(id, state);
      resetKeys();
      router.back();
    } else {
      console.log("submit");
      const response = await createTransaction(state);
      if (response.status) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your Transaction Where Added",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Your Transaction Where NOT Added TRY AGAIN",
        });
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          marginHorizontal: 16,
          marginTop: 18,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          paddingBottom: 20,
        }}
      >
        <CustomFormController
          key={keys[0]}
          Label="Choose A Category"
          HelperText="Only you can select one"
          WarningText="This field is mandatory"
          isHelperArea={false}
          isInvalid={error.category && !state.category ? true : false}
        >
          <CustomDropDown
            values={categoryList}
            selectedValue={state.category}
            onChange={(e) => updateForm(e)}
          />
        </CustomFormController>

        <CustomFormController
          Label="Enter Amount"
          HelperText="Numbers only"
          WarningText="This field is mandatory"
          isHelperArea={false}
          isInvalid={error.amount && !state.amount ? true : false}
        >
          <CustomInput
            value={String(state.amount) == "0" ? "" : String(state.amount)}
            onChange={(e) => updateForm(e)}
            placeholder="₹"
            isNumeric
            usedFor="amount"
          />
        </CustomFormController>

        <CustomFormController
          Label="Select A Date"
          HelperText="Select a date"
          WarningText="This field is mandatory"
          isHelperArea={false}
          isInvalid={error.date && !state.date ? true : false}
        >
          <CustomDatePicker
            value={dayjs(state.date).toISOString()}
            onChange={(e) => updateForm(e)}
          />
        </CustomFormController>

        <CustomFormController
          Label="Select Transaction Type"
          HelperText=""
          key={keys[1]}
          WarningText="This field is mandatory"
          isHelperArea={false}
          isInvalid={
            error.transactionType && !state.transactionType ? true : false
          }
        >
          <CustomRadioButton
            value={state.transactionType}
            onChange={(e) => updateForm(e)}
          />
        </CustomFormController>

        <CustomFormController
          Label="Note"
          HelperText=""
          WarningText=""
          isInvalid={false}
          isHelperArea={false}
        >
          <CustomTextArea
            placeholder="Enter your note"
            isInvalid={false}
            value={String(state.note)}
            onChange={(e) => updateForm(e)}
            isHelperArea
          />
        </CustomFormController>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 28,
          marginBottom: 24,
        }}
      >
        <Button
          size="lg"
          className="bg-[#0F766E]"
          style={{ paddingHorizontal: 32, backgroundColor: "#0F766E" }}
          onPress={handleSubmit}
        >
          <ButtonText style={{ fontWeight: "600" }}>
            {id ? "Edit Txn" : "Add"}
          </ButtonText>
          <ButtonIcon as={AddIcon} className="ml-2" />
        </Button>

        <View
          style={{
            width: 300,
            borderRadius: 14,
            backgroundColor: "#FEF2F2",
            borderWidth: 1,
            borderColor: "#FCA5A5",
            marginTop: 20,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#991B1B",
              marginBottom: 10,
            }}
          >
            Development Build : by azharkoivila
          </Text>
          <Button size="sm" className="rounded-full mt-2" onPress={handledb}>
            <ButtonText>test Db</ButtonText>
            <ButtonIcon as={AddIcon} className="ml-2" />
          </Button>
          <Button size="sm" className="rounded-full mt-3" onPress={hamdlermdb}>
            <ButtonText>rm Db</ButtonText>
            <ButtonIcon as={AddIcon} className="ml-2" />
          </Button>
          <Button size="sm" className="rounded-full mt-3" onPress={handlenotes}>
            <ButtonText>show Notes</ButtonText>
            <ButtonIcon as={AddIcon} className="ml-2" />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
