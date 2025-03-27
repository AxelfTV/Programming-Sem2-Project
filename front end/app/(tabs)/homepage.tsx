import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Header from "@/components/RouteHeader";
import styles from "@/app/styles/Styles";
import { getProfile,  updateUserProfileImage  } from "@/components/api";

//const imagePath = require("../../assets/images/react-logo.png");
interface UserProfile{
  id: string;
  username: string;
  bio: string;
  profile_image_src: string;
}
const CurrentUserID = 17; //TODO:GET current user ID




function CreateFollow(currentUserId:number , userId:number) {
  console.log(`Following user ${userId} from ${currentUserId}`);
}




export default function Profile() {

  const [username, setUsername] = useState("");
  const [profile_image,setprofileimage]=useState("");
  const [bio,setbio]=useState("");

  var userId = 17; // TODO: GET follower id

  useEffect(() => {
    async function fetchProfile() {
      const profileData: UserProfile[] = await getProfile(userId);
      console.log("profile data",profileData);
      const profile = profileData[0];
      console.log("profile", profile);
        //console.log("profileData",profileData, profileData[0].username);
      setUsername(profile.username);
      setprofileimage(profile.profile_image_src);
        //GET follwers
      
      
    }
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    async function fetchFollowers() {
   //   const followerData = await getFollowers(CurrentUserID);
    //  setFollowers(followerData);
    }
    fetchFollowers();
  }, []);

  //useEffect(() => {
  //  async function fetchUserImages() {
   //   const imagesData = await getUserImages(followers.map(f => f.id));
    //  setUserImages(imagesData);
  //  }
  //  if (followers.length > 0) fetchUserImages();
  //}, [followers]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
           <Image src={profile_image} style={styles.profileImage} />
            <Text style={styles.userName}>{username}</Text>
          </View>

          {CurrentUserID !== userId ? (
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => CreateFollow(CurrentUserID, userId)}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Followers List */}
 {/*      <View style={styles.followerSection}>
          <Text style={styles.sectionTitle}>Followers</Text>
          <FlatList
            data={followers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.followerItem}>
                <Image source={{ uri: item.profile_image }} style={styles.followerAvatar} />
                <Text style={styles.followerName}>{item.username}</Text>
              </View>
            )}
          />
        </View> */}
      

        {/* Follower Images */}
{/*    <View style={styles.imageGallery}>
          <FlatList
            data={userImages}
            keyExtractor={(item) => item.image_src}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <View style={styles.imageHeader}>
                  <Image source={{ uri: item.profile_image }} style={styles.followerAvatar} />
                  <Text style={styles.followerName}>{item.username}</Text>
                  <Text style={styles.imageDate}>{item.date}</Text>
                </View>
                <Image source={{ uri: item.image_src }} style={styles.image} />
                <View style={styles.imageFooter}>
                  <Text style={styles.imageLocation}>{item.location}</Text>
                  <Text style={styles.imageRoute}>{item.route}</Text>
                </View>
              </View>
            )}
          />
        </View> */}
        
      </ScrollView>
    </View>
  );
}
