import React, { useContext, useEffect, useState } from "react";
import {
  checkUsernameAvailability,
  checkValidToken,
  login,
  register,
} from "../Api/services/authService";
import { getUser } from "../Api/services/userService";
import { useNavigate } from "react-router-dom";

/**
 * AuthContext is a React context that holds authentication state.
 * It can be accessed by any component wrapped within the AuthProvider.
 */
const AuthContext = React.createContext();

/**
 * Custom hook to provide access to the AuthContext. This hook simplifies
 * access to the authentication state and actions like login and register.
 *
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * AuthProvider component provides the authentication context to its child components.
 * It manages the authentication state (logged-in user, login status, loading, error)
 * and persists the login state across page refreshes.
 *
 * @param {ReactNode} children - The child components that will consume the AuthContext.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkToken, setCheckToken] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  // Method to validate the token
  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await checkValidToken(token);
        if (res.status === 200) {
          await getUser()
            .then((res) => setUserDetails(res))
            .catch((err) => console.log(err));
          setCheckToken(true);
          setIsLoggedIn(true);
        } else {
          setCheckToken(false);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setCheckToken(false);
        setIsLoggedIn(false);
      }
    } else {
      setCheckToken(false);
      setIsLoggedIn(false);
    }
  };

  /**************************************************Logout functionality*********************************** */

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserDetails(null);
    setCheckToken(false);
    navigate("/");
  };

  const value = {
    userDetails,
    setUserDetails,
    isLoggedIn,
    setIsLoggedIn,
    checkToken,
    setCheckToken,
    validateToken,
    logout,
  };

  useEffect(() => console.log(checkToken), [setCheckToken]);
  // Return the provider component, wrapping all children components with AuthContext

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
