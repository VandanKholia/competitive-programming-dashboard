import axios from 'axios';
import React, { useState } from 'react';
import { Trophy, Target, Star, TrendingUp, Medal, Award, Crown, Zap } from 'lucide-react';
import { useEffect } from 'react';
import ContestCard from './homeComponents/ContestCard.jsx';
import ProblemCard from './homeComponents/ProblemCard.jsx';
import { fetchCodeforcesData, fetchCodechefData, fetchLeetCodeData } from './apiFetcher.jsx'

const PlatformCodingDashboard = () => {
    const [user, setUser] = useState(null);
    const [platformsData, setPlatformsData] = useState({});

    const [totalQuestionsSolved, setTotalQuestionsSolved] = useState(0);
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [loading, setLoading] = useState(true);

    const [codeforcesData, setCodeforcesData] = useState(null);
    const[codeforcesRating,setCodeforcesRating] = useState(null);
    const[codeforcesTContests,setCodeforcesTContests] = useState(null);
    const[codeforcesSolved,setCodeforcesSolved] = useState(null);

    const[codechefData,setCodechefData] = useState(null);
    const[codechefRating,setCodechefRating] = useState(null);
    const[codechefSolved,setcodechefSolved] = useState(null);
    const[codechefTcontests,setCodechefTcontests] = useState(null);

    const[leetcodeData, setLeetcodeData] = useState(null);
    const[leetcodeSolved, setLeetcodeSolved] = useState(null);
    const[leetcodeRating, setLeetcodeRating] = useState(null);

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
          setCodechefData(data.codechefData);
          setCodechefRating(data.rating);
          setcodechefSolved(data.totalQuestions);
          setCodechefTcontests(data.totalContests);
        }
      } else if (platform.name === "leetcode") {
        const data = await fetchLeetCodeData(platform.userName);
        if (data) {
          newPlatformsData.leetcode = data;
          setLeetcodeData(data.leetcodeData);
          // console.log(res.data);
          setLeetcodeSolved(data.totalSolved);
          setLeetcodeRating(data.rating);
        }
      }
    }
    console.log("New platforms data:", newPlatformsData);
  } finally {
    setLoading(false);
  }
};
};

export default PlatformCodingDashboard;


// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";


// function Home() {
//     const [codeforcesData, setCodeforces] = useState(null);
//     const[codeforcesRating,setCodeforcesRating] = useState(null);
//     const[codechefData,setCodechefData] = useState(null);
//     const[codechefRating,setCodechefRating] = useState(null);
//     const[codechefQuestions,setcodechefQuestions] = useState(null);
//     const[cfContests,setCfContests] = useState(null);

//     useEffect(() => {
//         getData();
//     }, []);

//     const getData = () => {
//         axios.get('http://localhost:3000/api/codeforces/vandanKholia')
//             .then(res => {
//                 setCodeforces(res.data)
//                 setCodeforcesRating(res.data.result[res.data.result.length-1].newRating)
//                 setCfContests(res.data.result.length)
//                 // console.log(res.data.result[res.data.result.length-1]);
//             }).catch((err) => {
//                 console.error("Error fetching data:", err);
//             });
        
//         axios.get('http://localhost:3000/api/codechef/handle/vandan_kholia')
//         .then(res=>{
//             setCodechefData(res.data);
//             setCodechefRating(res.data.currentRating)
//             setcodechefQuestions(res.data.totalQuestions)
//             console.log(res.data)
//         })
//     }

//     return (
//         <>
//         {codeforcesData?(
//             <div>
//              <p>codeforces rating-{codeforcesRating}</p>
//              <p>codeforces contests-{cf}</p>
//              <p>codechef rating-{codechefRating}</p>
//              <p>codechef questions-{codechefQuestions}</p>
//             </div>
//         ):(

//             <p>Loading...</p>
//         )}
//         </>
        
//     )
// }
// export default Home;