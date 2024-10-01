import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faSignsPost,
  faClockRotateLeft,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ContentHistory from "../../pages/ContentHistory";
import Profile from "../../pages/Profile";
import PostedContent from "../../pages/PostedContent";
import Home from "../../pages/Home";
import GenerateContent from "../../pages/GenerateContent";

const Sidebar = ({ openSideBar, toggleSideBar }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
          openSideBar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  icon={faHouseUser}
                />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  icon={faClockRotateLeft}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">History</span>
              </Link>
            </li>
            <li>
              <Link
                to="/posted-content"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  icon={faSignsPost}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Posted Content
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  icon={faUser}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Account
                </span>
              </Link>
            </li>
            <li>
              <div
                className="fixed bottom-5 w-60 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon
                  className="mr-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  icon={faRightFromBracket}
                />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-2 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg">
          <div className="flex  justify-center min-h-screen rounded mt-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
