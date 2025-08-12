import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

function SignUp() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth/signup",{name,email,password})
        .then(result=>{
            console.log("User created successfully");
            localStorage.setItem("user-email",email);
            navigate("/platforms");
        }).catch(err=>{
          if(err.response && err.response.status === 400) {
            window.alert("Email already exists")
          }else {
            console.log(err);
          }
        })
    }
    
    return(
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">SIGN UP</h3>
        <form onSubmit={handleSignUp}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                type="name"
                className="form-control"
                onChange={(e)=>setName(e.target.value)}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
               onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-50 fs-6">Sign up</button>
          <br />
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    </div>
    
    );

}
export default SignUp;