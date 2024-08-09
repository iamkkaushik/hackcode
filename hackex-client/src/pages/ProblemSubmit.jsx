/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/problems/addProblem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            constraints,
            sampleInput,
            sampleOutput,
          }),
        }
      );

      if (response.ok) {
        navigate("/problems");
      } else {
        setError("Failed to add problem. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add a New Problem
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Description"
        />
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Constraints"
        />
        <textarea
          value={sampleInput}
          onChange={(e) => setSampleInput(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Sample Input"
        />
        <textarea
          value={sampleOutput}
          onChange={(e) => setSampleOutput(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder="Sample Output"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition w-full"
        >
          Add Problem
        </button>
      </div>
    </div>
  );
};

export default AddProblem;
