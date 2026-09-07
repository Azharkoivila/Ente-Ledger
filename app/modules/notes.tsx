import { Avatar } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { User } from "lucide-react-native";

import { TrashIcon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { deleteNote } from "@/src/utils/db/services/notesService";
import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { memo, useCallback, useState } from "react";
import { TouchableOpacity, Vibration, View } from "react-native";

const Notes = memo(function Notes({ item, onPress, onLongPress, user }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item.id!)}
      onLongPress={() => {
        onLongPress(item.id);
      }}
    >
      <>
        <Card className="p-5 rounded-lg max-w-[360px] m-3">
          <Text className="text-sm font-normal text-foreground/70">
            {dayjs(item.createdAt).format("DD/MM/YYYY")}
          </Text>
          <VStack>
            <Heading size="md" className="mb-4">
              {item.noteTitle}
            </Heading>
            <Text size="sm">{item.noteBody}</Text>
          </VStack>
          <Box className="flex-row">
            <Avatar className="mr-3 bg-indigo-600">
              <Icon as={User} size="lg" className="stroke-white" />
            </Avatar>
            <VStack>
              <Heading size="sm" className="mb-1">
                {user}
              </Heading>
              <Text size="sm">Ente Ledger User</Text>
            </VStack>
          </Box>
        </Card>
      </>
    </TouchableOpacity>
  );
});

export default function NoteList({ notes, user }) {
  const [currentUser] = user;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handlePress = useCallback(
    (id) => {
      router.push({
        pathname: "/modules/(noteViewer)/[id]",
        params: { id },
      });
    },
    [router],
  );

  const handleLongPress = useCallback((id) => {
    Vibration.vibrate(15);
    setSelectedNoteId(id);
    setShowModal(true);
  }, []);

  if (!notes.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("@/assets/lottie/bee.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-typography-900 text-sm font-semibold">
          No transactions yet
        </Text>
        <NewNoteButton />
      </View>
    );
  }

  return (
    <View className="flex-1 mt-1">
      <NotesHeader />
      <FlashList
        data={notes}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => {
          return (
            <Notes
              item={item}
              NewNoteButton
              onPress={handlePress}
              onLongPress={handleLongPress}
              user={currentUser?.accountName || "GuestUser"}
            />
          );
        }}
      />
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-[305px] items-center">
          <ModalHeader>
            <Box className="w-[56px] h-[56px] rounded-full bg-white items-center justify-center">
              <Icon
                as={TrashIcon}
                className="stroke-destructive"
                size="xl"
                color="red"
              />
            </Box>
          </ModalHeader>
          <ModalBody className="mt-0 mb-4">
            <Heading size="md" className="mb-2 text-center">
              Delete blog post
            </Heading>
            <Text size="sm" className="text-foreground/60 text-center">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </Text>
          </ModalBody>
          <ModalFooter className="w-full">
            <Button
              variant="outline"
              action="secondary"
              size="sm"
              onPress={() => {
                setShowModal(false);
              }}
              className="flex-grow"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={(e) => {
                setShowModal(false);
                deleteNote(selectedNoteId);
              }}
              size="sm"
              className="flex-grow"
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <NewNoteButton />
    </View>
  );
}

function NewNoteButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/modules/(noteEditor)/new");
  };

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
    >
      <Button
        onPress={handlePress}
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <ButtonText
          style={{
            fontSize: 28,
            lineHeight: 30,
          }}
        >
          +
        </ButtonText>
      </Button>
    </View>
  );
}

function NotesHeader() {
  return (
    <Box className="px-4 pt-4 pb-3">
      <Box className="mb-5">
        <Text
          className="text-[20px]"
          style={{
            fontFamily: "ubuntu-Bold",
          }}
        >
          Notes
        </Text>

        <Text className="text-sm text-typography-500 mt-1">
          Capture your thoughts and ideas
        </Text>
      </Box>
      {/* // future feature */}
      {/* <Input
        variant="rounded"
        size="lg"
        className="h-12 bg-background-100 border-0"
      >
        <InputSlot className="pl-4">
          <InputIcon as={SearchIcon} className="text-typography-500" />
        </InputSlot>

        <InputField
          placeholder="Search notes..."
          placeholderTextColor="#9CA3AF"
          className="text-base"
        />
      </Input> */}
    </Box>
  );
}
