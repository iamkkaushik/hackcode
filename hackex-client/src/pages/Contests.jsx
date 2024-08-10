import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../themeContext"; // Import ThemeContext
import Spinner from "../Components/Spinner";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme from context
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/contests/allContests"
        );
        if (response.ok) {
          const data = await response.json();
          setContests(data);
        } else {
          console.error("Failed to fetch contests.");
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
      setLoading(false);
    };

    fetchContests();
  }, []);

  // Helper function to determine if a contest is live
  const isContestLive = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  // Separate contests into live and normal based on current time
  const liveContests = contests.filter((contest) =>
    isContestLive(contest.startTime, contest.endTime)
  );
  const normalContests = contests.filter(
    (contest) => !isContestLive(contest.startTime, contest.endTime)
  );

  const handleContestClick = (contest) => {
    navigate(`/contest/${contest._id}`);
  };
  if (loading) {
    return (
      <div
        className={`flex flex-col lg:flex-row min-h-screen p-4 gap-4 ${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <div
          className={`flex-1 p-6 rounded-lg relative ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner
              size={"4/5"}
              color={theme === "light" ? "gray" : "white"}
              width={2}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Contests</h1>

      <div className="max-w-4xl mx-auto">
        {liveContests.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Live Contests</h3>
            <table
              className={`min-w-full rounded-lg shadow-lg ${
                theme === "light"
                  ? "bg-gray-50 border border-gray-300"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              <thead
                className={
                  theme === "light"
                    ? "bg-gray-200 border-b border-gray-300"
                    : "bg-gray-700 border-b border-gray-600"
                }
              >
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Title</th>
                  <th className="text-left px-6 py-3 font-semibold">
                    Description
                  </th>
                  <th className="text-left px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {liveContests.map((contest) => (
                  <tr
                    key={contest._id}
                    className={
                      theme === "light"
                        ? "border-b border-gray-300"
                        : "border-b border-gray-600"
                    }
                  >
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
        )}

        <h3 className="text-2xl font-semibold mb-4">Upcoming Contests</h3>
        <table
          className={`min-w-full rounded-lg shadow-lg ${
            theme === "light"
              ? "bg-gray-50 border border-gray-300"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <thead
            className={
              theme === "light"
                ? "bg-gray-200 border-b border-gray-300"
                : "bg-gray-700 border-b border-gray-600"
            }
          >
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Title</th>
              <th className="text-left px-6 py-3 font-semibold">Description</th>
              <th className="text-left px-6 py-3 font-semibold">Start Date</th>
              <th className="text-left px-6 py-3 font-semibold">Start Time</th>
            </tr>
          </thead>
          <tbody>
            {normalContests.map((contest) => {
              const startDate = new Date(
                contest.startTime
              ).toLocaleDateString();
              const startTime = new Date(
                contest.startTime
              ).toLocaleTimeString();
              return (
                <tr
                  key={contest._id}
                  className={
                    theme === "light"
                      ? "border-b border-gray-300"
                      : "border-b border-gray-600"
                  }
                >
                  <td className="px-6 py-4">{contest.title}</td>
                  <td className="px-6 py-4">{contest.description}</td>
                  <td className="px-6 py-4">{startDate}</td>
                  <td className="px-6 py-4">{startTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contests;
