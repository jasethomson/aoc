import fs from 'fs/promises';
import path from 'path';

import { Puzzle } from '../types';

import formatDayStr from './formatDayStr'; 
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const getTsReady = async ({ year, day }: Puzzle ): Promise<void> => {
    const formattedPuzzleDay = formatDayStr(day.toString());
    const dirPath = `../${year}/solutions`;
    const fileName = `${formattedPuzzleDay}.ts`;
    const puzzlePath = path.join(__dirname, `${dirPath}/${fileName}`);

    const fileExists = await checkIfFileExists({ absolutePath: puzzlePath });

    if (fileExists) return;

    const templatePath = path.join(__dirname, `../templates/solvePuzzle.ts`);

    let fileContents = null;
    try {
        fileContents = await fs.readFile(templatePath, 'utf8');
    } catch (err) {
        console.error(`Error reading solvePuzzle typescript file: ${templatePath}`, err);
        return;
    }

    let updatedFileContents = fileContents.replace(/\.\.\//g, '../../');
    const puzzleInputPath = `${dirPath}/${fileName}`.replace('solutions', 'inputs').replace('.ts', '.txt');
    updatedFileContents = updatedFileContents.replace(/REPLACE_FILE_NAME_HERE/, puzzleInputPath);

    await writeFileAndCreateDirs({ absolutePath: puzzlePath, contents: updatedFileContents });
    console.info(`Created puzzle TS file: ${fileName}`);
};

export default getTsReady;