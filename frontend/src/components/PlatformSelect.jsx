import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function PlatformSelect() {
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user-email");

  const handleSubmit=(e)=>{
    e.preventDefault();

    const selectedPlatforms = [];
    if(codeforces.trim()) selectedPlatforms.push({name: "codeforces", userName: codeforces});
    if(codechef.trim()) selectedPlatforms.push({name: "codechef", userName: codechef});
    if(leetcode.trim()) selectedPlatforms.push({name: "leetcode", userName: leetcode});

    axios.post("http://localhost:3000/api/auth/platforms",{email: userEmail, platforms: selectedPlatforms})
    .then(result=> {
      alert("Platforms saved");
      navigate("/home");
    }).catch(err=> {
      console.log("Error: ", err);
    });
  };

  return(
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Select Platforms</h3>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label className="form-label">Codeforces</label>
                  <input
                  type="text"
                  className="form-control"
                  onChange={(e)=>setCodeforces(e.target.value)}
                
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Codechef</label>
              <input
                type="text"
                className="form-control"
                 onChange={(e)=>setCodechef(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Leetcode</label>
              <input
                type="text"
                className="form-control"
                onChange={(e)=>setLeetcode(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-50 fs-6">Submit</button>
            <br />
            {/* <Link to="/Login">Already have an account?</Link> */}
          </form>
        </div>
      </div>
      
      );
}

export default PlatformSelect;