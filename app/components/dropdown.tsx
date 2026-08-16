import { ChevronDownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectScrollView,
  SelectTrigger,
} from "@/components/ui/select";
import { CustomDropDownProps } from "@/src/types";
import { useState } from "react";

export default function CustomDropDown({
  values,
  onChange,
  selectedValue,
}: CustomDropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Select
      selectedValue={selectedValue ? selectedValue : undefined}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onValueChange={(e) => {
        onChange({ name: "category", value: e });
        setIsOpen(false);
      }}
    >
      <SelectTrigger
        size="xl"
        style={{
          borderWidth: isOpen ? 1.5 : 1,
          borderColor: isOpen ? "#0F766E" : "#E5E7EB",
          backgroundColor: isOpen ? "#F0FDFA" : "#FFFFFF",
        }}
      >
        <SelectInput placeholder="Select option" className="flex-1" />
        <SelectIcon
          className="mr-3"
          as={ChevronDownIcon}
          color={isOpen ? "#0F766E" : "#9CA3AF"}
        />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectScrollView>
            {values.map((item) => (
              <SelectItem
                key={item.id}
                label={item.categoryName}
                value={item.categoryValue}
              />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
