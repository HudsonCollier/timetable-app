import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f7c600",
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
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTopWidth: 0,
          elevation: 0,
        },
        headerTitleAlign: "center",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          marginTop: 2,
        },        
      }}
    >

      
      <Tabs.Screen
        name="(timetables)"
        options={{
          headerShown: false,
          tabBarLabel: "Timetables",
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
        name="trips"
        options={{
          headerShown: false,
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="albums-outline" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
