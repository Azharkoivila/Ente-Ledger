import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { FilterButtonsProps } from "@/src/types";
import dayjs from "dayjs";
import { useState } from "react";
import { View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

//rename it filter buttons
export default function FilterButtons({
  text,
  variant,
  size,
  btnClass,
  btnTxtClass,
  state,
  setState,
  opt,
  whenClick,
}: FilterButtonsProps) {
  const defaultStyles = useDefaultStyles();
  const [showModal, setShowModal] = useState(false);
  const [range, setRange] = useState<{
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
  }>({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  console.log("button render");

  return (
    <View style={{ marginHorizontal: 2 }}>
      <Button
        size={size ? size : "xl"}
        className={btnClass ? btnClass : undefined}
        onPress={() => {
          setState(() => opt.index);
          if (text === "Custom Date") {
            console.log("select range");

            return setShowModal(true);
          } else {
            whenClick(text);
            // may be i can done here to get filter ,
          }
        }}
      >
        <ButtonText className={btnTxtClass}>{text}</ButtonText>
        <Modal
          isOpen={showModal}
          onClose={() => {
            console.log("on close");

            setRange({
              startDate: dayjs(),
              endDate: dayjs(),
            });
            setShowModal(false);
          }}
          size="lg"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Pic A Range</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <DateTimePicker
                mode="range"
                startDate={range.startDate}
                endDate={range.endDate}
                onChange={(params) => {
                  const start = params.startDate
                    ? dayjs(params.startDate)
                    : dayjs();
                  const end = params.endDate ? dayjs(params.endDate) : dayjs();
                  whenClick({
                    start: params.startDate,
                    end: params.endDate,
                  });
                  return setRange({
                    startDate: start,
                    endDate: end,
                  });
                }}
                styles={defaultStyles}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                className="mr-3"
                onPress={() => {
                  setRange({
                    startDate: dayjs(),
                    endDate: dayjs(),
                  });

                  setShowModal(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                className="bg-[#0F766E]"
                onPress={() => {
                  setRange({
                    startDate: dayjs(),
                    endDate: dayjs(),
                  });

                  setShowModal(false);
                }}
              >
                <ButtonText>Save</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    </View>
  );
}
