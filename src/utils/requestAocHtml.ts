const requestAocHtml = async ({ url }: {url: string }): Promise<string> => {
    if (typeof process.env.AOC_COOKIE !== 'string') {
        throw new Error('Invalid cookie input for getPuzzle');
    }

    try {
        const reqOptions = {
            headers: {
                cookie: process.env.AOC_COOKIE
            }
        };

        const htmlRes = await fetch(url, reqOptions);
        
        if (!htmlRes.ok) {
            throw new Error(`Error code ${htmlRes.status} while requesting puzzle for ${url}`);
        }

        return await htmlRes.text();
    } catch (err) {
        throw err;
    }
}

export default requestAocHtml;