import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#0f2027",
          height: 110,
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",

        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
          fontSize: 40,
        },

        tabBarStyle: {
          backgroundColor: "rgba(44, 83, 100, 0.95)",
          borderTopWidth: 0,
          elevation: 0,
        },
        headerTitleAlign: "center",

      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "My Trips ",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Timetables",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "train" : "train-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}
