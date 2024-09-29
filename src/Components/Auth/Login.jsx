import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth/AuthContext";
import Input from "../common/Input";
import Button from "../common/Button";

const Login = () => {
  // Destructure the loginUser function from the AuthContext to handle user login
  const { loginUser } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  /**
   * validate - Validates the input fields for the login form.
   * Ensures that email and password meet the necessary criteria.
   *
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validate = () => {
    const isError = {};

    // Validate email: Required and must match a basic email pattern
    if (!loginFormData.email) {
      isError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      isError.email = "Invalid Email";
    }

    // Validate password: Required and must be at least 6 characters
    if (!loginFormData.password) {
      isError.password = "Password is required";
    } else if (loginFormData.password.length < 6) {
      isError.password = "Password must be at least 6 characters long";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      loginUser(loginFormData);
      console.log("Form is valid");
    } else {
      console.log("Invalid form");
    }
  };

  /**
   * Render the login form with input fields for email and password,
   * along with a submit button.
   */
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-3xl font-extrabold leading-tight lora text-center ">
                    Login
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Input
                      label="Email"
                      type="Email"
                      placeholder="Enter your password"
                      name="email"
                      value={loginFormData.email}
                      onChange={handleChange}
                      error={error.email}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={loginFormData.password}
                      onChange={handleChange}
                      error={error.password}
                    />
                    <div className="relative">
                      <Button
                        type="submit"
                        className="w-full bg-cyan-500 text-white rounded-md font-bold lore mt-2 "
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <p className="flex  gap-2 items-center bg-white  px-6 py-2 text-sm font-medium text-gray-800">
                  Donot have an account?
                  <Link
                    to="/register"
                    className="font-bold text-primary transition-all duration-200 underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
