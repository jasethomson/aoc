import fs from 'fs/promises';
import path from 'path';

import { Puzzle } from '../types';

import formatDayStr from './formatDayStr'; 
import checkIfFileExists from './checkIfFileExists';
import writeFileAndCreateDirs from './writeFileAndCreateDirs';

const updateIndexWithPuzzle = async ({ year, day }: Puzzle ): Promise<void> => {
    const formattedPuzzleDay = formatDayStr(day.toString());
    const dirPath = `../${year}/solutions`;
    const fileName = `${formattedPuzzleDay}.ts`;
    const relativePathToFile = `${dirPath}/${fileName}`;
    const puzzlePath = path.join(__dirname,relativePathToFile);

    const fileExists = await checkIfFileExists({ absolutePath: puzzlePath });
    if (!fileExists) {
        console.warn('No puzzle solution file found, exiting..');
        return;
    }

    const indexPath = path.join(__dirname, `../index.ts`);

    let fileContents = null;
    try {
        fileContents = await fs.readFile(indexPath, 'utf8');
    } catch (err) {
        console.error(`Error reading index typescript file: ${indexPath}, exiting..`, err);
        return;
    }

    const dirPathFromIndex = relativePathToFile.slice(1).replace('.ts', '');
    const importLine = `import main from '${dirPathFromIndex}';`;
    const dirPathRegex = new RegExp(dirPathFromIndex);
    const importExists = dirPathRegex.test(fileContents);
    let updatedFileContents = null;
    if (!importExists) {
        const currentPuzzleRegex = /import main from '\.\/\d{4}\/solutions\/\d{2}';/;
        const currentPuzzleMatch = fileContents.match(currentPuzzleRegex);
        if (currentPuzzleMatch) {
            updatedFileContents = fileContents.replace(currentPuzzleMatch[0], importLine);
        } else {
            const importMatchStr = 'add puzzle import here';
            const indexToAddImport = fileContents.indexOf(importMatchStr) + importMatchStr.length;
            updatedFileContents = fileContents.slice(0, indexToAddImport) + '\n' + importLine + fileContents.slice(indexToAddImport);
        }

        console.info(`Adding import in index.ts for puzzle TS file: ${fileName}`);
    } else {
        console.info(`Puzzle TS file already imported in index.ts: ${fileName}`);
    }

    const runPuzzleLine = '    await main({ year, day });';
    const runPuzzleRegex = /    await main\({ year, day }\);/;
    if (!runPuzzleRegex.test(fileContents)) {
        if (!updatedFileContents) {
            updatedFileContents = fileContents;
        }
        const runPuzzleMatchStr = 'run puzzle here';
        const indexToAddRunPuzzle = updatedFileContents.indexOf(runPuzzleMatchStr) + runPuzzleMatchStr.length;
        updatedFileContents = updatedFileContents.slice(0, indexToAddRunPuzzle) + '\n' + runPuzzleLine + updatedFileContents.slice(indexToAddRunPuzzle);
    }
    
    if (updatedFileContents) {
        await writeFileAndCreateDirs({ absolutePath: indexPath, contents: updatedFileContents });
    }
};

export default updateIndexWithPuzzle;