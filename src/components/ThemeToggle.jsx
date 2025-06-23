import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className="btn btn-circle btn-sm btn-ghost"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
