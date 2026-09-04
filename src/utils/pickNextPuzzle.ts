import { Puzzle } from '../types';

const pickNextPuzzle = ({ year, day }: Puzzle): Puzzle => {
    return day < 25
        ? { year, day: day + 1 }
        : { year: year + 1, day: 1 };
}

export default pickNextPuzzle;