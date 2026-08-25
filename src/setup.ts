import process from 'node:process';
process.loadEnvFile();

import { setUpPuzzle, updateIndexWithPuzzle } from './utils';

(async () => {
    const yearDayRegex = /year=(\d{4})day=(\d{1,2})/;
    if (process.argv.length !== 3 || yearDayRegex.test(process.argv[3])) {
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

    await setUpPuzzle({ day, year });

    // update index.ts with call to current day and year
    await updateIndexWithPuzzle({ day, year });
})();
