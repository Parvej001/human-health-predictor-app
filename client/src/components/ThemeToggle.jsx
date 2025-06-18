import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button onClick={() => setDark(!dark)} className="ml-4 text-xl">
      {dark ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-indigo-700" />}
    </button>
  );
};

export default ThemeToggle;
