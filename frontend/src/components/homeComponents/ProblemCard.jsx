  import React from "react";

  const ProblemCard = ({ platform }) => (
    <div className={`${platform.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center text-white text-xl`}>
            {platform.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{platform.name}</h3>
            <p className="text-sm text-gray-600">{platform.solved} / {platform.total} solved</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{platform.solved}</div>
          <div className="text-xs text-gray-500">problems</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-1000`}
            style={{ width: `${(platform.solved / platform.total) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {((platform.solved / platform.total) * 100).toFixed(1)}% completed
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(platform.difficulty).map(([level, count]) => (
          <div key={level} className="text-center">
            <div className={`text-sm font-bold ${platform.textColor}`}>{count}</div>
            <div className="text-xs text-gray-500 capitalize">{level}</div>
          </div>
        ))}
      </div>
    </div>
  );
  export default ProblemCard;