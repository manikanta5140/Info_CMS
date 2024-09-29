import React from "react";
import { logout } from "../../Api/services/authService";

const LogoutBtn = () => {
  const logoutHandler = () => {
    logout();
  };

  return (
    <div
      className="fixed bottom-5 w-60 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      onClick={logoutHandler}
    >
      <FontAwesomeIcon
        className="mr-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        icon={faRightFromBracket}
      />
      Logout
    </div>
  );
};

export default LogoutBtn;
