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
import{getProfile,getUserFollowers,addFollower,getUserFollowing} from "@/components/api/userAPI";

const imagePath = require("../../assets/images/react-logo.png");

const CurrentUserID:number=1;//TODO: Get CurrentUserID
const userId:number=18;  

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
  addFollower(currentUserID,userId);
}

function SignOut()
{
  console.log("sign out");
}

export default function Profile() {

  const [username, setUsername] = useState("");
  const [profile_image,setprofileimage]=useState("");
  const[followingNum,setFollowingNum]=useState("");
  const[followerNum,setFollowerNum]=useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

useEffect(() => {
   async function fetchProfile() {
      const profileData= await getProfile(userId);
      const profile = profileData[0];
      setUsername(profile.username);
      setprofileimage("https://2425-cs7025-group4.scss.tcd.ie/"+profile.profile_image_src); 
   //   console.log("profile image"+" "+profile_image);
      const following=await getUserFollowing(userId);      
      const follower=await getUserFollowers(userId);      
      setFollowingNum(following.length.toString());
      setFollowerNum(follower.length.toString());

    }
    fetchProfile();
    CreateFollow(17,18);
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
            <Image source={{uri:profile_image}} style={styles.profileImage} />
            <Text style={styles.userName}>{username}</Text>
          </View>

          <TouchableOpacity style={styles.achievementCard}>
            <Text style={styles.achievementText}>Your Achievements</Text>
            <Text>Number of followings: {followingNum} </Text>
            <Text>Number of followers: {followerNum} </Text>
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
