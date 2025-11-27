import React, { useState } from "react";
import api from '../utils/api';
import { useNavigate } from "react-router-dom";
import checkCookie from '../utils/checkCookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // for validation message
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /[0-9]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters long.";
    if (!hasUpper.test(password)) return "Password must include an uppercase letter.";
    if (!hasLower.test(password)) return "Password must include a lowercase letter.";
    if (!hasNumber.test(password)) return "Password must include a number.";
    return ""; // no errors
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if cookies are enabled
    if (!checkCookie()) {
      alert("Cookies are disabled in your browser. Please enable cookies to log in.");
      return;
    }
    // Check password validity
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setError(""); // clear any old errors

    setIsLoading(true);
    api
      .post('/api/auth/login', { email, password })
      .then((result) => {
        const userData = result.data;
        navigate("/home");
        alert("Login successful");
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred while logging in.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-3 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-md">Please Login to continue</p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    error ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter your password"
                  required
                />  
                {error && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 text-lg font-bold text-white py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                        3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600">New to Contest Tracker?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200 group"
                onClick={() => navigate("/signup")}
              >
                Create an account
                <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
