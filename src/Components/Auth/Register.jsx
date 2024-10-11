import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../Context/AuthContext.jsx";
import {
  validateFirstName,
  validateLastName,
  validateUserName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  checkUserVerified,
} from "../../utils/Validation.js";
import { register } from "../../Api/services/authService/authService.js";
import { setAuthHeader } from "../../Api/ApiConfig.js";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../notification/Notification.jsx";
import Landing from "../Layout/Landing.jsx";

const Register = ({
  setShowRegister,
  setShowLogin,
  openModal,
  setRegisteredUser,
}) => {
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUserDetails } = useAuth();
  const [error, setError] = useState({});

  const validate = async () => {
    const isError = {};

    // Validate
    isError.firstName = validateFirstName(registerFormData.firstName);
    isError.lastName = validateLastName(registerFormData.lastName);
    isError.userName = await validateUserName(registerFormData.userName);
    isError.email = validateEmail(registerFormData.email);
    isError.password = validatePassword(registerFormData.password);
    isError.confirmPassword = validateConfirmPassword(
      registerFormData.confirmPassword,
      registerFormData.password
    );

    // Remove fields without errors
    for (const key in isError) {
      if (isError[key] === null) {
        delete isError[key];
      }
    }

    setError(isError);
    return Object.keys(isError).length === 0;
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    // Update form data
    setRegisterFormData((prev) => ({ ...prev, [name]: value }));

    // Validate username dynamically
    if (name === "userName") {
      const userNameError = await validateUserName(value);
      setError((prev) => ({ ...prev, userName: userNameError }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validate()) {
      // Remove confirmPassword before sending data
      const { confirmPassword, ...submitData } = registerFormData;
      try {
        const newUser = await register(submitData);
        setRegisteredUser(newUser?.userDetails);
        localStorage.clear();
        localStorage.setItem("token", newUser?.accessToken);
        setAuthHeader(newUser?.accessToken);
        if (newUser) {
          const res = checkUserVerified(newUser?.userDetails?.isVerified);
          setUserDetails(newUser?.userDetails);
          if (res) {
            setIsLoggedIn(true);
            showNotification("Verified successfully", "success");
            navigate("/home");
          } else {
            openModal();
            setShowRegister(false);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto scale-[0.85]">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-important)] to-sky-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-secondary shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="bg-transparent w-11/12 md:w-1/2 lg:w-1/3 max-w-lg mx-auto">
              <Button
                className="absolute bg-secondary text-xl top-6 right-8 text-primary"
                type="button"
                onClick={() => setShowRegister(false)}
              >
                X
              </Button>
            </div>
            <div>
              <h1 className="text-3xl text-primary font-extrabold leading-tight lora text-center ">
                Register
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    label="First Name"
                    className="rounded ps-2"
                    type="text"
                    error={error.firstName}
                    name="firstName"
                    value={registerFormData.firstName || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Last Name"
                    className="rounded ps-2"
                    type="text"
                    error={error.lastName}
                    name="lastName"
                    value={registerFormData.lastName || ""}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  label="Username"
                  className="rounded ps-2"
                  type="text"
                  error={error.userName}
                  name="userName"
                  value={registerFormData.userName || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Email"
                  type="Email"
                  className="rounded ps-2"
                  error={error.email}
                  name="email"
                  value={registerFormData.email || ""}
                  onChange={handleChange}
                />
                <div className="flex flex-col sm:flex-row  gap-4">
                  <Input
                    label="Password"
                    className="rounded ps-2"
                    type="password"
                    error={error.password}
                    name="password"
                    value={registerFormData.password || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    className="rounded ps-2"
                    error={error.confirmPassword}
                    name="confirmPassword"
                    value={registerFormData.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <Button
                    type="submit"
                    className="w-full bg-important text-primary rounded-md font-bold mt-2 transition-all hover:scale-105 "
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <p className="flex  gap-2 items-center px-6 py-2 text-sm font-medium text-secondary">
              Already have an account?
              <span
                className="font-bold tracking-wider text-base text-primary transition-all duration-200 underline cursor-pointer"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
