import axios from "axios";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";

export const uploadImage = async (file: File): Promise<boolean> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post(`${API_URL}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Image uploaded");
        return true;
    } catch (error) {
        console.error("Failed to upload image:", error);
        return false;
    }
};
export const updateUserProfileImage = async (userId: number, file: File): Promise<boolean> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        await axios.put(`${API_URL}/images/user/${userId}/profile?type=profile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("User profile image updated");
        return true;
    } catch (error) {
        console.error("Failed to update profile image:", error);
        return false;
    }
};
export const uploadInstanceImage = async (instanceId: number, locationId: number, file: File): Promise<boolean> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post(`${API_URL}/images/instance/${instanceId}/location/${locationId}?type=instance`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Instance image uploaded");
        return true;
    } catch (error) {
        console.error("Failed to upload instance image:", error);
        return false;
    }
};