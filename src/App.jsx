import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Landing from "./Components/Layout/Landing";
import Demo from "./Components/Layout/demo";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateContent from "./pages/GenerateContent";
import Profile from "./pages/Profile";
import ContentHistory from "./pages/ContentHistory";
import PostedContent from "./pages/PostedContent";
import { useAuth } from "./Context/Auth/AuthContext";

const App = () => {
  const { isLoggedIn } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token, isLoggedIn);
    if (!token) setShowLanding(true);
    else setShowLanding(false);
  }, [isLoggedIn]);
  return (
    <main className="h-full">
      <Routes>
        {showLanding ? (
          <Route path="/" element={<Landing />} />
        ) : (
          <Route path="/" element={<Dashboard />}>
            <Route>
              <Route path="/home" element={<Home />} />
              <Route path="/content/:slug" element={<GenerateContent />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<ContentHistory />} />
            <Route path="/posted-content" element={<PostedContent />} />
          </Route>
        )}
      </Routes>
    </main>
  );
};

export default App;
