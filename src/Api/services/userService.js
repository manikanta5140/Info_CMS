import { showNotification } from "../../Components/notification/Notification";
import { GET_USER_URL, UPDATE_USER_URL } from "../../constants/apiURL";
import axiosInstance from "../axiosInstance";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get(GET_USER_URL);
    return response.data;
  } catch (error) {
    console.error(error.message, "error");
  }
};

/**
 *
 * @param {*} updatedUserData
 * @returns
 */
export const updateUser = async (updatedUserData) => {
  console.log(updatedUserData, "user");
  for (let [key, value] of updatedUserData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axiosInstance.patch(
      UPDATE_USER_URL(),
      updatedUserData
    );
    return response.data;
  } catch (error) {
    showNotification(error.message, "error");
  }
};
