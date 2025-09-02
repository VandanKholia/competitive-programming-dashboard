  import React from "react";
  import { Trophy, Target, Star, TrendingUp, Medal, Award, Crown, Zap } from 'lucide-react'; 
   
  const ContestCard = ({ contest }) => (
    <div className={`${contest.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${contest.color} flex items-center justify-center text-white text-xl`}>
            {contest.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{contest.platform}</h3>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${contest.bgColor} ${contest.textColor} border`}>
              {contest.badge}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Trophy className={`w-4 h-4 ${contest.textColor}`} />
            <span className="text-sm font-medium text-gray-600">#{contest.globalRank}</span>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{contest.currentRating}</div>
          <div className="text-xs text-gray-500">Current Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{contest.maxRating}</div>
          <div className="text-xs text-gray-500">Max Rating</div>
          {contest.maxRating > contest.currentRating && (
            <div className="text-xs text-green-600 flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Peak
            </div>
          )}
        </div>
      </div>

      {/* Contest Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className={`text-lg font-bold ${contest.textColor}`}>{contest.contestsParticipated}</div>
          <div className="text-xs text-gray-500">Contests</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${contest.textColor}`}>#{contest.bestRank}</div>
          <div className="text-xs text-gray-500">Best Rank</div>
        </div>
      </div>
    </div>
  );
export default ContestCard;