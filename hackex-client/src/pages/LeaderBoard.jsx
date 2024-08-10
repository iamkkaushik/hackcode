import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../themeContext"; // Import ThemeContext

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/leaderboard"
        );
        const sortedData = response.data.users.sort(
          (a, b) => b.noOfProblems - a.noOfProblems
        );
        setLeaderboardData(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 flex flex-col items-center ${
        theme === "light" ? " text-gray-900" : " text-gray-100"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">LEADERBOARD</h1>
      <div className="overflow-x-auto w-full max-w-3xl">
        <table
          className={`min-w-full ${
            theme === "light"
              ? "bg-white border-gray-300"
              : "bg-gray-800 border-gray-700"
          } border rounded-lg shadow-md`}
        >
          <thead
            className={`${
              theme === "light"
                ? "bg-gray-200 border-gray-300"
                : "bg-gray-700 border-gray-600"
            }`}
          >
            <tr>
              <th className="p-4 text-center font-semibold">RANK</th>
              <th className="p-4 text-center font-semibold">USERNAME</th>
              <th className="p-4 text-center font-semibold">PROBLEMS SOLVED</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr
                key={user.email}
                className={`border-b ${
                  theme === "light" ? "border-gray-300" : "border-gray-600"
                }`}
              >
                <td
                  className={`p-4 text-center ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`p-4 text-center ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  }`}
                >
                  {user.name}
                </td>
                <td
                  className={`p-4 text-center ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  }`}
                >
                  {user.noOfProblems}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
