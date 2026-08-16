import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, {
  Defs,
  Path,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

// npm install react-native-svg

const BANNER_HEIGHT = 170;
const TypedDefs = Defs as any;
export default function LedgerDrawerBanner(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0, marginTop: 20 }}
    >
      <View style={styles.banner}>
        <LinearGradient
          colors={["#0B4F44", "#0F766E", "#14A085"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* layered wave sitting at the bottom of the banner */}
        <Svg
          width="100%"
          height={60}
          viewBox="0 0 400 60"
          style={[styles.wave]}
          preserveAspectRatio="none"
        >
          <TypedDefs>
            <SvgGradient id="waveFade" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.3" />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.12" />
            </SvgGradient>
          </TypedDefs>
          <Path
            d="M0,30 C80,60 160,0 240,20 C300,35 340,10 400,25 L400,60 L0,60 Z"
            fill="url(#waveFade)"
          />
          <Path
            d="M0,45 C90,20 170,55 260,35 C320,22 360,45 400,38 L400,60 L0,60 Z"
            fill="#F7F8FA"
          />
        </Svg>

        {/* content */}
        <View style={styles.center}>
          <View style={styles.iconBadge}>
            <Image
              source={require("@/assets/images/iconG.png")}
              style={styles.icon}
              contentFit="contain"
            />
          </View>
          <Text style={styles.title}>എന്റെ ലെഡ്ജർ</Text>
          <Text style={styles.subtitle}>ആറ്റില്‍ കളഞ്ഞാലും അളന്നു കളയണം !</Text>
        </View>
      </View>

      <View style={styles.menuWrap}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: BANNER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 25,
    color: "#FFFFFF",
    fontFamily: "chilanka-az",
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "chilanka-az",
    paddingBottom: 15,
  },
  menuWrap: {
    paddingTop: 8,
  },
});
