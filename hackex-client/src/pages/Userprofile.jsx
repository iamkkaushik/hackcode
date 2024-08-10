import { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
	const { isLoggedIn, user } = useUser();
	const [problemCount, setProblemCount] = useState(0);
	const [problems, setProblems] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
			return;
		}

		const fetchUserData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/v1/users/userProblems`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: user,
						}),
						credentials: "include",
					}
				);

				if (response.ok) {
					const data = await response.json();
					setName(data.name);
					setEmail(data.email);
					setProblemCount(data.noOfProblems);
					const fetchedProblems = await Promise.all(
						data.problems.map(async (problemId) => {
							const problemResponse = await fetch(
								`http://localhost:3000/api/v1/problems/getProblem/${problemId}`
							);
							const problemData = await problemResponse.json();
							return problemData.problem;
						})
					);
					setProblems(fetchedProblems);
				} else {
					console.error("Failed to fetch user data.");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		if (user) {
			fetchUserData();
		}
	}, [isLoggedIn, user, navigate]);

	return (
		<div className="bg-gray-900 text-gray-100 min-h-screen p-8">
			<h1 className="text-4xl font-bold mb-6 text-center">Profile</h1>
			<div className="max-w-5xl mx-auto bg-gray-800 p-10 rounded-lg shadow-lg">
				<div className="mb-4">
					<p className="text-center text-xl">
						<strong>Name:</strong> {name}
					</p>
					<p className="text-center text-xl">
						<strong>Email:</strong> {email}
					</p>
				</div>
				<p className="text-center text-xl">
					<strong>Problems Solved:</strong> {problemCount}
				</p>
				{problems.length > 0 && (
					<div className="mt-6">
						<table className="w-full bg-gray-800 border border-gray-700">
							<thead>
								<tr>
									<th className="py-4 px-6 border-b text-left font-bold text-gray-300">
										Title
									</th>
									<th className="py-4 px-6 border-b text-left font-bold text-gray-300">
										Description
									</th>
									<th className="py-4 px-6 border-b text-left font-bold text-gray-300">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{problems.map((problem) => (
									<tr key={problem._id}>
										<td className="py-4 px-6 border-b text-gray-400">
											{problem.title}
										</td>
										<td className="py-4 px-6 border-b text-gray-400">
											{problem.description}
										</td>
										<td className="py-4 px-6 border-b">
											<Link
												to={`/problem/${problem._id}`}
												className="text-blue-400 hover:underline"
											>
												View
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
