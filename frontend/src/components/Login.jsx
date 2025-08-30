import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login", { email, password })
      .then(result => {
        if (result.data.message === "Login successful") {
          const userData = result.data;
          console.log(userData.user);
          
          navigate("/home");
          alert("Login successful");
        } else {
          alert(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while logging in.");
        }
      });
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-50 fs-5">Login</button>
        </form>
        
      </div>
    </div>
  );


}
export default Login;