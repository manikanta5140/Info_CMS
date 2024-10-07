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
import { getUser } from "../Api/services/userService";

const Profile = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  ); // Default profile image
  const [selectedImage, setSelectedImage] = useState(null); // Image preview
  const [updatedFormData, setUpdatedFormData] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => {
        setFormData(res);
        console.log(res);
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
    setUpdatedFormData({
      ...updatedFormData,
      [name]: value,
    });
  };

  const [gender, setGender] = useState("Male");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (await validate()) {
  //     console.log("Form Data:", formData);
  //     if (selectedImage) {
  //       console.log("Image Path:", URL.createObjectURL(selectedImage));
  //     }
  //     // Send form data including image to backend for storage
  //     setIsEditing(false); // Disable editing after saving
  //   } else {
  //     console.log("Invalid form");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validate()) {
      const formDataToSend = new FormData();

      // Add form data fields
      formDataToSend.append("userName", formData.userName);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dob", formData.dob);

      // Add the selected image file (if any)
      if (selectedImage) {
        formDataToSend.append("profileImage", selectedImage);
      }

      // Print form data in console
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      console.log(updatedFormData);

      // Example: sending the form data to the backend using fetch or axios
      // try {
      //   const response = await fetch("/api/profile", {
      //     method: "POST",
      //     body: formDataToSend, // Send the FormData object
      //   });

      //   if (response.ok) {
      //     console.log("Profile updated successfully");
      //     // Handle success response
      //   } else {
      //     console.log("Error updating profile");
      //     // Handle error response
      //   }
      // } catch (error) {
      //   console.error("Error:", error);
      // }

      setIsEditing(false); // Disable editing after saving
    } else {
      console.log("Invalid form");
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Disable editing and revert changes
    setSelectedImage(null); // Reset selected image on cancel
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store selected image for preview
    }
  };

  const [error, setError] = useState({});
  const validate = async () => {
    const isError = {};

    // Validate
    isError.firstName = validateFirstName(formData.firstName);
    isError.lastName = validateLastName(formData.lastName);
    isError.email = validateEmail(formData.email);
    isError.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    isError.dob = validateDOB(formData.dob);

    // Remove fields without errors
    for (const key in isError) {
      if (isError[key] === null) {
        delete isError[key];
      }
    }

    setError(isError);
    return Object.keys(isError).length === 0;
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
                  : profileImage
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
                error={error.userName}
                value={formData?.userName}
                onChange={handleChange}
                disabled={!isEditing} // Disable if not editing
                required
              />
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <Input
                className="bg-primary text-primary"
                label="First Name"
                type="text"
                name="firstName"
                error={error.firstName}
                value={formData?.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing} // Disable if not editing
                required
              />

              <Input
                className="bg-primary text-primary"
                label="Last Name"
                type="text"
                name="lastName"
                error={error.lastName}
                value={formData?.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing} // Disable if not editing
                required
              />
            </div>

            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <Input
                className="bg-primary text-primary"
                label="Email"
                type="email"
                name="email"
                value={formData?.email || ""}
                error={error.email}
                onChange={handleChange}
                disabled // Disable if not editing
                required
              />
              <Input
                className="bg-primary text-primary"
                label="Phone Number"
                type="text"
                name="phoneNumber"
                error={error.phoneNumber}
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                disabled={!isEditing} // Disable if not editing
                required
              />
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
                  label="dob"
                  className="bg-fill text-primary"
                  type="date"
                  name="dob"
                  value={formData?.dob || ""}
                  error={error.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required={true}
                />
              </div>
            </div>

            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={handleCancel} className="ml-4">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
