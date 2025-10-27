import axios from "axios";
import { json } from "express";

export default async function getLeetCodeFullStats(username) {
  const url = "https://leetcode.com/graphql";

  const query = `
    query getUserFullStats($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        profile {
          ranking
          reputation
        }
    
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        badge{
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    
    }
  `;

  try {
    const response = await axios.post(url, {
      query,
      variables: { username }
    });
    
    const { matchedUser, userContestRanking } = response.data.data;

    if(!matchedUser) {
      return null;
    }

    const history = response.data.data.userContestRankingHistory;
      history.forEach(entry => {
      if (entry.attended) {
        // console.log(
        //   `${entry.contest.title} (${new Date(entry.contest.startTime * 1000).toLocaleDateString()}) → Rating: ${entry.rating}`
        // );
      }
    });
    const ratingsHistory = history.filter(entry => entry.attended).map(entry=>({
      date: new Date(entry.contest.startTime * 1000),
      rating: entry.rating
    }))

    const totalSolved = matchedUser.submitStats.acSubmissionNum[0].count;
    const easySolved = matchedUser.submitStats.acSubmissionNum[1].count;
    const mediumSolved = matchedUser.submitStats.acSubmissionNum[2].count;
    const hardSolved = matchedUser.submitStats.acSubmissionNum[3].count;

    const rating = userContestRanking ? parseInt(userContestRanking.rating) : null;
    const globalRanking = userContestRanking ? userContestRanking.globalRanking : null;
    const badgeName = userContestRanking? userContestRanking.badge.name : null;


    const leetcodeData = {
        username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        globalRanking,
        rating,
        globalRanking,
        badgeName,
        ratingsHistory
    }
    return {
      "ratingHistory":ratingsHistory,
        "username": username,
        "totalSolved":totalSolved,
        "easySolved":easySolved,
        "mediumSolved":mediumSolved,
        "hardSolved":hardSolved,
        "rating": rating,
        "globalRanking":globalRanking,
        "badgeName":badgeName,
        
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
