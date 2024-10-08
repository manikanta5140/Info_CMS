import { GET_USER_URL, UPDATE_USER_URL } from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get(GET_USER_URL);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Registration failed: ${error.response.data?.message || "Unexpected error"
        }`
      );
    } else if (error.request) {
      throw new Error("Registration failed: No response from server");
    } else {
      throw new Error("Registration failed: Unexpected error occurred");
    }
  }
};

export const updateUser = async (updatedUserData) => {
  try {
    // console.log(UPDATE_USER_URL())
    const response = await axiosInstance.patch(UPDATE_USER_URL(), updatedUserData);
    return response.data
  } catch (error) {
    console.log(error)
  }
}