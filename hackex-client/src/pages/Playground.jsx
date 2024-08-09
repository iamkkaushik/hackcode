// import { useState } from "react";
// import CodeHighlighter from "./CodeHighlighter";

// const Playground = () => {
// 	const [input, setInput] = useState("");
// 	const [output, setOutput] = useState("");
// 	const [language, setLanguage] = useState("cpp");

// 	const handleRunCode = async () => {
// 		// Mock API call to simulate running code
// 		const response = { output: `Mock output for ${language} code.` };
// 		setOutput(response.output);
// 	};

// 	return (
// 		<div className="p-6 bg-gray-900 min-h-screen text-gray-200">
// 			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
// 				<div className="bg-gray-800 shadow-lg rounded-lg p-4">
// 					<div className="flex justify-between items-center mb-4">
// 						<select
// 							className="p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
// 							value={language}
// 							onChange={(e) => setLanguage(e.target.value)}
// 						>
// 							<option value="java">Java</option>
// 							<option value="cpp">C++</option>
// 							<option value="python">Python</option>
// 							<option value="javascript">Javascript</option>
// 						</select>
// 						<div className="flex space-x-2">
// 							<button className="bg-green-500 text-white py-2 px-4 rounded-lg">
// 								Coding Sprint
// 							</button>
// 							<button
// 								className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center"
// 								onClick={handleRunCode}
// 							>
// 								<i className="bi bi-play-fill"></i>
// 							</button>
// 						</div>
// 					</div>
// 					<CodeHighlighter language={language} />
// 				</div>
// 				<div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col justify-between">
// 					<div className="mb-4">
// 						<label
// 							htmlFor="input"
// 							className="block text-gray-400 font-semibold mb-2"
// 						>
// 							Input
// 						</label>
// 						<textarea
// 							id="input"
// 							className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// 							value={input}
// 							onChange={(e) => setInput(e.target.value)}
// 							placeholder="Input data here..."
// 						></textarea>
// 					</div>
// 					<div>
// 						<label
// 							htmlFor="output"
// 							className="block text-gray-400 font-semibold mb-2"
// 						>
// 							Output
// 						</label>
// 						<textarea
// 							id="output"
// 							className="w-full h-32 p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// 							value={output}
// 							readOnly
// 							placeholder="Output will appear here..."
// 						></textarea>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Playground;


import { useState } from "react";
import CodeHighlighter from "./CodeHighlighter";

const Playground = () => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState("cpp");

	const handleRunCode = async () => {
		// Mock API call to simulate running code
		const response = { output: `Mock output for ${language} code.` };
		setOutput(response.output);
	};

	return (
		<div className="p-6 bg-gray-900 min-h-screen text-gray-200">
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
							<option value="python">Python</option>
							<option value="javascript">Javascript</option>
						</select>
						<div className="flex space-x-2">
							<button className="bg-green-500 text-white py-2 px-4 rounded-lg">
								Coding Sprint
							</button>
							<button
								className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center"
								onClick={handleRunCode}
							>
								<i className="bi bi-play-fill"></i>
							</button>
						</div>
					</div>
					<CodeHighlighter language={language} />
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
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Input data here..."
						></textarea>
					</div>
					<div>
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
