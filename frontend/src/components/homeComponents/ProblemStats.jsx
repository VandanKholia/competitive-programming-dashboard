import React from 'react';
import { Code, CheckCircle, Target } from 'lucide-react';
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";

const ProblemStats = ({ problemData={} }) => {

  const leetcodeSolved = problemData?.leetcode?.totalSolved || 0;
  const codeforcesSolved = problemData?.codeforces?.totalSolved || 0;
  const codechefSolved = problemData?.codechef?.totalSolved || 0;
  const totalProblems = leetcodeSolved + codeforcesSolved + codechefSolved;

  const platforms = [
    problemData.leetcode && {
      name: 'LeetCode',
      count: leetcodeSolved,
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-200',
      borderColor: 'border-yellow-600',
      progressColor: 'bg-yellow-500',
      iconColor: 'bg-yellow-100',
      icon: SiLeetcode
    },
    problemData.codeforces && {
      name: 'Codeforces',
      count: codeforcesSolved,
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-200',
      borderColor: 'border-blue-200',
      progressColor: 'bg-blue-500',
      iconColor: 'bg-blue-100',
      icon: SiCodeforces
    },
    problemData.codechef && {
      name: 'CodeChef',
      count: codechefSolved,
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-200',
      borderColor: 'border-orange-200',
      progressColor: 'bg-orange-500',
      iconColor: 'bg-orange-100',
      icon: SiCodechef
    }
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Total Problems Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-indigo-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-tr-full opacity-50"></div>
        
        <div className="relative flex items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Total Problems Solved</h3>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-indigo-600">
                {totalProblems}
              </span>

            </div>
          </div>
          
          <div className="w-28 h-28 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <Target className="w-14 h-14 text-white" />
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
              className={`${platform.bgColor} rounded-xl p-6 shadow-md border ${platform.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 ${platform.iconColor} rounded-xl`}>
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
                  className={`h-2 rounded-full ${platform.progressColor} transition-all duration-500`}
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