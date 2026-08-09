import { useState } from "react";
import { View } from "react-native";
import FilterButtons from "./filterButtons";

export default function FilterContainer({ whenClick }) {
  const [activeId, setActiveId] = useState(0);
  const buttons = ["Weekly", "Monthly", "Yearly", "Custom Date"];
  const [date, Setdate] = useState();
  console.log("gr render");

  return (
    <View style={{ flexDirection: "row" }}>
      {buttons.map((name, index) => (
        <FilterButtons
          text={name}
          state={activeId}
          setState={setActiveId}
          btnClass={
            activeId === index
              ? null //default
              : "bg-white"
          }
          btnTxtClass={
            activeId === index
              ? "text-[#FFFFFF]" //default
              : "text-[#0362fc]"
          }
          opt={{ index }}
          key={index}
          whenClick={whenClick}
        ></FilterButtons>
      ))}
    </View>
  );
}
