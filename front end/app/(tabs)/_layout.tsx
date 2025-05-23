// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useUser } from "@/components/UserContext";
import { Redirect } from "expo-router";

export default function TabLayout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Home",
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
