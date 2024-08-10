/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../userContext";
import { ToastContainer, toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import { saveAs } from "file-saver"; // Import file-saver for downloading files
import Spinner from "../components/Spinner.jsx";
import { useContext } from "react";
import { useTheme } from "../themeContext"; // Import ThemeContext

const ProblemDetail = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);
  const { isLoggedIn, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const { theme } = useTheme(); // Access theme from context

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/problems/getProblem/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setProblem(data.problem);
        } else {
          console.error("Problem not found");
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
      setLoading(false);
    };

    fetchProblem();
  }, [id]);

  const handleRunCode = async () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to run code.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          langName: selectedLanguage,
          executionCode: code,
          customInput: input,
        }),
      });

      const result = await response.json();
      if (result?.status === "fail") {
        if (selectedLanguage !== "java") {
          setOutput(result.message.cmd || "Error executing code.");
        } else {
          setOutput(result.message);
        }
      } else {
        setOutput(result.out);
      }
    } catch (error) {
      console.error("Error executing code:", error);
      toast.error("Network error: Unable to execute code.");
      setOutput("Error executing code.");
    }
  };

  const handleSubmitCode = async () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to submit code.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/submitCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problemId: id,
            email: user.email,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Code submitted successfully.");
      } else {
        toast.error("Error submitting code. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting code:", err);
      toast.error("Error submitting code. Please try again.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text:", err);
        toast.error("Failed to copy text.");
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInput(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  if (loading)
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
            theme === "light" ? "bg-white" : "bg-gray-800"
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

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen p-4 gap-4 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div
        className={`flex-1 p-6 rounded-lg ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <h2 className="text-xl font-semibold mb-2">{problem.description}</h2>
        <div className="mb-6 relative">
          <h2 className="text-xl font-semibold mb-2">Sample Input</h2>
          <pre
            className={` p-2 rounded ${
              theme !== "light"
                ? "text-gray-100  bg-gray-700 "
                : "text-gray-900  bg-gray-200"
            }`}
          >
            {problem.sampleInput}
          </pre>
          <button
            onClick={() => copyToClipboard(problem.sampleInput)}
            className="absolute top-2 right-2 p-2 hover:text-gray-100"
            aria-label="Copy sample input to clipboard"
          >
            <FaCopy />
          </button>
        </div>
        <div className="mb-6 relative">
          <h2 className="text-xl font-semibold mb-2">Sample Output</h2>
          <pre
            className={` p-2 rounded ${
              theme !== "light"
                ? "text-gray-100  bg-gray-700 "
                : "text-gray-900  bg-gray-200"
            }`}
          >
            {problem.sampleOutput}
          </pre>
          <button
            onClick={() => copyToClipboard(problem.sampleOutput)}
            className="absolute top-2 right-2 p-2 hover:text-gray-100"
            aria-label="Copy sample output to clipboard"
          >
            <FaCopy />
          </button>
        </div>
      </div>
      <div
        className={`flex-1 p-6 rounded-lg ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-xl font-semibold mb-2"
          >
            Select Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={`w-full p-3 rounded-lg ${
              theme === "light"
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-700 text-gray-100"
            }`}
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="js">JavaScript</option>
          </select>
        </div>

        <div className="relative mb-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="10"
            className={`w-full p-3 rounded-lg ${
              theme === "light"
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-700 text-gray-100"
            }`}
            placeholder="Enter your code here..."
          />
          <button
            onClick={() => copyToClipboard(code)}
            className="absolute top-2 right-2 p-2 hover:text-gray-100"
            aria-label="Copy code to clipboard"
          >
            <FaCopy />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Input</h3>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="4"
              className={`w-full p-3 rounded-lg mb-4 ${
                theme === "light"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-gray-700 text-gray-100"
              }`}
              placeholder="Enter input for your code..."
            />
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="mt-2"
            />
            <button
              onClick={() => copyToClipboard(input)}
              className="absolute top-1 right-1 p-2 hover:text-gray-100"
              aria-label="Copy input to clipboard"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRunCode}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Run Code
          </button>
          <button
            onClick={handleSubmitCode}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Submit Code
          </button>
        </div>

        <div
          className={` p-4 rounded-lg mt-4 relative ${
            theme === "light"
              ? "bg-gray-200 text-gray-900"
              : "bg-gray-800 text-gray-100"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">Output</h3>
          <pre>{output}</pre>
          <button
            onClick={() => copyToClipboard(output)}
            className="absolute top-2 right-2 p-2 hover:text-gray-100"
            aria-label="Copy output to clipboard"
          >
            <FaCopy />
          </button>
          <button
            onClick={() => downloadFile("output.txt", output)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2"
          >
            Download Output
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProblemDetail;
