import React, { useEffect } from "react";
import { getUser } from "../../Api/services/userService";

const Modal = ({ isOpen, onClose, onResend }) => {
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        const userDetails = getUser();
        console.log(userDetails);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  // If the modal is not open, return nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-6 right-8  text-gray-500 hover:text-gray-800"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Verification</h2>
        <p className="mb-6">Please verify your email to continue.</p>

        <button
          onClick={onResend}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default Modal;
