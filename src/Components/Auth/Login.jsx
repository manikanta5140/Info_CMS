import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  checkUserVerified,
  validateEmail,
  validatePassword,
} from "../../utils/Validation.js";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
  storeGoogleUser,
} from "../../Api/services/authService/authService.js";
import { showNotification } from "../notification/Notification.jsx";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = ({
  setShowLogin,
  setShowRegister,
  openModal,
  setLoggedInUser,
}) => {
  const { setIsLoggedIn, setUserDetails } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const isError = {};
    isError.email = validateEmail(loginFormData.email);
    isError.password = validatePassword(loginFormData.password);
    for (const key in isError) {
      if (isError[key] === null) {
        delete isError[key];
      }
    }

    setError(isError);
    return Object.keys(isError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const user = await login(loginFormData);
      localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      if (user) {
        setLoggedInUser(user?.userDetails);
        setUserDetails(user?.userDetails);
        const res = checkUserVerified(user?.userDetails?.isVerified);
        if (res) {
          showNotification("logged in successfully", "success");
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          setShowLogin(false);
          openModal();
        }
      }
    } else {
      showNotification("Please verify your details and try again.", "error");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto bg-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-important)] to-sky-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-secondary shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="bg-tranparent p-6 w-11/12 md:w-1/2 lg:w-1/3 max-w-lg mx-auto">
                <Button
                  className="absolute text-xl top-6 right-8 bg-secondary text-primary"
                  type="button"
                  onClick={() => setShowLogin(false)}
                >
                  X
                </Button>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold leading-tight lora text-center text-primary">
                  Login
                </h1>
              </div>
              <div className="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
                <Input
                  className="rounded ps-2"
                  label="Email"
                  type="email"
                  name="email"
                  value={loginFormData.email || ""}
                  onChange={handleChange}
                  error={error.email}
                />
                <Input
                  className="text-primary bg-primary rounded ps-2"
                  label="Password"
                  type="password"
                  name="password"
                  value={loginFormData.password || ""}
                  onChange={handleChange}
                  error={error.password}
                />
                <div className="relative">
                  <Button
                    type="submit"
                    className="w-full bg-important text-primary rounded-md font-bold lore mt-2 transition-all hover:scale-105"
                  >
                    Login
                  </Button>
                </div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    const userData = {
                      firstName: decoded?.given_name,
                      lastName: decoded?.family_name,
                      email: decoded?.email,
                      userName: decoded?.email.split("@")[0],
                      email_verified: decoded?.email_verified,
                      profilePhoto: decoded?.picture,
                      password: decoded?.sub,
                    };
                    console.log(userData);

                    storeGoogleUser(userData).then((res) => {
                      console.log(res);
                      localStorage.clear();
                      localStorage.setItem("token", res.accessToken);
                      setLoggedInUser(res.userDetails);
                      setUserDetails(res.userDetails);
                      setIsLoggedIn(true);
                      navigate("/home");
                    });
                  }}
                  onError={() => {
                    showNotification("Login Failed");
                  }}
                />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <p className="flex gap-2 items-center px-6 py-2 text-sm font-medium text-primary">
                Don't have an account?
                <span
                  className="font-bold tracking-wider text-base text-primary transition-all duration-200 underline cursor-pointer"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
