import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  authorizeTwitter,
  twitterPost,
  verifyPlatform,
} from "../../Api/services/socialMediaService";
import { showNotification } from "../notification/Notification";
import SchedulePost from "../Layout/SchedulePost";
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles

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
  const [postedPlatforms, setPostedPlatforms] = useState([]);
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    verifyPlatform()
      .then((response) => {
        const result = response?.filter(
          (res) => res?.platforms?.platformName === "Twitter"
        );
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
      showNotification("Please select at least one platform", "error");
    } else {
      const isTwitterSelected = selectedPlatforms.includes("Twitter");
      if (isTwitterSelected) {
        const res = await twitterPost(message, contentHistoryId);
        if (res) {
          showNotification("Post sent successfully", "success");
          setPostedPlatforms((prev) => [...prev, "Twitter"]);
        } else {
          showNotification("Error sending post", "error");
        }
      }
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
            width: "90%",
            maxWidth: "500px",
          },
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Platforms</h2>
          <p className="text-sm text-red-600 mb-4">
            Please authorize platforms before posting.
          </p>
          <ul className="divide-y">
            {Array.isArray(socialMediaList) &&
              socialMediaList.map((item, idx) => (
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
            className="px-2 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className={`px-2 py-1 text-white bg-green-600 rounded-lg hover:bg-green-700 transition ${
              selectedPlatforms.length === 0
                ? "opacity-50 cursor-not-allowed"
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
    </>
  );
}
