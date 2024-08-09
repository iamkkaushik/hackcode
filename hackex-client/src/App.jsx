import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

function App() {
  return (
    <Router>
      <div>
        <h1 className="text-3xl font-bold underline text-red-500">Hackex</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
