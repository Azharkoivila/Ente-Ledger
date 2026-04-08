import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
export default function TabsLayouts() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#00C853",
            tabBarInactiveTintColor: "#999",
            tabBarStyle: {
                backgroundColor: "#fff",

            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Overview',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="fund" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="pie-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categoryReports"
                options={{
                    title: 'Category Reports',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="playlist-add-check-circle" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="newEntry"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="new-message" size={size} color={color} />
                    ),
                }}
            />


        </Tabs>
    )
}
