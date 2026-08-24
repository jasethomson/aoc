import { Puzzle } from '../types';

import getPuzzle from "./getPuzzle";
import getPuzzleInput from "./getPuzzleInput";
import getTsReady from './getTsReady';

const setUpPuzzle = async ({ day, year }: Puzzle): Promise<void> => {
  await getPuzzle({ day, year });
  await getPuzzleInput({ day, year });
  await getTsReady({ day, year });
}

export default setUpPuzzle;