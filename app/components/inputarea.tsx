import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { View } from "react-native";
type FuncArguments = {
  placeholder: string;
};
export default function CustomTextArea({
  placeholder,
  isInvalid,
  value,
  onChange,
}: FuncArguments) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Textarea
        size="md"
        isReadOnly={false}
        isInvalid={isInvalid}
        isDisabled={false}
        className="w-64"
      >
        <TextareaInput
          placeholder={placeholder}
          onChangeText={(e) => {
            onChange({ name: "notes", value: e });
          }}
          value={value}
        />
      </Textarea>
    </View>
  );
}
