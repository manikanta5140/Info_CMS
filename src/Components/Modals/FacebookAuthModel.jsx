import React, { useState } from "react";
import Modal from "react-modal";
import Input from "../common/Input";
import { showNotification } from "../notification/Notification";
import { authorizeFacebook } from "../../Api/services/socialMediaService";



const FacebookAuthModal = ({ isOpen, onRequestClose }) => {
  const [appId, setAppId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [errors, setErrors] = useState({ appId: "", accessToken: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorMessages = { appId: "", accessToken: "" };

    if (!appId) {
      errorMessages.appId = "App ID is required";
    }
    if (!accessToken) {
      errorMessages.accessToken = "Access Token is required";
    }

    if (!errorMessages.appId && !errorMessages.accessToken) {
      setErrors({ appId: "", accessToken: "" });
      authorizeFacebook({ appId, accessToken })
      .then(res => { showNotification("Credentials saved successfully !!", "success"); onRequestClose() })
      .catch(err => showNotification(err.message, "error"))
    } else {
      setErrors(errorMessages);
    }


  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative bg-white p-6 rounded-lg max-w-md w-full shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Facebook Authorization</h2>
      <p className="mb-6 text-primary text-center text-sm">
        Please provide both App ID and Access Token for Facebook authorization:
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className=""> 
          <Input
            label="App ID"
            name="appId"
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="Enter Facebook App ID"
            error={errors.appId}
            className="border border-gray-300 focus:border-blue-500 ps-2"
            required
          />
        </div>

        <div>
          <Input
            label="Access Token"
            name="accessToken"
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Enter Facebook Access Token"
            error={errors.accessToken}
            className="border border-gray-300 focus:border-blue-500 ps-2"
            required
          />
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="submit"
            className="bg-blue-100 text-green-800 font-semibold py-1 px-4 rounded hover:bg-blue-300"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={onRequestClose}
            className="bg-red-100 text-red-800 font-semibold py-1 px-4 rounded hover:bg-red-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FacebookAuthModal;










// import React, { useState } from "react";
// import FacebookAuthModal from "./FacebookAuthModal";

// const YourComponent = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleSubmit = (data) => {
//     console.log("App ID:", data.appId);
//     console.log("Access Token:", data.accessToken);
//     // Perform Facebook authorization logic here
//     handleCloseModal();
//   };

//   return (
//     <div>
//       <button onClick={handleOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded">
//         Authorize with Facebook
//       </button>

//       <FacebookAuthModal
//         isOpen={isModalOpen}
//         onRequestClose={handleCloseModal}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default YourComponent;
