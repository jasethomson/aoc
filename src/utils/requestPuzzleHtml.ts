const requestPuzzleHtml = async ({ year, day }: {year: number; day: number }): Promise<string> => {
    if (typeof process.env.AOC_COOKIE !== 'string') {
        throw new Error('Invalid cookie input for getPuzzle');
    }

    try {
        const reqOptions = {
            headers: {
                cookie: process.env.AOC_COOKIE
            }
        };

        const htmlRes = await fetch(`https://adventofcode.com/${year}/day/${day}`, reqOptions);
        
        if (!htmlRes.ok) {
            throw new Error(`Error code ${htmlRes.status} while requesting puzzle for ${year}-${day}`);
        }

        return await htmlRes.text();
    } catch (err) {
        console.error('getPuzzle error:', err);
        throw new Error(`Failed to fetch puzzle for ${year}-${day}`);
    }
}

export default requestPuzzleHtml;