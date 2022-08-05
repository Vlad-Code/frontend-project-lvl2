import { readFileSync } from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import getStylish from './formaters.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const fileExtension1 = path.extname(filePath1);
  const fileExtension2 = path.extname(filePath2);
  const cwd = process.cwd();
  const absoluteFilePath1 = path.resolve(cwd, filePath1);
  const absoluteFilePath2 = path.resolve(cwd, filePath2);
  const file1 = readFileSync(absoluteFilePath1, 'utf-8');
  const file2 = readFileSync(absoluteFilePath2, 'utf-8');
  const fileData1 = parseFile(file1, fileExtension1);
  const fileData2 = parseFile(file2, fileExtension2);
  const differense = buildDiff(fileData1, fileData2);
  if (format === 'stylish') {
    const stylish = getStylish(differense);
    console.log(stylish);
    return stylish;
  }
  return null;
};

export default genDiff;
