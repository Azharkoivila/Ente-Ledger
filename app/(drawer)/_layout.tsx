import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
    return (
        <Drawer screenOptions={{
            drawerActiveTintColor: "#00C853",
            drawerInactiveTintColor: "#999",
        }}>
            <Drawer.Screen
                name="(home)"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="reports"
                options={{
                    drawerLabel: 'Reports',
                    title: 'Reports',
                    drawerIcon: ({ color, size }) => (
                        <Feather name="pie-chart" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="categoryReports"
                options={{
                    drawerLabel: 'Category Reports',
                    title: 'Category Reports',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="playlist-add-check-circle" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen name='categories' options={{
                drawerLabel: 'Categories',
                title: 'Categories',
                drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="category" size={size} color={color} />
                )
            }} />
            <Drawer.Screen name='settings' options={{
                drawerLabel: "Settings",
                title: 'Settings',
                drawerIcon: ({ color, size }) => (
                    <Feather name="settings" size={size} color={color} />
                )
            }} />

            <Drawer.Screen name='about' options={{
                drawerLabel: 'About',
                title: 'About', drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="engineering" size={size} color={color} />
                )
            }} />
        </Drawer>
    );
}

