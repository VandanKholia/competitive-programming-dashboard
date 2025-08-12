import { JSDOM } from 'jsdom';

const fecher = async (handle) => {
  try {
    const resdata = await fetch(`https://www.codechef.com/users/${handle}`);
    if (resdata.status === 200) {
      const d = await resdata.text();
       const dom = new JSDOM(d);
      const document = dom.window.document;
      const heatMapDataStart =
        d.indexOf("var userDailySubmissionsStats =") +
        "var userDailySubmissionsStats =".length;
      const heatMapDataEnd = d.indexOf("'#js-heatmap") - 34;
      const heatMapRaw = d.substring(heatMapDataStart, heatMapDataEnd);
      const heatMap = JSON.parse(heatMapRaw);

const totalSolvedElement = document.querySelector(".problems-solved h3:last-of-type");
const totalQuestions = parseInt(totalSolvedElement?.textContent?.match(/\d+/)?.[0]);

      const ratingStart = d.indexOf("var all_rating = ") + "var all_rating = ".length;
      const ratingEnd = d.indexOf("var current_user_rating =") - 6;
      const ratingData = JSON.parse(d.substring(ratingStart, ratingEnd));

     

      return {
        success: true,
        status: resdata.status,
        profile: document.querySelector(".user-details-container").children[0].children[0].src,
        name: document.querySelector(".user-details-container").children[0].children[1].textContent,
        currentRating: parseInt(document.querySelector(".rating-number")?.textContent),
        highestRating: parseInt(
          document
            .querySelector(".rating-number")?.parentNode?.children[4]?.textContent?.split("Rating")[1]
        ),
        countryFlag: document.querySelector(".user-country-flag").src,
        countryName: document.querySelector(".user-country-name").textContent,
        globalRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[0]?.children[0]?.children[0]
            ?.innerHTML
        ),
        countryRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[1]?.children[0]?.children[0]
            ?.innerHTML
        ),
        stars: document.querySelector(".rating")?.textContent || "unrated",
        totalQuestions:totalQuestions||0,
        heatMap,
        ratingData,
      };
    } else {
      return { success: false, status: resdata.status };
    }
  } catch (e) {
    console.log(e);
    return { success: false, status: 404 };
  }
};
export default fecher;