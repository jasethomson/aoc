import process from 'node:process';
process.loadEnvFile();

import { getPuzzle, getPuzzleInput } from './utils';

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
    await getPuzzle({ day, year });
    await getPuzzleInput({ day, year });
})();
