// src/app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="price"
          options={{
            presentation: "card",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="priceform"
          options={{
            presentation: "card",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
