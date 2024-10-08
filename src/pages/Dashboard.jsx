import React, { useEffect } from "react";

import Navbar from "../Components/layout/Navbar";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {

  const {validateToken}=useAuth()
  useEffect(() => {
    validateToken();
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

export default Dashboard;
