import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProblemDetail = () => {
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/problems/getProblem/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProblem(data.problem);
        } else {
          console.error("Problem not found");
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleRunCode = () => {
    // Mock implementation for demonstration
    setOutput("Code executed successfully.");
  };

  if (!problem) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-gray-100 min-h-screen p-4 gap-4">
      <div className="flex-1 bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{problem.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Constraints</h2>
          <p className="text-gray-300">{problem.constraints}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sample Input</h2>
          <pre className="bg-gray-700 p-2 rounded">{problem.sampleInput}</pre>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sample Output</h2>
          <pre className="bg-gray-700 p-2 rounded">{problem.sampleOutput}</pre>
        </div>
      </div>
      <div className="flex-1 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="10"
          className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg mb-4"
          placeholder="Write your code here..."
        />
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="4"
            className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg mb-4"
            placeholder="Enter input for your code..."
          />
        </div>
        <button
          onClick={handleRunCode}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
        >
          Run Code
        </button>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Output</h3>
          <pre className="text-gray-300">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
