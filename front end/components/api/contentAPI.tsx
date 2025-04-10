import axios from "axios";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

interface Post {
    user_id: number;
    instance_id: number;
    created_at: string;
}
interface PostImage {
    instance_id: number;
    location_id: number;
    image_src: string;
    created_at: string
}

export const getUserPosts = async (userId: number, amount : number): Promise<Post[]> => {
    try {
        const response = await axios.get(`${API_URL}/content/user/${userId}/posts?limit=${amount}`);
        console.log(`Posts by user ${userId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get user posts:", error);
        return [];
    }
};
export const createPost = async (userId: number, instanceId: number): Promise<boolean> => {
    try {
        await axios.post(`${API_URL}/content/user/${userId}/create/${instanceId}`);
        console.log("Post created");
        return true;
    } catch (error) {
        console.error("Failed to create post:", error);
        return false;
    }
};
export const getUserFeed = async (userId: number, amount: number): Promise<Post[]> => {
    try {
        const response = await axios.get(`${API_URL}/content/user/${userId}/feed?limit=${amount}`);
        console.log(`Feed for user ${userId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get user feed:", error);
        return [];
    }
};
export const getPostImages = async (instanceId: number): Promise<PostImage[]> => {
    try {
        const response = await axios.get(`${API_URL}/content/instance/${instanceId}/images`);
        console.log(`Images for instance ${instanceId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get post images:", error);
        return [];
    }
};
export const rateRoute = async (userId: number, routeId: number, score: number): Promise<boolean> => {
    try {
        await axios.post(`${API_URL}/content/rate/user/${userId}/route/${routeId}/rating/${score}`);
        console.log(`Rated route ${routeId} with score ${score}`);
        return true;
    } catch (error) {
        console.error("Failed to rate route:", error);
        return false;
    }
};