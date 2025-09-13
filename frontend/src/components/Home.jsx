import axios from 'axios';
import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { useEffect } from 'react';
import ContestCard from './homeComponents/ContestStats.jsx';
import ProblemStats from './homeComponents/ProblemStats.jsx';
import ContestStats from './homeComponents/ContestStats.jsx';
import { fetchCodeforcesData, fetchCodechefData, fetchLeetCodeData } from './apiFetcher.jsx'
import Loader from './Loader.jsx';
import { Trophy } from 'lucide-react';


const PlatformCodingDashboard = () => {
    const [user, setUser] = useState(null);
    const [platformsData, setPlatformsData] = useState({});
    const [loading, setLoading] = useState(true);

    // const [totalQuestionsSolved, setTotalQuestionsSolved] = useState(0);
    // const [selectedPlatform, setSelectedPlatform] = useState('all');

    // const [codeforcesData, setCodeforcesData] = useState(null);
    // const[codeforcesRating,setCodeforcesRating] = useState(null);
    // const[codeforcesTContests,setCodeforcesTContests] = useState(null);
    // const[codeforcesSolved,setCodeforcesSolved] = useState(null);

    // const[codechefData,setCodechefData] = useState(null);
    // const[codechefRating,setCodechefRating] = useState(null);
    // const[codechefSolved,setcodechefSolved] = useState(null);
    // const[codechefTcontests,setCodechefTcontests] = useState(null);

    // const[leetcodeData, setLeetcodeData] = useState(null);
    // const[leetcodeSolved, setLeetcodeSolved] = useState(null);
    // const[leetcodeRating, setLeetcodeRating] = useState(null);

    const [platforms, setPlatforms] = useState([]);

// useEffect(() => {
//   const fetchPlatforms = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/platforms", { withCredentials: true });
//       setPlatforms(res.data.platforms || []);
//     } catch (err) {
//       console.error("Error fetching platforms:", err);
//     }
//   };

//   fetchPlatforms();
// }, []);

    // useEffect(() => {
    //   setLoading(true);
    //   console.log(platforms);
    //     getData();
    // }, []);

    useEffect(()=> {
      const fetchUserData = async () => {
        try {
        const res = await axios.get("http://localhost:3000/api/auth/user", { withCredentials: true });
        setUser(res.data);
        setPlatforms(res.data.platforms || []);

        await getData(res.data.platforms);
        }catch(err) {
          console.log("error fetching user data:", err);
          setUser(null);

        }finally{
          setLoading(false);
        }
      }; 
      fetchUserData();
    },[])

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
              // setCodechefData(data.codechefData);
              // setCodechefRating(data.rating);
              // setcodechefSolved(data.totalQuestions);
              // setCodechefTcontests(data.totalContests);
            }
          } else if (platform.name === "leetcode") {
            const data = await fetchLeetCodeData(platform.userName);
            if (data) {
              newPlatformsData.leetcode = data;
              // setLeetcodeData(data.leetcodeData);
              // // console.log(res.data);
              // setLeetcodeSolved(data.totalSolved);
              // setLeetcodeRating(data.rating);
            }
          }
        }
        setPlatformsData(newPlatformsData);
      } finally {
        setLoading(false);
      }
    };

    return (
      <> 
        {
          loading?(
            <div className='flex justify-center items-center h-screen'>
              <Loader/>
            </div>
          
        ):(
          <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Programming Dashboard</h1>
            <p className="text-slate-600 text-lg">Track your competitive programming journey across platforms</p>
          </div>

          {/* Problem Solving Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Problem Solving Statistics</h2>
            </div>
            <ProblemStats problemData={platformsData}/>
          </div>

          {/* Contest Analytics Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Contest Analytics</h2>
            </div>
            <ContestStats contestData={platformsData}/>
          </div>
        </div>
          )
        } 
          
      </>
    )
};
    
export default PlatformCodingDashboard;