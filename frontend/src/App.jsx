import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import PlatformSelect from "./components/PlatformSelect";
import { Navigate } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/user", { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user != null && !loading) {
      console.log("User is logged in", user);
      navigate("/home");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/platforms" element={<PlatformSelect />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;