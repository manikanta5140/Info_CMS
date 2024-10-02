import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../Context/Auth/AuthContext.jsx";
import {
  validateFirstName,
  validateLastName,
  validateUserName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  checkUserVerified,
} from "../../utils/Validation.js";

const Register = ({ setShowRegister, setShowLogin, openModal }) => {
  const { registerUser, checkUsername, authUser } = useAuth();
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate
    isError.firstName = validateFirstName(registerFormData.firstName);
    isError.lastName = validateLastName(registerFormData.lastName);
    // isError.userName = await validateUserName(registerFormData.userName, checkUsername);
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
      delete registerFormData.confirmPassword;
      await registerUser(registerFormData);
      console.log(authUser, "reg");
      if (authUser) {
        const res = checkUserVerified(authUser?.userDetails?.isVerified);
        if (res) {
          localStorage.setItem(
            "authUser",
            JSON.stringify(authUser.accessToken)
          );
          navigate("/dashboard");
        } else {
          setShowLogin(false);
          setShowRegister(false);
          openModal();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="bg-tranparent w-11/12 md:w-1/2 lg:w-1/3 max-w-lg mx-auto">
              <Button
                className="absolute top-6 right-8 bg-gray-200 text-black"
                type="button"
                onClick={() => setShowRegister(false)}
              >
                X
              </Button>
            </div>
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
                    error={error.firstName}
                    name="firstName"
                    value={registerFormData.firstName || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    error={error.lastName}
                    name="lastName"
                    value={registerFormData.lastName || ""}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  label="Username"
                  type="text"
                  error={error.userName}
                  name="userName"
                  value={registerFormData.userName || ""}
                  onChange={handleChange}
                />

                <Input
                  label="Email"
                  type="Email"
                  error={error.email}
                  name="email"
                  value={registerFormData.email || ""}
                  onChange={handleChange}
                />
                <div className="flex flex-col sm:flex-row  gap-4">
                  <Input
                    label="Password"
                    type="password"
                    error={error.password}
                    name="password"
                    value={registerFormData.password || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    error={error.confirmPassword}
                    name="confirmPassword"
                    value={registerFormData.confirmPassword || ""}
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
              <span
                className="font-bold text-primary transition-all duration-200 underline cursor-pointer"
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
