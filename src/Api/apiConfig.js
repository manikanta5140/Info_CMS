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

// Function to add Authorization header dynamically
export const setAuthHeader = (token) => {
  console.log(token,":authheader")
  if (token) {
    API_CONFIG.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete API_CONFIG.headers["Authorization"];
  }
};
export default API_CONFIG;
