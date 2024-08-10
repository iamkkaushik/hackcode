import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemList from "./ProblemList";
import LeaderBoard from "./LeaderBoard";
import { useTheme } from "../themeContext"; // Adjust path as needed
import { useUser } from "../userContext";
import img from "../assets/img2.png";

const Home = () => {
	const { theme } = useTheme(); // Get theme context
	const platformInfo = {
		title: "Welcome to Hackex",
		description:
			"Hackex is a cutting-edge platform designed to enhance your coding skills through interactive challenges, diverse contests, and a vibrant community. Whether you're a beginner or a seasoned coder, Hackex offers a range of tools and opportunities to grow and showcase your abilities. Dive into coding challenges, participate in competitive contests, and connect with fellow developers to take your skills to the next level.",
	};

	const { isLoggedIn } = useUser(); // Access login state

	useEffect(() => {
		// This ensures that the Navbar will re-render if the user login state changes
	}, [isLoggedIn]);

	return (
		<div
			className={`flex flex-col lg:flex-row justify-between items-start lg:items-start lg:space-x-10 p-8 ${theme !== "light"
				? "bg-gray-900 text-gray-100"
				: "bg-gray-50 text-gray-900"
				} min-h-screen`}
		>
			{/* Main Content */}
			<div className="lg:w-3/5 flex flex-col">
				{/* Platform Information */}
				<div
					className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg mb-6 ${theme !== "light" ? "bg-gray-800" : "bg-gray-100"} text-center`}
				>
					<h1 className="text-4xl font-bold mb-4">{platformInfo.title}</h1>
					<p className="text-lg">{platformInfo.description}</p>
				</div>
				{/* Specialties Section */}
				<div className="flex flex-col lg:flex-row lg:space-x-6 mb-6">
					{/* Coding Playground */}
					<div className={`flex-1 p-6 rounded-lg shadow-lg mb-4 lg:mb-0 flex flex-col items-center justify-center ${theme !== "light" ? "bg-gray-700" : "bg-gray-100"} transition-transform duration-300 ease-in-out hover:scale-105`}>
						<Link to="/playground">
							<h2 className="text-2xl font-bold mb-2 text-center">Coding Playground</h2>
							<p className="text-center">
								A place where users can play with code. Users can code in a code editor and execute it with custom inputs.
								See errors, output, and metrics like execution time & memory usage.
							</p>
						</Link>
					</div>
					{/* Coding Arena */}
					<div className={`flex-1 p-6 rounded-lg shadow-lg mb-4 lg:mb-0 flex flex-col items-center justify-center ${theme !== "light" ? "bg-gray-700" : "bg-gray-100"} transition-transform duration-300 ease-in-out hover:scale-105`}>
						<Link to="/problems">
							<h2 className="text-2xl font-bold mb-2 text-center">Coding Arena</h2>
							<p className="text-center">
								A place where users can practice their coding skills by solving various problems available on the platform.
								Users may upload their own coding problem along with its description, constraints, and test cases.
							</p>
						</Link>
					</div>
					{/* Coding Battleground */}
					<div className={`flex-1 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center ${theme !== "light" ? "bg-gray-700" : "bg-gray-100"} transition-transform duration-300 ease-in-out hover:scale-105`}>
						<Link to="/contests">
							<h2 className="text-2xl font-bold mb-2 text-center">Coding Battleground</h2>
							<p className="text-center">
								A place where users can compete in ongoing contests hosted on the platform to showcase their skills.
								See real-time leaderboards and conduct your own contests.
							</p>
						</Link>
					</div>
				</div>
				{/* Problem List */}
				<div className="flex-grow">
					<ProblemList />
				</div>
			</div>

			{/* Sidebar and Image Container */}
			<div className="lg:w-2/5 w-full flex flex-col items-start lg:items-center mt-4">
				<LeaderBoard />
				{/* Image Section */}
				<div className="text-center opacity-100">
					<img
						src={img}
						alt="Decorative"
						className="w-5/6" // Ensures no hover effect
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
