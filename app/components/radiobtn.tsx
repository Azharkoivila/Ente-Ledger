import { CircleIcon } from "@/components/ui/icon";
import {
    Radio,
    RadioGroup,
    RadioIcon,
    RadioIndicator,
    RadioLabel,
} from "@/components/ui/radio";
import { View } from "react-native";

export default function CustomRadioButton({ value, onChange }) {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <RadioGroup
        value={value}
        onChange={(e) => {
          onChange({ name: "txnType", value: e });
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Radio value="income" size="lg">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel>Income</RadioLabel>
        </Radio>

        <Radio value="expense" size="lg">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel>Expense</RadioLabel>
        </Radio>
      </RadioGroup>
    </View>
  );
}
