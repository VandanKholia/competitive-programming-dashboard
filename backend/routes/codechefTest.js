import express from 'express';
import { JSDOM } from 'jsdom';
const router = express.Router();

const fetcher = async(handle)=> {
    try{
        const resData = await fetch(`https://www.codechef.com/users/${handle}`);
        if(resData.status == 200) {
            const d = await resData.text();
            const dom = new JSDOM(d);
            const document = dom.window.document;
            const totalSolvedElement = document.querySelector(".problems-solved h3:last-of-type");
            const totalQuestions = parseInt(totalSolvedElement?.textContent?.match(/\d+/)?.[0]);
            console.log(totalQuestions);
        }
    }
    catch(e) {
        console.log(e);
        return { success: false, status: 404 };
    }
}
fetcher("vandan_kholia").then((data) => {
    // console.log(data);
});