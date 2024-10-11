import React from "react";
import Navbar from "../Components/layout/Navbar";
import { useModal } from "../Context/ModalContext";

import { useAuth } from "../Context/AuthContext";
import MobileVerificationPopup from "../Components/Modals/MobileVerificationPopup";
import MobileVerificationModal from "../Components/Modals/MobileVerificationModal";


const Dashboard = () => {
  const { showMobilePopup, showMobileModal } = useModal();
  const{userDetails}=useAuth();

  return (
    <>
      <Navbar />
     {/* Show the mobile verification popup if it is visible*/}
      {!userDetails?.isMobileVerified &&  showMobilePopup && <MobileVerificationPopup/>}

      {/* Show the mobile verification modal if it is visible */}
      {!userDetails?.isMobileVerified && showMobileModal && <MobileVerificationModal />} 
    </>
  );
};

export default Dashboard;
