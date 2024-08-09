import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import ProblemSubmit from "./pages/ProblemSubmit";
import Login from "./pages/Login";
import UserProfile from "./pages/Userprofile";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div>
        <h1 className="text-3xl font-bold underline text-red-500">Hackex</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/submit" element={<ProblemSubmit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
