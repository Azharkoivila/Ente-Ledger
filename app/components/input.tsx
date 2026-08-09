import { Input, InputField } from "@/components/ui/input";
import { View } from "react-native";

type Props = {
  value: number;
  isNumeric: boolean;
  placeholder: string;
  usedFor: string;
  onChange: (value: string) => void;
};

export default function CustomInput({
  value,
  onChange,
  isNumeric,
  placeholder,
  usedFor,
}: Props) {
  return (
    <View>
      <Input
        variant="rounded"
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
