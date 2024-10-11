import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  // Corrected the name here
  const [showMobilePopup, setShowMobilePopup] = useState(true);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const onMobileModalClose = () => {
    setShowMobileModal(false);
  };

  const onMobileModalOpen = () => {
    setShowMobileModal(true);
  };

  const handleCloseMobilePopup = () => {
    setShowMobilePopup(false);
  };

  const value = {
    showMobilePopup,
    showMobileModal,
    onMobileModalClose,
    onMobileModalOpen,
    handleCloseMobilePopup,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
