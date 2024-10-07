import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  authorizeTwitter,
  twitterPost,
  verifyPlatform,
} from "../../Api/services/socialMediaService";
import { showNotification } from "../notification/Notification";

export default function ModalButton({ message, contentHistoryId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [authorizedPlatforms, setAuthorizedPlatforms] = useState({
    Twitter: false,
    LinkedIn: false,
    Facebook: false,
    Instagram: false,
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postedPlatforms, setPostedPlatforms] = useState([]); // New state for successful posts

  const socialMediaList = [
    {
      platform: "Twitter",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
      url: "https://twitter.com/john_lorin",
    },
    {
      platform: "LinkedIn",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      url: "https://linkedin.com/in/chris_bondi",
    },
    {
      platform: "Facebook",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
      url: "https://facebook.com/yasmine.profile",
    },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    verifyPlatform()
      .then((response) => {
        console.log(response, "mod");
        let result = response?.filter(
          (res) => res?.platforms.platformName === "Twitter"
        );
        if (
          result[0]?.platforms.platformName === "Twitter" &&
          result[0]?.isVerified
        ) {
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
      // Add similar logic for other platforms if needed
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
            {socialMediaList.map((item, idx) => (
              <li key={idx} className="py-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    alt={item.platform}
                    className="w-8 h-8"
                  />
                  <span className="text-sm text-gray-700 font-semibold">
                    {item.platform}
                  </span>
                </div>

                {postedPlatforms.includes(item.platform) ? (
                  <span className="text-green-500 text-lg font-bold">✔</span>
                ) : authorizedPlatforms[item.platform] ? (
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-purple-600"
                    checked={selectedPlatforms.includes(item.platform)}
                    onChange={() => handlePlatformSelection(item.platform)}
                  />
                ) : (
                  <button
                    className="text-blue-600 text-sm underline"
                    onClick={() => handleAuthorize(item.platform)}
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
            className="px-8 py-2 my-2 text-white bg-red-600 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className={`px-8 py-2 my-2 text-white bg-green-600 rounded ${
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
