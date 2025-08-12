import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import PlatformSelect from "./components/PlatformSelect";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
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
