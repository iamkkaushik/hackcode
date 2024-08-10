import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemList from "./ProblemList";
import LeaderBoard from "./LeaderBoard";
import "./Home.css"; // Make sure to import your CSS file
import { useUser } from "../userContext"; // Import useUser to access user state

const Home = () => {
  const platformInfo = {
    title: "Welcome to Hackex",
    description:
      "Hackex is a platform to enhance your coding skills with a variety of challenges, contests, and a collaborative community.",
  };

  const menuItems = [
    { name: "Fact 1", path: "/problems" },
    { name: "Fact 2", path: "/contests" },
    { name: "Fact 3", path: "/leaderboard" },
  ];

  const { isLoggedIn } = useUser(); // Access login state

  useEffect(() => {
    // This ensures that the Navbar will re-render if the user login state changes
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start lg:space-x-10 p-8 bg-gray-900 text-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="lg:w-3/5">
        {" "}
        {/* Adjusted width for the main content */}
        {/* Platform Information */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
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
                <Link key={index} to={item.path} className="menu-item">
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
        {" "}
        {/* Increased width of the leaderboard */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          {/* <h2 className="text-3xl font-bold mb-4">Leaderboard</h2> */}
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default Home;
