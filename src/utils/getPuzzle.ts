import * as cheerio from 'cheerio';
import path from 'path';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getPuzzle = async ({ year, day }: {year: number; day: number }): Promise<void> => {
    const filePath = `../${year}/puzzles/${formatDayStr(day.toString())}.MD`;
    const absolutePath = path.join(__dirname, filePath);
    const loggingName = absolutePath.split(/\\|\//).pop();

    const puzzleExists = await checkIfFileExists({ absolutePath });
    if (puzzleExists) return;

    const puzzleRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}` });
    const $ = cheerio.load(puzzleRes);

    await writeFileAndCreateDirs({ absolutePath, contents: $('main').text() });
    console.info(`Created puzzle file: ${loggingName}`);
}

export default getPuzzle;