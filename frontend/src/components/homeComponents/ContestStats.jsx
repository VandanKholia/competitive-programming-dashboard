import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Target, Star, TrendingUp } from 'lucide-react';

const ContestStats = () => {

  const contestData = {
    leetcode: {
      rating: 1847,
      contests: 42,
      level: 'Knight',
      rank: 'Top 15%'
    },
    codeforces: {
      rating: 1456,
      contests: 67,
      level: 'Specialist',
      rank: 'Cyan'
    },
    codechef: {
      rating: 1923,
      contests: 28,
      level: '4 Star',
      rank: 'Blue'
    }
  };

  const ratingHistory = [
    { month: 'Jan', leetcode: 1650, codeforces: 1280, codechef: 1750 },
    { month: 'Feb', leetcode: 1720, codeforces: 1340, codechef: 1820 },
    { month: 'Mar', leetcode: 1780, codeforces: 1420, codechef: 1880 },
    { month: 'Apr', leetcode: 1820, codeforces: 1456, codechef: 1923 },
    { month: 'May', leetcode: 1847, codeforces: 1456, codechef: 1923 }
  ];

  const contestParticipation = [
    { name: 'LeetCode', value: contestData.leetcode.contests, color: '#F97316' },
    { name: 'Codeforces', value: contestData.codeforces.contests, color: '#3B82F6' },
    { name: 'CodeChef', value: contestData.codechef.contests, color: '#D97706' }
  ];

  const platforms = [
    {
      name: 'LeetCode',
      rating: contestData.leetcode.rating,
      contests: contestData.leetcode.contests,
      level: contestData.leetcode.level,
      rank: contestData.leetcode.rank,
      bgGradient: 'from-orange-50 via-red-25 to-pink-50',
      bgGradient: 'from-orange-50 via-red-25 to-pink-50',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      icon: Trophy
    },
    {
      name: 'Codeforces',
      rating: contestData.codeforces.rating,
      contests: contestData.codeforces.contests,
      level: contestData.codeforces.level,
      rank: contestData.codeforces.rank,
      color: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 via-cyan-25 to-teal-50',
      bgColor: 'bg-blue-100',
      bgGradient: 'from-blue-50 via-cyan-25 to-teal-50',
      textColor: 'text-blue-700',
      icon: Target
    },
    {
      name: 'CodeChef',
      rating: contestData.codechef.rating,
      contests: contestData.codechef.contests,
      level: contestData.codechef.level,
      rank: contestData.codechef.rank,
      bgGradient: 'from-amber-50 via-yellow-25 to-lime-50',
      bgGradient: 'from-amber-50 via-yellow-25 to-lime-50',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-700',
      icon: Star
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contest Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          
          return (
            <div
              key={platform.name}
              className={`bg-gradient-to-br ${platform.bgGradient} rounded-xl p-6 shadow-md border-2 ${platform.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${platform.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${platform.textColor}`} />
                </div>
                <span className={`px-3 py-1 ${platform.bgColor} rounded-full text-sm font-medium ${platform.textColor} shadow-sm`}>
                  {platform.level}
                </span>
              </div>
              
              <h4 className={`text-lg font-semibold ${platform.textColor} mb-3`}>{platform.name}</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`${platform.textColor} opacity-80`}>Rating</span>
                  <span className={`text-2xl font-bold ${platform.textColor}`}>{platform.rating}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`${platform.textColor} opacity-80`}>Contests</span>
                  <span className={`text-lg font-semibold ${platform.textColor}`}>{platform.contests}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`${platform.textColor} opacity-80`}>Rank</span>
                  <span className={`text-sm font-medium ${platform.textColor}`}>{platform.rank}</span>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-white/60 rounded-full h-2 shadow-inner">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-700`}
                  style={{ width: `${Math.min((platform.rating / 2000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Progress Chart */}
        <div className="bg-gradient-to-br from-violet-50 via-purple-25 to-fuchsia-50 rounded-xl p-6 shadow-lg border border-violet-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-700">Rating Progress</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leetcode" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                  name="LeetCode"
                />
                <Line 
                  type="monotone" 
                  dataKey="codeforces" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Codeforces"
                />
                <Line 
                  type="monotone" 
                  dataKey="codechef" 
                  stroke="#D97706" 
                  strokeWidth={3}
                  dot={{ fill: '#D97706', strokeWidth: 2, r: 4 }}
                  name="CodeChef"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contest Participation Chart */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-25 to-cyan-50 rounded-xl p-6 shadow-lg border border-emerald-200">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-emerald-700">Contest Participation</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contestParticipation}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contestParticipation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            {contestParticipation.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-emerald-700 font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Contest Performance */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-25 to-orange-50 rounded-xl p-6 shadow-lg border border-rose-200 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-5 h-5 text-rose-600" />
          <h3 className="text-xl font-semibold text-rose-700">Monthly Contest Performance</h3>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Bar dataKey="leetcode" fill="#F97316" radius={[4, 4, 0, 0]} name="LeetCode" />
              <Bar dataKey="codeforces" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Codeforces" />
              <Bar dataKey="codechef" fill="#F59E0B" radius={[4, 4, 0, 0]} name="CodeChef" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ContestStats;

//   import React from "react";
//   import { Trophy, Target, Star, TrendingUp, Medal, Award, Crown, Zap } from 'lucide-react'; 
   
//   const ContestStats = ({ contest }) => (
//     <div className={`${contest.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-3">
//           <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${contest.color} flex items-center justify-center text-white text-xl`}>
//             {contest.icon}
//           </div>
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">{contest.platform}</h3>
//             <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${contest.bgColor} ${contest.textColor} border`}>
//               {contest.badge}
//             </div>
//           </div>
//         </div>
//         <div className="text-right">
//           <div className="flex items-center space-x-1">
//             <Trophy className={`w-4 h-4 ${contest.textColor}`} />
//             <span className="text-sm font-medium text-gray-600">#{contest.globalRank}</span>
//           </div>
//         </div>
//       </div>

//       {/* Rating Section */}
//       <div className="grid grid-cols-2 gap-2 mb-4">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-gray-900">{contest.currentRating}</div>
//           <div className="text-xs text-gray-500">Current Rating</div>
//         </div>
//         <div className="text-center">
//           <div className="text-2xl font-bold text-gray-600">{contest.maxRating}</div>
//           <div className="text-xs text-gray-500">Max Rating</div>
//           {contest.maxRating > contest.currentRating && (
//             <div className="text-xs text-green-600 flex items-center justify-center mt-1">
//               <TrendingUp className="w-3 h-3 mr-1" />
//               Peak
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Contest Stats */}
//       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//         <div className="text-center">
//           <div className={`text-lg font-bold ${contest.textColor}`}>{contest.contestsParticipated}</div>
//           <div className="text-xs text-gray-500">Contests</div>
//         </div>
//         <div className="text-center">
//           <div className={`text-lg font-bold ${contest.textColor}`}>#{contest.bestRank}</div>
//           <div className="text-xs text-gray-500">Best Rank</div>
//         </div>
//       </div>
//     </div>
//   );
// export default ContestCard;