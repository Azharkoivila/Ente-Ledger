import { FilterContainerProps } from "@/src/types";
import { useState } from "react";
import { View } from "react-native";
import FilterButtons from "./filterButtons";

export default function FilterContainer({ whenClick }: FilterContainerProps) {
  const [activeId, setActiveId] = useState<number>(0);
  const buttons = ["Weekly", "Monthly", "Yearly", "Custom Date"]; //! not like professional
  console.log("gr render");

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {buttons.map((name, index) => (
        <FilterButtons
          text={name}
          state={activeId}
          setState={setActiveId}
          btnClass={
            activeId === index
              ? "bg-[#0F766E]" //default
              : "bg-white border border-[#E5E7EB]"
          }
          btnTxtClass={
            activeId === index
              ? "text-[#FFFFFF]" //default
              : "text-[#6B7280]"
          }
          opt={{ index }}
          key={index}
          whenClick={whenClick}
        ></FilterButtons>
      ))}
    </View>
  );
}
