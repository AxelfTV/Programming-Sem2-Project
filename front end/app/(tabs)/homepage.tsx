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
import { getProfile ,getUserFollowers,getUserFollowing,getRandomUsers,updateUserBio,addFollower} from "@/components/api/userAPI";
import EditProfileSection from "@/components/units/EditProfileSection";
 
const CurrentUserID = 18; //TODO:GET current user ID
const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

function CreateFollow(currentUserId:number , userId:number) {
  console.log(`Following user ${userId} from ${currentUserId}`);
  addFollower(currentUserId,userId);
}



export default function Profile() {

  const [username, setUsername] = useState("");
  const [profile_image,setprofileimage]=useState("");
  const [followers, setFollowers] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [followings, setFollowings] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [UsersDisplay, setuersDisplay] = useState< { id: string;username:string;profile_image:string}[]>([]);
  const [bio,setbio]=useState("");

  /* Edit Profile */
  const [isEditing, setIsEditing] = useState(false);



  var userId =18; // TODO: GET follower id  
  async function fetchProfile() {
    const profileData= await getProfile(userId);
    const profile = profileData[0];
    setUsername(profile.username);
    setprofileimage(`${API_URL}`+profile.profile_image_src);   
    
  }

  useEffect(() => {

    
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
              profile_image:`${API_URL}`+profileData[0].profile_image_src,
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
                profile_image: `${API_URL}`+profileData[0].profile_image_src,
              };
            }))  
            setFollowings(followingProfiles); 
          
    }
    fetchFollows();


    async function GetImageUsers()
    {
      const userGroup=await getRandomUsers(5);
      const displayImages=await Promise.all(
         userGroup.map(async (displayuser)=>{
          const displayprofileData = await getProfile(Number(displayuser.id));
          console.log("displayusers"+displayuser.id);
          return {id:displayuser.id,
            username:displayprofileData[0].username,
            profile_image:`${API_URL}`+displayprofileData[0].profile_image_src
          };
         })
      )
      setuersDisplay(displayImages);  
    }
    GetImageUsers();

  }, [userId]);



  const [selectedTab, setSelectedTab] = useState<"followers" | "followings">("followers");

  const handleProfileUpdate = async () => {
    await fetchProfile();     // 刷新资料
    setIsEditing(false);      // 隐藏编辑面板
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        {/* Profile Section */}
        {CurrentUserID === userId && !isEditing && (
  <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
    <Text style={styles.editButtonText}>Edit</Text>
  </TouchableOpacity>
)}

{isEditing && (
  <EditProfileSection userId={userId} onProfileUpdated={handleProfileUpdate} />
)}

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
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
              >
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
   <View style={styles.imageGallery}>
          <FlatList
            data={UsersDisplay}
            keyExtractor={(item) => item.profile_image}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <View style={styles.imageHeader}>
                  <Image source={{ uri: item.profile_image }} style={styles.followerAvatar} />
                  <Text style={styles.followerName}>{item.username}</Text>
       {   /*        <Text style={styles.imageDate}>{item.date}</Text> */}
                </View>
 {/*              <Image source={{ uri: item.image_src }} style={styles.image} />
                <View style={styles.imageFooter}>
                  <Text style={styles.imageLocation}>{item.location}</Text>
                  <Text style={styles.imageRoute}>{item.route}</Text>
                </View>*/}
              </View>
            )}
          />
        </View>
        
      </ScrollView>
    </View>
  );
}
