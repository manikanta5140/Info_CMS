import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Landing from "./Components/Layout/Landing";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GenerateContent from "./pages/GenerateContent";
import Profile from "./pages/Profile";
import ContentHistory from "./pages/ContentHistory";
import PostedContent from "./pages/PostedContent";
import { useAuth } from "./Context/Auth/AuthContext";

const App = () => {
  // Theme Setting variables
  const[theme, setTheme] = useState("theme-dark");
  const themes = ["theme-dark", "theme-light"];

  const { isLoggedIn } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token, isLoggedIn);
    if (!token) setShowLanding(true);
    else setShowLanding(false);
  }, [isLoggedIn]);
  return (
    <main className={`${theme}`}>


      {/* <Demo/> */}
      <Routes>
        {/* {showLanding ? (
          <Route path="/" element={<Landing themes={themes} useTheme={setTheme} />} />
        ) : ( */}
          <Route path="/" element={<Dashboard themes={themes} useTheme={setTheme}/>}>
            <Route>
              <Route path="/home" element={<Home />} />
              <Route path="/content/:slug" element={<GenerateContent />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<ContentHistory />} />
            <Route path="/posted-content" element={<PostedContent />} />
          </Route>
        {/* )} */}
      </Routes>
    </main>
  );
};

export default App;
