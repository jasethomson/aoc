import path from 'path';

import formatDayStr from './formatDayStr';
import requestAocHtml from './requestAocHtml';
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getPuzzleInput = async ({ year, day }: {year: number; day: number }): Promise<void> => {
    const filePath = `../${year}/inputs/${formatDayStr(day.toString())}.txt`;
    const absolutePath = path.join(__dirname, filePath);
    const loggingName = absolutePath.split(/\\|\//).pop();

    const puzzleInputExists = await checkIfFileExists({ absolutePath });
    if (puzzleInputExists) return;

    const puzzleInputRes = await requestAocHtml({ url: `https://adventofcode.com/${year}/day/${day}/input` });

    await writeFileAndCreateDirs({ absolutePath, contents: puzzleInputRes });

    console.info(`Created puzzle input file: ${loggingName}`);
}

export default getPuzzleInput;