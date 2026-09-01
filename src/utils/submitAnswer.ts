import { Puzzle } from '../types';

interface SubmitAnswer extends Puzzle {
    level: string;
    answer: string;
}

const submitAnswer = async ({ year, day, level, answer }: SubmitAnswer): Promise<string> => {
    if (typeof process.env.AOC_COOKIE !== 'string') {
        throw new Error('Invalid cookie input for getPuzzle');
    }

    const url = `https://adventofcode.com/${year}/day/${day}/answer`;
    const formBody = new URLSearchParams({ level, answer }).toString();
    const reqOptions = {
        method: 'POST',
        headers: {
            cookie: process.env.AOC_COOKIE,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    };

    try {
        const htmlRes = await fetch(url, reqOptions);
        if (!htmlRes.ok) {
            throw new Error(`Error code ${htmlRes.status} while requesting puzzle for ${url}`);
        }

        return await htmlRes.text();
    } catch (err) {
        console.error('submitAnswer error:', err);
        throw new Error(`Failed to fetch puzzle for ${url}`);
    }
}

export default submitAnswer;