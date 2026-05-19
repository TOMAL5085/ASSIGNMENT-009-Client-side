import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("mediqueue-theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mediqueue-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
