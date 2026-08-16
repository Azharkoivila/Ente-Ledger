const isDev = process.env.APP_VARIANT === "development";
export default {
  expo: {
    name: "Ente Ledger",
    slug: "ente-ledger",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/iconG.png",
    scheme: "enteledger",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: isDev
        ? "com.azharkoivila.enteledger.dev"
        : "com.azharkoivila.enteledger",
    },
    androidNavigationBar: {
      backgroundColor: "#000000",
      barStyle: "light-content",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/iconG.png",
        backgroundImage: "./assets/images/iconG.png",
        monochromeImage: "./assets/images/iconG.png",
      },
      edgeToEdgeEnabled: false,
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
          image: "./assets/images/spashG.png",
          resizeMode: "cover",
          backgroundColor: "#000000",
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
