import axios from 'axios';
import React, { useState } from 'react';
import { Trophy, Target, Star, TrendingUp, Medal, Award, Crown, Zap } from 'lucide-react';
import { useEffect } from 'react';
import ContestCard from './homeComponents/ContestCard.jsx';
import ProblemCard from './homeComponents/ProblemCard.jsx';
import { fetchCodeforcesData, fetchCodechefData, fetchLeetCodeData } from './apiFetcher.jsx'

const PlatformCodingDashboard = () => {
  const [user, setUser] = useState(null);
    const [totalQuestionsSolved, setTotalQuestionsSolved] = useState(0);
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [loading, setLoading] = useState(true);

    const [codeforcesData, setCodeforcesData] = useState(null);
    const[codeforcesRating,setCodeforcesRating] = useState(null);
    const[codeforcesTContests,setCodeforcesTContests] = useState(null);
    const[codeforcesQuestions,setCodeforcesQuestions] = useState(null);

    const[codechefData,setCodechefData] = useState(null);
    const[codechefRating,setCodechefRating] = useState(null);
    const[codechefQuestions,setcodechefQuestions] = useState(null);
    const[codechefTcontests,setCodechefTcontests] = useState(null);

    const[leetcodeData, setLeetcodeData] = useState(null);
    const[leetcodeQuestion, setLeetcodeQuestions] = useState(null);
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


    // useEffect(()=>{
    //   console.log(storedPlatforms)
    // },[storedPlatforms]);
//   const getData = async () => {
//   try {
//     setLoading(true);
//     await Promise.all(storedPlatforms.map(async (platform) => {
//       if (platform.name === "codeforces") {
//         const res = await axios.get(`http://localhost:3000/api/codeforces/${platform.userName}`);
//         setCodeforces(res.data);
//         setCodeforcesRating(res.data.result[res.data.result.length-1].newRating);
//         setCodeforcesTContests(res.data.result.length);
//       }
//       if (platform.name === "codechef") {
//         const res = await axios.get(`http://localhost:3000/api/codechef/handle/${platform.userName}`);
//         setCodechefData(res.data);
//         setCodechefRating(res.data.currentRating);
//         setcodechefQuestions(res.data.totalQuestions);
//         setCodechefTcontests(res.data.ratingData.length);
//       }
//     }));
//   } catch (err) {
//     console.error("fetch error:", err);
//   } finally {
//     setLoading(false);
//   }
// };



const getData = async (platforms) => {
  setLoading(true);
  try {
    for (const platform of platforms) {
      if (platform.name === "codeforces") {
        const data = await fetchCodeforcesData(platform.userName);
        if (data) {
          setCodeforcesData(data.codeforcesData);
          setCodeforcesRating(data.rating);
          setCodeforcesTContests(data.totalContests);
          setCodeforcesData(data.totalSolved)
        }
      } else if (platform.name === "codechef") {
        const data = await fetchCodechefData(platform.userName);
        if (data) {
          setCodechefData(data.codechefData);
          setCodechefRating(data.rating);
          setcodechefQuestions(data.totalQuestions);
          setCodechefTcontests(data.totalContests);
        }
      } else if (platform.name === "leetcode") {
        const data = await fetchLeetCodeData(platform.userName);
        if (data) {
          setLeetcodeQuestions(data.totalSolved);
        }
      }
    }
  } finally {
    setLoading(false);
  }
};


// const filteredProblems = platformProblems.filter(p =>
//   platforms?.some(sp => sp.name.toLowerCase() === p.name.toLowerCase())
  
// );
// console.log(filteredProblems);

//   const filteredContests = contestRankings.filter(c =>
//   platforms?.some(sp => sp.name.toLowerCase() === c.platform.toLowerCase())

// );


//   {loading ? (
//   <div className="flex justify-center items-center h-64">
//     <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// ) : (
 
// )}

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-200 via-blue-50 to-purple-50">
  //       {loading? <div className="flex justify-center items-center">
  //       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  //       </div>:<>
  //             <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
  //       <div className="max-w-7xl mx-auto px-6 py-8">
  //         <div className="text-center">
  //           <h1 className="text-4xl font-bold text-gray-900 mb-2">Rank Up</h1>
  //           <p className="text-xl text-gray-600">Track your progress across all platforms</p>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="max-w-7xl mx-auto px-6 py-8">
  //       {/* Problems Solved Section */}
  //       <section className="mb-12">
  //         <div className="text-center mb-8">
  //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
  //             <Target className="w-10 h-10 text-white" />
  //           </div>
  //           <h2 className="text-3xl font-bold text-gray-900 mb-2">Problems Solved</h2>
  //           <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
  //             {totalProblems}
  //           </div>
  //           <p className="text-gray-600">Total problems solved across all platforms</p>
  //         </div>

  //         {/* Platform Cards */}
  //         {filteredProblems.length<3?
  //         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-10">
  //           {filteredProblems.map((platform, index) => (
  //             <ProblemCard key={index} platform={platform} />
  //           ))}
  //         </div>:<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {filteredProblems.map((platform, index) => (
  //             <ProblemCard key={index} platform={platform} />
  //           ))}
  //         </div>}
          

  //         {/* Summary Stats */}
  //         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
  //           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
  //             <div className="text-2xl font-bold text-green-600">
  //               {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i === 0).reduce((a, b) => a + b, 0), 0)}
  //             </div>
  //             <div className="text-sm text-gray-600">Easy Problems</div>
  //           </div>
  //           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
  //             <div className="text-2xl font-bold text-yellow-600">
  //               {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i === 1).reduce((a, b) => a + b, 0), 0)}
  //             </div>
  //             <div className="text-sm text-gray-600">Medium Problems</div>
  //           </div>
  //           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
  //             <div className="text-2xl font-bold text-red-600">
  //               {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i >= 2).reduce((a, b) => a + b, 0), 0)}
  //             </div>
  //             <div className="text-sm text-gray-600">Hard Problems</div>
  //           </div>
  //           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
  //             <div className="text-2xl font-bold text-purple-600">{filteredProblems.length}</div>
  //             <div className="text-sm text-gray-600">Platforms</div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Contest Rankings Section */}
  //       <section>
  //         <div className="text-center mb-8">
  //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
  //             <Trophy className="w-10 h-10 text-white" />
  //           </div>
  //           <h2 className="text-3xl font-bold text-gray-900 mb-2">Contest Rankings</h2>
  //           <p className="text-gray-600">Your competitive programming achievements across platforms</p>
  //         </div>

  //         {/* Contest Cards */}
  //         {/* <div className="grid grid-cols-3 gap-4">
  //           {contestRankings.map((contest, index) => (
  //             <ContestCard key={index} contest={contest} />
  //           ))}
  //         </div> */}
  //       {filteredContests.length < 3 ? (
 
  //           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5">
  //               {filteredContests.map((contest, index) => (
  //               <ContestCard key={index} contest={contest} />
  //               ))}
  //           </div>
  //           ) : (
            
  //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  //               {filteredContests.map((contest, index) => (
  //               <ContestCard key={index} contest={contest} />
  //               ))}
  //           </div>
  //           )}



  //         {/* Contest Summary */}
  //         <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
  //           <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Contest Summary</h3>
  //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  //             <div className="text-center">
  //               <div className="text-3xl font-bold text-blue-600">
  //                 {filteredContests.reduce((sum, c) => sum + c.contestsParticipated, 0)}
  //               </div>
  //               <div className="text-sm text-gray-600">Total Contests</div>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-3xl font-bold text-green-600">
  //                 {Math.round(filteredContests.reduce((sum, c) => sum + c.currentRating, 0) / filteredContests.length)}
  //               </div>
  //               <div className="text-sm text-gray-600">Avg Rating</div>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-3xl font-bold text-purple-600">
  //                 #{Math.min(...filteredContests.map(c => c.bestRank))}
  //               </div>
  //               <div className="text-sm text-gray-600">Best Rank</div>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-3xl font-bold text-orange-600">{filteredContests.length}</div>
  //               <div className="text-sm text-gray-600">Platforms</div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </div>
  //       </>
  //       }
       
  //     {/* Header */}

  //   </div>
  // );
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