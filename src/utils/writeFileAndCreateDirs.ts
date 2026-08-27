import { promises as fs } from 'fs';
import path from 'path';

const writeFileAndCreateDirs = async ({ absolutePath, contents }: { absolutePath: string, contents: string }) => {
  const loggingName = absolutePath.split(/\\|\//).pop();
  try {
      await fs.writeFile(absolutePath, contents);
  } catch (err) {
      if (!(err instanceof Error) || !err.message.includes(' no such file or directory')) {
        console.error(`Failed to write file ${absolutePath}`, err);
        throw err;
      }

      console.warn(`Not all directories found for ${loggingName}, creating directories..`);

      const dirPath = path.dirname(absolutePath);
      await fs.mkdir(dirPath, { recursive: true });

      await fs.writeFile(absolutePath, contents);
  }
}

export default writeFileAndCreateDirs;