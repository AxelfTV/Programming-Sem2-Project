// RouteHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import styles from "@/app/styles/Styles";
import HeadIcon from "@/components/HeadIcon";
import { useUser } from "@/components/UserContext";
import { getUserActiveInstance } from "@/components/api/routeAPI"; 

export default function RouteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const handleRoutePress = async () => {
    if (!user) {
      return;
    }
    try {
      const instance = await getUserActiveInstance(user.id);
      if (instance && instance.length!=0) {
        router.push({pathname: "/CurrentRoute",params:{routeId: instance[0].route_id}});
      } else {
        router.push({pathname: "/routes"  });
      }
    } catch (error) {
      router.push("/routes"); // 默认跳转
    }
  };

  const handleProfilePress = () => {
    if (user) {
      router.push({ pathname: "/(tabs)/profile", params: { userId: user.id.toString() } });
    } 
  };

  return (
    <View style={styles.header}>
      <HeadIcon />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.push("/homepage")}>
          <Text style={[styles.navLink, pathname === "/homepage" && styles.activeLink]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRoutePress}>
          <Text style={[styles.navLink, pathname === "/CurrentRoute" && styles.activeLink]}>
            Route
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/routes")}>
          <Text style={[styles.navLink, pathname === "/routes" && styles.activeLink]}>
            Explore
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfilePress}>
          <Text style={[styles.navLink, pathname === "/profile" && styles.activeLink]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
