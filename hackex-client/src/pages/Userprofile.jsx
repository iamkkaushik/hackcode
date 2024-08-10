import { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, user } = useUser();
  const [problemCount, setProblemCount] = useState(0);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const fetchUserProblems = async () => {
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
            credentials: "include", // Ensure cookies are sent
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProblemCount(data.noOfProblems);
          setProblems(data.problems);
        } else {
          console.error("Failed to fetch user problems.");
        }
      } catch (error) {
        console.error("Error fetching user problems:", error);
      }
    };

    if (user) {
      fetchUserProblems();
    }
  }, [isLoggedIn, user, navigate]); // Add navigate to dependency array

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Profile</h1>
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <p>
          <strong>Problems Solved:</strong> {problemCount}
        </p>
        {problems.length > 0 && (
          <div className="mt-6">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left font-bold text-gray-300">
                    Title
                  </th>
                  <th className="py-2 px-4 border-b text-left font-bold text-gray-300">
                    Description
                  </th>
                  <th className="py-2 px-4 border-b text-left font-bold text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem.id}>
                    <td className="py-2 px-4 border-b text-gray-400">
                      {problem.title}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-400">
                      {problem.description}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        View Problem
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
