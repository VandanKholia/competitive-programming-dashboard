import axios from "axios";

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

    console.log("Username:", matchedUser.username);
    console.log("Total solved:", totalSolved);
    console.log("Easy:", easySolved, "Medium:", mediumSolved, "Hard:", hardSolved);
    console.log("Ranking:", matchedUser.profile.ranking);
    console.log("Contest stats:", userContestRanking);

    const leetcodeData = {
        username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        userContestRanking
    }
    console.log(leetcodeData)
    return leetcodeData;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    if (error.response) console.error(error.response.data);
  }
}

getLeetCodeFullStats("Kholia_Vandan");
