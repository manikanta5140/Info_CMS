import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Modal from "./Model";
import { useAuth } from "../../Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../Api/services/userService";
import { useTheme } from "../../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification } from "../notification/Notification";
import {
  faUser,
  faRightFromBracket,
  faBars,
  faChevronDown,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { resendMail } from "../../Api/services/authService/authService";

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    checkToken,
    validateToken,
    isLoggedIn,
    logout,
    userDetails,
  } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /************************************Modal********************** */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  /*********************************************** */
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  /************************************logic for verifying the user either it is verified or not******************* */
  useEffect(() => {
    if (authUser) {
      const interval = setInterval(async () => {
        const userData = await getUser();
        if (userData?.isVerified) {
          clearInterval(interval);
          if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            closeModal();
            showNotification("Verified successfully", "success");
            navigate("/home");
          }
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [authUser]);

  useEffect(() => {
    validateToken();
  }, []);

  const handleResend = () => {
    resendMail();
  };

  const handleThemeChange = () => {
    setTheme(`${theme === "theme-dark" ? "theme-light" : "theme-dark"}`);
  };

  const handleStarted = () => {
    if (checkToken) {
      navigate("/home");
    } else {
      setShowLogin(true);
    }
  };
  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the dropdown and sidebar
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar Section */}
      <div className="bg-gradient-to-b from-[var(--color-important)] to-white">
        <div
          className={`${
            theme === "theme-dark"
              ? "bg-[url(grid-dark.svg)]"
              : "bg-[url(grid-light.svg)]"
          } bg-[length:300px] bg-repeat`}
        >
          <div className=" py-2">
            <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
              <div className="text-blue-gray-900 text-2xl font-bold py-3 px-6 rounded-lg flex items-center">
                <NavLink
                  to="/"
                  className="w-20 h-10 bg-white flex items-center justify-center  shadow-md rounded-lg   font-bold "
                >
                  <p className="blue-gradient_text">CMS</p>
                </NavLink>
              </div>

              <div className="lg:flex items-center space-x-6">
                <div className="flex  items-center justify-center bg  text-3xl font-extrabold rounded">
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
                {isLoggedIn ? (
                  <div className="">
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
                        className="z-50 fixed right-2 top-12 md:top-12 my-4 text-base list-none bg-secondary divide-y divide-gray-950 rounded shadow"
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
                ) : (
                  <Button
                    bgColor="bg-important"
                    className={`${
                      theme === "theme-dark"
                        ? "hover:shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)]"
                        : ""
                    } text-primary py-2 px-6 rounded-lg text-sm font-medium md:text-lg transition-all`}
                    onClick={() => {
                      if (!isLoggedIn) setShowLogin(true);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <header className=" pt-16 px-5 md:px-0">
            <div className="container mx-auto text-center max-w-4xl ">
              <div className="inline-block text-xs lg:text-sm rounded-lg border-2 border-[var(--color-primary)] bg-fill py-2 px-4 font-semibold text-primary mb-4">
                Powerful Solutions for Your Content Management
              </div>
              <h1
                id="blur"
                className="drop-shadow-2xl text-3xl lg:text-5xl font-bold text-primary leading-snug mb-6"
              >
                Streamline your content with{" "}
                <span className="text-important">our advanced CMS</span>, built
                for <span className="text-important">creators</span> and{" "}
                <span className="text-important">marketers</span>.
              </h1>
              <p
                id="blur"
                className="text-secondary text-lg font-medium lg:text-xl max-w-2xl mx-auto"
              >
                Organize, manage, and deliver your content efficiently with a
                system that evolves with your needs.
              </p>

              <div className="my-6 ">
                <Button
                  bgColor="bg-important"
                  className={`${
                    theme === "theme-dark"
                      ? "shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)]"
                      : ""
                  } text-primary py-3 px-6 rounded-lg text-lg font-medium transition-all hover:scale-105`}
                  onClick={handleStarted}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section className="py-4 px-5 md:px-0">
            <div className="container mx-auto text-center px-1 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Free to Use
                  </h3>
                  <p className="text-secondary">
                    Enjoy a powerful CMS platform with zero cost, designed to
                    help you manage content efficiently.
                  </p>
                </div>
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Multi-Platform Posting
                  </h3>
                  <p className="text-secondary">
                    Publish your content simultaneously across multiple
                    platforms like LinkedIn, Twitter, and more.
                  </p>
                </div>
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Job Scheduling
                  </h3>
                  <p className="text-secondary">
                    Schedule your posts and tasks ahead of time, ensuring
                    content is delivered when your audience is most active.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Login Modal Popup */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0">
          <Login
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            openModal={openModal}
            setLoggedInUser={setAuthUser}
          />
        </div>
      )}
      {/* Register Modal Popup */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0 ">
          <Register
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            openModal={openModal}
            setRegisteredUser={setAuthUser}
          />
        </div>
      )}
      {/**********************varification modal popop************** */}
      <Modal isOpen={isModalOpen} onResend={handleResend} />
    </>
  );
}

export default Landing;
