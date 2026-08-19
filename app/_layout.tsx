import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
// import { DatabaseProvider } from "@nozbe/watermelondb/react";
import storageService from "@/src/utils/storage/storageService";
import { useFonts } from "expo-font";
import * as LocalAuthentication from "expo-local-authentication";
import { SplashScreen, Stack } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { AppState, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import database from "../src/db/database";
import { seedDatabaseIfNeeded } from "../src/db/seeds/seeder";
export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isAuthenticating = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, error] = useFonts({
    //! remove when final build
    "Nupuram-Calligraphy-Bold": require("../assets/fonts/ttf/Nupuram-Calligraphy-Bold.ttf"),
    "chilanka-az": require("@/assets/fonts/malayalam/Chilanka-Regular.ttf"),
    "kurumpi-az": require("@/assets/fonts/malayalam/Karumbi-Regular.ttf"),
    "ubuntu-Bold": require("@/assets/fonts/ubuntu/Ubuntu-Bold.ttf"),
    "ubuntu-BoldItalic": require("@/assets/fonts/ubuntu/Ubuntu-BoldItalic.ttf"),
    "ubuntu-Italic": require("@/assets/fonts/ubuntu/Ubuntu-Italic.ttf"),
    "ubuntu-Light": require("@/assets/fonts/ubuntu/Ubuntu-Light.ttf"),
    "ubuntu-LightItalic": require("@/assets/fonts/ubuntu/Ubuntu-LightItalic.ttf"),
    "ubuntu-Medium": require("@/assets/fonts/ubuntu/Ubuntu-Medium.ttf"),
    "ubuntu-MediumItalic": require("@/assets/fonts/ubuntu/Ubuntu-MediumItalic.ttf"),
    "ubuntu-Regular": require("@/assets/fonts/ubuntu/Ubuntu-Regular.ttf"),
  });

  useEffect(() => {
    async function initializeApplication() {
      try {
        // Seed standard datasets before rendering visible UI components
        await seedDatabaseIfNeeded(database);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    initializeApplication();

    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const triggerBiometricAuth = async () => {
    if (await storageService.getBiometric()) {
      if (isAuthenticating.current) return;
      isAuthenticating.current = true;

      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
          isAuthenticating.current = false;
          return;
        }

        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Unlock App",
          fallbackLabel: "Use Device Passcode",
        });

        if (result.success) {
          setIsUnlocked(true);
        }
      } catch (error) {
        console.error("Biometric error:", error);
      } finally {
        isAuthenticating.current = false;
      }
    } else {
      setIsUnlocked(true);
    }
  };

  useEffect(() => {
    triggerBiometricAuth();
    // const subscription = AppState.addEventListener("change", (nextAppState) => {
    //   if (appState.current === "active" && nextAppState === "background") {
    //     setIsUnlocked(false);
    //   }

    //   if (
    //     appState.current.match(/inactive|background/) &&
    //     nextAppState === "active"
    //   ) {
    //     triggerBiometricAuth();
    //   }

    //   appState.current = nextAppState;
    // });

    // return () => subscription.remove();
  }, []);

  if ((!loaded && !error) || !isReady) {
    return null;
  }
  if (!isUnlocked) {
    return (
      <View style={styles.lockContainer}>
        <LottieView
          source={require("@/assets/lottie/fingerprint.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>Application Locked</Text>
        <Text style={styles.subtitle}>
          Please authenticate to access your files.
        </Text>
        <Button
          title="Tap to Unlock"
          onPress={triggerBiometricAuth}
          color="#007AFF"
        />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        {/* <DatabaseProvider database={database}> */}
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        {/* </DatabaseProvider> */}
        <Toast topOffset={75} />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  lockContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 24,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 24,
    textAlign: "center",
  },
});
