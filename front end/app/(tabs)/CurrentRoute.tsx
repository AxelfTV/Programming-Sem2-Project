import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";
const imagePath = require("../../assets/images/MAP.png");

export default function CurrentRoute() {
  const [selectedDestination, setSelectedDestination] =
    useState("Destination 1");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSelectDestination = (destination: string) => {
    setSelectedDestination(destination);
  };

  const handleUpload = () => {
    setUploadedImage(imagePath);
  };

  // destinations
  const destinations = [
    "Destination 1",
    "Destination 2",
    "Destination 3",
    "Destination 4",
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />

      <View style={styles.MapContent}>
        {/* Left Map */}
        <Image source={imagePath} style={styles.mapImage} />

        {/* Right */}
        <View style={styles.RouteContainer}>
          {/* Route name */}
          <Text style={styles.routeTitle}>Route name</Text>

          {destinations.map((destination) => (
            <TouchableOpacity
              key={destination}
              style={[
                styles.destinationBox,
                selectedDestination === destination &&
                  styles.selectedDestinationBox,
              ]}
              onPress={() => handleSelectDestination(destination)}
            >
              <Text style={styles.destinationText}>{destination}</Text>
              {selectedDestination === destination && (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleUpload}
                >
                  <Text style={styles.uploadText}>📸 Upload Image</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
