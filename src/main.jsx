import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalProvider } from "./Context/ModalContext.jsx";

const clientId = "922963109105-36jvvoeme9s53rnih20ph3sn9ds2e31j.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
          <ModalProvider>
            <App />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
