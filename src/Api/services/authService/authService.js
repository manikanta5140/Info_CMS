import {
  CHECK_USERNAME_URL,
  CHECK_VALID_TOKEN,
  REGISTER_URL,
  STORE_GOOGLE_USER,
  RESEND_EMAIL,
} from "../../../constants/apiURL.js";
import { LOGIN_URL } from "../../../constants/apiURL.js";
import axiosInstance from "../../axiosInstance.js";
import { showNotification } from "../../../Components/notification/Notification.jsx";

/**
 * Login Service
 * Sends a POST request to the login API endpoint to authenticate a user.
 * @param {Object} userData - The user's login credentials, typically includes email and password.
 * @returns {Object} - Returns user data and access token upon successful login.
 * @throws {Error} - Throws an error with a meaningful message if the login request fails.
 */

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      showNotification( `Login failed: ${error.response.data?.message || "Unexpected error"}`, "error");
    } else {
      showNotification(error.message,"error");
    }
  }
};

/**
 * Register Service
 * Sends a POST request to the registration API endpoint to create a new user.
 * @param {Object} userData - The user's registration information, such as name, email, and password.
 * @returns {Object} - Returns the newly created user data upon successful registration.
 * @throws {Error} - Throws an error with a meaningful message if the registration request fails.
 */
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post(REGISTER_URL, userData);
    return response.data;
  } catch (error) {
    showNotification(error.message,"error");
  }
};

/**
 * checkUsernameAvailability - Checks if the given username is available by making a request to the backend.
 * This function calls an API endpoint that verifies if the username is already in use.
 *
 * @param {string} username - The username to check for availability.
 * @returns {boolean} - Returns `true` if the username is available, `false` if it's already taken.
 * @throws {Error} - Throws an error if the request fails or there's an issue with the API call.
 */

export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axiosInstance.post(CHECK_USERNAME_URL, {
      userName: username,
    });
    return response.data.isUnique;
  } catch (error) {
    // throw new Error("Error checking username availability");
  }
};

export const checkValidToken = async (token) => {
  try {
    const response = await axiosInstance.get(CHECK_VALID_TOKEN(token));
    return response.data;
  } catch (error) {
    showNotification(error.message,"error");
  }
};

export const storeGoogleUser = async (userPayload) => {
  console.log(userPayload)
  try {
    const response = await axiosInstance.post(STORE_GOOGLE_USER, userPayload);
    console.log(response.data,"dervice")
    return response.data;
  } catch (error) {
    console.error("Error storing Google user:", error);
  }
};

export const resendMail=async ()=>{
  try{
    const response=await axiosInstance.post(RESEND_EMAIL);
    return response.data;
  }catch(error){
    showNotification(error.message,"error");
  }
}
