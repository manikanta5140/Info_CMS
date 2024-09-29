/****************************************************************
 **************Configuration object for axios requests,*********
 ************** centralizing all API-related settings.**********
 **************************************************************/

const API_CONFIG = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // Set a 10-second timeout for any API request to avoid long delays
  headers: {
    "Content-Type": "application/json", // Ensuring all requests send data in JSON format
    Accept: "application/json",
  },
  withCredentials: true, // Include credentials (cookies, tokens) with every request
};

export default API_CONFIG;
