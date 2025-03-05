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

export const addUser = async (user: newUser): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/add-user`, {username:user.username,password:user.password}, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("User added:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response: User[] = await axios.get(`${API_URL}/api`)
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting users:", error)
    return [];
  }
}

export const getProfile = async (userId: Number): Promise<UserProfile[]> => {
  try {
    const response: UserProfile[] = await axios.get(`${API_URL}/user-profile/${userId}`);

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return [];
  }
}

export const updateUserProfile = async (userProfile: UserProfile) : Promise<void> => {
  try {
    const response = await axios.put(`${API_URL}/user-profile/${userProfile.id}`, {bio:userProfile.bio,profile_image:userProfile.profile_image});

    console.log("Profile updated:", response.data);
  } catch (error) {
    console.error("Failed to update profile:", error)
  }
}
export const getRoute = async (routeId: Number) : Promise<Route[]> => {
  let route: Route;
  try {
    const routeInfo: RouteInfo = await axios.get(`${API_URL}/route/${routeId}`);
    const locations: Location[] = await axios.get(`${API_URL}/route-locations/${routeId}`);
    route = {locations:locations,info:routeInfo};
    console.log(route);
    return [route];
  } catch (error) {
    console.error("Error adding user:", error);
    return [];
  }
}