import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/components/UserContext";
import { startRouteInstance, getRoute,getUserActiveInstance } from "@/components/api/routeAPI"; 
import { uploadInstanceImage} from "@/components/api/imageAPI";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";

const imagePath = require("../../assets/images/MAP.png");

export default function CurrentRoute() {
  interface Route{
    locations: Array<Location>;
    info: RouteInfo;
}
interface Location{
    id: string;
    name: string;
    long: string;
    lat: string;
    image_src: string;
}
interface RouteInfo{
  id: string;
  created_by: string;
  name: string;
}


  const { routeId } = useLocalSearchParams(); // 获取传递过来的 routeId 参数
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [route, setRoute] = useState<Route | null>(null); // 保存当前的 route 数据
  const [instanceID, setInstanceID] = useState<number | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null); // 新图片
  const { user: currentUser } = useUser();
  const currentUserId = currentUser?.id;

  // 开始路径实例并获取 instanceID
  useEffect(() => {
    console.log("cur route"+routeId);
    console.log("Cur user"+currentUserId);
    const curinstance=getUserActiveInstance(Number(currentUserId));
    
    console.log("Cur instance"+curinstance);
    if (routeId && currentUserId) {
      startRouteInstance(currentUserId, Number(routeId)).then((instance) => {
        setInstanceID(instance?instance[0]:0); // 保存 instanceID
        console.log("Instance started with ID:", instanceID);
      });

      // 获取当前的 route 信息
      getRoute(Number(routeId)).then((fetchedRoute) => {
        setRoute(fetchedRoute[0]);
      });
    }
  }, [routeId, currentUserId]);

  // 选择目的地
  const handleSelectDestination = (locationId: string) => {
    setSelectedDestination(locationId);
  };

  // 处理文件选择
  const handleSelectImage = async (locationId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];

      if (Platform.OS === "web") {
        // Web 端：用 fetch + blob 转为 File
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const file = new File([blob], "route-image.jpg", { type: blob.type });
        setNewImage(file);
        setUploadedImage(URL.createObjectURL(file)); // 临时展示图片
      } else {
        // 原生端（不处理为 File，只是本地更新 UI）
        Alert.alert("Notice", "Image upload is only supported on web.");
      }
    }
  };

  // 上传图片
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />
      <View style={styles.MapContent}>
        {/* Left Map */}
        <Image source={imagePath} style={styles.mapImage} />

        {/* Right */}
        <View style={styles.RouteContainer}>
          {/* Route name */}
          <Text style={styles.routeTitle}>
            Route Name: {route ? route.info.name : "Loading..."}
          </Text>

          {/* 展示从 route 获取的 locations */}
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
                  {/* 显示上传按钮 */}
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => handleSelectImage(location.id)}
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
        </View>
      </View>
    </ScrollView>
  );
}
