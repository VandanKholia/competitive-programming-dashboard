import axios from "axios";

export const fetchCodeforcesData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/codeforces/${username}`);
    const submitStatus = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissions = submitStatus.data.result;

    const solvedSet = new Set();
    submissions.forEach(sub => {
      if (sub.verdict === "OK") {
        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    return {
      codeforcesData: res.data,
      totalSolved: solvedSet.size,
      rating: res.data.result[res.data.result.length - 1]?.newRating ?? null,
      totalContests: res.data.result.length
    };
  } catch (err) {
    console.error("Codeforces error:", err);
    return null;
  }
};

export const fetchCodechefData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/codechef/handle/${username}`);
    return {
      codechefData: res.data,
      rating: res.data.currentRating,
      totalQuestions: res.data.totalQuestions,
      totalContests: res.data.ratingData.length
    };
  } catch (err) {
    console.error("CodeChef error:", err);
    return null;
  }
};

export const fetchLeetCodeData = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/leetcode/${username}`);
    return {
      totalSolved: res.data.totalSolved
    };
  } catch (err) {
    console.error("LeetCode error:", err);
    return null;
  }
};
