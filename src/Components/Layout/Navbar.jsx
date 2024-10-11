import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faBars,
  faChevronDown,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, userDetails } = useAuth();
  const { theme, setTheme, themes } = useTheme();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the dropdown and sidebar
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleThemeChange = () => {
    setTheme(`${theme === "theme-dark" ? "theme-light" : "theme-dark"}`);
  };

  // Add event listener for clicks outside the dropdown and sidebar
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-primary">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon className="w-6 h-6" icon={faBars} />
              </button>
              <NavLink
                to="/"
                className="w-20 h-10 bg-white flex items-center justify-center  shadow-md rounded-lg   font-bold "
              >
                <p className="blue-gradient_text">CMS</p>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-8 ms-3">
                <div className="flex  items-center justify-center bg  text-2xl font-extrabold rounded">
                  <button onClick={handleThemeChange}>
                    {theme === "theme-dark" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        className="text-white rounded-full hover:shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)]"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faMoon} />
                    )}
                  </button>
                </div>
                <div
                  className="flex gap-3 items-center justify-center focus:ring-4 focus:ring-gray-300 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button
                    type="button"
                    className="flex text-sm bg-white-800 rounded-full "
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userDetails?.profilePhoto}
                      alt="user photo"
                    />
                  </button>
                  {theme === "theme-dark" ? (
                    <FontAwesomeIcon
                      className="text-white"
                      icon={faChevronDown}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="z-50 fixed right-2 top-14 md:top-12 my-4 text-base list-none bg-secondary divide-y divide-gray-950 rounded shadow"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm text-primary">
                        {userDetails?.userName || "user"}
                      </p>
                      <p className="text-sm font-medium text-primary truncate">
                        {userDetails?.email || "user@gmail.com"}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li onClick={toggleDropdown}>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-primary hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            className="mr-2 flex-shrink-0 w-4 h-4 text-primary transition duration-75 group-hover:text-secondary"
                            icon={faUser}
                          />
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-primary hover:bg-primary"
                          onClick={() => {
                            logout();
                            toggleDropdown();
                          }}
                        >
                          <FontAwesomeIcon
                            className="mr-2 flex-shrink-0 w-4 h-4 text-primary transition duration-75 group-hover:text-secondary"
                            icon={faRightFromBracket}
                          />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar
        openSideBar={openSideBar}
        toggleSideBar={toggleSideBar}
        dropdownRef={dropdownRef}
      />
    </>
  );
};

export default Navbar;
