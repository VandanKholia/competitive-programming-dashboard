import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";

function PlatformSelect() {
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing platform data if any
    axios.get("http://localhost:3000/api/auth/platforms", { withCredentials: true })
    .then(result=> {
      setCodeforces(result.data.platforms.find(p => p.name === "codeforces")?.userName || "");
      setCodechef(result.data.platforms.find(p => p.name === "codechef")?.userName || "");
      setLeetcode(result.data.platforms.find(p => p.name === "leetcode")?.userName || "");
    });
  }, []);

  //Checking if the username is valid for the platform
  const checkValidUser = async(platform, username) => { 
    try {
      if(platform === "codeforces") {
        const res = await axios.get(`http://localhost:3000/api/codeforces/${username}`);
        return res.status === 200 || res.status === 201;
      }
      if(platform === "codechef") {
        const res = await axios.get(`http://localhost:3000/api/codechef/${username}`);
        return res.status === 200 || res.status === 201;
      }
      if(platform === "leetcode") {
        const res = await axios.get(`http://localhost:3000/api/leetcode/${username}`);
        return res.status === 200 || res.status === 201;
      }

      return false;

    } catch (error) {
      console.error("Error validating user:", error);
      return false;
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedPlatforms = [];

    if (codeforces.trim()) {
      const isValid = await checkValidUser("codeforces", codeforces);
      if (isValid) {
        selectedPlatforms.push({ name: "codeforces", userName: codeforces })
      }else {
        alert("Invalid Codeforces username");
        setIsLoading(false);
        return;
      }
    };

    if (codechef.trim()) {
      const isValid = await checkValidUser("codechef", codechef);
      if (isValid) {
        selectedPlatforms.push({ name: "codechef", userName: codechef })
      }else {
        alert("Invalid CodeChef username");
        setIsLoading(false);
        return;
      }
    }
    if (leetcode.trim()) {
      const isValid = await checkValidUser("leetcode", leetcode);
      if (isValid) {
        selectedPlatforms.push({ name: "leetcode", userName: leetcode });
      } else {
        alert("Invalid LeetCode username");
        setIsLoading(false);
        return;
      }
    }
    if(selectedPlatforms.length === 0){
      alert("Please select at least one platform");
      setIsLoading(false);
      return;
    }
    await axios.post("http://localhost:3000/api/auth/platforms",
      { platforms: selectedPlatforms },
      { withCredentials: true }
    ).then(result => {
      alert("Platforms saved");
      navigate("/home");
    }).catch(err => {
      console.error("Error: ", err);
    }).finally(() => {
      setIsLoading(false);
    });
    
  };
  const platforms = [
    {
      name: "LeetCode",
      key: "leetcode",
      baseUrl: "https://leetcode.com/u/",
      placeholder: "Username",
      value: leetcode,
      setValue: setLeetcode,
      icon: <SiLeetcode className="text-white text-lg" />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "CodeChef",
      key: "codechef",
      baseUrl: "https://www.codechef.com/users/",
      placeholder: "Username",
      value: codechef,
      setValue: setCodechef,
      icon: <SiCodechef className="text-white text-lg" />,
      color: "from-amber-400 to-yellow-600"
    },
    {
      name: "Codeforces",
      key: "codeforces",
      baseUrl: "https://codeforces.com/profile/",
      placeholder: "Username",
      value: codeforces,
      setValue: setCodeforces,
      icon: <SiCodeforces className="text-white text-lg" />,
      color: "from-blue-400 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Platforms</h1>
            <p className="text-gray-600 text-sm">
              Link your coding profiles to track your progress across platforms
            </p>
          </div>

          {/* Platforms Form */}
          <div className="p-6">
            <div className="space-y-6">
              {platforms.map((platform) => (
                <div key={platform.key} className="group">
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center mr-3 shadow-sm`}>
                      {platform.icon}
                    </div>
                    <label className="text-sm font-semibold text-gray-700">
                      {platform.name}
                    </label>
                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Optional
                    </span>
                  </div>

                  {/* Responsive URL + Input */}
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row w-full">
                      {/* Base URL */}
                      <div className="flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border-2 border-gray-200 sm:border-r-0 sm:rounded-l-xl rounded-t-xl sm:rounded-t-none text-gray-600 text-sm font-mono flex-shrink-0">
                        {platform.baseUrl}
                      </div>

                      {/* Input */}
                      <input
                        type="text"
                        value={platform.value}
                        onChange={(e) => platform.setValue(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 sm:border-l-0 sm:rounded-r-xl rounded-b-xl sm:rounded-b-none focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 font-mono"
                        placeholder={platform.placeholder}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-blue-600 text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-blue-900 mb-1">How it works</h2>
                  <p className="text-sm text-blue-700">
                    Enter your usernames for the platforms you use. We'll track your contests, ratings, and progress automatically.
                    You can always add or update platforms later.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? "Saving..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformSelect;
