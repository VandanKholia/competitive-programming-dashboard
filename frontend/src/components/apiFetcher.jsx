import axios from "axios";

export const fetchCodeforcesData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/codeforces/${username}`);
    return {
      handle: res.data.handle,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      rating: res.data.rating,
      maxRating: res.data.maxRating,
      rankName: res.data.rank,
      totalSolved: res.data.solvedCount,
      ratingHistory: res.data.ratingHistory
    };
  } catch (err) {
    console.error("Codeforces error:", err);
    return null;
  }
};

export const fetchCodechefData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/codechef/${username}`);
    return {
      name: res.data.name,
      rating: res.data.currentRating,
      maxRating: res.data.highestRating,
      rankName: res.data.stars,
      totalSolved: res.data.totalQuestions,
      totalContests: res.data.ratingHistory.length,
      ratingHistory: res.data.ratingHistory
    };
      
  } catch (err) {
    console.error("CodeChef error:", err);
    return null;
  }
};

export const fetchLeetCodeData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/leetcode/Kholia_Vandan`);
    return {
      rating: res.data.rating,
      // globalRanking: res.data.globalRanking,
      rankName: res.data.badgeName,
      totalSolved: res.data.totalSolved,
      totalContests: res.data.ratingHistory.length,
      ratingHistory: res.data.ratingHistory,
    };

  } catch (err) {
    console.error("LeetCode error:", err);
    return null;
  }
};
