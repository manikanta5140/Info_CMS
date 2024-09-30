import axios from "axios";
import API_CONFIG from "./ApiConfig";

// Creating an Axios instance with base settings for all API requests
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  withCredentials: API_CONFIG.withCredentials,
  timeout: API_CONFIG.timeout,
});

/************************************************ 
  Interceptors for adding auth tokens and handling 
  errors such as network issues, token expiry, etc. 
*************************************************/

// Intercept outgoing requests to include authorization token

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/********************************************* 
  Response Interceptors: Handling token expiry 
  or network-related errors for better user experience
**********************************************/

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we receive a 401 Unauthorized response, the token might have expired
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
