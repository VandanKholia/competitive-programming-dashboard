import getLeetCodeFullStats from "../webScraping/leetcode.js";

export default async function fetchLeetcodeData(userName) {
    try {
        const data = await getLeetCodeFullStats(userName);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}
