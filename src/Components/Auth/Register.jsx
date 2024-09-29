import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../Context/Auth/AuthContext.jsx";

const Register = () => {
  const { registerUser, checkUsername } = useAuth();
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const [error, setError] = useState({});

  /**
   * validate - Validates the input fields for the registration form.
   * Ensures that all required fields meet the necessary criteria.
   *
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validate = async () => {
    const isError = {};

    // Validate firstname: Required and must be at least 2 characters
    if (!registerFormData.firstName) {
      isError.firstName = "First name is required";
    } else if (registerFormData.firstName.length < 2) {
      isError.firstName = "First name must be at least 2 characters long";
    }

    // Validate lastname: Required and must be at least 2 characters
    if (!registerFormData.lastName) {
      isError.lastName = "Last name is required";
    } else if (registerFormData.lastName.length < 2) {
      isError.lastName = "Last name must be at least 2 characters long";
    }

    // Validate username: Required, must be at least 3 characters, and must be unique
    if (!registerFormData.userName) {
      isError.userName = "Username is required";
    } else if (registerFormData.userName.length < 3) {
      isError.userName = "Username must be at least 3 characters long";
    } else {
      try {
        // Check for unique username
        const isAvailable = await checkUsername(registerFormData.userName);
        if (!isAvailable) {
          isError.userName = "Username is already taken";
        }
      } catch (error) {
        isError.userName = "Error checking username availability";
      }
    }

    // Validate email: Required and must match a basic email pattern
    if (!registerFormData.email) {
      isError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      isError.email = "Invalid Email";
    }

    // Validate password: Required and must be at least 6 characters
    if (!registerFormData.password) {
      isError.password = "Password is required";
    } else if (registerFormData.password.length < 6) {
      isError.password = "Password must be at least 6 characters long";
    }

    // Validate confirm password: Required and must match the password
    if (!registerFormData.conformPassword) {
      isError.conformPassword = "Confirm password is required";
    } else if (registerFormData.conformPassword !== registerFormData.password) {
      isError.conformPassword = "Passwords do not match";
    }

    setError(isError);
    return Object.keys(isError).length === 0;
  };

  /**
   * handleChange - Handles the change in input field values.
   * Updates the state with the current value for the respective field.
   *
   * @param {Event} event - The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handleSubmit - Handles the form submission.
   * Checks if the form is valid using the validate function, and if valid,
   * calls the registerUser function from the AuthContext to register the user.
   *
   * @param {Event} e - The form submit event.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validate()) {
      // Call the registerUser function to process registration if the form is valid
      registerUser(registerFormData);
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight lora text-center ">
                  Register
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      error={error.firstName}
                      name="firstName"
                      value={registerFormData.firstName}
                      onChange={handleChange}
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      error={error.lastName}
                      name="lastName"
                      value={registerFormData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter your Username"
                    error={error.userName}
                    name="userName"
                    value={registerFormData.userName}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email"
                    type="Email"
                    placeholder="Enter your Email"
                    error={error.email}
                    name="email"
                    value={registerFormData.email}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col sm:flex-row  gap-4">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      error={error.password}
                      name="password"
                      value={registerFormData.password}
                      onChange={handleChange}
                    />
                    <Input
                      label="Conform Password"
                      type="password"
                      placeholder="Enter your Conform password"
                      error={error.conformPassword}
                      name="conformPassword"
                      value={registerFormData.conformPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <Button
                      type="submit"
                      className="w-full bg-cyan-500 text-white rounded-md font-bold lore mt-2"
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <p className="flex  gap-2 items-center bg-white  px-6 py-2 text-sm font-medium text-gray-800">
                Alredy have an account?
                <Link
                  to="/login"
                  className="font-bold text-primary transition-all duration-200 underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
