import axios from "axios";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface Route{
    locations: Array<Location>;
    info: RouteInfo;
}
interface Location{
    id: string;
    name: string;
    long: string;
    lat: string;
    image_src: string;
}
interface RouteInfo{
    id: string;
    created_by_id: string;
    name: string;
}
interface NewRoute{
    locationIds: Array<number>;
    userId : number;
    name : string;
}
interface Instance{
    id: number,
    user_id: number,
    route_id: number,
    status: number,
}

export const addNewRoute = async (newRoute : NewRoute) : Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/routes`, {userId:newRoute.userId,locations:newRoute.locationIds,name:newRoute.name}, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Route added:", response.data);
    } catch (error) {
      console.log("Failed to add route:", error)
    }
}
export const getRoute = async (routeId: number) : Promise<Route[]> => {
    let route: Route;
    try {
      const routeRes = await axios.get(`${API_URL}/routes/${routeId}`);
      const routeInfo = routeRes.data;
      const locationsRes = await axios.get(`${API_URL}/routes/${routeId}/locations`);
      const locations = locationsRes.data;
      route = {locations:locations,info:routeInfo[0]};
      console.log(route);
      return [route];
    } catch (error) {
      console.error("Failed to get route:", error);
      return [];
    }
}
export const getAllRoutes = async () : Promise<RouteInfo[]> => {
  try {
    const result = await axios.get(`${API_URL}/routes`);
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Failed to get route:", error);
    return [];
  }
}
export const getRandomRouteInfo = async (limit: number) : Promise<RouteInfo[]> => {
    try {
        const response = await axios.get(`${API_URL}/routes/selection/random?limit=${limit}`)
        const data : RouteInfo[] = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error getting routes:", error)
        return [];
    }
}
export const startRouteInstance = async (routeId: number, userId: number): Promise<number[]> => {
  try {
      const response = await axios.post(`${API_URL}/routes/${routeId}/start/user/${userId}`);
      console.log("Route instance started:", response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to start route instance:", error);
      return [];
  }
}
export const updateRouteInstancePosition = async (instanceId: number, destinationNumber: number): Promise<boolean> => {
  try {
      await axios.put(`${API_URL}/routes/update/instance/${instanceId}/position/${destinationNumber}`);
      console.log(`Updated instance ${instanceId} to position ${destinationNumber}`);
      return true;
  } catch (error) {
      console.error("Failed to update route instance position:", error);
      return false;
  }
}
export const endRouteInstance = async (instanceId: number): Promise<boolean> => {
  try {
      await axios.put(`${API_URL}/routes/instance/${instanceId}/end`);
      console.log(`Ended instance ${instanceId}`);
      return true;
  } catch (error) {
      console.error("Failed to end route instance:", error);
      return false;
  }
}
export const getUserActiveInstance = async (userId: number): Promise<Instance[]> => {
  try {
      const response = await axios.get(`${API_URL}/routes/user/${userId}/instance`);
      console.log(`Active instance for user ${userId}:`, response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to get user active instance:", error);
      return [];
  }
}
export const getInstanceById = async (instanceId: number): Promise<Instance[]> => {
  try {
      const response = await axios.get(`${API_URL}/routes/instance/${instanceId}`);
      console.log(`Instance ${instanceId} data:`, response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to get instance by ID:", error);
      return [];
  }
}
export const getRouteRating = async (routeId: number): Promise<Number> => {
  try {
      const response = await axios.get(`${API_URL}/routes/${routeId}/rating`);
      return parseInt(response.data);
  } catch (error) {
      console.error("Failed to get route rating:", error);
      return -1;
  }
}