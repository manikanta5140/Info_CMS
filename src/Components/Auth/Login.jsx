import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  checkUserVerified,
  validateEmail,
  validatePassword,
} from "../../utils/Validation.js";
import { useNavigate } from "react-router-dom";
import { login } from "../../Api/services/authService.js";

const Login = ({
  setShowLogin,
  setShowRegister,
  openModal,
  setLoggedInUser,
}) => {
  // Destructure the loginUser function from the AuthContext to handle user login
  const { setIsLoggedIn, setUserDetails } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  /**
   * validate - Validates the input fields for the login form.
   * Ensures that email and password meet the necessary criteria.
   *
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
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

  /**
   * handleChange - Handles the change in input field values.
   * Updates the state with the current value for the respective field.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handleSubmit - Handles the form submission.
   * Checks if the form is valid using the validate function, and if valid,
   * calls the loginUser function from the AuthContext to log in the user.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const user = await login(loginFormData);
      console.log(user);
      localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      if (user) {
        setLoggedInUser(user?.userDetails);
        setUserDetails(user?.userDetails);
        const res = checkUserVerified(user?.userDetails?.isVerified);
        if (res) {
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          setShowLogin(false);
          openModal();
        }
      }
    } else {
      console.log("error", "Please verify your details and try again.");
    }
  };

  /**
   * Render the login form with input fields for email and password,
   * along with a submit button.
   */
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
              <div className="">
                <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                  <Input
                    className="text-primary bg-primary rounded ps-2"
              
                    label="Email"
                    type="Email"
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
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <p className="flex  gap-2 items-center px-6 py-2 text-sm font-medium text-primary">
                Donot have an account?
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
