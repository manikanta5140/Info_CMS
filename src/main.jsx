import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
