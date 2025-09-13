import React, { useEffect } from 'react';
import { Code, CheckCircle } from 'lucide-react';
import Loader from '../Loader.jsx';

const ProblemStats = ({ problemData={} }) => {

  const leetcodeSolved = problemData?.leetcode?.totalSolved || 0;
  const codeforcesSolved = problemData?.codeforces?.totalSolved || 0;
  const codechefSolved = problemData?.codechef?.totalSolved || 0;
  const totalProblems = leetcodeSolved + codeforcesSolved + codechefSolved;

  // useEffect(()=> {
  //   if(problemData && Object.keys(problemData).length>0) {

  //     console.log("problem stats",problemData);
  //   }

  // },[problemData]);

  // if (!problemData || Object.keys(problemData).length === 0) {
  // return <><Loader/></>
  // }

  const platforms = [
    {
      name: 'LeetCode',
      count: leetcodeSolved,
      color: 'from-yellow-400 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      bgGradient: 'from-yellow-100 to-yellow-50',
      borderColor: 'border-orange-200',
      icon: Code
    },
    {
      name: 'Codeforces',
      count: codeforcesSolved,
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      bgGradient: 'from-blue-100 to-blue-100',
      borderColor: 'border-blue-200',
      icon: Code
    },
    {
      name: 'CodeChef',
      count: codechefSolved,
      color: 'from-amber-400 to-amber-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      bgGradient: 'from-amber-50 via-yellow-25 to-orange-50',
      borderColor: 'border-amber-200',
      icon: Code
    }
  ];

  return (
    <div className="space-y-6">
      {/* Total Problems Card */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-purple-700 mb-2">Total Problems Solved</h3>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {totalProblems}
              </span>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center shadow-inner">
            <Code className="w-12 h-12 text-purple-700" />
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const percentage = ((platform.count / totalProblems) * 100).toFixed(1);
          
          return (
            <div
              key={platform.name}
              className={`bg-gradient-to-br ${platform.bgGradient} rounded-xl p-6 shadow-md border ${platform.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${platform.bgColor} rounded-xl shadow-sm`}>
                  <Icon className={`w-6 h-6 ${platform.textColor}`} />
                </div>
                <span className={`text-sm font-medium ${platform.textColor} bg-white/70 px-2 py-1 rounded-full`}>{percentage}%</span>
              </div>
              
              <h4 className={`text-lg font-semibold ${platform.textColor} mb-2`}>{platform.name}</h4>
              <div className="flex items-end gap-2 mb-3">
                <span className={`text-3xl font-bold ${platform.textColor}`}>{platform.count}</span>
                <span className={`${platform.textColor} opacity-70 text-sm mb-1`}>problems</span>
              </div>
              
              <div className="w-full bg-white/50 rounded-full h-2 shadow-inner">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemStats;




  // const ProblemCard = ({ platform }) => (
  //   <div className={`${platform.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
  //     <div className="flex items-center justify-between mb-4">
  //       <div className="flex items-center space-x-3">
  //         <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center text-white text-xl`}>
  //           {platform.icon}
  //         </div>
  //         <div>
  //           <h3 className="text-lg font-bold text-gray-900">{platform.name}</h3>
  //           <p className="text-sm text-gray-600">{platform.solved} / {platform.total} solved</p>
  //         </div>
  //       </div>
  //       <div className="text-right">
  //         <div className="text-2xl font-bold text-gray-900">{platform.solved}</div>
  //         <div className="text-xs text-gray-500">problems</div>
  //       </div>
  //     </div>
      
  //     {/* Progress Bar */}
  //     <div className="mb-4">
  //       <div className="w-full bg-gray-200 rounded-full h-2">
  //         <div 
  //           className={`h-2 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-1000`}
  //           style={{ width: `${(platform.solved / platform.total) * 100}%` }}
  //         ></div>
  //       </div>
  //       <div className="text-xs text-gray-500 mt-1">
  //         {((platform.solved / platform.total) * 100).toFixed(1)}% completed
  //       </div>
  //     </div>

  //     {/* Difficulty Breakdown */}
  //     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
  //       {Object.entries(platform.difficulty).map(([level, count]) => (
  //         <div key={level} className="text-center">
  //           <div className={`text-sm font-bold ${platform.textColor}`}>{count}</div>
  //           <div className="text-xs text-gray-500 capitalize">{level}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  // export default ProblemCard;