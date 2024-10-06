import React, { createContext, useState, useContext } from "react";

// Create ThemeContext
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("theme-dark");
  const themes = ["theme-dark", "theme-light"];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <main className={`${theme}`}>{children}</main>
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);
