import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parseFile = (filePath) => {
  const fileExtension = path.extname(filePath);
  const cwd = process.cwd();
  const absoluteFilePath = path.resolve(cwd, filePath);
  const file = readFileSync(absoluteFilePath, 'utf-8');
  let fileData;
  switch (fileExtension) {
    case '.json':
      fileData = JSON.parse(file);
      break;
    case '.yml':
      fileData = yaml.load(file);
      break;
    default:
      throw new Error(`Unknown file extension: ${fileExtension}!`);
  }
  return fileData;
};

export default parseFile;
