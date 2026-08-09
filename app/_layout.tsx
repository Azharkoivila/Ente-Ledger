import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
// import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import database from "../src/db/database";
import { seedDatabaseIfNeeded } from "../src/db/seeds/seeder";
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loaded, error] = useFonts({
    //! remove when final build
    "Nupuram-Calligraphy-Bold": require("../assets/fonts/ttf/Nupuram-Calligraphy-Bold.ttf"),
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

  if ((!loaded && !error) || !isReady) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        {/* <DatabaseProvider database={database}> */}
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        {/* </DatabaseProvider> */}
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
