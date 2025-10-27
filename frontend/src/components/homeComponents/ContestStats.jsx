import React from 'react';
import { useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Trophy, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";

const ContestStats = ({ contestData = {} }) => {

  const ratingHistory = useMemo(() => {

    const formatDate = (d) => {
      const date = new Date(d);
      return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    };

    const merged = {};


    if (contestData.leetcode?.ratingHistory) {
      contestData.leetcode.ratingHistory.forEach((h) => {
        const month = formatDate(h.date || h.time);
        if (!merged[month]) merged[month] = { month };
        merged[month].leetcode = h.rating;
      });
    }

    if (contestData.codeforces?.ratingHistory) {
      contestData.codeforces.ratingHistory.forEach((h) => {
        const month = formatDate(h.date || h.time);
        if (!merged[month]) merged[month] = { month };
        merged[month].codeforces = h.rating;
      });
    }

    if (contestData.codechef?.ratingHistory) {
      contestData.codechef.ratingHistory.forEach((h) => {
        const month = formatDate(h.date || h.time);
        if (!merged[month]) merged[month] = { month };
        merged[month].codechef = h.rating;
      });
    }

    return Object.values(merged).sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [contestData]);


  const contestParticipation = [
    contestData.leetcode && { name: 'LeetCode', value: contestData.leetcode?.totalContests ?? 0, color: '#f9de16ff' },
    contestData.codeforces && { name: 'Codeforces', value: contestData.codeforces?.totalContests ?? 0, color: '#3B82F6' },
    contestData.codechef && { name: 'CodeChef', value: contestData.codechef?.totalContests ?? 0, color: '#D97706' }
  ].filter(Boolean);


  const platforms = [
    contestData.leetcode && {
      name: 'LeetCode',
      rating: contestData.leetcode?.rating ?? 0,
      contests: contestData.leetcode?.totalContests ?? 0,
      level: contestData.leetcode?.level ?? '-',
      rank: contestData.leetcode?.rankName ?? '-',
      bgColor: 'bg-yellow-200',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      iconBgColor: 'bg-yellow-100',
      icon: SiLeetcode
    },
    contestData.codeforces && {
      name: 'Codeforces',
      rating: contestData.codeforces?.rating ?? 0,
      contests: contestData.codeforces?.totalContests ?? 0,
      level: contestData.codeforces?.level ?? '-',
      rank: contestData.codeforces?.rankName ?? '-',
      bgColor: 'bg-blue-200',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconBgColor: 'bg-blue-100',
      icon: SiCodeforces
    },
    contestData.codechef && {
      name: 'CodeChef',
      rating: contestData.codechef?.rating ?? 0,
      contests: contestData.codechef?.totalContests ?? 0,
      level: contestData.codechef?.level ?? '-',
      rank: contestData.codechef?.rankName ?? '-',
      bgColor: 'bg-orange-200',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      iconBgColor: 'bg-orange-100',
      icon: SiCodechef
    }
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Contest Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <div
              key={platform.name}
              className={`${platform.bgColor} rounded-xl p-6 shadow-md border-2 ${platform.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${platform.iconBgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${platform.textColor}`} />
                </div>
              </div>

              <h4 className={`text-lg font-semibold ${platform.textColor} mb-3`}>{platform.name}</h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`${platform.textColor} opacity-80`}>Rating</span>
                  <span className={`text-lg font-semibold ${platform.textColor}`}>{platform.rating}</span>
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

            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Progress Chart */}
        <div className="bg-purple-50 rounded-xl p-6 shadow-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-700">Rating Progress</h3>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {ratingHistory.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">No data available</span>
                </div>
              ) : (
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
                    stroke="#e1cf0cff"
                    strokeWidth={3}
                    dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                    name="LeetCode"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="codeforces"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    name="Codeforces"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="codechef"
                    stroke="#D97706"
                    strokeWidth={3}
                    dot={{ fill: '#D97706', strokeWidth: 2, r: 4 }}
                    name="CodeChef"
                    connectNulls
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contest Participation Chart */}
        <div className="bg-emerald-50 rounded-xl p-6 shadow-lg border border-emerald-200">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-emerald-700">Contest Participation</h3>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {ratingHistory.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">No data available</span>
                </div>
              ) : (
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
                      color: 'white'
                    }}
                    itemStyle={{
                      color: 'white'
                    }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          {
            ratingHistory.length === 0 ? null : (
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
            )
          }

        </div>
      </div>

    </div>
  );
};

export default ContestStats;