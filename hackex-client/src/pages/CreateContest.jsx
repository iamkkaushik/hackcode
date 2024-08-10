import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateContest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [error, setError] = useState("");
  const [noProblems, setNoProblems] = useState(false); // Track if there are no problems
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch problems from the backend when the component mounts
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/problems/allProblems"
        );
        const data = await response.json();
        if (data.problems && data.problems.length === 0) {
          setNoProblems(true);
        } else {
          setProblems(data.problems || []);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError("Error fetching problems. Please try again later.");
      }
    };

    fetchProblems();
  }, []);

  const handleProblemSelect = (problemId) => {
    setSelectedProblems((prev) => {
      if (prev.includes(problemId)) {
        return prev.filter((id) => id !== problemId);
      } else {
        return [...prev, problemId];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contestData = {
      title,
      description,
      problems: selectedProblems,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/contests/createContest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contestData),
        }
      );

      if (response.ok) {
        navigate("/contests"); // Redirect to the contests page on successful creation
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create contest.");
      }
    } catch (error) {
      console.error("Error creating contest:", error);
      setError("Error creating contest. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Create a New Contest
      </h1>
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded">{error}</div>
        )}
        {noProblems ? (
          <div className="mb-4 p-3 bg-yellow-600 text-white rounded">
            <p>
              No problems available. Please{" "}
              <a href="/create-problem" className="underline">
                create new problems
              </a>{" "}
              before creating a contest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded text-gray-100"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="problems"
                className="block text-sm font-medium mb-2"
              >
                Select Problems:
              </label>
              <div className="max-h-60 overflow-y-auto bg-gray-800 p-4 rounded">
                {problems.map((problem) => (
                  <div key={problem._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={problem._id}
                      checked={selectedProblems.includes(problem._id)}
                      onChange={() => handleProblemSelect(problem._id)}
                      className="mr-2"
                    />
                    <label htmlFor={problem._id} className="text-gray-100">
                      {problem.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium mb-2"
              >
                Start Time:
              </label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium mb-2"
              >
                End Time:
              </label>
              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded text-gray-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Create Contest
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateContest;
