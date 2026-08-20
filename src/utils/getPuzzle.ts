import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

import requestPuzzleHtml from './requestPuzzleHtml';
import formatDayStr from './formatDayStr';

const getPuzzle = async ({ year, day }: {year: number; day: number }): Promise<void> => {
    const filePath = `../${year}/puzzles/${formatDayStr(day.toString())}.MD`;
    const absolutePath = path.join(__dirname, filePath);

    try {
        await fs.readFile(absolutePath);
        console.info('Found existing file, no need to get puzzle.');
        return;
    } catch (err) {
        console.warn('Error reading file, requesting and creating the file', err);
    }

    const puzzleRes = await requestPuzzleHtml({ year, day });
    const $ = cheerio.load(puzzleRes);

    try {
        await fs.writeFile(absolutePath, $('main').text());
    } catch (err) {
        console.warn('Error creating file, attempting to create dir and then create file', err);
        // 1. Ensure the directory exists recursively (async)
        const dirPath = path.dirname(absolutePath);
        await fs.mkdir(dirPath, { recursive: true });

        await fs.writeFile(absolutePath, $('main').text());
    }
}

export default getPuzzle;