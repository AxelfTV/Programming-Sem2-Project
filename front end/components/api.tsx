import axios from "axios";

const API_URL = "http://localhost:3000"; // Update if needed

interface User {
  username: string;
  password: string;
}

export const addUser = async (user: User): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/add-user`, user, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("User added:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};