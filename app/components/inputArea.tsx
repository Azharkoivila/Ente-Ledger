import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { CustomTextAreaProps } from "@/src/types";
import { View } from "react-native";

export default function CustomTextArea({
  placeholder,
  isInvalid,
  value,
  onChange,
}: CustomTextAreaProps) {
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
            onChange({ name: "note", value: e }); //! look is not professional
          }}
          value={value}
        />
      </Textarea>
    </View>
  );
}
