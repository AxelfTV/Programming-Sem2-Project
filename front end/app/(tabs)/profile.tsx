import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import Header from "@/components/RouteHeader";
import styles from "@/app/styles/Styles";

const imagePath = require("../../assets/images/react-logo.png");

interface UserData {
  name: string;
  profileImage: any;
}

interface ImageData {
  id: string;
  src: string;
  location: string;
  date: string;
  route: string;
  description: string;
}

export default function Profile() {
  const user: UserData = {
    name: "Samuel Smiley",
    profileImage: imagePath,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const images: ImageData[] = [
    {
      id: "1",
      src: imagePath,
      location: "Dublin",
      date: "2024-02-22",
      route: "Route",
      description: "A beautiful street in Dublin.",
    },
    {
      id: "2",
      src: "",
      location: "Galway",
      date: "",
      route: "",
      description: "",
    },
    { id: "3", src: "", location: "", date: "", route: "", description: "" },
    { id: "4", src: "", location: "", date: "", route: "", description: "" },
    { id: "5", src: "", location: "", date: "", route: "", description: "" },
    { id: "6", src: "", location: "", date: "", route: "", description: "" },
  ];

  const handleImagePress = (image: ImageData) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image source={user.profileImage} style={styles.profileImage} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          <TouchableOpacity style={styles.achievementCard}>
            <Text style={styles.achievementText}>Your Achievements</Text>
          </TouchableOpacity>
        </View>

        {/* Image Grid */}
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleImagePress(item)}
              style={styles.imageContainer}
            >
              {item.src ? (
                <Image
                  source={imagePath} //image
                  style={styles.image}
                />
              ) : (
                <View style={styles.placeholder} />
              )}
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Modal */}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        {selectedImage && (
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {/* left */}
              <Image
                source={
                  typeof selectedImage.src === "string"
                    ? { uri: selectedImage.src }
                    : selectedImage.src
                }
                style={styles.modalImage}
              />

              {/* right*/}
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>{selectedImage.location}</Text>
                <Text style={styles.modalDate}>{selectedImage.date}</Text>
                <Text style={styles.modalRoute}>{selectedImage.route}</Text>
                <Text style={styles.modalDescription}>
                  {selectedImage.description}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </Modal>
    </View>
  );
}
