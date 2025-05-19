import { Stack } from "expo-router";

export default function TimetablesLayout() {
  return <Stack 
    screenOptions={{ headerShown: false }}>

    <Stack.Screen name="index" />
    <Stack.Screen name="results" />
  </Stack>
}
