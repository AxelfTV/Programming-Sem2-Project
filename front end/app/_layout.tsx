// app/_layout.tsx
import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { UserProvider } from "@/components/UserContext";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FCE2A9" }}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </View>
  );
}