
"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage or preference
    if (localStorage.getItem("theme") === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-all text-gray-800 dark:text-yellow-300"
    >
      {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
}
