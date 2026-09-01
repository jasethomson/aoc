import * as cheerio from 'cheerio';
import path from 'path';

import { Puzzle } from '../types';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getPuzzle = async ({ year, day }: Puzzle): Promise<void> => {
    const dirPath = `../${year}/puzzles`;
    const fileName = `${formatDayStr(day.toString())}.html`;
    const absolutePath = path.join(__dirname, `${dirPath}/${fileName}`);

    const puzzleRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}` });
    const $ = cheerio.load(puzzleRes);

    const part2 = $('.day-desc').has('#part2');

    const puzzleExists = await checkIfFileExists({ absolutePath });
    if (puzzleExists && !part2) return;
    
    if (!$('main')?.find('article')?.length) {
        console.warn('No puzzle articles found.');
        return;
    }

    let puzzleHtml = '';
    $('main').find('article').each((i, article) => {
        puzzleHtml += $(article).html();
    });

    if (!puzzleHtml) {
        console.warn('No puzzle html found.');
        return;
    }

    await writeFileAndCreateDirs({ absolutePath, contents: puzzleHtml });
    console.info(`Created puzzle file: ${fileName}`);
}

export default getPuzzle;