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

type CategoryItem = {
  label: string;
  value: string;
};

type Props = {
  values: CategoryItem[];
  onChange: (value: object) => void;
  selectedValue?: string; // ← add this prop
};

export default function CustomDropDown({
  values,
  onChange,
  selectedValue,
}: Props) {
  return (
    <Select
      selectedValue={selectedValue ? selectedValue : undefined}
      onValueChange={(e) => {
        onChange({ name: "category", value: e });
      }}
    >
      <SelectTrigger variant="rounded" size="xl">
        <SelectInput placeholder="Select option" className="flex-1" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectScrollView>
            {values.map(({ _raw }) => (
              <SelectItem
                key={_raw.id}
                label={_raw.cat_name}
                value={_raw.cat_value}
              /> // ← key by value, not index
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
