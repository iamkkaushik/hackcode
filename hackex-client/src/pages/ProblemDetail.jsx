import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../userContext";
import { ToastContainer, toast } from "react-toastify";
import CodeHighlighter from "./CodeHighlighter"; // Import the CodeHighlighter component

const ProblemDetail = () => {
	const { id } = useParams();

	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [problem, setProblem] = useState(null);
	const { isLoggedIn, user } = useUser();
	const [selectedLanguage, setSelectedLanguage] = useState("cpp");

	useEffect(() => {
		const fetchProblem = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/v1/problems/getProblem/${id}`
				);

				if (response.ok) {
					const data = await response.json();
					setProblem(data.problem);
				} else {
					console.error("Problem not found");
					toast.error("Problem not found.");
				}
			} catch (err) {
				console.error("Error fetching problem:", err);
				toast.error("Error fetching problem.");
			}
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
			console.log(result);
			console.log(selectedLanguage);


			if (result?.status === "fail") {
				if(selectedLanguage !== "java"){
					setOutput(result.message.cmd || "Error executing code.");	
				}else{
					console.log(result);
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
						email: user.email, // Ensure you're sending the correct user identifier
						code,
						langName: selectedLanguage,
					}),
					credentials: "include", // Ensure cookies are sent
				}
			);

			if (response.ok) {
				const data = await response.json();
				console.log("Code submitted successfully:", data);
				toast.success("Code submitted successfully.");
			} else {
				toast.error("Error submitting code. Please try again.");
			}
		} catch (err) {
			console.error("Error submitting code:", err);
			toast.error("Error submitting code. Please try again.");
		}
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
						className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg"
					>
						<option value="cpp">C++</option>
						<option value="c">C</option>
						<option value="python">Python</option>
						<option value="java">Java</option>
						<option value="js">JavaScript</option>
					</select>
				</div>

				{/* CodeHighlighter Component for Code Editing */}
				<CodeHighlighter 
					language={selectedLanguage} 
					code={code} 
					setCode={setCode} 
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
				<div className="bg-gray-700 p-4 rounded-lg mt-4">
					<h3 className="text-xl font-semibold mb-2">Output</h3>
					<pre className="text-gray-300">{output}</pre>
				</div>
			</div>
		</div>
	);
};

export default ProblemDetail;
