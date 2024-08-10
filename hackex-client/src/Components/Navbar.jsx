import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isLoggedIn, logoutUser } = useUser();
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
	};

	if (location.pathname === "/login" || location.pathname === "/signup") {
		return null;
	}

	return (
		<nav className="bg-gray-800 text-gray-100 shadow-md sticky top-0 z-50">
			<div className="mx-auto flex justify-between items-center p-4">
				<div className="flex items-center">
					<Link
						to="/"
						className="text-xl font-semibold flex items-center space-x-2"
					>
						<img src={logo} alt="Logo" className="h-10 w-auto" />
						<span className="ml-4">Hackex</span>
					</Link>
				</div>
				<div className="flex items-center justify-around space-x-12">
					<Link
						to="/problems"
						className="text-md hover:text-blue-400 transition duration-300"
					>
						Problems
					</Link>
					<Link
						to="/leaderboard"
						className="text-lg hover:text-blue-400 transition duration-300"
					>
						Leaderboard
					</Link>
					<Link
						to="/playground"
						className="text-md hover:text-blue-400 transition duration-300"
					>
						Playground
					</Link>
					<Link
						to="/submit"
						className="text-md hover:text-blue-400 transition duration-300"
					>
						Submit Problem
					</Link>
					<div className="relative ml-6 flex items-center">
						{!isLoggedIn ? (
							<Link
								to="/login"
								className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
							>
								Login/Register
							</Link>
						) : (
							<div className="relative">
								<button
									onClick={toggleDropdown}
									className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
									aria-label="User Menu"
								>
									<FaBars className="text-xl" />
								</button>
								{isDropdownOpen && (
									<div
										ref={dropdownRef}
										className="absolute right-0 mt-2 bg-gray-700 text-gray-100 rounded-lg shadow-lg w-40"
									>
										<Link
											to="/profile"
											className="block px-4 py-2 hover:bg-blue-500"
											onClick={() => setDropdownOpen(false)}
										>
											Profile
										</Link>
										<Link to = "/home">
											<button
												onClick={handleLogout}
												className="block w-full px-4 py-2 text-left hover:bg-blue-500"
											>
												Logout
											</button>
										</Link>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
