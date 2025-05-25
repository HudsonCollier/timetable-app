import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function VerifyCodeScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    //REMOVE
    router.replace("/LoginScreen");

    const email = await SecureStore.getItemAsync("signupEmail");

    try {
      const res = await fetch("http://your-api-url/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) throw new Error("Invalid code");

      await SecureStore.deleteItemAsync("signupEmail");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Enter Verification Code</Text>

        <TextInput
          style={styles.input}
          placeholder="6-digit code"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 60, color: "#333" },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#ffd33d",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "600", color: "#000" },
  linkText: { marginTop: 20, fontSize: 14, color: "#007aff" },
});
