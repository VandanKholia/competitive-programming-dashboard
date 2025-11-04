import getCodechefStats from "../webScraping/codechefScraper.js";
import { error as logError } from '../utils/logger.js';

export default async function codechefController(username) {
    try {
      const data = await getCodechefStats(username);
      return data;
    } 
    catch(err) {
      logError("error fetching codechef data: ", err);
    }
}