import React, { useContext,  useReducer} from "react";

/**************************Createating the context*************************************************/

const AuthContext = React.createContext();

/****************************Hook to access the AuthContext********************************************/

export const useAuth = () => {
  return useContext(AuthContext);
};

/************************************provider for auth**********************************/

export const AuthProvider = ({ children }) => {
    /******************* initialising the Initial state************************************/

    const initialState = {
      user: null,
      isLoggedIn: false,
    };
    
  /*************************** reducer function to handle the action **************************************** */

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
        };
      }
      case "REGISTER": {
        console.log(action.payload)
        return {
          ...state,
          user: action.payload,
          isLoggedIn: false,
        };
      }
      case "LOGOUT": {
        return {
          ...state,
          user: null,
          isLoggedIn: false,
        };
      }
      default:
        return state;
    }
  };

  

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
