import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import { X, Plus, Save, ArrowLeft } from "lucide-react";

function PlatformEdit() {
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activePlatforms, setActivePlatforms] = useState({
    codeforces: false,
    codechef: false,
    leetcode: false
  });
  const navigate = useNavigate();

  // Fetch existing platforms on mount
  useEffect(() => {
    const fetchUserPlatforms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/user", { 
          withCredentials: true 
        });
        
        if (res.data && res.data.platforms) {
          const platforms = res.data.platforms;
          const newActivePlatforms = { ...activePlatforms };
          
          platforms.forEach(platform => {
            if (platform.name === "codeforces") {
              setCodeforces(platform.userName);
              newActivePlatforms.codeforces = true;
            } else if (platform.name === "codechef") {
              setCodechef(platform.userName);
              newActivePlatforms.codechef = true;
            } else if (platform.name === "leetcode") {
              setLeetcode(platform.userName);
              newActivePlatforms.leetcode = true;
            }
          });
          
          setActivePlatforms(newActivePlatforms);
        }
      } catch (err) {
        console.error("Error fetching platforms:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPlatforms();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedPlatforms = [];
    if (activePlatforms.codeforces && codeforces.trim()) {
      selectedPlatforms.push({ name: "codeforces", userName: codeforces });
    }
    if (activePlatforms.codechef && codechef.trim()) {
      selectedPlatforms.push({ name: "codechef", userName: codechef });
    }
    if (activePlatforms.leetcode && leetcode.trim()) {
      selectedPlatforms.push({ name: "leetcode", userName: leetcode });
    }

    axios.post("http://localhost:3000/api/auth/platforms",
      { platforms: selectedPlatforms },
      { withCredentials: true }
    ).then(result => {
      alert("Platforms updated successfully!");
      navigate("/home");
    }).catch(err => {
      console.error("Error: ", err);
      alert("Failed to update platforms. Please try again.");
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const togglePlatform = (key) => {
    setActivePlatforms(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const removePlatform = (key, setValue) => {
    setActivePlatforms(prev => ({
      ...prev,
      [key]: false
    }));
    setValue("");
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

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your platforms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Your Platforms</h1>
              <p className="text-gray-600 text-sm">
                Add, update, or remove your connected coding profiles
              </p>
            </div>
          </div>

          {/* Platforms Form */}
          <div className="p-6">
            <div className="space-y-6">
              {platforms.map((platform) => (
                <div key={platform.key} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center mr-3 shadow-sm`}>
                        {platform.icon}
                      </div>
                      <label className="text-sm font-semibold text-gray-700">
                        {platform.name}
                      </label>
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        activePlatforms[platform.key] 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {activePlatforms[platform.key] ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>

                    {/* Toggle Button */}
                    {activePlatforms[platform.key] ? (
                      <button
                        onClick={() => removePlatform(platform.key, platform.setValue)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => togglePlatform(platform.key)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    )}
                  </div>

                  {/* Input Field - Only show if active */}
                  {activePlatforms[platform.key] && (
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row w-full">
                        <div className="flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border-2 border-gray-200 sm:border-r-0 sm:rounded-l-xl rounded-t-xl sm:rounded-t-none text-gray-600 text-sm font-mono flex-shrink-0">
                          {platform.baseUrl}
                        </div>
                        <input
                          type="text"
                          value={platform.value}
                          onChange={(e) => platform.setValue(e.target.value)}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 sm:border-l-0 sm:rounded-r-xl rounded-b-xl sm:rounded-b-none focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 font-mono"
                          placeholder={platform.placeholder}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-amber-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <h2 className="text-sm font-semibold text-amber-900 mb-1">Important</h2>
                  <p className="text-sm text-amber-700">
                    Removing a platform will delete all associated data from your dashboard. 
                    Make sure to save your changes before leaving this page.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/home")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformEdit;