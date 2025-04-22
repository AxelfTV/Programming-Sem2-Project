import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/components/UserContext";
import { startRouteInstance, getRoute, getUserActiveInstance, endRouteInstance } from "@/components/api/routeAPI";
import { uploadInstanceImage } from "@/components/api/imageAPI";
import { createPost } from "@/components/api/contentAPI";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";
import { router } from "expo-router";

const imagePath = require("../../assets/images/MAP.png");

export default function CurrentRoute() {
  interface Route {
    locations: Array<Location>;
    info: RouteInfo;
  }
  interface Location {
    id: string;
    name: string;
    long: string;
    lat: string;
    image_src: string;
  }
  interface RouteInfo {
    id: string;
    created_by: string;
    name: string;
  }

  const { routeId } = useLocalSearchParams();
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [instanceID, setInstanceID] = useState<number | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const { user: currentUser } = useUser();
  const currentUserId = currentUser?.id;

  // 初始化 instance 和 route
  useEffect(() => {
    const initializeRoute = async () => {
      if (!currentUserId || !routeId) return;

      try {
        const activeInstances = await getUserActiveInstance(currentUserId);

        if (activeInstances && activeInstances.length > 0) {
          const active = activeInstances[0];
          setInstanceID(active.id);
          console.log("Active Instance ID:", active.id);
        } else {
          const newInstance = await startRouteInstance(Number(routeId), currentUserId);
          setInstanceID(newInstance[0]);
          console.log("Started new instance:", newInstance[0]);
        }

        const fetchedRoute = await getRoute(Number(routeId));
        setRoute(fetchedRoute[0]);
      } catch (error) {
        console.error("Error initializing route instance:", error);
      }
    };

    initializeRoute();
  }, [routeId, currentUserId,currentUserId]);

  // 选择目的地
  const handleSelectDestination = (locationId: string) => {
    setSelectedDestination(locationId);
  };

  // 选择图片（Web 支持）
  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      if (Platform.OS === "web") {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const file = new File([blob], "route-image.jpg", { type: blob.type });
        setNewImage(file);
        setUploadedImage(URL.createObjectURL(file));
      } else {
        Alert.alert("Notice", "Image upload is only supported on web.");
      }
    }
  };

  // 上传图片到实例
  const handleUpload = async () => {
    if (instanceID && selectedDestination && newImage) {
      try {
        await uploadInstanceImage(instanceID, Number(selectedDestination), newImage);
        Alert.alert("Success", "Image uploaded successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to upload image.");
        console.error("Error uploading image", error);
      }
    } else {
      Alert.alert("Error", "Please select a destination and an image.");
    }
  };

  // 结束路线并创建 post
  const handleFinish = async () => {
    if (currentUserId && instanceID) {
      try {
        await endRouteInstance(instanceID);
        await createPost(currentUserId, instanceID);
        await router.push({ pathname: "/(tabs)/profile", params: { userId:currentUserId } });
        Alert.alert("Route Finished", "Your route has been successfully completed!");
      } catch (error) {
        console.error("Error finishing route:", error);
        Alert.alert("Error", "Failed to finish the route.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />
      <View style={styles.MapContent}>
        <Image source={imagePath} style={styles.mapImage} />

        <View style={styles.RouteContainer}>
          <Text style={styles.routeTitle}>
            Route Name: {route ? route.info.name : "Loading..."}
          </Text>

          {route?.locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.destinationBox,
                selectedDestination === location.id && styles.selectedDestinationBox,
              ]}
              onPress={() => handleSelectDestination(location.id)}
            >
              <Text style={styles.destinationText}>{location.name}</Text>

              {selectedDestination === location.id && (
                <>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
                    <Text style={styles.uploadText}>📸 Select Image</Text>
                  </TouchableOpacity>

                  {uploadedImage && (
                    <Image
                      source={{ uri: uploadedImage }}
                      style={styles.uploadedImage}
                    />
                  )}

                  <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                    <Text style={styles.uploadText}>Upload Image</Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          ))}

          {/* Finish 按钮 */}
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.uploadText}>✅ Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
