import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/app/styles/Styles";

// 修改 onpress 类型为函数
interface RouteCardProps {
  image: any;
  name: string;
  rating: number;
  id: string;
  onPress: () => void; // 这里修改为无参数的函数
}

const RouteCard: React.FC<RouteCardProps> = ({ image, name, rating, id, onPress }) => {
  const router = useRouter();

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

        {/* 跳转按钮 */}
        <TouchableOpacity onPress={onPress} style={styles.goButton}>
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RouteCard;
