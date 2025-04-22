import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getRoute } from "@/components/api/routeAPI";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

export default function RouteSelect() {
  const { routeId } = useLocalSearchParams();
  const [routeData, setRouteData] = useState<any>(null);

  useEffect(() => {
    async function fetchRoute() {
      if (!routeId) return;
      const route = await getRoute(Number(routeId));
      setRouteData(route[0]);
    }
    fetchRoute();
  }, [routeId]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />

      <View style={styles.RouteContainer}>
        {routeData ? (
          <>
            <Text style={styles.routeTitle}>{routeData.info.name}</Text>
            {routeData.locations.map((loc: any) => (
              <View key={loc.id} style={styles.destinationBox}>
                <Text style={styles.destinationText}>{loc.name}</Text>
                <Image source={{ uri: `${API_URL}${loc.image_src}` }} style={styles.uploadedImage} />
              </View>
            ))}
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => router.push({ pathname: "/CurrentRoute", params: { routeId } })}
            >
              <Text style={styles.uploadText}>🚀 Start Route</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Loading route...</Text>
        )}
      </View>
    </ScrollView>
  );
}
