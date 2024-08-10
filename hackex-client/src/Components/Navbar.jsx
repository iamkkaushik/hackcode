import { Link } from "react-router-dom";
import { useUser } from "../userContext";

import { useTheme } from "../themeContext"; // Import ThemeContext
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/logo.png"; // Light mode logo
import logoDark from "../assets/LogoDark.png"; // Dark mode logo

const Navbar = () => {
  const { isLoggedIn } = useUser();
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function from context

  return (
    <nav
      className={`${
        theme === "light"
          ? "bg-white text-gray-900 shadow-md"
          : "bg-gray-800 text-gray-100 shadow-md"
      } sticky top-0 z-50`}
    >
      <div className="mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold flex items-center space-x-2"
          >
            {/* Conditional Logo Rendering */}
            <img
              src={theme === "light" ? logoDark : logo}
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="ml-4">Hackex</span>
          </Link>
        </div>
        <div className="flex items-center justify-around space-x-12">
          <Link
            to="/problems"
            className="text-md hover:text-blue-400 transition duration-300"
          >
            Problems
          </Link>
          <Link
            to="/leaderboard"
            className="text-lg hover:text-blue-400 transition duration-300"
          >
            Leaderboard
          </Link>
          <Link
            to="/playground"
            className="text-md hover:text-blue-400 transition duration-300"
          >
            Playground
          </Link>
          <Link
            to="/submit"
            className="text-md hover:text-blue-400 transition duration-300"
          >
            Submit Problem
          </Link>
          <div className="ml-6 flex items-center space-x-4">
            {/* Theme toggle icon */}
            <button
              onClick={toggleTheme}
              className={`text-lg focus:outline-none transition duration-300 ${
                theme === "light" ? "text-gray-900" : "text-gray-100"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Login/Register
              </Link>
            ) : (
              <Link
                to="/profile"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
