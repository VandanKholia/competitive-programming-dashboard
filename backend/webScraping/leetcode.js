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
    
    }
  `;

  try {
    const response = await axios.post(url, {
      query,
      variables: { username }
    });

    const { matchedUser, userContestRanking } = response.data.data;

    if (!matchedUser) {
      console.log("User not found");
      return;
    }

    const totalSolved = matchedUser.submitStats.acSubmissionNum[0].count;
    const easySolved = matchedUser.submitStats.acSubmissionNum[1].count;
    const mediumSolved = matchedUser.submitStats.acSubmissionNum[2].count;
    const hardSolved = matchedUser.submitStats.acSubmissionNum[3].count;

    const rating = userContestRanking ? userContestRanking.rating : null;
    const globalRanking = userContestRanking ? userContestRanking.globalRanking : null;
    const badgeName = userContestRanking? userContestRanking.badge.name : null;

    // const leetcodeData = {
    //     username,
    //     totalSolved,
    //     easySolved,
    //     mediumSolved,
    //     hardSolved,
    //     userContestRanking
    // }
    return {
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

