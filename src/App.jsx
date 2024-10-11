import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./Components/Layout/Landing";
import Home from "./pages/Home";
import GenerateContent from "./pages/GenerateContent";
import Profile from "./pages/Profile";
import ContentHistory from "./pages/ContentHistory";
import PostedContent from "./pages/PostedContent";
import Notification from "./Components/notification/Notification";
import { useTheme } from "./Context/ThemeContext";
import { useAuth } from "./Context/AuthContext";

const App = () => {
  // Theme Setting variables
  const { theme } = useTheme() || {};
  const { validateToken } = useAuth();
  useEffect(() => {
    validateToken();
  }, []);

  return (
    <main className={`${theme}`}>
      <Notification />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/" element={<Dashboard />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/content/:slug"
            element={<GenerateContent mode="generate" />}
          />
          <Route
            path="/content/:id/edit"
            element={<GenerateContent mode="edit" />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<ContentHistory />} />
          <Route path="/posted-content" element={<PostedContent />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
