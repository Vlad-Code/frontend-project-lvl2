import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormattedOutput from './formatters/index.js';

const getAbsolutePathToFile = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const getParsedData = (absolutePath) => {
  const dataType = path.extname(absolutePath).slice(1);
  const data = readFileSync(absolutePath, 'utf-8');
  const parsedFileData = parse(data, dataType);
  return parsedFileData;
};

const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const absolutePath1 = getAbsolutePathToFile(filePath1);
  const absolutePath2 = getAbsolutePathToFile(filePath2);
  const parsedFileData1 = getParsedData(absolutePath1);
  const parsedFileData2 = getParsedData(absolutePath2);
  const difference = buildDiff(parsedFileData1, parsedFileData2);
  const formattedOutput = getFormattedOutput(difference, outputFormat);
  return formattedOutput;
};

export default genDiff;
