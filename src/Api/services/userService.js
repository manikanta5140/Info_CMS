import { GET_USER_URL } from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get(GET_USER_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Registration failed: ${
          error.response.data?.message || "Unexpected error"
        }`
      );
    } else if (error.request) {
      throw new Error("Registration failed: No response from server");
    } else {
      throw new Error("Registration failed: Unexpected error occurred");
    }
  }
};
