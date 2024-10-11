// src/common/ReusableButton.js
import React from "react";

const VerifyMobNoButton = ({ onClick, className, children }) => {
  return (
    <button
      className={`bg-green-200 text-green-800 text-sm mt-2.5 font-semibold me-2 px-4 py-1 hover:bg-green-300 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default VerifyMobNoButton;
