import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onResend }) => {
  const [timer, setTimer] = useState(120); // 2 minutes (120 seconds)
  const [isDisabled, setIsDisabled] = useState(true);

  // Function to start or restart the timer
  const startTimer = () => {
    setIsDisabled(true);
    setTimer(120); // Reset the timer to 2 minutes

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsDisabled(false);
          return 0; // Stop timer at 0
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      startTimer(); // Start the timer when the modal opens
    }
  }, [isOpen]);

  const handleResend = () => {
    onResend(); // Call the resend function
    startTimer(); // Restart the timer and disable the button
  };

  // If the modal is not open, return null
  if (!isOpen) return null;

  // Format the timer into minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Verification</h2>
        <p className="mb-6">Please verify your email to continue.</p>

        <p className="mb-4 text-sm text-gray-500">
          You can resend the code in {formatTime(timer)}.
        </p>

        <button
          onClick={handleResend}
          className={`${
            isDisabled ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 px-4 rounded-lg transition-colors`}
          disabled={isDisabled}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default Modal;
