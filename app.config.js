const isDev = process.env.APP_VARIANT === "development";
console.log(isDev);

export default {
  expo: {
    name: "Ente Ledger",
    slug: "ente-ledger",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "enteledger",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: isDev
        ? "com.azharkoivila.enteledger.dev"
        : "com.azharkoivila.enteledger",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: isDev
        ? "com.azharkoivila.enteledger.dev"
        : "com.azharkoivila.enteledger",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-font",
        {
          fonts: ["./assets/fonts/Chilanka-Regular.ttf"],
        },
      ],
      ["expo-secure-store"],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "ca95203b-6bae-4cf9-a620-7699e375a74e",
      },
    },
  },
};
