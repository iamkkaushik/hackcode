import { useState } from "react";
import CodeHighlighter from "./CodeHighlighter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useScreenSize from "../hooks/useScreenSize.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Playground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [testInput, setTestInput] = useState("");
  const { height } = useScreenSize();
  const [theme, setTheme] = useState("vscodeDark");

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
        if (language === "java") {
          toast.error("ERROR"); // Show toast if response status is failed
          setOutput(result.message);
        } else {
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
      toast.error("ERROR");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200 ">
      <ToastContainer />
      <div className="max-w-10xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 shadow-lg rounded-lg pt-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <select
              className="ml-4 p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="js">Javascript</option>
            </select>
            <select
              className="p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {/* <option value="vscodeDark">Theme</option> */}
              <option value="vscodeDark">VsCode Dark</option>
              <option value="oneDark">One Dark</option>
              <option value="solarizedDark">Solarized Dark</option>
              <option value="solarizedLight">Solarized Light</option>
              <option value="githubLight">GitHub Light</option>
              <option value="bespin">Bespin</option>
              <option value="duotoneDark">Duotone Dark</option>
              <option value="dracula">Dracula</option>
              <option value="githubLight">GitHub Light</option>
              <option value="xcodeDark">XcodeDark</option>
              <option value="xcodeLight">XcodeLight</option>
              <option value="duotoneLight">DuoTone Light</option>
              <option value="okaidia">Okaidia</option>
            </select>
            <div className="flex space-x-2 mr-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleRunCode}
              >
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Run
              </button>
            </div>
          </div>
          <CodeHighlighter
            language={language}
            code={input}
            setCode={setInput}
            height={String(parseInt(height) * 0.74) + "px"}
            theme={theme}
          />
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg px-4 py-12 flex flex-col h-full gap-16">
          <div className="flex-1 mb-4">
            <label
              htmlFor="input"
              className="block text-gray-400 font-semibold mb-2"
            >
              Input
            </label>
            <textarea
              id="input"
              className="w-full h-full p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Input data here..."
            ></textarea>
          </div>
          <div className="flex-1">
            <label
              htmlFor="output"
              className="block text-gray-400 font-semibold mb-2"
            >
              Output
            </label>
            <textarea
              id="output"
              className="w-full h-full p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
