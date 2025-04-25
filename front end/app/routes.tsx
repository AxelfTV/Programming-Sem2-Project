import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import RouteCard from "@/components/RouteCard";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";
import { getAllRoutes, getRoute, getRouteRating } from "@/components/api/routeAPI";
import { router } from "expo-router";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface RouteDisplay {
  id: string;
  routename: string;
  routeImage: string;
  rating: number;
}

const RoutesScreen: React.FC = () => {
  const [routesDisplay, setRoutesDisplay] = useState<RouteDisplay[]>([]);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const routes = await getAllRoutes();
        const displayData = await Promise.all(
          routes.map(async (route) => {
            // Fetch route info for image
            const info = await getRoute(Number(route.id));
            const imageSrc =
              info && info[0]
                ? `${API_URL}${info[0].locations[0].image_src}`
                : "";
            // Fetch current rating
            let ratingValue = 0;
            try {
              const fetchedRating = await getRouteRating(Number(route.id));
              ratingValue = typeof fetchedRating === 'number' ? fetchedRating : parseFloat(fetchedRating as any);
            } catch (err) {
              console.warn(`Failed to fetch rating for route ${route.id}:`, err);
            }
            return {
              id: route.id.toString(),
              routename: route.name,
              routeImage: imageSrc,
              rating: ratingValue,
            };
          })
        );
        setRoutesDisplay(displayData);
      } catch (err) {
        console.error("Error fetching routes:", err);
      }
    }
    fetchRoutes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />

      <View style={styles.routeContainer}>
        <Text style={styles.sectionTitle}>Routes based on your interests</Text>
        <View style={styles.cardGrid}>
          {routesDisplay.slice(0, 3).map((route) => (
            <RouteCard
              key={route.id}
              id={route.id}
              image={route.routeImage}
              name={route.routename}
              rating={route.rating}
              onPress={() =>
                router.push({ pathname: "/routeSelect", params: { routeId: route.id } })
              }
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>All routes</Text>
        <View style={styles.cardGrid}>
          {routesDisplay.map((route) => (
            <RouteCard
              key={route.id}
              id={route.id}
              image={route.routeImage}
              name={route.routename}
              rating={route.rating}
              onPress={() =>
                router.push({ pathname: "/routeSelect", params: { routeId: route.id } })
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RoutesScreen;
