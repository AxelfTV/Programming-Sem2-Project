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
import { getProfile ,getUserFollowers,getUserFollowing} from "@/components/api/userAPI";


const CurrentUserID = 18; //TODO:GET current user ID

function CreateFollow(currentUserId:number , userId:number) {
  console.log(`Following user ${userId} from ${currentUserId}`);
}

export default function Profile() {

  const [username, setUsername] = useState("");
  const [profile_image,setprofileimage]=useState("");
  const [followers, setFollowers] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [followings, setFollowings] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [bio,setbio]=useState("");

  var userId =18; // TODO: GET follower id  

  useEffect(() => {

    async function fetchProfile() {
      const profileData= await getProfile(userId);
      const profile = profileData[0];
      setUsername(profile.username);
      setprofileimage("https://2425-cs7025-group4.scss.tcd.ie/"+profile.profile_image_src);      
    }
    fetchProfile();

    async function fetchFollows() {
       
        const followerData=await getUserFollowers(userId);

         //GET follwers
        const followerProfiles = await Promise.all(
          followerData.map(async (follower) => {
            console.log("follower",follower.followed_user_id);
            const profileData = await getProfile(Number(follower.following_user_id));
            console.log("imag path"+" "+profileData[0].profile_image_src);
            return {
              id: follower.followed_user_id,
              username: profileData[0].username,
              profile_image:"https://2425-cs7025-group4.scss.tcd.ie/"+profileData[0].profile_image_src,
            };
          }))  
          setFollowers(followerProfiles); 
          

          //GET followings
          const followingdata=await getUserFollowing(userId);
          const followingProfiles = await Promise.all(
            followingdata.map(async (follower) => {
              const profileData = await getProfile(Number(follower.followed_user_id));
              return {
                id: follower.following_user_id,
                username: profileData[0].username,
                profile_image: "https://2425-cs7025-group4.scss.tcd.ie/"+profileData[0].profile_image_src,
              };
            }))  
            setFollowings(followingProfiles); 
          
    }
    fetchFollows();

  }, [userId]);

  const [selectedTab, setSelectedTab] = useState<"followers" | "followings">("followers");

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


        <View style={styles.followerSection}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "followers" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("followers")}
        >
          <Text style={styles.tabText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "followings" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("followings")}
        >
          <Text style={styles.tabText}>Followings</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={selectedTab === "followers" ? followers : followings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Image source={{ uri: item.profile_image }} style={styles.followerAvatar} />
            <Text style={styles.followerName}>{item.username}</Text>
          </View>
        )}
      />
    </View>
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
