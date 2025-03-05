import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import styles from "@/app/styles/Styles";

interface RouteCardProps {
  image: any;
  name: string;
  rating: number;
}

const RouteCard: React.FC<RouteCardProps> = ({ image, name, rating }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardRating}>{rating.toFixed(1)} rating</Text>
        </View>

        <Text style={styles.cardDetails}>Number of Destinations</Text>
        <Text style={styles.cardDetails}>Total distance</Text>
        <Text style={styles.cardDetails}>Time estimate</Text>

        {/* button */}
        <TouchableOpacity
          onPress={() => router.push("/CurrentRoute")}
          style={styles.goButton}
        >
          <Text
            style={[
              styles.goButtonText,
              pathname === "/CurrentRoute" && styles.activeLink,
            ]}
          >
            GO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RouteCard;
