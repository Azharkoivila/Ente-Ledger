import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

// npm install react-native-svg @expo/vector-icons

interface LedgerAppBannerProps {
  name?: string;
  email?: string;
  avatarUri?: string;
  appName?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 700);
const CARD_HEIGHT = CARD_WIDTH * 0.28;

export default function LedgerAppBanner({
  name = "John Doe",
  email = "johndoe@email.com",
  avatarUri,
  appName = "Ledger App",
}: LedgerAppBannerProps) {
  return (
    <View style={styles.outer}>
      <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
        {/* Decorative wave background */}
        <Svg
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          style={StyleSheet.absoluteFill}
          viewBox="0 0 700 196"
        >
          <Defs>
            <LinearGradient id="waveBlue" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#2f6fed" />
              <Stop offset="1" stopColor="#1746c9" />
            </LinearGradient>
          </Defs>

          {/* Light gray/blue back wave */}
          <Path
            d="M0,140 C150,110 300,150 460,120 C560,100 640,60 700,70 L700,196 L0,196 Z"
            fill="#e3e8f5"
          />
          {/* Teal/green accent stripe */}
          <Path
            d="M0,160 C150,130 300,170 460,140 C560,120 640,85 700,95 L700,110 C640,100 560,135 460,155 C300,185 150,145 0,175 Z"
            fill="#3fd6a3"
          />
          {/* Main blue wave (front) */}
          <Path
            d="M0,175 C150,145 300,185 460,155 C560,135 640,100 700,110 L700,196 L0,196 Z"
            fill="url(#waveBlue)"
          />
        </Svg>

        {/* Left: avatar + name/email */}
        <View style={styles.leftBlock}>
          <View style={styles.avatarWrap}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <MaterialCommunityIcons
                  name="account"
                  size={40}
                  color="#9aa3b2"
                />
              </View>
            )}
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Center: app icon + name */}
        <View style={styles.centerBlock}>
          <MaterialCommunityIcons
            name="chart-bar"
            size={30}
            color="#3fd6a3"
            style={styles.chartIcon}
          />
          <Text style={styles.appName}>{appName}</Text>
        </View>

        {/* Right: illustration */}
        <View style={styles.rightBlock}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={64}
            color="#1746c9"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfe2e8",
    paddingVertical: 24,
  },
  card: {
    backgroundColor: "#f5f7fb",
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  leftBlock: {
    zIndex: 2,
    justifyContent: "center",
  },
  avatarWrap: {
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    backgroundColor: "#e1e4ea",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2a44",
  },
  email: {
    fontSize: 13,
    color: "#5b6472",
    marginTop: 2,
  },
  centerBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  chartIcon: {
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2a44",
  },
  rightBlock: {
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
