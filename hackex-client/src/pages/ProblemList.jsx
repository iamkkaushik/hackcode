import { Link } from "react-router-dom";

const dummyProblems = [
  {
    id: "1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a target value.",
    constraints: "Array length should be between 2 and 10^4.",
    sampleInput: "[2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
  },
  {
    id: "2",
    title: "Reverse Integer",
    description: "Reverse the digits of an integer.",
    constraints: "Input integer within the range of a 32-bit signed integer.",
    sampleInput: "123",
    sampleOutput: "321",
  },
];

const ProblemList = () => {
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
            {dummyProblems.map((problem) => (
              <tr key={problem.id} className="border-b border-gray-700">
                <td className="p-4">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="p-4 text-gray-300">{problem.description}</td>
                <td className="p-4">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    View Problem
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
