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
import { useLocalSearchParams, router } from "expo-router";
import { useUser } from "@/components/UserContext";
import { getUserPosts, getPostImages } from "@/components/api/contentAPI";
import {getRoute } from "@/components/api/routeAPI";
import { Link } from "expo-router";
 
const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";



export default function homePage() {

  interface DisplayImage {
    id: string;
    username: string;
    profile_image: string;
    image_src: string;
    location: string;
    date: string;
    route: string;
    description: string;
  }

  const { user: currentUser, logout } = useUser();
  const { userId } = useLocalSearchParams();
  const currentUserId = currentUser?.id;
 // const viewedUserId = parseInt(userId as string);

  const [username, setUsername] = useState("");
  const [profile_image,setprofileimage]=useState("");
  const [followers, setFollowers] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [followings, setFollowings] = useState< { id: string; username: string; profile_image: string }[]>([]);
  const [UsersDisplay, setuersDisplay] = useState< DisplayImage[]>([]);
  const [bio,setbio]=useState("");

  var TempUserID =18; // For test
  async function fetchProfile() {
    if (!currentUserId) return;
    const profileData= await getProfile(currentUserId);
    const profile = profileData[0];
    setUsername(profile.username);
    setprofileimage(`${API_URL}`+profile.profile_image_src);   
    
  }

  async function GetImageUsers(minCount = 3, maxTries = 10) {
    const collected: DisplayImage[] = [];
    let tryCount = 0;
  
    while (collected.length < minCount && tryCount < maxTries) {
      tryCount++;
  
      const userGroup = await getRandomUsers(5);
  
      for (const user of userGroup) {
        if (collected.length >= minCount) break;
  
        const userId = Number(user.id);
        const profileData = await getProfile(userId);
        const posts = await getUserPosts(userId, 5);
        if (!posts || posts.length === 0) continue;
  
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const postImages = await getPostImages(randomPost.instance_id);
        if (!postImages || postImages.length === 0) continue;
  
        const firstImage = postImages[0];
        const route = await getRoute(firstImage.instance_id);
        const routeData = route && route[0];
  
        const display: DisplayImage = {
          id: user.id,
          username: profileData[0].username,
          profile_image: `${API_URL}${profileData[0].profile_image_src}`,
          image_src: `${API_URL}${firstImage.image_src}`,
          location: firstImage.location_id.toString(),
          date: new Date(firstImage.created_at).toLocaleDateString(),
          route: routeData?.info?.name || "",
          description:
            routeData?.locations?.[firstImage.location_id]?.name || "",
        };
  
        collected.push(display);
      }
    }
  
    setuersDisplay(collected);
  }

  useEffect(() => {
    
    fetchProfile();
    async function fetchFollows() {
      if (!currentUserId) return;
        const followerData=await getUserFollowers(currentUserId);

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
          const followingdata=await getUserFollowing(currentUserId);
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
    GetImageUsers();
    console.log("current page userID"+userId);
  }, [currentUserId]);

  function CreateFollow() {
    if (!currentUserId) return;
    console.log(`Following user ${currentUserId}`);
    addFollower(currentUser.id, currentUserId);
  }

  const [selectedTab, setSelectedTab] = useState<"followers" | "followings">("followers");


  // function SignOut() {
  //   logout();
  //   router.replace("/login");
  // }

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
   <View style={styles.imageGallery}>
          <FlatList
            data={UsersDisplay}
            keyExtractor={(item) => item.profile_image}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <View style={styles.imageHeader}>
                <Link
  href={{ pathname: "/(tabs)/profile", params: { userId: item.id.toString() } }}
  asChild
>
                <TouchableOpacity>
                  <Image source={{ uri: item.profile_image }} style={styles.followerAvatar} />
                  <Text style={styles.followerName}>{item.username}</Text>
       </TouchableOpacity>
       </Link>
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
        </View>
        
      </ScrollView>
    </View>
  );
}
