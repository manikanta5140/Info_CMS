import { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {

//     //    subscribe to auth service
//     const subscribe = AuthService.subscribe((user) => {
//       if (user) {
//         setAuthUser(user);
//         isLoggedIn(true);
//       } else {
//         setAuthUser(null);
//         isLoggedIn(false);
//       }
//     });

//     return subscribe;
//   });

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
