import { Link, useLocation } from "react-router-dom";
import { useUser } from "../userContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md">
      <div className="mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold flex items-center space-x-2"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="ml-4">Hackex</span>
          </Link>
        </div>
        <div className="flex items-center justify-around space-x-12">
          <Link
            to="/"
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
          <div className="ml-6 flex items-center">
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
