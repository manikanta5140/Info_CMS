import React, { useContext, useState } from "react";

/**
 * AuthContext is a React context that holds authentication state.
 * It can be accessed by any component wrapped within the AuthProvider.
 */
const contentContext = React.createContext();

/**
 * Custom hook to provide access to the AuthContext. This hook simplifies
 * access to the authentication state and actions like login and register.
 *
 * @returns {object} - The current value of AuthContext which includes user data,
 * login, and registration handlers.
 */
export const useContent = () => {
  return useContext(contentContext);
};

/**
 * AuthProvider component provides the authentication context to its child components.
 * It manages the authentication state (logged-in user, login status, loading, error)
 * and persists the login state across page refreshes.
 *
 * @param {ReactNode} children - The child components that will consume the AuthContext.
 */
export const AuthProvider = ({ children }) => {
  const [historyContent, setHistoryContent] = useState();
  const [error, setError] = useState(null);



  /**
   * loginUser - Handles user login by calling the login service.
   * Stores user data in both the state and localStorage on successful login.
   *
   * @param {object} userData - The login credentials.
   */
  const loginUser = async (userData) => {
    try {
      const HistoryContent = await login(userData);
      setAuthUser(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * registerUser - Handles user registration by calling the registration service.
   * Stores new user data in both the state and localStorage on successful registration.
   *
   * @param {object} userData - The registration credentials.
   */

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const newUser = await register(userData);
      setAuthUser(newUser);
      // localStorage.setItem("accessToken", JSON.stringify(newUser));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to check if a username is available
  const checkUsername = async (username) => {
    try {
      const isAvailable = await checkUsernameAvailability(username);
      return isAvailable;
    } catch (error) {
      setError("Error checking username availability");
      return false;
    }
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    error,
    loginUser,
    registerUser,
    checkUsername,
  };

  // Return the provider component, wrapping all children components with AuthContext

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
