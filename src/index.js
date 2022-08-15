import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormatedOutput from './formaters/index.js';

const getAbsolutePathToFile = (pathToFile) => {
  const cwd = process.cwd();
  const absolutePathToFile = path.resolve(cwd, pathToFile);
  return absolutePathToFile;
};

const getParsedData = (absolutePathToFile) => {
  const dataType = path.extname(absolutePathToFile).slice(1);
  const data = readFileSync(absolutePathToFile, 'utf-8');
  const parsedFileData = parse(data, dataType);
  return parsedFileData;
};

const genDiff = (filePath1, filePath2, format) => {
  const absolutePathToFile1 = getAbsolutePathToFile(filePath1);
  const absolutePathToFile2 = getAbsolutePathToFile(filePath2);
  const parsedFileData1 = getParsedData(absolutePathToFile1);
  const parsedFileData2 = getParsedData(absolutePathToFile2);
  const differense = buildDiff(parsedFileData1, parsedFileData2);
  const formatedOutput = getFormatedOutput(differense, format);
  return formatedOutput;
};

export default genDiff;
