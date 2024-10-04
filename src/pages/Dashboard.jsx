import React from "react";

import Navbar from "../Components/layout/Navbar";

const Dashboard = ({ themes, setTheme }) => {
  return (
    <>
      <Navbar themes={themes} setTheme={setTheme}/>
    </>
  );
};

export default Dashboard;
