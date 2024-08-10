import { useState } from "react";
import CodeHighlighter from "./CodeHighlighter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useScreenSize from "../hooks/useScreenSize.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";

const Playground = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [testInput, setTestInput] = useState("");
  const { height } = useScreenSize();
  const [theme, setTheme] = useState("vsCodeDark");

  const handleRunCode = async () => {
    try {
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

      if (result.status === "fail") {
        if (language === "java") {
          toast.error("ERROR");
          setOutput(result.message);
        } else {
          toast.error("ERROR");
          setOutput(result.message.cmd);
        }
      } else {
        setOutput(result.out);
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code.");
      toast.error("ERROR");
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
        setTestInput(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <ToastContainer />
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
            <select
              className="p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vscodeDark">VsCode Dark</option>
              <option value="oneDark">One Dark</option>
              <option value="solarizedDark">Solarized Dark</option>
              <option value="solarizedLight">Solarized Light</option>
              <option value="githubLight">GitHub Light</option>
              <option value="bespin">Bespin</option>
              <option value="duotoneDark">Duotone Dark</option>
              <option value="dracula">Dracula</option>
              <option value="xcodeDark">Xcode Dark</option>
              <option value="xcodeLight">Xcode Light</option>
              <option value="duotoneLight">DuoTone Light</option>
              <option value="okaidia">Okaidia</option>
            </select>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleRunCode}
              >
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Run
              </button>
            </div>
          </div>
          <div className="relative">
            <CodeHighlighter
              language={language}
              code={input}
              setCode={setInput}
              height={String(parseInt(height) * 0.74) + "px"}
              theme={theme}
            />
            <button
              onClick={() => copyToClipboard(input)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-100"
              aria-label="Copy code to clipboard"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col justify-between">
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-gray-400 font-semibold mb-2"
            >
              Input
            </label>
            <div className="relative">
              <textarea
                id="input"
                className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Input data here..."
              ></textarea>
              <button
                onClick={() => copyToClipboard(testInput)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-100"
                aria-label="Copy input to clipboard"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="output"
              className="block text-gray-400 font-semibold mb-2"
            >
              Output
            </label>
            <div className="relative">
              <textarea
                id="output"
                className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={output}
                readOnly
                placeholder="Output will appear here..."
              ></textarea>
              <button
                onClick={() => copyToClipboard(output)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-100"
                aria-label="Copy output to clipboard"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <button
              onClick={() => downloadFile("output.txt", output)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download Output
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
