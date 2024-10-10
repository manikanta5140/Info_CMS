import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  authorizeTwitter,
  getAllPlatforms,
  getAllPost,
  twitterPost,
  verifyPlatform,
} from "../../Api/services/socialMediaService";
import { showNotification } from "../notification/Notification";

export default function ModalButton({ message, contentHistoryId ,socialMediaList}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [authorizedPlatforms, setAuthorizedPlatforms] = useState({
    Twitter: false,
    LinkedIn: false,
    Facebook: false,
    Instagram: false,
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postedPlatforms, setPostedPlatforms] = useState([]);
 


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    verifyPlatform()
      .then((response) => {
        // Filter the response to find platforms
        const result = response?.filter((res) => 
          res?.platforms?.platformName === "Twitter"
        );
  
        // Check if the result has any items and if it's verified
        if (result.length > 0 && result[0]?.isVerified) {
          setAuthorizedPlatforms((prev) => ({ ...prev, Twitter: true }));
        }
      })
      .catch((error) => console.log(error));
  }, []);
  

  function handlePlatformSelection(platform) {
    setSelectedPlatforms((prevSelection) =>
      prevSelection.includes(platform)
        ? prevSelection.filter((item) => item !== platform)
        : [...prevSelection, platform]
    );
  }

  async function handleAuthorize(platform) {
    if (platform === "Twitter") {
      await authorizeTwitter();
    }
  }

  async function handlePost() {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform.");
    } else {
      const isTwitterSelected = selectedPlatforms.includes("Twitter");
      if (isTwitterSelected) {
        console.log(message);
        const res = await twitterPost(message, contentHistoryId);
        if (res) {
          showNotification("Post sent successfully", "success");
          // Add to the posted platforms
          setPostedPlatforms((prev) => [...prev, "Twitter"]);
        } else {
          showNotification("Error sending post", "error");
        }
      }
     
    }
  }

  return (
    <>
      <span
        className="cursor-pointer ml-2 mr-3 whitespace-nowrap rounded-full bg-button px-2 text-primary"
        onClick={openModal}
      >
        Post
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "0",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "white",
            width: "60vh",
          },
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Platforms</h2>
          <p className="text-sm text-red-600 mb-4">
            Please authorize platforms before posting.
          </p>
          <ul className="divide-y">
  {Array.isArray(socialMediaList) && socialMediaList.map((item, idx) => (
    <li key={idx} className="py-5 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <img
          src={item.platformImage}
          alt={item.platformName}
          className="w-8 h-8"
        />
        <span className="text-sm text-gray-700 font-semibold">
          {item.platformName}
        </span>
      </div>

      {postedPlatforms.includes(item.platformName) ? (
        <span className="text-green-500 text-lg font-bold">✔</span>
      ) : authorizedPlatforms[item.platformName] ? (
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-purple-600"
          checked={selectedPlatforms.includes(item.platformName)}
          onChange={() => handlePlatformSelection(item.platformName)}
        />
      ) : (
        <button
          className="text-blue-600 text-sm underline"
          onClick={() => handleAuthorize(item.platformName)}
        >
          Authorize
        </button>
      )}
    </li>
  ))}
</ul>
        </div>

        <div className="flex justify-end gap-4 p-4">
          <button
            className="px-8 py-2 my-2 bg-red-100 text-red-800 text-sm font-medium dark:bg-red-900 dark:text-red-300 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className={`px-8 py-2 my-2bg-green-100 text-green-800 text-sm font-medium dark:bg-green-900 dark:text-green-300 rounded ${
              selectedPlatforms.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
                
            }`}
            onClick={handlePost}
            disabled={selectedPlatforms.length === 0}
          >
            Post
          </button>
        </div>
      </Modal>
    </>
  );
}
