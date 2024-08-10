// src/pages/Contests.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/contests/allContests"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setContests(data);
        } else {
          console.error("Failed to fetch contests.");
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const handleContestClick = (contest) => {
    navigate(`/contest/${contest._id}`);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Ongoing Contests</h1>
      <div className="max-w-4xl mx-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Description</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id}>
                <td className="px-6 py-4">{contest.title}</td>
                <td className="px-6 py-4">{contest.description}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleContestClick(contest)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Contest
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contests;
