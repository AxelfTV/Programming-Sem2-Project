import React, { useState,useEffect } from "react";
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
import{getProfile} from "@/components/api";

const imagePath = require("../../assets/images/react-logo.png");

const CurrentUserID:number=1;//TODO: Get CurrentUserID
const userId:number=2;  

// interface UserData {
//   name: string;
//   profileImage: any;
// }

interface ImageData {
  id: string;
  src: string;
  location: string;
  date: string;
  route: string;
  description: string;
}
function CreateFollow(currentUserID:number,  userId:number )
{
  console.log(`Flollowing user ${userId}`);
}
function SignOut()
{
  console.log("sign out");
}

export default function Profile() {

  // const user: UserData = {
  //   name: "Samuel Smiley",
  //   profileImage: imagePath,
  // };
const [userProfile, setUserProfile]=useState({bio:"",profile_image:imagePath});

const [modalVisible, setModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

useEffect(() => {
  async function fetchProfile() {
    console.log("fetch profile");
    const profileData = await getProfile(userId);
    console.log("get profilr data "+profileData.length);
    if (profileData.length > 0) {
      setUserProfile({
        bio: profileData[0].bio,
        profile_image: { uri: profileData[0].profile_image },
      });
      console.log("bio:"+profileData[0].bio);
    }
  }
  fetchProfile();
}, [userId]);

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
            <Image source={userProfile.profile_image} style={styles.profileImage} />
            <Text style={styles.userName}>{userProfile.bio}</Text>
          </View>

          <TouchableOpacity style={styles.achievementCard}>
            <Text style={styles.achievementText}>Your Achievements</Text>
          </TouchableOpacity>
          {CurrentUserID!==userId? ( 
        <TouchableOpacity
        style={styles.followButton}
        onPress={() => CreateFollow(CurrentUserID, userId)}
          >
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
          ):
          (<TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>)}
        </View>

        <TouchableOpacity style={styles.signOut} onPress={()=>SignOut()}>
            <Text style={styles.signOutText}>SignOut</Text>
          </TouchableOpacity>

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
