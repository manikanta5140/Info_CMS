import React from "react";
import { Link } from "react-router-dom";
import Input from "../input";
import Button from "../Button";

const Register = () => {
  return (
    <>
      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-3xl font-extrabold leading-tight lora text-center ">
                  Register
                </h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter your Username"
                  />

                  <Input
                    label="Email"
                    type="Email"
                    placeholder="Enter your Email"
                  />
                  <div className="flex gap-4">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <Input
                      label="Conform Password"
                      type="password"
                      placeholder="Enter your Conform password"
                    />
                  </div>
                  <div class="relative">
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

            <div class="w-full flex justify-center">
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
    </>
  );
};

export default Register;
