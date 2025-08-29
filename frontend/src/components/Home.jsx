import React, { useState } from 'react';
import { Trophy, Target, Star, TrendingUp, Medal, Award, Crown, Zap } from 'lucide-react';
import { useEffect } from 'react';
import ContestCard from './homeComponents/ContestCard';
import ProblemCard from './homeComponents/ProblemCard';
import axios from 'axios';

const PlatformCodingDashboard = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [loading, setLoading] = useState(true);
    const [codeforcesData, setCodeforces] = useState(null);
    const[codeforcesRating,setCodeforcesRating] = useState(null);
    const[codeforcesTContests,setCodeforcesTContests] = useState(null);

    const[codechefData,setCodechefData] = useState(null);
    const[codechefRating,setCodechefRating] = useState(null);
    const[codechefQuestions,setcodechefQuestions] = useState(null);
    const[codechefTcontests,setCodechefTcontests] = useState(null);
    const storedPlatforms = JSON.parse(localStorage.getItem('user-platforms'));
    const userName = storedPlatforms;

    useEffect(() => {
      setLoading(true);
        getData();
    }, []);

    // useEffect(()=>{
    //   console.log(storedPlatforms)
    // },[storedPlatforms]);

    const getData = async() => {
      setLoading(true);
        for(const platform of storedPlatforms) {
          if(platform.name == 'codeforces') {
            try {

              const res=await axios.get(`http://localhost:3000/api/codeforces/${platform.userName}`)
                    setCodeforces(res.data)
                    setCodeforcesRating(res.data.result[res.data.result.length-1].newRating)
                    setCodeforcesTContests(res.data.result.length)
                    // console.log(res.data.result[res.data.result.length-1]);
            }catch(err) {
              console.log('codeforces error:',err);
            }finally{
              setLoading(false);
            }
          }
          if (platform.name === 'codechef') {
            try {
              const res = await axios.get(`http://localhost:3000/api/codechef/handle/${platform.userName}`);
              setCodechefData(res.data);
              setCodechefRating(res.data.currentRating);
              setcodechefQuestions(res.data.totalQuestions);
              setCodechefTcontests(res.data.ratingData.length);
            } catch (err) {
              console.error('CodeChef error:', err);
            }finally{
              setLoading(false);
            }
          }
        }
    }
  const totalProblems = 342;

  const platformProblems = [
    {
      name: 'LeetCode',
      solved: 156,
      total: 2847,
      difficulty: {
        easy: 78,
        medium: 65,
        hard: 13
      },
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      icon: '💻'
    },
    {
      name: 'CodeChef',
      solved: codechefQuestions,
      total: 4200,
      difficulty: {
        beginner: 45,
        easy: 32,
        medium: 18,
        hard: 2
      },
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: '👨‍🍳'
    },
    // {
    //   name: 'Codeforces',
    //   solved: 89,
    //   total: 8500,
    //   difficulty: {
    //     div2A: 35,
    //     div2B: 28,
    //     div2C: 20,
    //     div2D: 6
    //   },
    //   color: 'from-blue-500 to-cyan-500',
    //   bgColor: 'bg-blue-50',
    //   textColor: 'text-blue-600',
    //   icon: '⚡'
    // }
  ];

const filteredProblems = platformProblems.filter(p =>
  storedPlatforms?.some(sp => sp.name.toLowerCase() === p.name.toLowerCase())
);


  // Contest Rankings Data
  const contestRankings = [
    {
      platform: 'LeetCode',
      currentRating: 1847,
      maxRating: 1923,
      rank: 'Knight',
      globalRank: 12547,
      contestsParticipated: 28,
      bestRank: 342,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      icon: '🗡️',
      badge: 'Knight'
    },
    {
      platform: 'CodeChef',
      currentRating: codechefRating,
      maxRating: codechefRating,
      rank: '3★',
      globalRank: 8934,
      contestsParticipated: codechefTcontests,
      bestRank: 156,
      color: 'from-orange-800 to-orange-900',
      bgColor: 'bg-yellow-500',
      textColor: 'text-purple-600',
      icon: '⭐',
      badge: '3 Star'
    },
    // {
    //   platform: 'Codeforces',
    //   currentRating: codeforcesRating,
    //   maxRating: codeforcesRating,
    //   rank: 'Pupil',
    //   globalRank: 15672,
    //   contestsParticipated: codeforcesTContests,
    //   bestRank: 789,
    //   color: 'from-blue-500 to-cyan-500',
    //   bgColor: 'bg-blue-100',
    //   textColor: 'text-blue-600',
    //   icon: '🐶',
    //   badge: 'Pupil'
    // },

  ];

  const filteredContests = contestRankings.filter(c =>
  storedPlatforms?.some(sp => sp.name.toLowerCase() === c.platform.toLowerCase())
);


//   {loading ? (
//   <div className="flex justify-center items-center h-64">
//     <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// ) : (
 
// )}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-blue-50 to-purple-50">
        {loading? <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>:<>
              <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Rank Up</h1>
            <p className="text-xl text-gray-600">Track your progress across all platforms</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Problems Solved Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Problems Solved</h2>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {totalProblems}
            </div>
            <p className="text-gray-600">Total problems solved across all platforms</p>
          </div>

          {/* Platform Cards */}
          {filteredProblems.length<3?
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-10">
            {filteredProblems.map((platform, index) => (
              <ProblemCard key={index} platform={platform} />
            ))}
          </div>:<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((platform, index) => (
              <ProblemCard key={index} platform={platform} />
            ))}
          </div>}
          

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-green-600">
                {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i === 0).reduce((a, b) => a + b, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Easy Problems</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i === 1).reduce((a, b) => a + b, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Medium Problems</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-red-600">
                {filteredProblems.reduce((sum, p) => sum + Object.values(p.difficulty).filter((_, i) => i >= 2).reduce((a, b) => a + b, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Hard Problems</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-purple-600">{filteredProblems.length}</div>
              <div className="text-sm text-gray-600">Platforms</div>
            </div>
          </div>
        </section>

        {/* Contest Rankings Section */}
        <section>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Contest Rankings</h2>
            <p className="text-gray-600">Your competitive programming achievements across platforms</p>
          </div>

          {/* Contest Cards */}
          {/* <div className="grid grid-cols-3 gap-4">
            {contestRankings.map((contest, index) => (
              <ContestCard key={index} contest={contest} />
            ))}
          </div> */}
        {filteredContests.length < 3 ? (
 
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5">
                {filteredContests.map((contest, index) => (
                <ContestCard key={index} contest={contest} />
                ))}
            </div>
            ) : (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredContests.map((contest, index) => (
                <ContestCard key={index} contest={contest} />
                ))}
            </div>
            )}



          {/* Contest Summary */}
          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Contest Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {filteredContests.reduce((sum, c) => sum + c.contestsParticipated, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Contests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(filteredContests.reduce((sum, c) => sum + c.currentRating, 0) / filteredContests.length)}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  #{Math.min(...filteredContests.map(c => c.bestRank))}
                </div>
                <div className="text-sm text-gray-600">Best Rank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{filteredContests.length}</div>
                <div className="text-sm text-gray-600">Platforms</div>
              </div>
            </div>
          </div>
        </section>
      </div>
        </>
        }
       
      {/* Header */}

    </div>
  );
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