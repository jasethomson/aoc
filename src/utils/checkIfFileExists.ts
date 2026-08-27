import { promises as fs } from 'fs';

const checkIfFileExists = async ({ absolutePath }: { absolutePath: string; }): Promise<boolean> => {
  const loggingName = absolutePath.split(/\\|\//).pop();
  try {
      await fs.readFile(absolutePath);
      console.info(`Found existing file ${loggingName}`);
      return true;
  } catch (err) {
      if (!(err instanceof Error) || !err.message.includes(' no such file or directory')) {
          console.error(`Failed to check if file exists for ${absolutePath} with err:`, err);
          throw err;
      }

      console.warn(`No file found for ${loggingName}`);
  }

  return false;
}

export default checkIfFileExists;