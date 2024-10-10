import React, { useState } from "react";
import Navbar from "../Components/layout/Navbar";
import MobileVerificationPopup from "../Components/Layout/MobileVerificationPopup";
import MobileVerificationModal from "../Components/Layout/MobileVerificationModal";

const Dashboard = ({
  onMobileModalClose,
  handleClosePopup,
  onMobileModalOpen,
  showPopup,
  showModal,
}) => {
  return (
    <>
      <Navbar />
      {/* Show the mobile verification popup if it is visible */}
      {showPopup && (
        <MobileVerificationPopup
          handleClosePopup={handleClosePopup}
          onMobileModalOpen={onMobileModalOpen}
        />
      )}

      {/* Show the mobile verification modal if it is visible */}
      {showModal && (
        <MobileVerificationModal onMobileModalClose={onMobileModalClose} />
      )}
    </>
  );
};

export default Dashboard;
