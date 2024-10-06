import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./Components/Layout/Landing";
import Home from "./pages/Home";
import GenerateContent from "./pages/GenerateContent";
import Profile from "./pages/Profile";
import ContentHistory from "./pages/ContentHistory";
import PostedContent from "./pages/PostedContent";
import { useAuth } from "./Context/AuthContext";
import { checkValidToken } from "./Api/services/authService";

const App = () => {
  // Theme Setting variables
  const [theme, setTheme] = useState("theme-dark");
  const themes = ["theme-dark", "theme-light"];

  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <main className={`${theme}`}>
      <Routes>
        {/* Landing page at root */}
        <Route
          path="/"
          element={<Landing themes={themes} useTheme={setTheme} />}
        />

        {/* Nested Dashboard routes */}
        <Route
          path="/"
          element={<Dashboard themes={themes} setTheme={setTheme} />}
        >
          {/* All these routes will use the Dashboard layout */}
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
