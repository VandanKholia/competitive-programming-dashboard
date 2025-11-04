import leetcodeScraper from "../webScraping/leetcodeScraper.js";
import { log, error as logError } from '../utils/logger.js';

export default async function leetcodeController(userName) {
    try {
        const data = await leetcodeScraper(userName);
        return data;
    } catch (error) {
        logError(error);
    }
}
