import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme on refresh
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition duration-300">

        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          RayApp 🚀
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Profile
          </Link>

          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
