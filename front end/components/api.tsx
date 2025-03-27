import axios from "axios";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface newUser {
  username: string;
  password: string;
}
interface User{
  id: string;
  username: string;
  password: string;
}
interface UserProfile{
  id: string;
  username: string;
  bio: string;
  profile_image: string;
}
interface Location{
  id: string;
  name: string;
  long: string;
  lat: string;
}
interface RouteInfo{
  id: string;
  created_by: string;
  name: string;
}
interface Route{
  locations: Array<Location>;
  info: RouteInfo;
}
interface NewRoute{
  locationIds: Array<Number>;
  userId : Number;
  name : string;
}

export const addUser = async (user: newUser): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/users`, {username:user.username,password:user.password}, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("User added:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
export const getUsers = async (): Promise<UserProfile[]> => {
  try {
    const response: UserProfile[] = await axios.get(`${API_URL}/users`)
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting users:", error)
    return [];
  }
}
export const getProfile = async (userId: Number): Promise<UserProfile[]> => {
  try {
    const response: UserProfile[] = await axios.get(`${API_URL}/users/${userId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return [];
  }
}
export const updateUserProfileImage = async (userId:Number,image_src: string) : Promise<void> => {
  try {
    const response = await axios.put(`${API_URL}/users/image/${userId}`, {profile_image:image_src});

    console.log("Profile image updated:", response.data);
  } catch (error) {
    console.error("Failed to update profile image:", error)
  }
}
export const updateUserBio = async (userId:Number,bio: string) : Promise<void> => {
  try {
    const response = await axios.put(`${API_URL}/users/image/${userId}`, {bio:bio});

    console.log("Bio updated:", response.data);
  } catch (error) {
    console.error("Failed to update bio:", error)
  }
}
export const addNewRoute = async (newRoute : NewRoute) : Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/route`, {userId:newRoute.userId,locations:newRoute.locationIds,name:newRoute.name}, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Route added:", response.data);
  } catch (error) {
    console.log("Failed to add route:", error)
  }
}
export const getRoute = async (routeId: Number) : Promise<Route[]> => {
  let route: Route;
  try {
    const routeInfo: RouteInfo = await axios.get(`${API_URL}/route/${routeId}`);
    const locations: Location[] = await axios.get(`${API_URL}/route/${routeId}/locations`);
    route = {locations:locations,info:routeInfo};
    console.log(route);
    return [route];
  } catch (error) {
    console.error("Failed to get route:", error);
    return [];
  }
}
export const addFollower = async (followingId: Number, followerId: Number) : Promise<void> => {
  try{
    const response = await axios.post(`${API_URL}/follow/${followingId}/${followerId}`)
    console.log(response.data);
  } catch (error){
    console.error("Failed to add follower:", error);
  }
}