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
import { log } from './utils/logger';
import api from './utils/api';


function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/auth/user')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user != null && !loading) {
      navigate("/home");
    }
  }, [user]);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
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