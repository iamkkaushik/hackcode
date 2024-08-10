import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../themeContext"; // Import ThemeContext

const Contest = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme from context

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/contests/${id}/problems`
        );
        if (response.ok) {
          const data = await response.json();
          const currentTime = new Date();
          const start = new Date(data.startTime);
          const end = new Date(data.endTime);

          if (currentTime < start) {
            navigate("/contests"); // Redirect if the contest hasn't started yet
          } else if (currentTime > end) {
            navigate("/contests"); // Redirect if the contest has ended
          } else {
            setContest(data);
          }
        } else {
          console.error("Failed to fetch contest.");
        }
      } catch (error) {
        console.error("Error fetching contest:", error);
      }
    };

    fetchContest();
  }, [id, navigate]);

  useEffect(() => {
    if (contest) {
      const endTime = new Date(contest.endTime).getTime();

      const updateTimer = () => {
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;

        if (timeDiff < 0) {
          navigate("/contests"); // Redirect if the contest time is over
        } else {
          setTimeRemaining(timeDiff);
        }
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval); // Clean up interval on component unmount
    }
  }, [contest, navigate]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  if (!contest) {
    return <div>Loading...</div>;
  }

  const startTime = new Date(contest.startTime);
  const endTime = new Date(contest.endTime);
  const durationInHours = Math.abs(endTime - startTime) / 36e5; // Duration in hours

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-5xl font-bold mb-6 text-center ${
            theme === "light" ? "text-black" : "text-blue-400"
          }`}
        >
          {contest.title}
        </h1>
        <p className="text-lg mb-4">{contest.description}</p>

        {/* Timer */}
        <div
          className={`text-2xl font-bold mb-6 text-center ${
            theme === "light" ? "text-red-600" : "text-red-500"
          }`}
        >
          Time Remaining: {formatTime(timeRemaining)}
        </div>

        <div className="mt-8 mb-10">
          <div
            className={`text-lg ${
              theme === "light" ? "text-gray-800" : "text-gray-400"
            }`}
          >
            <span className="font-semibold">Start Time: </span>
            <span>{startTime.toLocaleTimeString()}</span>
          </div>
          <div
            className={`text-lg mt-2 ${
              theme === "light" ? "text-gray-800" : "text-gray-400"
            }`}
          >
            <span className="font-semibold">Start Date: </span>
            <span>{startTime.toLocaleDateString()}</span>
          </div>
          <div
            className={`text-lg mt-2 ${
              theme === "light" ? "text-gray-800" : "text-gray-400"
            }`}
          >
            <span className="font-semibold">Duration: </span>
            <span>{durationInHours} hours</span>
          </div>
        </div>

        <h2
          className={`text-3xl font-bold mt-10 mb-6 ${
            theme === "light" ? "text-black" : "text-blue-400"
          }`}
        >
          Problems in this Contest
        </h2>
        <table
          className={`min-w-full rounded-lg shadow-md ${
            theme === "light"
              ? "bg-white border border-gray-300"
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
              <th
                className={`text-left px-6 py-4 ${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                Title
              </th>
              <th
                className={`text-left px-6 py-4 ${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                Description
              </th>
              <th
                className={`text-left px-6 py-4 ${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contest.problems.map((problem) => (
              <tr
                key={problem._id}
                className={`hover:bg-gray-700 cursor-pointer ${
                  theme === "light" ? "hover:bg-gray-200" : ""
                }`}
                onClick={() => handleProblemClick(problem._id)}
              >
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-blue-600" : "text-blue-300"
                  }`}
                >
                  {problem.title}
                </td>
                <td
                  className={`px-6 py-4 ${
                    theme === "light" ? "text-gray-800" : "text-gray-300"
                  }`}
                >
                  {problem.description}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleProblemClick(problem._id)}
                    className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                      theme === "light" ? "bg-blue-500 hover:bg-blue-400" : ""
                    }`}
                  >
                    View
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

export default Contest;
