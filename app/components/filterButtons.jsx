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
}) {
  const defaultStyles = useDefaultStyles();
  const [showModal, setShowModal] = useState(false);
  const [range, setRange] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  console.log("button render");

  return (
    <View style={{ marginHorizontal: 2 }}>
      <Button
        size={size ? size : "xl"}
        className={btnClass ? btnClass : null}
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
                  whenClick({
                    start: params.startDate,
                    end: params.endDate,
                  });
                  return setRange({
                    startDate: params.startDate,
                    endDate: params.endDate,
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
