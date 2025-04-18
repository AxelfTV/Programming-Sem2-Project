import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getProfile, updateUserBio } from "@/components/api/userAPI";
import { updateUserProfileImage } from "@/components/api/imageAPI";
import styles from "@/app/styles/Styles";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/"; // 替换成你的 API 地址

interface Props {
  userId: number;
  onProfileUpdated: () => void;
}

export default function EditProfileSection({ userId, onProfileUpdated }: Props) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    const profileData = await getProfile(userId);
    const profile = profileData[0];
    setUsername(profile.username);
    setBio(profile.bio);
    setNewBio(profile.bio);
    setProfileImage(`${API_URL}${profile.profile_image_src}`);
  };

  // 选择图片，并在 Web 端转为 File
  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      if (Platform.OS === "web") {
        // Web 端：用 fetch + blob 转为 File
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: blob.type });
        setNewImage(file);
      } else {
        // 原生端（不处理为 File，只是本地更新 UI）
        Alert.alert("Notice", "Image upload is only supported on web.");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (newImage) {
        const success = await updateUserProfileImage(userId, newImage);
        if (!success) {
          Alert.alert("Error", "Failed to update profile image.");
          return;
        }
      }

      if (newBio !== bio) {
        await updateUserBio(userId, newBio);
      }

      setNewImage(null);
      onProfileUpdated(); // 通知父组件刷新
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save profile changes.");
    }
  };

  return (
    <View style={styles.editSection}>
      <Text style={styles.editTitle}>Edit Profile</Text>

      <Image
        source={{ uri: newImage ? URL.createObjectURL(newImage) : profileImage }}
        style={styles.profileImage}
      />

      <TouchableOpacity style={styles.selectImageButton} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select New Avatar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.bioInput}
        value={newBio}
        onChangeText={setNewBio}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
