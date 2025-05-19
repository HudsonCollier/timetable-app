import { Redirect, Stack } from "expo-router";
import LoginScreen from '@/components/LoginScreen';

export default function Index() {
  // return <Redirect href="/(tabs)/trips" />;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />
    </>
  );
}
