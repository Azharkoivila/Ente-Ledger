import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import {
  setAccount,
  updateAccount,
} from "@/src/utils/db/services/accountService";
import { flushTransactions } from "@/src/utils/db/services/transactionService";
import storageService from "@/src/utils/storage/storageService";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SectionHeader({ label }) {
  return (
    <Text
      style={{
        fontSize: 12,
        fontFamily: "Jakarta-SemiBold",
        color: "#9CA3AF",
        marginBottom: 8,
        marginLeft: 4,
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      {label}
    </Text>
  );
}

function Card({ children }) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#EEF0F2",
        overflow: "hidden",
      }}
    >
      {children}
    </View>
  );
}

function Row({ icon, tint, label, sublabel, right, onPress, isLast, danger }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#F1F1EF",
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          backgroundColor: tint || "#F0FDFA",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Jakarta-Medium",
            color: danger ? "#DC2626" : "#111827",
          }}
        >
          {label}
        </Text>
        {sublabel ? (
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Jakarta-Regular",
              color: "#6B7280",
              marginTop: 1,
            }}
          >
            {sublabel}
          </Text>
        ) : null}
      </View>
      {right}
    </Wrapper>
  );
}

export default function SettingsScreen({ user }) {
  const [currentUser] = user || [];

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userInput, setUserInput] = useState(currentUser?.accountName || "");
  const [userId, setUserId] = useState();
  //model
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  useEffect(() => {
    async function loadSettings() {
      try {
        if (currentUser?.accountId) {
          setUserId(currentUser.accountId);
          setUserInput(currentUser.accountName);
          console.log("hello", currentUser.accountName);
          console.log("id", currentUser.accountId);
        } else {
          console.log("empty");
        }
        const status = await storageService.getBiometric();
        setBiometricLock(Boolean(status));
      } catch (error) {
        console.error("Failed to load biometric settings:", error);
      }
    }
    loadSettings();
  }, []);
  const handleBiometric = async (value) => {
    try {
      setBiometricLock(value); // Optimistic UI update
      await storageService.setBiometric(value);
    } catch (error) {
      console.error("Failed to save biometric setting:", error);
      setBiometricLock(!value); // Revert UI on error
    }
    console.log("handle", await storageService.getBiometric());
  };
  const handleClearData = () => {
    Alert.alert(
      "Delete all data?",
      "This permanently removes every transaction and category. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete everything",
          style: "destructive",
          onPress: () => {
            flushTransactions();
            console.log("wipe confirmed");
          },
        },
      ],
    );
  };
  const handleUser = () => {
    if (userId) {
      updateAccount(userInput, userId);
    } else {
      setAccount(userInput);
    }
  };
  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F7F8FA" }}
        contentContainerStyle={{ paddingBottom: 40 + insets.bottom }}
      >
        <View
          style={{ paddingTop: 20, paddingHorizontal: 20, marginBottom: 20 }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Jakarta-Bold",
              color: "#111827",
            }}
          >
            Settings
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Jakarta-Regular",
              color: "#6B7280",
              marginTop: 2,
            }}
          >
            Manage your preferences and data
          </Text>
        </View>

        {/* Preferences */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <SectionHeader label="Preferences" />
          <Card>
            <Row
              icon={<Feather name="dollar-sign" size={16} color="#0F766E" />}
              label="Currency"
              sublabel="Now only Support Indian Rupee"
              onPress={() => {}}
              right={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "PlexMono-Medium",
                      color: "#6B7280",
                      marginRight: 4,
                    }}
                  >
                    ₹ INR
                  </Text>
                  <Feather name="chevron-right" size={16} color="#9CA3AF" />
                </View>
              }
            />
            <Row
              icon={<Feather name="user" size={16} color="#0F766E" />}
              label="User Name"
              sublabel="Set UserName"
              onPress={() => setShowModal(true)}
              right={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "PlexMono-Medium",
                      color: "#6B7280",
                      marginRight: 4,
                    }}
                  ></Text>
                  <Feather name="chevron-right" size={16} color="#9CA3AF" />
                </View>
              }
            />
            {/* <Row
            icon={<Feather name="moon" size={16} color="#0F766E" />}
            label="Dark mode"
            sublabel="Match system appearance"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E5E7EB", true: "#99F6E4" }}
                thumbColor={darkMode ? "#0F766E" : "#FFFFFF"}
              />
            }
          />
          <Row
            icon={<Feather name="bell" size={16} color="#0F766E" />}
            label="Notifications"
            sublabel="Daily reminders to log spending"
            isLast
            right={
              <Switch
                value={notifications}
                disabled
                onValueChange={setNotifications}
                trackColor={{ false: "#E5E7EB", true: "#99F6E4" }}
                thumbColor={notifications ? "#0F766E" : "#FFFFFF"}
              />
            }
          /> */}
          </Card>
        </View>

        {/* Security */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <SectionHeader label="Security" />
          <Card>
            <Row
              icon={<Feather name="lock" size={16} color="#0F766E" />}
              label="Biometric lock"
              sublabel="Require Face ID / fingerprint to open"
              isLast
              right={
                <Switch
                  value={biometricLock}
                  onValueChange={handleBiometric}
                  trackColor={{ false: "#E5E7EB", true: "#99F6E4" }}
                  thumbColor={biometricLock ? "#0F766E" : "#FFFFFF"}
                />
              }
            />
          </Card>
        </View>

        {/* Data */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <SectionHeader label="Data" />
          <Card>
            {/* <Row
            icon={<Feather name="download" size={16} color="#0F766E" />}
            label="Export as CSV"
            sublabel="Download all transactions"
            onPress={() => {}}
            right={<Feather name="chevron-right" size={16} color="#9CA3AF" />}
          />
          <Row
            icon={<Feather name="upload" size={16} color="#0F766E" />}
            label="Backup to file"
            sublabel="Save a local backup"
            onPress={() => {}}
            right={<Feather name="chevron-right" size={16} color="#9CA3AF" />}
          /> */}
            <Row
              icon={<Feather name="folder" size={16} color="#0F766E" />}
              label="Manage categories"
              onPress={() => router.push("/(drawer)/categoriesDrawer")}
              isLast
              right={<Feather name="chevron-right" size={16} color="#9CA3AF" />}
            />
          </Card>
        </View>

        {/* About link */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <SectionHeader label="Support" />
          <Card>
            <Row
              icon={<Feather name="info" size={16} color="#0F766E" />}
              label="About Ente Ledger"
              sublabel="Version, license, source"
              onPress={() => router.push("/(drawer)/aboutDrawer")}
              isLast
              right={<Feather name="chevron-right" size={16} color="#9CA3AF" />}
            />
          </Card>
        </View>

        {/* Danger zone */}
        <View style={{ marginHorizontal: 16 }}>
          <SectionHeader label="Danger zone" />
          <Card>
            <Row
              icon={<AntDesign name="delete" size={15} color="#DC2626" />}
              tint="#FEF2F2"
              label="Delete all data"
              sublabel="Permanently erase every transaction"
              onPress={handleClearData}
              danger
              isLast
              right={<Feather name="chevron-right" size={16} color="#FCA5A5" />}
            />
          </Card>
        </View>
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading>Set User Name ?</Heading>
            <Text size="sm">Set name Will shows on your transaction PDF</Text>
          </ModalHeader>
          <ModalBody className="mb-4">
            <Input>
              <InputField
                value={userInput}
                onChange={(e) => setUserInput(e.nativeEvent.text)}
                placeholder="Enter your Name"
              />
            </Input>
          </ModalBody>
          <ModalFooter className="flex-col items-start">
            <Button
              onPress={() => {
                handleUser();
                setShowModal(false);
              }}
              className="w-full"
            >
              <ButtonText>Submit and Close</ButtonText>
            </Button>
            <Button
              variant="link"
              size="sm"
              onPress={() => {
                setShowModal(false);
              }}
              className="gap-1"
            >
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back to Settings</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* //future use models */}
      {/* <Modal
        isOpen={showModal2}
        onClose={() => {
          setShowModal2(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading>Reset password</Heading>
            <Text size="sm">
              A verification code has been sent to you. Enter code below.
            </Text>
          </ModalHeader>
          <ModalBody className="mb-4">
            <Input>
              <InputField placeholder="Enter verification code" />
            </Input>
          </ModalBody>
          <ModalFooter className="flex-col items-start">
            <Button
              onPress={() => {
                setShowModal3(true);
              }}
              className="w-full"
            >
              <ButtonText>Continue</ButtonText>
            </Button>
            <HStack space="xs" className="items-center">
              <Text size="sm">Didn't receive the email?</Text>
              <Link>
                <LinkText
                  size="xs"
                  className="text-foreground/80 font-semibold"
                >
                  Click to resend
                </LinkText>
              </Link>
            </HStack>
            <HStack space="xs" className="items-center">
              <Button
                variant="link"
                size="sm"
                onPress={() => {
                  setShowModal2(false);
                }}
                className="gap-1"
              >
                <ButtonIcon as={ArrowLeftIcon} />
                <ButtonText>Back to login</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showModal3}
        onClose={() => {
          setShowModal3(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading>Set new password</Heading>
            <Text size="sm">
              Almost done. Enter your new password and you are all set.
            </Text>
          </ModalHeader>
          <ModalBody className="" contentContainerClassName="gap-3">
            <Input>
              <InputField placeholder="New password" />
            </Input>
            <Input>
              <InputField placeholder="Confirm new password" />
            </Input>
          </ModalBody>
          <ModalFooter className="flex-col items-start">
            <Button
              onPress={() => {
                setShowModal(false);
                setShowModal2(false);
                setShowModal3(false);
              }}
              className="w-full"
            >
              <ButtonText>Submit</ButtonText>
            </Button>
            <Button
              variant="link"
              size="sm"
              onPress={() => {
                setShowModal3(false);
              }}
              className="gap-1"
            >
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back to login</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
}
