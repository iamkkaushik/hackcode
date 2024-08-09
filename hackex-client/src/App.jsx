/* eslint-disable react/prop-types */
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Playground from "./pages/Playground";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import ProblemSubmit from "./pages/ProblemSubmit";
import Login from "./pages/Login";
import UserProfile from "./pages/Userprofile";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />

        <Route
          path="/"
          element={
            <Layout>
              <ProblemList />
            </Layout>
          }
        />
        <Route
          path="/problem/:id"
          element={
            <Layout>
              <ProblemDetail />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="/playground"
          element={
            <Layout>
              <Playground />
            </Layout>
          }
        />
        <Route
          path="/submit"
          element={
            <Layout>
              <ProblemSubmit />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default App;
