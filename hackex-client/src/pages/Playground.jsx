import { useState } from "react";
import CodeHighlighter from "./CodeHighlighter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [testInput, setTestInput] = useState("");

  const handleRunCode = async () => {
    try {
      console.log(input);
      console.log(language);
      console.log(testInput);

      const response = await fetch("http://localhost:8000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          langName: language,
          executionCode: input,
          customInput: testInput,
        }),
      });

      const result = await response.json();
	  console.log(result);

      if (result.status === "fail") {
		if(language === "java"){
			toast.error("ERROR"); // Show toast if response status is failed
			setOutput(result.message);
		}else{
			toast.error("ERROR");
			setOutput(result.message.cmd);
		}
      } else {
        setOutput(result.out);
      }

      console.log(result);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code.");
      toast.error("ERROR"); // Show toast for network error as well
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <select
              className="p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="js">Javascript</option>
            </select>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleRunCode}
              >
                Coding Sprint
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center"
              >
                <i className="bi bi-play-fill"></i>
              </button>
            </div>
          </div>
          <CodeHighlighter language={language} code={input} setCode={setInput} />
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col justify-between">
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-400 font-semibold mb-2"
            >
              Input
            </label>
            <textarea
              id="input"
              className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Input data here..."
            ></textarea>
          </div>
          <div >
            <label
              htmlFor="output"
              className="block text-gray-400 font-semibold mb-2"
            >
              Output
            </label>
            <textarea
              id="output"
              className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={output}
              readOnly
              placeholder="Output will appear here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
