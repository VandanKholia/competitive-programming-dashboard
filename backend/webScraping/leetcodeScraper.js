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

    const history = response.data.data.userContestRankingHistory || [];

    const ratingsHistory = (history || []).filter(entry => entry && entry.attended).map(entry => ({
      date: entry?.contest?.startTime ? new Date(entry.contest.startTime * 1000) : null,
      rating: entry.rating ?? null
    })).filter(e => e.date !== null);


    const submissions = matchedUser?.submitStats?.acSubmissionNum || [];
    const totalSolved = submissions[0]?.count ?? 0;
    const easySolved = submissions[1]?.count ?? 0;
    const mediumSolved = submissions[2]?.count ?? 0;
    const hardSolved = submissions[3]?.count ?? 0;

    const rating = userContestRanking ? parseInt(userContestRanking.rating) : null;
    const globalRanking = userContestRanking ? userContestRanking.globalRanking : null;
    const badgeName = userContestRanking?.badge?.name ?? null;


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
    console.error("Scraper Error fetching data:", error.message);
  }
}
