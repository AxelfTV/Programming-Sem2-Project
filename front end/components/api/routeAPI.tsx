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
    created_by: string;
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
      const routeInfo: RouteInfo = await axios.get(`${API_URL}/routes/${routeId}`);
      const locations: Location[] = await axios.get(`${API_URL}/routes/${routeId}/locations`);
      route = {locations:locations,info:routeInfo};
      console.log(route);
      return [route];
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