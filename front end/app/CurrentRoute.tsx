import React, { useState, useEffect,useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/components/UserContext";
import {
  startRouteInstance,
  getRoute,
  getUserActiveInstance,
  endRouteInstance,
} from "@/components/api/routeAPI";
import { uploadInstanceImage } from "@/components/api/imageAPI";
import { createPost } from "@/components/api/contentAPI";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";
import { router } from "expo-router";

import LeafletMap from "@/components/LeafletMap";

export default function CurrentRoute() {
  interface CurrentRouteData {
    locations: Location[];
    info: CurrentRouteInfo;
  }
  interface Location {
    id: string;
    name: string;
    long: string;
    lat: string;
    image_src: string;
  }
  interface CurrentRouteInfo {
    id: string;
    created_by_id: string; 
    name: string;
  }

  const { routeId } = useLocalSearchParams();
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [route, setRoute] = useState<CurrentRouteData | null>(null);
  const [instanceID, setInstanceID] = useState<number | null>(null);
  const instanceIDRef = useRef<number | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const { user: currentUser } = useUser();
  const currentUserId = currentUser?.id;

  useEffect(() => {
    // const initializeRoute = async () => {
    //   if (!currentUserId || !routeId) return;
    //   let  activeInstances = null;
    //   try {
    //      activeInstances = await getUserActiveInstance(currentUserId);
    //   } catch (error) {
    //     console.error("Error initializing route instance:", error);
    //   }
    //     if (activeInstances && activeInstances.length > 0) {
    //       const active = activeInstances[0];
    //       if (routeId && Number(routeId) !== active.route_id) {
    //         await endRouteInstance(active.id);
    //         const newInstance = await startRouteInstance(
    //           Number(routeId),
    //           currentUserId
    //         );
    //         await setInstanceID(newInstance[0]);
             

    //       } else {
    //         setInstanceID(active.id);
    //       }
    //     } else {
    //       const newInstance = await startRouteInstance(
    //         Number(routeId),
    //         currentUserId
    //       );
    //       setInstanceID(newInstance[0]);
    //     }

    //     const fetchedRoute = await getRoute(Number(routeId));
    //     setRoute(fetchedRoute[0]);

    // };
    const initializeRoute = async () => {
      if (!currentUserId || !routeId) return;

      try {
        const activeInstances = await getUserActiveInstance(currentUserId);

        if (activeInstances && activeInstances.length > 0) {
          const active = activeInstances[0];
          if (routeId && Number(routeId) !== active.route_id) {
            await endRouteInstance(active.id);
            const newInstance = await startRouteInstance(Number(routeId), currentUserId);
            setInstanceID(newInstance[0]);
            instanceIDRef.current = newInstance[0]; 
            console.log("create new instance");
            
            location.reload(); 
          } else {
            setInstanceID(active.id);
            instanceIDRef.current = active.id; 
          }
        } else {
          const newInstance = await startRouteInstance(Number(routeId), currentUserId);
          setInstanceID(newInstance[0]);
          instanceIDRef.current = newInstance[0]; 
          console.log("create new instance1");
            
          location.reload(); 
        }

        const fetchedRoute = await getRoute(Number(routeId));
        setRoute(fetchedRoute[0]);
      } catch (error: any) {
        if (error?.response?.status !== 404) {
          Alert.alert("Error", "Failed to load your route instance.");
        }
        console.error("Error initializing route instance:", error);

      }
    };
    initializeRoute();
  }, [routeId, currentUserId]);

  const handleSelectDestination = (locationId: string) => {
    setSelectedDestination(locationId);
  };


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

  // const handleUpload = async () => {
  //   if (instanceID && selectedDestination && newImage) {
  //     try {
  //       await uploadInstanceImage(
  //         instanceID,
  //         Number(selectedDestination),
  //         newImage
  //       );
  //       Alert.alert("Success", "Image uploaded successfully!");
  //     } catch (error) {
  //       Alert.alert("Error", "Failed to upload image.");
  //       console.error("Error uploading image", error);
  //     }
  //   } else {
  //     Alert.alert("Error", "Please select a destination and an image.");
  //   }
  // };
  const handleUpload = async () => {
    const currentInstanceID = instanceIDRef.current; // ✅ 使用 ref
  
    if (currentInstanceID && selectedDestination && newImage) {
      try {
        await uploadInstanceImage(currentInstanceID, Number(selectedDestination), newImage);
        console.log("current post instance:"+currentInstanceID);
        Alert.alert("Success", "Image uploaded successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to upload image.");
        console.error("Error uploading image", error);
      }
    } else {
      Alert.alert("Error", "Please select a destination and an image.");
    }
  };

  // const handleFinish = async () => {
  //   if (currentUserId && instanceID) {
  //     try {
  //       await endRouteInstance(instanceID);
  //       await createPost(currentUserId, instanceID);
  //       router.replace({
  //         pathname: "/rateRoute",
  //         params: { routeId },
  //       });
  //       Alert.alert(
  //         "Route Finished",
  //         "Your route has been successfully completed!"
  //       );
  //     } catch (error) {
  //       console.error("Error finishing route:", error);
  //       Alert.alert("Error", "Failed to finish the route.");
  //     }
  //   }
  // };
  const handleFinish = async () => {
    const currentInstanceID = instanceIDRef.current; // ✅ 使用 ref
    if (currentUserId && currentInstanceID) {
      try {
        await endRouteInstance(currentInstanceID);
        await createPost(currentUserId, currentInstanceID);
        router.replace({ pathname: "/rateRoute", params: { routeId } });
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
        <LeafletMap />

        <View style={styles.RouteContainer}>
          <Text style={styles.routeTitle}>
            Route Name: {route ? route.info.name : "Loading..."}
          </Text>

          {route?.locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.destinationBox,
                selectedDestination === location.id &&
                  styles.selectedDestinationBox,
              ]}
              onPress={() => handleSelectDestination(location.id)}
            >
              <Text style={styles.destinationText}>{location.name}</Text>

              {selectedDestination === location.id && (
                <>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleSelectImage}
                  >
                    <Text style={styles.uploadText}>📸 Select Image</Text>
                  </TouchableOpacity>

                  {uploadedImage && (
                    <Image
                      source={{ uri: uploadedImage }}
                      style={styles.uploadedImage}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleUpload}
                  >
                    <Text style={styles.uploadText}>Upload Image</Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.uploadText}>✅ Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
