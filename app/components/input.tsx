import { Input, InputField } from "@/components/ui/input";
import { CustomInputProps } from "@/src/types";
import { View } from "react-native";

export default function CustomInput({
  value,
  onChange,
  isNumeric,
  placeholder,
  usedFor,
}: CustomInputProps) {
  return (
    <View>
      <Input
        size="xl"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        focusable={false}
      >
        <InputField
          keyboardType={isNumeric ? "numeric" : "default"}
          placeholder={placeholder}
          value={value ?? ""}
          onChangeText={(e) => {
            onChange({ name: usedFor, value: e }); //! check this on all input
          }}
        />
      </Input>
    </View>
  );
}
