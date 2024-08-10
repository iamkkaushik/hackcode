/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/leaderboard");
        const sortedData = response.data.users.sort((a, b) => b.noOfProblems - a.noOfProblems);
        setLeaderboardData(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">LEADERBOARD</h1>
      <div className="overflow-x-auto w-full max-w-3xl">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-700 border-b border-gray-600">
            <tr>
              <th className="p-4 text-center">RANK</th>
              <th className="p-4 text-center">USERNAME</th>
              <th className="p-4 text-center">PROBLEMS SOLVED</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user.email} className="border-b border-gray-600">
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4 text-center">{user.name}</td>
                <td className="p-4 text-center">{user.noOfProblems}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
