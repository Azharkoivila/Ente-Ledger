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

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    async function loadSettings() {
      try {
        console.log("Effect", await storageService.getBiometric());
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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F8FA" }}
      contentContainerStyle={{ paddingBottom: 40 + insets.bottom }}
    >
      <View style={{ paddingTop: 20, paddingHorizontal: 20, marginBottom: 20 }}>
        <Text
          style={{ fontSize: 22, fontFamily: "Jakarta-Bold", color: "#111827" }}
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
  );
}
