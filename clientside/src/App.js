import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import VerifyEmail from "./pages/verifyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoutes><Login /></PublicRoutes>}></Route>
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>}></Route>
        <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>}></Route>
        <Route path="/verify/:token" element={<PublicRoutes><VerifyEmail></VerifyEmail></PublicRoutes>}></Route>
      </Routes>
    </Router>
  );
}

export const PrivateRoutes = ({ children }) => {
  if (localStorage.getItem("data")) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export const PublicRoutes = ({ children }) => {
  if (localStorage.getItem("data")) {
    return <Navigate to={"/Dashboard"}></Navigate>;
  } else {
    return children;
  }
};

export default App;
