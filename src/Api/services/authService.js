import {
  CHECK_USERNAME_URL,
  CHECK_VALID_TOKEN,
  REGISTER_URL,
} from "../../constants/apiURL.js";
import { LOGIN_URL } from "../../constants/apiURL.js";
import axiosInstance from "../axiosInstance";
import { showNotification } from "../../Components/notification/Notification.jsx";

/**
 * Login Service
 * Sends a POST request to the login API endpoint to authenticate a user.
 * @param {Object} userData - The user's login credentials, typically includes email and password.
 * @returns {Object} - Returns user data and access token upon successful login.
 * @throws {Error} - Throws an error with a meaningful message if the login request fails.
 */

export const login = async (userData) => {
  try {
    console.log(userData);
    const response = await axiosInstance.post(LOGIN_URL, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      showNotification("logged in failed", "error");
      throw new Error(
        `Login failed: ${error.response.data?.message || "Unexpected error"}`
      );
    } else if (error.request) {
      throw new Error("Login failed: No response from server");
    } else {
      throw new Error("Login failed: Unexpected error occurred");
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data?.message);
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
    const response = await axiosInstance.get(CHECK_USERNAME_URL, {
      params: { username },
    });
    return response.data.isAvailable;
  } catch (error) {
    throw new Error("Error checking username availability");
  }
};

export const checkValidToken = async (token) => {
  try {
    const response = await axiosInstance.get(CHECK_VALID_TOKEN(token));
    console.log(response.data, "authserrrr");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const resendMail=()=>{
//   try{
//     const response=await axiosInstance.get()
//   }
// }
