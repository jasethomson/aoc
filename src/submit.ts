import * as cheerio from 'cheerio';
import process from 'node:process';
process.loadEnvFile();

import { pickNextPuzzle, setUpPuzzle, submitAnswer } from './utils';
import { Puzzle } from './types';

(async () => {
    const yearDayRegex = /year=(\d{4})day=(\d{1,2})/;
    const ansRegex = /level=(\d)ans=(.+)/;
    if (process.argv.length !== 4 || !yearDayRegex.test(process.argv[2]) || !ansRegex.test(process.argv[3])) {
        console.warn('Require year and day input in this format: year=xxxxday=xx, level and answer input in this format: level=xans=xxx, please retry.');
        return;
    }

    const yearDayMatch = process.argv[2].match(yearDayRegex);
    if (!yearDayMatch?.[1] || !yearDayMatch[2]) {
        console.warn('Invalid input found for year and day input');
        return;
    }

    const year = parseInt(yearDayMatch[1]);
    const day = parseInt(yearDayMatch[2]);

    const ansMatch = process.argv[3].match(ansRegex);

    if (!ansMatch?.[1] || !ansMatch[2]) {
        console.warn('Invalid input found for answer input');
        return;
    }

    const level = ansMatch[1];
    if (level !== '1' && level !== '2') {
        console.warn(`Invalid level inputed: ${level}, cannot submit answer`);
        return;
    }

    const answer = ansMatch[2];

    const answerResHtml = await submitAnswer({ day, year, level, answer });

    const $ = cheerio.load(answerResHtml);
    const article = $('main').find('article');
    if ($(article).length > 1) {
        console.warn('Found more than one article in the answer response');
    }

    const answRes = $(article).text();

    console.log(`
        Submitted answer ${answer} for year ${year}, day ${day}, level ${level}.
        Answer Response:
        ____________________

        ${answRes}
        ____________________
    `);

    if (answRes.includes("That's the right answer!")) {
        if (level === '1') {
            console.log(`Congratulations on completing level 1, updating puzzle ${year}-${day} with level 2 instructions.`);
            await setUpPuzzle({ day, year });
        } else if (level === '2') {
            const nextPuzzle = pickNextPuzzle({ year, day });
            console.log(`Congratulations on completing puzzle ${year}-${day}, setting up the next puzzle ${nextPuzzle.year}-${nextPuzzle.day}`);
            await setUpPuzzle(nextPuzzle);
        } else {
            console.warn(`Found unexpeced level ${level}`);
        }
    }
})();
