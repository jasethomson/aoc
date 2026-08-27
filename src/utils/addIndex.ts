import fs from 'fs/promises';
import path from 'path';

import checkIfFileExists from './checkIfFileExists';
const addIndex = async () => {
  const indexPath = '../index.ts';
  const absolutePath = path.join(__dirname, indexPath);
  const fileExists = await checkIfFileExists({ absolutePath });
  if (fileExists) return;

  const templatePath = path.join(__dirname, `../templates/index.ts`);

  try {
    await fs.copyFile(templatePath, absolutePath);
  } catch (err) {
    console.error('Error adding/updating index file for puzzle');
    return;
  }
};

export default addIndex;