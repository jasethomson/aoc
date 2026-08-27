import * as cheerio from 'cheerio';
import path from 'path';

import { Puzzle } from '../types';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getPuzzle = async ({ year, day }: Puzzle): Promise<void> => {
    const dirPath = `../${year}/puzzles`;
    const fileName = `${formatDayStr(day.toString())}.MD`;
    const absolutePath = path.join(__dirname, `${dirPath}/${fileName}`);

    const puzzleExists = await checkIfFileExists({ absolutePath });
    if (puzzleExists) return;

    const puzzleRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}` });
    const $ = cheerio.load(puzzleRes);

    await writeFileAndCreateDirs({ absolutePath, contents: $('main').text() });
    console.info(`Created puzzle file: ${fileName}`);
}

export default getPuzzle;