import getPuzzle from "./getPuzzle";
import getPuzzleInput from "./getPuzzleInput";

const setUpPuzzle = async ({ day, year }: { day: number; year: number }): Promise<void> => {
  await getPuzzle({ day, year });
  await getPuzzleInput({ day, year });
  await getPuzzle
}

export default setUpPuzzle;