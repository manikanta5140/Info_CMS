import React, {useState } from "react";
import { Link } from "react-router-dom";
import {Input,Button} from "../index.js";
import { useAuth } from "../../Context/Auth/AuthContext";

const Register = () => {

  const {dispatch}=useAuth();
  /**********State to store the value of input field and errors****************************** */

  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    conformPassword: "",
  });
  const [error, setError] = useState({});

  /**********************check validation for input field before submiting the form **************************/
  const validate = () => {
    let isError = {};

    // Firstname validation
    if (!registerFormData.firstname) {
      isError.firstname = "First name is required";
    } else if (registerFormData.firstname.length < 2) {
      isError.firstname = "First name must be at least 2 characters long";
    }

    // Lastname validation
    if (!registerFormData.lastname) {
      isError.lastname = "Last name is required";
    } else if (registerFormData.lastname.length < 2) {
      isError.lastname = "Last name must be at least 2 characters long";
    }

    // Username validation
    if (!registerFormData.username) {
      isError.username = "Username is required";
    } else if (registerFormData.username.length < 3) {
      isError.username = "Username must be at least 3 characters long";
    } else {
      // Check for unique username
      // const isAvailable = await checkUsernameAvailability(registerFormData.username);
      // if (!isAvailable) {
      //   isError.username = "Username is already taken";
    }

    // Email validation
    if (!registerFormData.email) {
      isError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      isError.email = "Invalid Email";
    }

    // Password validation
    if (!registerFormData.password) {
      isError.password = "Password is required";
    } else if (registerFormData.password.length < 6) {
      isError.password = "Password must be at least 6 characters long";
    }

    // Confirm Password validation
    if (!registerFormData.conformPassword) {
      isError.conformPassword = "Confirm password is required";
    } else if (registerFormData.conformPassword !== registerFormData.password) {
      isError.conformPassword = "Passwords do not match";
    }
    setError(isError);
    return Object.keys(isError).length === 0;
  };

  /******************************* handling the change in input field value********************************* */

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  /*****************************submiting the form by checking form is valid or not ******************* */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({type:"REGISTER",payload:registerFormData});
    } else {
      console.log("invalid form");
    }
  };

  /******************************************************************************************************** */

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
                      error={error.firstname}
                      name="firstname"
                      value={registerFormData.firstname}
                      onChange={handleChange}
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      error={error.lastname}
                      name="lastname"
                      value={registerFormData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter your Username"
                    error={error.username}
                    name="username"
                    value={registerFormData.username}
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
