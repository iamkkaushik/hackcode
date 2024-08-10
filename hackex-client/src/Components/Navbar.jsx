import { Link, useLocation } from "react-router-dom";
import { useUser } from "../userContext";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  // Do not render Navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-semibold flex items-center space-x-2"
          >
            <span>HackEx</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-lg hover:text-blue-400 transition duration-300"
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
            className="text-lg hover:text-blue-400 transition duration-300"
          >
            Playground
          </Link>
          <Link
            to="/submit"
            className="text-lg hover:text-blue-400 transition duration-300"
          >
            Submit Problem
          </Link>
          <div className="ml-6 flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Login/Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
