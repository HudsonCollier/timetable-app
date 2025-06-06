import { Redirect } from "expo-router";

/**
 * Entry point for my program, upon opening you are redirected to the login screen
 */
export default function Index() {
  return <Redirect href="/LoginScreen" />;
}