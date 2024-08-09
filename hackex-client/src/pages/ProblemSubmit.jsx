import { useState } from "react";

const ProblemSubmit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");

  const handleSubmit = () => {
    // Mock implementation, adjust according to backend
    alert("Problem submitted successfully");
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Submit a New Problem
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full h-24 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Constraints"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              className="w-full h-24 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Sample Input"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              value={sampleOutput}
              onChange={(e) => setSampleOutput(e.target.value)}
              className="w-full h-24 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Sample Output"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition"
          >
            Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProblemSubmit;
