import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({ problemsSolved: [] });
  const navigate = useNavigate();

  // Mock implementation of user data fetch
  useEffect(() => {
    // Simulate fetching user profile
    const fetchUserProfile = async () => {
      // Simulating a delay and setting static data
      setTimeout(() => {
        setUser({
          problemsSolved: [], // Hardcoded for now
        });
      }, 1000);
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    // Mock API call to logout
    const response = await fetch("http://localhost:3000/api/v1/users/logout", {
      method: "GET",
    });
    if (response.ok) {
      navigate("/login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Problems Solved: {user.problemsSolved.length}
          </h2>
          <ul className="mt-4">
            {user.problemsSolved.length === 0 ? (
              <li className="text-gray-300">No problems solved yet.</li>
            ) : (
              user.problemsSolved.map((problem, index) => (
                <li key={index} className="mb-2 text-gray-300">
                  {problem.title}
                </li>
              ))
            )}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
