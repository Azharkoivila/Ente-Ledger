import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Drawer } from "expo-router/drawer";
import LedgerDrawerBanner from "../components/drawerHeader";

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <LedgerDrawerBanner {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#0F766E",
        drawerActiveBackgroundColor: "#ECFDF5",
        drawerInactiveTintColor: "#6B7280",
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
        },
        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 8,
        },
        drawerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#111827",
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="(home)"
        options={{
          drawerActiveTintColor: "#0F766E",
          drawerActiveBackgroundColor: "#ECFDF5",
          drawerInactiveTintColor: "#6B7280",
          headerTitleStyle: {
            color: "#0F766E",
            fontFamily: "kurumpi-az",
            fontSize: 40, // Distinct color for just this screen
          },
          drawerLabel: "Home",
          title: "എന്റെ ലെഡ്ജർ",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="reportDrawer"
        options={{
          drawerLabel: "Reports",
          title: "Reports",
          drawerIcon: ({ color, size }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="categoryReportsDrawer"
        options={{
          drawerLabel: "Category Reports",
          title: "Category Reports",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="playlist-add-check-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="categoriesDrawer"
        options={{
          drawerLabel: "Categories",
          title: "Categories",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settingsDrawer"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="aboutDrawer"
        options={{
          drawerLabel: "About",
          title: "About",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="engineering" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
