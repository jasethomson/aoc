import * as cheerio from 'cheerio';
import process from 'node:process';
process.loadEnvFile();

import { submitAnswer } from './utils';

(async () => {
    const yearDayRegex = /year=(\d{4})day=(\d{1,2})/;
    if (process.argv.length !== 5 || yearDayRegex.test(process.argv[3])) {
        console.warn('Require year and day input in this format: year=xxxxday=xx, please retry.');
        return;
    }

    const yearDayMatch = process.argv[2].match(yearDayRegex);
    if (!yearDayMatch?.[1] || !yearDayMatch[2]) {
        console.warn('Invalid input found for year and day input');
        return;
    }

    const year = parseInt(yearDayMatch[1]);
    const day = parseInt(yearDayMatch[2]);

    const level = process.argv[3];
    const answer = process.argv[4];

    const answerResHtml = await submitAnswer({ day, year, level, answer });

    const $ = cheerio.load(answerResHtml);
    const article = $('main').find('article');
    if ($(article).length > 1) {
        console.warn('Found more than one article in the answer response');
    }

    console.log(`
        Submitted answer ${answer} for year ${year}, day ${day}, level ${level}.
        Answer Response:
        ____________________
        
        ${$(article).text()}
        ____________________
    `)
})();
