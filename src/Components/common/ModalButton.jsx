import Button from "../common/Button";
import Modal from "react-modal";
import React from "react";

const ProfileRow = ({ profileImage, name, isLoading }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={profileImage} alt={name} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1 mx-4">
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <div className="flex items-center">
        {isLoading ? (
          <div className="loader">
            {" "}
            {/* You can replace this with your spinner icon */}Loading...
          </div>
        ) : (
          <div className="text-green-500">✓</div> // Example: checkmark or another icon when not loading
        )}
      </div>
    </div>
  );
};

export default function ModalButton() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const profiles = [
    { id: 1, image: "profile1.jpg", name: "User One", isLoading: false },
    { id: 2, image: "profile2.jpg", name: "User Two", isLoading: true },
    { id: 3, image: "profile3.jpg", name: "User Three", isLoading: false },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Button
        bgColor="bg-important"
        className="text-primary py-3 px-6 rounded-lg text-lg font-medium transition-all shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)] hover:scale-105"
        onClick={() => openModal()}
      >
        Modal
      </Button>
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
        {/* <button
          onClick={closeModal}
          className="fixed top-2 right-2 p-2 text-red-500"
        >
          close
        </button> */}
        <div>
          {profiles.map((profile) => (
            <ProfileRow
              key={profile.id}
              profileImage={profile.image}
              name={profile.name}
              isLoading={profile.isLoading}
            />
          ))}
        </div>
        <div className="flex px-5 justify-end gap-5">
          <button
            className="px-8 py-2 my-2 text-white bg-red-600 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          <button className=" px-8 py-2 my-2 text-white bg-green-600 rounded">
            Post
          </button>
        </div>
      </Modal>
    </>
  );
}
