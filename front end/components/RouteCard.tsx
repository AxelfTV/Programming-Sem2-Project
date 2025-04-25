import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/app/styles/Styles";


interface RouteCardProps {
  image: any;
  name: string;
  rating: number;
  id: string;
  onPress: () => void; 
}

const RouteCard: React.FC<RouteCardProps> = ({ image, name, rating, id, onPress }) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardRating}>{rating.toFixed(1)} /5★</Text>
        </View>

        <TouchableOpacity onPress={onPress} style={styles.goButton}>
          <Text style={styles.goButtonText}>Walk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RouteCard;
