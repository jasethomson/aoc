import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';

const getPuzzleInput = async ({ year, day }: {year: number; day: number }): Promise<void> => {
    const filePath = `../${year}/inputs/${formatDayStr(day.toString())}.txt`;
    const absolutePath = path.join(__dirname, filePath);

    try {
        await fs.readFile(absolutePath);
        console.info('Found existing file, no need to get puzzle input.');
        return;
    } catch (err) {
        console.warn('Error reading file, requesting and creating the file', err);
    }

    const puzzleInputRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}/input` });
    console.log(puzzleInputRes);

    // try {
    //     await fs.writeFile(absolutePath, $('main').text());
    // } catch (err) {
    //     console.warn('Error creating file, attempting to create dir and then create file', err);

    //     const dirPath = path.dirname(absolutePath);
    //     await fs.mkdir(dirPath, { recursive: true });

    //     await fs.writeFile(absolutePath, $('main').text());
    // }
}

export default getPuzzleInput;