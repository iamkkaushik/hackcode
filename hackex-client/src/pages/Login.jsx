/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("dummy@email.com");
  const [password, setPassword] = useState("dummy2222");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useUser();

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie("token", data.token, 1);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        login(data.data.user);
        // console.log(isLoggedIn);
        navigate("/profile");
      } else {
        const result = await response.json();
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">Don&apos;t have an account?</p>
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
