import React, { useState, useEffect } from "react";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhoneNumber,
  validateDOB,
} from "../utils/Validation";
import { getUser, updateUser } from "../Api/services/userService";
import { showNotification } from "../Components/notification/Notification";
import { useAuth } from "../Context/AuthContext";
import MobileVerificationModal from "../Components/Layout/MobileVerificationModal";
import VerifyMobNoButton from "../Components/common/VerifyMobNoButton";

const Profile = () => {
  const [formData, setFormData] = useState(null);
  const [initialFormData, setIntitialFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gender, setGender] = useState(null);
  const { setUserDetails } = useAuth();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    getUser()
      .then((res) => {
        setFormData(res);
        setIntitialFormData(res);
        setGender(res?.gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validate()) {
      const formDataToSend = new FormData();

      // Add form data fields
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("gender", gender);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);

      // Add the selected image file (if any)
      if (selectedImage) {
        formDataToSend.append("profilePhoto", selectedImage);
      }

      updateUser(formDataToSend)
        .then((res) => setUserDetails(res))
        .catch((err) => {
          console.log(err);
        });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setSelectedImage(null);
    setError({});
    setGender(initialFormData?.gender);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const validate = async () => {
    const isError = {};
    isError.dateOfBirth = validateDOB(formData.dateOfBirth);

    // Remove fields without errors
    for (const key in isError) {
      if (isError[key] === null) {
        delete isError[key];
      }
    }

    setError(isError);
    return Object.keys(isError).length === 0;
  };

  // Function to open the mobile verification modal
  const onMobileModalOpen = () => {
    setIsMobileModalOpen(true);
  };

  // Function to close the mobile verification modal
  const handleClosePopup = () => {
    setIsMobileModalOpen(false);
  };

  return (
    <>
      <div className="w-full bg-primary px-4 lg:px-12 mt-16 sm:max-w-xl rounded-lg py-6 border border-[var(--color-secondary)]">
        <h1 className="pl-6 text-3xl font-extrabold leading-tight text-primary">
          Profile
        </h1>

        <form onSubmit={handleSubmit} className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            {/* Profile Image */}
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-var[(--color-important)]"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : formData?.profilePhoto
              }
              alt="Profile avatar"
            />

            {/* Image upload option appears only in edit mode */}
            {isEditing && (
              <div className="flex flex-col space-y-5 sm:ml-8">
                <span className="sr-only">Choose profile photo</span>
                <Input
                  type="file"
                  className="block w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>

          <div className="items-center mt-8 sm:mt-14">
            <div className="mb-2 sm:mb-6">
              <Input
                className="bg-primary text-primary"
                label="Username"
                type="text"
                name="userName"
                value={formData?.userName}
                onChange={handleChange}
                disabled // Disable if not editing
                required
              />
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <Input
                className="bg-primary text-primary"
                label="First Name"
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />

              <Input
                className="bg-primary text-primary"
                label="Last Name"
                type="text"
                name="lastName"
                value={formData?.lastName}
                onChange={handleChange}
                disabled={!isEditing} // Disable if not editing
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                className="bg-primary text-primary"
                label="Email"
                type="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                disabled // Disable if not editing
                required
              />
              <div>
                <div className="flex gap-1">
                  <Input
                    className="bg-primary text-primary"
                    label="Phone Number"
                    type="text"
                    name="mobileNumber"
                    error={error.mobileNumber}
                    value={formData?.mobileNumber || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <VerifyMobNoButton
                    onClick={() => {
                      onMobileModalOpen();
                    }}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    children="Verify"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              {/* Gender Toggle */}
              <div className="flex items-center space-x-4 w-full sm:w-1/2">
                <div
                  className={`flex bg-blue-100 border border-blue-300 rounded p-1 ${
                    !isEditing ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <div
                    className={`flex justify-center items-center w-20 py-2 rounded cursor-pointer ${
                      gender === "Male"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-black"
                    }`}
                    onClick={() => setGender("Male")}
                  >
                    Male
                  </div>
                  <div
                    className={`flex justify-center items-center w-20 py-2 rounded cursor-pointer ${
                      gender === "Female"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-black"
                    }`}
                    onClick={() => setGender("Female")}
                  >
                    Female
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="w-full sm:w-1/2">
                <Input
                  className="bg-fill text-primary"
                  type="date"
                  name="dateOfBirth"
                  error={error.dateOfBirth}
                  value={
                    formData?.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  disabled={!isEditing} // Disable if not editing
                  required
                />
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            {isEditing && (
              <div className="flex justify-center w-full mb-8 space-x-4">
                <Button
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                  children="Save"
                />
                <Button
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
                  type="button"
                  onClick={handleCancel}
                  children="Cancel"
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Mobile Verification Modal */}
      {isMobileModalOpen && (
        <MobileVerificationModal
          isOpen={isMobileModalOpen}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Profile;
