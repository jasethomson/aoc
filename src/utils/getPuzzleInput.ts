import path from 'path';

import { Puzzle } from '../types';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getPuzzleInput = async ({ year, day }: Puzzle): Promise<void> => {
    const dirPath = `../${year}/inputs`;
    const fileName = `${formatDayStr(day.toString())}.txt`;
    const absolutePath = path.join(__dirname, `${dirPath}/${fileName}`);

    const puzzleInputExists = await checkIfFileExists({ absolutePath });
    if (puzzleInputExists) return;

    const puzzleInputRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}/input` });

    await writeFileAndCreateDirs({ absolutePath, contents: puzzleInputRes });

    console.info(`Created puzzle input file: ${fileName}`);
}

export default getPuzzleInput;