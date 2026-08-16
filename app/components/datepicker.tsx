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
import { CustomDatePickerProps } from "@/src/types";
import dayjs from "dayjs";
import { useState } from "react";
import { View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

export default function CustomDatePicker({
  value,
  onChange,
}: CustomDatePickerProps) {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  const [showModal, setShowModal] = useState(false);
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Button
        onPress={() => setShowModal(true)}
        size="lg"
        className="bg-[#0F766E]"
      >
        <ButtonText>{dayjs(value).format("DD/MM/YYYY")}</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Pic A Date</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => {
                onChange({ name: "date", value: date });
                setSelected(date);
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
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              className="bg=[#0F766E]"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}
