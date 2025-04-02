import axios from "axios";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface LoginInfo {
    username: string;
    password: string;
}
interface UserProfile{
    id: string;
    username: string;
    bio: string;
    profile_image_src: string;
}
interface LoginValidation{
    message: string;
    user : {id:string, username:string}
}
interface Follow{
    followingUserId:string,
    followedUserId:string,
    timestamp:string
}

export const addUser = async (user: LoginInfo): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/users`, {username:user.username,password:user.password}, 
        { headers: { "Content-Type": "application/json" } });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
};
export const getUsers = async (): Promise<UserProfile[]> => {
    try {
      const response = await axios.get(`${API_URL}/users`)
      const data : UserProfile[] = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error getting users:", error)
      return [];
    }
};
export const getProfile = async (userId: Number): Promise<UserProfile[]> => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    const data : UserProfile[] = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return [];
  }
};
export const updateUserBio = async (userId:Number,bio: string) : Promise<void> => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/bio`, {bio:bio});
  
      console.log("Bio updated:", response.data);
    } catch (error) {
      console.error("Failed to update bio:", error)
    }
};
export const loginUser = async (user: LoginInfo) : Promise<LoginValidation[]> => {
    try {
        const response = await axios.post(`${API_URL}/users/login`);
        const data: LoginValidation[] = [response.data];
        console.log(data);
        return data;
      } catch (error) {
        console.error("Login failed:", error)
        return [];
      }
}
export const addFollower = async (followerId: Number, followedId: Number) : Promise<void> => {
    try{
      const response = await axios.post(`${API_URL}/users/${followerId}/follow/${followedId}`)
      console.log(response.data);
    } catch (error){
      console.error("Failed to add follower:", error);
    }
}
export const getUserFollowers = async (userId:Number) : Promise<Follow[]> => {
    try{
        const response = await axios.get(`${API_URL}/users/${userId}/followers`)
        const data : Follow[] = response.data;
        console.log(data);
        return data;
      } catch (error){
        console.error("Failed to get followers:", error);
        return [];
      }
}
export const getUserFollowing = async (userId:Number) : Promise<Follow[]> => {
    try{
        const response = await axios.get(`${API_URL}/users/${userId}/following`)
        const data : Follow[] = response.data;
        console.log(data);
        return data;
      } catch (error){
        console.error("Failed to get following:", error);
        return [];
      }
}
