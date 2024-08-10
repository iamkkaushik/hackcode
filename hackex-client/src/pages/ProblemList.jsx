import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../themeContext"; // Adjust path as needed

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/problems/allProblems"
        );
        const data = await response.json();
        console.log(data); // Log data to check its structure
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 ${
        theme !== "light"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-8 text-center ${
          theme !== "light" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Available Coding Problems
      </h1>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full ${
            theme !== "light"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          } border rounded-lg shadow-md`}
        >
          <thead
            className={`${
              theme !== "light"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-200 border-gray-300"
            }`}
          >
            <tr>
              <th
                className={`p-4 text-left ${
                  theme !== "light" ? "rounded-tl-lg" : ""
                }`}
              >
                Title
              </th>
              <th className={`p-4 text-left`}>Description</th>
              <th
                className={`p-4 text-left ${
                  theme !== "light" ? "rounded-tr-lg" : ""
                }`}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {problems?.problems?.map((problem) => (
              <tr
                key={problem._id}
                className={`${
                  theme !== "light" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="p-4">
                  {/* <Link
                    to={`/problem/${problem._id}`}
                    className={`hover:underline ${
                      theme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    className="text-blue-400 hover:underline"
                  > */}
                  {problem.title}
                  {/* </Link> */}
                </td>
                <td
                  className={`p-4 ${
                    theme !== "light" ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  {problem.description}
                </td>
                <td className="p-4">
                  <Link
                    to={`/problem/${problem._id}`}
                    className={`hover:underline ${
                      theme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemList;
