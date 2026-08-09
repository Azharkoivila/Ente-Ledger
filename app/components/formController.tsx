import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { ReactNode } from "react";

type ComponentArgs = {
  Label: string;
  HelperText: string;
  WarningText: string;
  isHelperArea: boolean;
  isInvalid: boolean;
  children: ReactNode;
};
export default function CustomFormController({
  Label,
  HelperText,
  isInvalid,
  WarningText,
  children,
  isHelperArea,
}: ComponentArgs) {
  return (
    <FormControl
      isRequired
      isInvalid={isInvalid}
      style={{
        paddingHorizontal: 24,
        marginTop: 18,
      }}
    >
      <FormControlLabel style={{ marginBottom: 6 }}>
        <FormControlLabelText
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: "#111827",
            letterSpacing: 0.2,
          }}
        >
          {Label}
        </FormControlLabelText>
      </FormControlLabel>
      {children}
      <FormControlHelper style={{ marginTop: 4 }}>
        {isHelperArea && (
          <FormControlHelperText style={{ fontSize: 12, color: "#6B7280" }}>
            {HelperText}
          </FormControlHelperText>
        )}
      </FormControlHelper>
      <FormControlError style={{ marginTop: 4 }}>
        <FormControlErrorIcon as={AlertCircleIcon} size="sm" color="#DC2626" />
        <FormControlErrorText
          style={{ fontSize: 12, color: "#DC2626", marginLeft: 4 }}
        >
          {isInvalid && WarningText}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
