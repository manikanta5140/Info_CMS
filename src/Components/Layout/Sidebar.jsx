import React from "react";
import { BrowserRouter, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faSignsPost,
  faClockRotateLeft,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = ({ openSideBar, toggleSideBar }) => {
  const { logout } = useAuth();
  const getActiveClassName = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary"
      : "text-secondary hover:bg-primary group";

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-fill border-r border-[var(--color-important)] ${
          openSideBar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${getActiveClassName({
                    isActive,
                  })}`
                }
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary"
                  icon={faHouseUser}
                />
                <span className="ms-3">Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${getActiveClassName({
                    isActive,
                  })}`
                }
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary"
                  icon={faClockRotateLeft}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/posted-content"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${getActiveClassName({
                    isActive,
                  })}`
                }
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary"
                  icon={faSignsPost}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Posted Content
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${getActiveClassName({
                    isActive,
                  })}`
                }
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary"
                  icon={faUser}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Account
                </span>
              </NavLink>
            </li>

            <li>
              <div
                className="fixed bottom-5 w-60 flex items-center p-2 text-primary rounded hover:bg-primary group"
                onClick={() => {
                  logout();
                  toggleSideBar();
                }}
              >
                <FontAwesomeIcon
                  className="mr-2 flex-shrink-0 w-5 h-5 text-secondary transition duration-75 group-hover:text-primary"
                  icon={faRightFromBracket}
                />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-1 sm:ml-64 bg-fill">
        <div className="p-1 rounded-lg">
          <div className="flex justify-center min-h-screen rounded mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
