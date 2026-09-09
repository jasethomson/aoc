import { Puzzle } from '../types';

import addIndex from './addIndex';
import getPuzzle from "./getPuzzle";
import getPuzzleInput from "./getPuzzleInput";
import getTsReady from './getTsReady';

const setUpPuzzle = async ({ day, year }: Puzzle): Promise<void> => {
  try {
    await getPuzzle({ day, year });
  } catch (err) {
    if (err instanceof Error && err.message.includes('Error code 404')) {
      console.error(`Puzzle ${year}-${day} not found for aoc, cannot set up puzzle.`);
      return;
    }

    throw err;
  }

  await getPuzzleInput({ day, year });
  await addIndex();
  await getTsReady({ day, year });
}

export default setUpPuzzle;