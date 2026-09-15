import process from 'node:process';
process.loadEnvFile();

// add puzzle import here

// eslint-disable-next-line @typescript-eslint/require-await
(async (): Promise<void> => {
  const yearDayRegex = /year=(\d{4})day=(\d{1,2})/;
  if (process.argv.length !== 3 || !yearDayRegex.test(process.argv[2])) {
    console.warn('Require year and day input in this format: year=xxxxday=xx, please retry.');
    return;
  }

  const yearDayMatch = process.argv[2].match(yearDayRegex);
  if (!yearDayMatch?.[1] || !yearDayMatch[2]) {
    console.warn('Invalid input found for year and day input');
    return;
  }

  const year = parseInt(yearDayMatch[1]);
  const day = parseInt(yearDayMatch[2]);

  const importedYear = parseInt('0');
  const importedDay = parseInt('0');

  if (importedYear !== year || importedDay !== day) {
    console.error(`Found mismatched puzzle, rerun setup for this puzzle, and then rerun the dev script, command: **npm run setup year=${year}day=${day}**`);
    return;
  }

  console.info(`Running app for puzzle ${year}-${day}`);

  // run puzzle here
})();
