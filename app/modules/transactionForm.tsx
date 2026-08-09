import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  createTransaction,
  getTransactionId,
} from "../../src/utils/db/services/transactionService";
import { formValidate, isanyError } from "../../src/utils/formValidator";
import CustomDatePicker from "../components/datepicker";
import CustomDropDown from "../components/dropdown";
import CustomFormController from "../components/formController";
import CustomInput from "../components/input";
import CustomTextArea from "../components/inputarea";
import CustomRadioButton from "../components/radiobtn";
import { hamdlermdb, handledb } from "../dev/db";
import useError from "../hooks/useError";
import useFormKey from "../hooks/useFormKey";
import useFormReducer from "../hooks/useTransactionForm";
export default function TransactionForm({ id, categoryList }) {
  const { state, updateForm, resetForm, setForm } = useFormReducer();
  const { keys, resetKeys } = useFormKey(2);
  const { error, setError, removeError } = useError();

  useFocusEffect(
    useCallback(() => {
      async function load() {
        if (!id) return;
        const txn = await getTransactionId(id);
        setForm(txn, id);
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
    const resposnse = formValidate(state);
    setError(resposnse);
    if (isanyError(resposnse)) {
      return;
    }
    resetForm();
    resetKeys();
    if (state.id) {
      console.log("edit data");
      router.back();
    } else {
      console.log("submitt");
      await createTransaction(state);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#111827" }}>
          {id ? "Edit transaction" : "New transaction"}
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          {id ? "Update the details below" : "Log a new income or expense"}
        </Text>
      </View>

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
            selectedValue={state.category || undefined}
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
            value={state.amount}
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
            value={state.date}
            onChange={(e) => updateForm(e)}
          />
        </CustomFormController>

        <CustomFormController
          Label="Select Transaction Type"
          HelperText=""
          key={keys[1]}
          WarningText="This field is mandatory"
          isHelperArea={false}
          isInvalid={error.txnType && !state.txnType ? true : false}
        >
          <CustomRadioButton
            value={state.txnType}
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
            value={state.notes}
            onChange={(e) => updateForm(e)}
            isHelperArea={false}
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
          className="rounded-full"
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
        </View>
      </View>
    </ScrollView>
  );
}
