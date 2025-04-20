import React, { useState, useEffect } from "react";
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
import {
  getProfile,
  getUserFollowers,
  addFollower,
  getUserFollowing,
} from "@/components/api/userAPI";
import { useLocalSearchParams, router } from "expo-router";
import { useUser } from "@/components/UserContext";
import { getUserPosts, getPostImages } from "@/components/api/contentAPI";
import EditProfileSection from "@/components/units/EditProfileSection";
 
const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface ImageData {
  id: string;
  src: string;
  location: string;
  date: string;
  route: string;
  description: string;
}

export default function Profile() {
  const { user: currentUser, logout } = useUser();
  const { userId } = useLocalSearchParams();
  const viewedUserId = parseInt(userId as string);

  const [username, setUsername] = useState("");
  const [profile_image, setprofileimage] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [followingNum, setFollowingNum] = useState("");
  const [followerNum, setFollowerNum] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);

    const TempUser:number=19;
  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile(viewedUserId);
      const profile = profileData[0];
      setUsername(profile.username);
      setprofileimage(
        "https://2425-cs7025-group4.scss.tcd.ie/" + profile.profile_image_src
      );
      setProfileBio(profile.bio);
      const following = await getUserFollowing(viewedUserId);
      const follower = await getUserFollowers(viewedUserId);
      setFollowingNum(following.length.toString());
      setFollowerNum(follower.length.toString());
    }

    if (viewedUserId) {
      fetchProfile();
    }


    async function fetchImages() {
      //const posts = await getUserPosts(viewedUserId, 10);
      const posts = await getUserPosts(TempUser, 10);
      const imageData: ImageData[] = [];

      for (const post of posts) {
        const postImages = await getPostImages(post.instance_id);
        if (postImages.length > 0) {
          const firstImage = postImages[0];
          imageData.push({
            id: post.instance_id.toString(),
            src: `${API_URL}${firstImage.image_src}`,
            location: firstImage.location_id.toString(),
            date: new Date(firstImage.created_at).toLocaleDateString(),
            route:"",
            description:""
          });
        }
      }
      
      setImages(imageData);
    }
    fetchImages();

  }, [viewedUserId]);

  function CreateFollow() {
    if (!currentUser) return;
    console.log(`Following user ${viewedUserId}`);
    addFollower(currentUser.id, viewedUserId);
  }

  function SignOut() {
    logout();
    router.replace("/login");
  }


  const handleImagePress = (image: ImageData) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleProfileUpdate = () => {
    setEditVisible(false);
    setTimeout(() => {
      location.reload(); 
    }, 500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: profile_image }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{username}</Text>
          </View>

          <TouchableOpacity style={styles.achievementCard}>
            <Text style={styles.achievementText}>Your Achievements</Text>
            <Text>Number of followings: {followingNum} </Text>
            <Text>Number of followers: {followerNum} </Text>
            <Text>bio: {profileBio}</Text>
          </TouchableOpacity>

          {/* 关注按钮/编辑按钮 */}
          {currentUser?.id !== viewedUserId ? (
            <TouchableOpacity
              style={styles.followButton}
              onPress={CreateFollow}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          ) : (
            <>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditVisible(true)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

  {editVisible && (
  <EditProfileSection
    userId={viewedUserId}
    onProfileUpdated={handleProfileUpdate}
  />
)}
</>


          )}
        </View>

        <TouchableOpacity style={styles.signOut} onPress={SignOut}>
          <Text style={styles.signOutText}>SignOut</Text>
        </TouchableOpacity>

        {/* Image Grid */}
        
        <View style={styles.imageGrid}>
          {images.map((image) => (
            <TouchableOpacity
            key={image.id}
              style={styles.gridItem}
          //    onPress={() => console.log("Open modal for", image.id)}
              onPress={() => handleImagePress(image)}
            >
               <Image source={{ uri: image.src }} style={styles.gridImage} />
              <Text style={styles.imageMeta}>{image.location}</Text>
              <Text style={styles.imageMeta}>{image.date}</Text>
            </TouchableOpacity>
))}

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
</ScrollView>
      
    </View>
  );
}
