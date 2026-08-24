import fs from 'fs/promises';
import path from 'path';

import { Puzzle } from '../types';
import { formatDayStr } from '../utils';

const main = async ({ year, day }: { year: number, day: number }): Promise<void> => {
    const puzzleInput = await fs.readFile(path.join(__dirname, 'REPLACE_FILE_NAME_HERE'), 'utf8');
    console.info(`Puzzle ${year}-${day} has been setup, here's a sample of the input`, puzzleInput.slice(0, 150));
};

export default main;