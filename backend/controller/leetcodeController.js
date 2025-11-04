import leetcodeScraper from "../webScraping/leetcodeScraper.js";

export default async function leetcodeController(userName) {
    try {
        const data = await leetcodeScraper(userName);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}
