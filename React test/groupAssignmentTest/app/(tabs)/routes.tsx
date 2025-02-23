import React from "react";
import { View, Text, ScrollView } from "react-native";
import RouteCard from "@/components/RouteCard";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";

const imagePath = require("../../assets/images/react-logo.png");

const routeImages = {
  route1: imagePath,
  route2: imagePath,
  route3: imagePath,
  route4: imagePath,
  route5: imagePath,
  route6: imagePath,
};

const RoutesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />
      <View style={styles.routeContainer}>
        {/* Routes based on your interests */}
        <Text style={styles.sectionTitle}>Routes based on your interests</Text>
        <View style={styles.cardGrid}>
          <RouteCard
            image={routeImages.route1}
            name="Route Name 1"
            rating={2.0}
          />
          <RouteCard
            image={routeImages.route2}
            name="Route Name 2"
            rating={2.0}
          />
          <RouteCard
            image={routeImages.route3}
            name="Route Name 3"
            rating={2.0}
          />
        </View>

        {/* all routes */}
        <Text style={styles.sectionTitle}>All routes</Text>
        <View style={styles.cardGrid}>
          <RouteCard
            image={routeImages.route4}
            name="Route Name 4"
            rating={2.0}
          />
          <RouteCard
            image={routeImages.route5}
            name="Route Name 5"
            rating={2.0}
          />
          <RouteCard
            image={routeImages.route6}
            name="Route Name 6"
            rating={2.0}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RoutesScreen;
