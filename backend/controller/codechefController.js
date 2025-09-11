import getCodechefStats from "../webScraping/codechefScraper.js";

export default async function codechefController(username) {
    try {
      const data = await getCodechefStats(username);
      return data;
    } 
    catch(err) {
      console.log("error fetching codechef data: ",err);
    }
}