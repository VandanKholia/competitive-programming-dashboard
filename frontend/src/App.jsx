import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import PlatformSelect from "./components/PlatformSelect";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(()=> {
  //   axios.get("http://localhost:3000/api/auth/user", { withCredentials: true } )
  //     .then(response => {
  //       setUser(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/platforms" element={<PlatformSelect/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        


        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/select-platforms" element={<PlatformSelection />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
