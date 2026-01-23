"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false); // Default is now False (Light)

  useEffect(() => {
    // Check local storage
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      // Default to light if nothing is saved or if saved is "light"
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
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
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-all text-yellow-600 dark:text-yellow-300"
    >
      {darkMode ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
    </button>
  );
}
