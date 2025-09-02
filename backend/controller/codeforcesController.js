import dotenv from "dotenv";
dotenv.config();

export default async function codeforcesController(userName) {
  try {
    // 1. Fetch profile info
    const userInfoUrl = `${process.env.CODEFORCES_USER_INFO_URL}${userName}`;
    const userInfoRes = await fetch(userInfoUrl);
    const userInfoData = await userInfoRes.json();

    if (userInfoData.status !== "OK") {
      throw new Error("Failed to fetch Codeforces user info");
    }
    const user = userInfoData.result[0];

    // 2. Fetch submission status
    const submitStatusUrl = `${process.env.CODEFORCES_USER_STATUS_URL}${userName}`;
    const submitRes = await fetch(submitStatusUrl);
    const submitData = await submitRes.json();

    const solvedSet = new Set();
    submitData.result.forEach((sub) => {
      if (sub.verdict === "OK") {
        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

     // 2. Fetch rating history
    const ratingUrl = `${process.env.CODEFORCES_USER_RATING_URL}${userName}`;
    const ratingRes = await fetch(ratingUrl);
    const ratingData = await ratingRes.json();

    const ratingHistory =
      ratingData.status === "OK"
        ? ratingData.result.map((contest) => ({
            time: contest.ratingUpdateTimeSeconds * 1000,
            rating: contest.newRating,
          }))
        : [];
    // 3. Return combined data
    return {
      handle: user.handle,
      firstName: user.firstName,
      lastName: user.lastName,
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
      solvedCount: solvedSet.size,
      ratingHistory: ratingHistory
    };
    
  } catch (error) {
    console.error("Error fetching Codeforces data:", error.message);
    throw error;
  }
}

