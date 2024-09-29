import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const dropdownRef = useRef(null);

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

  // Add event listener for clicks outside the dropdown and sidebar
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSideBar}
              >
                <FontAwesomeIcon className="w-6 h-6" icon={faBars} />
              </button>
              <Link to="/" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  InfoCms
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div
                  className="flex gap-3 items-center justify-center focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full "
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="z-50 fixed right-0 top-12 md:top-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Anup kumar
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        anup@gmail.com
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={toggleDropdown}
                        >
                          <FontAwesomeIcon
                            className="mr-2 flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            icon={faRightFromBracket}
                          />
                          <span>Logout</span>
                        </Link>
                      </li>
                      <li onClick={toggleDropdown}>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <FontAwesomeIcon
                            className="mr-2 flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            icon={faUser}
                          />
                          My Account
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
      <Sidebar openSideBar={openSideBar} toggleSideBar={toggleSideBar} />
    </>
  );
};

export default Navbar;
