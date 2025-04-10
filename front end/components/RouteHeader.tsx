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
        {/* Home Page */}
        <TouchableOpacity onPress={() => router.push("/CurrentRoute")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/homepage" && styles.activeLink,
            ]}
            // style={styles.navLink}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Current Route */}
        <TouchableOpacity onPress={() => router.push("/CurrentRoute")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/CurrentRoute" && styles.activeLink,
            ]}
            // style={styles.navLink}
          >
            Route
          </Text>
        </TouchableOpacity>

        {/* Explore Routes */}
        <TouchableOpacity onPress={() => router.push("/routes")}>
          <Text
            style={[
              styles.navLink,
              pathname === "/routes" && styles.activeLink,
            ]}
          >
            Explore
          </Text>
        </TouchableOpacity>

        {/* Profile */}
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
