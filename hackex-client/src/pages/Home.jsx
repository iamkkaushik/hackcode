import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProblemList from "./ProblemList";
import LeaderBoard from "./LeaderBoard";
import { useTheme } from "../themeContext"; // Adjust path as needed

const Home = () => {
  const { theme } = useTheme(); // Get theme context
  const [platformInfo, setPlatformInfo] = useState({
    title: "Welcome to CodeMaster",
    description:
      "CodeMaster is a platform to enhance your coding skills with a variety of challenges, contests, and a collaborative community.",
  });

  const menuItems = [
    { name: "Problems", path: "/problems" },
    { name: "Contests", path: "/contests" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <div
      className={`flex flex-col lg:flex-row justify-between items-start lg:items-start lg:space-x-10 p-8 ${
        theme !== "light"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } min-h-screen`}
    >
      {/* Main Content */}
      <div className="lg:w-3/5">
        {/* Platform Information */}
        <div
          className={`p-6 rounded-lg shadow-lg mb-6 ${
            theme !== "light" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">{platformInfo.title}</h1>
          <p className="text-lg">{platformInfo.description}</p>
        </div>
        {/* Horizontal Scrolling Menu - Centered */}
        <div className="flex justify-center mb-6">
          <div className="relative overflow-hidden">
            <div
              className="flex space-x-4 animate-scroll"
              style={{ animationDuration: "20s" }} // Adjust duration as needed
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center justify-center px-4 py-6 text-white font-bold rounded-lg shadow-lg min-w-[150px] transition-transform duration-300 ease-in-out hover:scale-110 ${"bg-blue-600 hover:bg-blue-700"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Problem List */}
        <div>
          <ProblemList />
        </div>
      </div>

      {/* Sidebar - LeaderBoard */}
      <div className="lg:w-2/5 w-full mt-8 lg:mt-0 relative">
        <LeaderBoard />
      </div>
    </div>
  );
};

export default Home;
