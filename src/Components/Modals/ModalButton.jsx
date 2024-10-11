import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  authorizeTwitter,
  facebookPost,
  twitterPost,
  verifyPlatform,
} from "../../Api/services/socialMediaService";
import { showNotification } from "../notification/Notification";
import SchedulePost from "../Layout/SchedulePost";
import "react-datepicker/dist/react-datepicker.css";
import FacebookAuthModal from "./FacebookAuthModel";

export default function ModalButton({
  message,
  contentHistoryId,
  socialMediaList,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [authorizedPlatforms, setAuthorizedPlatforms] = useState({
    Twitter: false,
    LinkedIn: false,
    Facebook: false,
    Instagram: false,
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postedPlatforms, setPostedPlatforms] = useState({}); // Update: Track posted platforms by contentHistoryId
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
  const [isFacebookModalOpen, setIsFacebookModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    verifyPlatform()
      .then((response) => {
        const authorized = {};
        response.forEach(({ platforms, isVerified }) => {
          if (platforms?.platformName === "Twitter" && isVerified) {
            authorized.Twitter = true;
          }
          if (platforms?.platformName === "Facebook" && isVerified) {
            authorized.Facebook = true;
          }
        });

        setAuthorizedPlatforms((prev) => ({ ...prev, ...authorized }));
      })
      .catch((error) => console.log("Error verifying platforms: ", error));
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

    if (platform === "Facebook") {
      setIsFacebookModalOpen(true);
    }
  }

  const handleFacebookCloseModal = () => {
    setIsFacebookModalOpen(false);
  };

  async function handlePost() {
    if (selectedPlatforms.length === 0) {
      showNotification("Please select at least one platform", "error");
      return;
    }

    const platformsToPost = selectedPlatforms.filter(
      (platform) => platform === "Twitter" || platform === "Facebook"
    );

    let allSuccess = true; // Track whether all posts are successful

    for (const platform of platformsToPost) {
      let res = null;
      if (platform === "Twitter") {
        res = await twitterPost(message, contentHistoryId);
        if (res) {
          // Update postedPlatforms for current contentHistoryId
          setPostedPlatforms((prev) => ({
            ...prev,
            [contentHistoryId]: [...(prev[contentHistoryId] || []), "Twitter"],
          }));
        }
      } else if (platform === "Facebook") {
        res = await facebookPost(message, contentHistoryId);
        if (res) {
          // Update postedPlatforms for current contentHistoryId
          setPostedPlatforms((prev) => ({
            ...prev,
            [contentHistoryId]: [...(prev[contentHistoryId] || []), "Facebook"],
          }));
        }
      }

      // If any post fails, mark allSuccess as false
      if (!res) {
        allSuccess = false;
      }
    }

    // Show a single notification based on the overall result
    if (allSuccess) {
      showNotification("Post(s) sent successfully", "success");
    } else {
      showNotification(
        "Error sending post(s) to one or more platforms",
        "error"
      );
    }
  }

  function openScheduleModal() {
    setScheduleModalIsOpen(true);
  }

  function closeScheduleModal() {
    setScheduleModalIsOpen(false);
  }

  return (
    <>
      <span
        className="cursor-pointer bg-green-200 text-green-800 text-sm mt-2.5 font-bold me-2 px-4 py-1 hover:bg-green-400 rounded"
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
            width: "90%",
            maxWidth: "500px",
          },
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Platforms</h2>
          <p className="text-sm text-violet-600 mb-4">
            Please authorize platforms before posting.
          </p>
          {Array.isArray(socialMediaList) && (
            <ul>
              {socialMediaList.map((item, idx) => (
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

                  {/* Check if platform is already posted for the specific contentHistoryId */}
                  {postedPlatforms[contentHistoryId]?.includes(
                    item.platformName
                  ) ? (
                    <span className="text-green-500 text-lg font-bold">✔</span>
                  ) : authorizedPlatforms[item.platformName] ? (
                    /* Show checkbox for authorized but not yet posted platforms */
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-purple-600"
                      checked={selectedPlatforms.includes(item.platformName)}
                      onChange={() =>
                        handlePlatformSelection(item.platformName)
                      }
                    />
                  ) : (
                    /* Show authorize button for platforms that are not authorized */
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
          )}
        </div>

        <div className="flex justify-end gap-4 p-4">
          <button
            className="bg-red-200 text-red-900 text-base font-semibold me-2 px-5 py-1 rounded hover:bg-red-300 transition"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className={`bg-green-200 text-green-900 text-base font-semibold me-2 px-5 py-1 rounded hover:bg-green-300 transition ${
              selectedPlatforms.length === 0
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            onClick={handlePost}
            disabled={selectedPlatforms.length === 0}
          >
            Post
          </button>
          {selectedPlatforms.length > 0 && (
            <button
              className="px-4 py-1 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
              onClick={openScheduleModal}
            >
              Schedule Post
            </button>
          )}
        </div>
      </Modal>

      {/* SchedulePost Modal */}
      <Modal
        isOpen={scheduleModalIsOpen}
        onRequestClose={closeScheduleModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            maxHeight: "100vh",
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
            width: "90%",
            maxWidth: "450px",
          },
        }}
      >
        <SchedulePost
          contentHistoryId={contentHistoryId}
          selectedPlatforms={selectedPlatforms}
          closeModal={closeScheduleModal}
        />
      </Modal>

      {/* FacebookAuth Modal */}
      <FacebookAuthModal
        isOpen={isFacebookModalOpen}
        onRequestClose={handleFacebookCloseModal}
      />
    </>
  );
}
