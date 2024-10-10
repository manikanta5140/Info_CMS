import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../common/Button";

const MobileVerificationModal = ({ onMobileModalClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      clearTimeout(countdown);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  // Enable verify button when OTP is entered
  useEffect(() => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setVerifyEnabled(true);
      setOtpError("");
    } else {
      setVerifyEnabled(false);
    }
  }, [otp]);

  // Validate mobile number (10-digit)
  const validateMobileNumber = () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    setMobileError("");
    return true;
  };

  // Validate OTP (6-digit)
  const validateOtp = () => {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return false;
    }
    setOtpError("");
    return true;
  };

  // Function to handle sending OTP
  const handleSendOtp = () => {
    if (validateMobileNumber()) {
      setOtpSent(true);
      setTimer(60);
      console.log("OTP sent to", mobileNumber);
    }
  };

  // Function to handle verifying OTP
  const handleVerifyOtp = () => {
    if (validateOtp()) {
      console.log("Verifying OTP:", otp);
    }
  };

  // Function to handle resending OTP
  const handleResendOtp = () => {
    setOtp(""); // Reset OTP input
    setVerifyEnabled(false); // Disable verify button
    setTimer(60); // Restart timer
    console.log("OTP resent to", mobileNumber);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-fill text-white rounded-lg shadow-lg w-96 p-6">
        {/* Close icon */}
        <AiOutlineClose
          className="absolute top-2 right-2 cursor-pointer text-xl"
          onClick={onMobileModalClose}
        />

        {/* Modal content */}
        {!otpSent ? (
          <>
            <h4 className="text-lg font-semibold mb-4">Verify Mobile Number</h4>
            <p className="mb-4">
              Enter your mobile number to receive an OTP for verification.
            </p>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="w-full p-2 mb-2 text-black rounded-md"
              value={mobileNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMobileNumber(value);
                }
              }}
              onBlur={validateMobileNumber}
              maxLength={10}
            />
            {mobileError && (
              <p className="text-red-500 text-sm mb-2">{mobileError}</p>
            )}
            <Button
              className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full ${
                !mobileNumber ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSendOtp}
              disabled={!mobileNumber}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold mb-4">OTP Sent</h4>
            <p className="mb-4">Enter the OTP sent to your mobile number.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 mb-2 text-black rounded-md"
              value={otp}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setOtp(value);
                }
              }}
              onBlur={validateOtp}
              maxLength={6}
            />
            {otpError && (
              <p className="text-red-500 text-sm mb-2">{otpError}</p>
            )}
            <Button
              className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full ${
                !verifyEnabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleVerifyOtp}
              disabled={!verifyEnabled}
            >
              Verify
            </Button>
            {timer > 0 ? (
              <p className="mt-2 text-gray-400 text-sm">
                Resend OTP in {timer}s
              </p>
            ) : (
              <p
                className="mt-2 text-green-600 cursor-pointer"
                onClick={handleResendOtp}
              >
                Resend OTP
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileVerificationModal;
