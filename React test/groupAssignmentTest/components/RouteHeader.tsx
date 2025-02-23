import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import styles from "@/app/styles/Styles";
import HeadIcon from "@/components/HeadIcon";

export default function RouteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.header}>
      {/* Logo */}
      <HeadIcon />

      {/* Navigation Links */}
      <View style={styles.nav}>
        {/* Current Route */}
        <TouchableOpacity onPress={() => router.push("/CurrentRoute")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/CurrentRoute" && styles.activeLink,
            ]}
            // style={styles.navLink}
          >
            Current Route
          </Text>
        </TouchableOpacity>

        {/* routes */}
        <TouchableOpacity onPress={() => router.push("/routes")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/routes" && styles.activeLink,
            ]}
          >
            Routes
          </Text>
        </TouchableOpacity>

        {/* profile */}
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/profile" && styles.activeLink,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
