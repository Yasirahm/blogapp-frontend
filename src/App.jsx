import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import AddBlog from "./pages/AddBlog";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-blog"
          element={
            <PrivateRoute>
              <AddBlog />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
