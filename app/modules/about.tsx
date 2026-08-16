import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import * as Application from "expo-application";
import { Image } from "expo-image";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GITHUB_URL = "https://github.com/azharkoivila/ledger-app";
const GITHUB_PROFILE = "https://github.com/azharkoivila";
const ISSUES_URL = `${GITHUB_URL}/issues`;
const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;

function LinkRow({ icon, label, sublabel, onPress, isLast }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#F1F1EF",
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: "#F0FDFA",
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
            fontFamily: "Jakarta-SemiBold",
            color: "#111827",
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
      <Feather name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

export default function AboutScreen() {
  const version = Application.nativeApplicationVersion ?? "1.0.0";
  const build = Application.nativeBuildVersion ?? "1";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F8FA" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Identity block */}
      <View style={{ alignItems: "center", paddingTop: 36, paddingBottom: 28 }}>
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            backgroundColor: "#9fb5b300",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <Image
            source={require("@/assets/images/iconG.png")}
            style={{ width: 80, height: 80 }}
            contentFit="contain"
          />
        </View>
        <Text
          style={{ fontSize: 19, fontFamily: "Jakarta-Bold", color: "#111827" }}
        >
          എന്റെ ലെഡ്ജർ
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Jakarta-Regular",
            color: "#6B7280",
            marginTop: 4,
            textAlign: "center",
            paddingHorizontal: 40,
          }}
        >
          A simple, private ledger for tracking your income and expenses
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 14,
            backgroundColor: "#F0FDF4",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <AntDesign
            name="checkcircle"
            size={11}
            color="#15803D"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Jakarta-SemiBold",
              color: "#15803D",
            }}
          >
            Open source · MIT licensed
          </Text>
        </View>
      </View>

      {/* Developer card */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
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
          Developer
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Linking.openURL(GITHUB_PROFILE)}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#EEF0F2",
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "#111827",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <AntDesign name="github" size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Jakarta-SemiBold",
                color: "#111827",
              }}
            >
              Azhar Koivila
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Jakarta-Regular",
                color: "#6B7280",
                marginTop: 1,
              }}
            >
              @azharkoivila · Creator & maintainer
            </Text>
          </View>
          <Feather name="external-link" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Open source section */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
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
          Open source
        </Text>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#EEF0F2",
            overflow: "hidden",
          }}
        >
          <LinkRow
            icon={<AntDesign name="github" size={17} color="#0F766E" />}
            label="View source on GitHub"
            sublabel="Star the repo, browse the code"
            onPress={() => Linking.openURL(GITHUB_URL)}
          />
          <LinkRow
            icon={<Feather name="alert-circle" size={17} color="#0F766E" />}
            label="Report an issue"
            sublabel="Found a bug? Let us know"
            onPress={() => Linking.openURL(ISSUES_URL)}
          />
          <LinkRow
            icon={<Feather name="file-text" size={17} color="#0F766E" />}
            label="MIT License"
            sublabel="Free to use, modify, and share"
            onPress={() => Linking.openURL(LICENSE_URL)}
            isLast
          />
        </View>
      </View>

      {/* Acknowledgements */}
      <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
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
          Built with
        </Text>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#EEF0F2",
            padding: 14,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {[
            "Expo",
            "React Native",
            "WatermelonDB",
            "gluestack-ui",
            "NativeWind",
          ].map((tech) => (
            <View
              key={tech}
              style={{
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Jakarta-Medium",
                  color: "#374151",
                }}
              >
                {tech}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={{ alignItems: "center", marginTop: 8 }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "PlexMono-Medium",
            color: "#9CA3AF",
          }}
        >
          v{version} ({build})
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Jakarta-Regular",
            color: "#D1D5DB",
            marginTop: 4,
          }}
        >
          Made with care, for people who count their money
        </Text>
      </View>
    </ScrollView>
  );
}
