// src/components/MobileVerificationPopup.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "../../Context/ModalContext";
import VerifyMobNoButton from "../common/VerifyMobNoButton";

const MobileVerificationPopup = () => {
  const { onMobileModalOpen, handleCloseMobilePopup } = useModal();
  return (
    <div className="fixed bottom-5 right-5 w-80 bg-fill text-white rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h4 className="text-lg font-semibold">Verify Mobile Number</h4>
        <AiOutlineClose
          className="cursor-pointer text-xl"
          onClick={handleCloseMobilePopup}
        />
      </div>
      <div className="p-4">
        <p className="mb-4">
          Please verify your mobile number to receive WhatsApp alerts for post
          notifications and timings.
        </p>
        <VerifyMobNoButton
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            onMobileModalOpen();
            handleCloseMobilePopup();
          }}
        >
          Verify
        </VerifyMobNoButton>
      </div>
    </div>
  );
};

export default MobileVerificationPopup;
