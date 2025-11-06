
import axios from 'axios';
import React, { useState } from 'react';
import { Code2,ChartColumnIncreasing } from 'lucide-react';
import { useEffect } from 'react';
import ContestCard from './homeComponents/ContestStats.jsx';
import ProblemStats from './homeComponents/ProblemStats.jsx';
import ContestStats from './homeComponents/ContestStats.jsx';
import { fetchCodeforcesData, fetchCodechefData, fetchLeetCodeData } from './apiFetcher.jsx'
import Loader from './Loader.jsx';
import { Trophy } from 'lucide-react';
import Navbar from './homeComponents/Navbar.jsx';
import { useNavigate } from 'react-router-dom';



const PlatformCodingDashboard = () => {
  const [user, setUser] = useState(null);
  const [platformsData, setPlatformsData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/user", { withCredentials: true });
        setUser(res.data);
        setPlatforms(res.data.platforms || []);

        await getData(res.data.platforms);
      } catch (err) {
        console.error("error fetching user data:", err);
        setUser(null);

      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [])

  const getData = async (platforms) => {
    setLoading(true);
    const newPlatformsData = {};
    try {
      for (const platform of platforms) {
        if (platform.name === "codeforces") {
          const data = await fetchCodeforcesData(platform.userName);
          if (data) {
            newPlatformsData.codeforces = data;
          }
        } else if (platform.name === "codechef") {
          const data = await fetchCodechefData(platform.userName);
          if (data) {
            newPlatformsData.codechef = data;
          }
        } else if (platform.name === "leetcode") {
          const data = await fetchLeetCodeData(platform.userName);
          if (data) {
            newPlatformsData.leetcode = data;
          }
        }
      }
      setPlatformsData(newPlatformsData);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      navigate('/');
      setLoading(false)
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleEditPlatforms = () => {
    navigate('/platforms');
  }
  return (
    <>
    <Navbar onLogout={handleLogout} onEditPlatforms={handleEditPlatforms}/>
      {
        loading ? (
          <div className='flex justify-center items-center h-screen'>
            <Loader />
          </div>

        ) : (
          
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            

            {/* Problem Solving Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <ChartColumnIncreasing className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Problem Solving Statistics</h2>
              </div>
              <ProblemStats problemData={platformsData} />
            </div>

            {/* Contest Analytics Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Contest Analytics</h2>
              </div>
              <ContestStats contestData={platformsData} />
            </div>
          </div>
        )
      }

    </>
  )
};

export default PlatformCodingDashboard;
