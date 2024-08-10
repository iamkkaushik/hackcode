/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

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
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Available Coding Problems
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-700 border-b border-gray-600">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {problems?.problems?.map((problem) => (
              <tr key={problem.id} className="border-b border-gray-700">
                <td className="p-4">
                  {/* <Link
                    to={`/problem/${problem._id}`}
                    className="text-blue-400 hover:underline"
                  > */}
                    {problem.title}
                  {/* </Link> */}
                </td>
                <td className="p-4 text-gray-300">{problem.description}</td>
                <td className="p-4">
                  <Link
                    to={`/problem/${problem._id}`}
                    className="text-blue-400 hover:underline"
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
