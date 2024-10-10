// src/common/ReusableButton.js
import React from 'react';

const VerifyMobNoButton = ({ onClick, className, children }) => {
  return (
    <button
      className={`py-2 px-4 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default VerifyMobNoButton;
