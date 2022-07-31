import process from 'process';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const getDiff = (filePath1, filePath2) => {
  const cwd = process.cwd();
  const absoluteFilePath1 = path.resolve(cwd, filePath1);
  const absoluteFilePath2 = path.resolve(cwd, filePath2);
  const file1 = readFileSync(absoluteFilePath1, 'utf-8');
  const file2 = readFileSync(absoluteFilePath2, 'utf-8');
  const fileData1 = JSON.parse(file1);
  const fileData2 = JSON.parse(file2);
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const unionKeys = _.union(keys1, keys2).sort();
  const result = unionKeys.reduce((acc, key) => {
    if (!Object.hasOwn(fileData1, key)) {
      acc.push(`+ ${key}: ${fileData2[key]}`);
    } else if (!Object.hasOwn(fileData2, key)) {
      acc.push(`- ${key}: ${fileData1[key]}`);
    } else if (fileData1[key] !== fileData2[key]) {
      acc.push(`- ${key}: ${fileData1[key]}`);
      acc.push(`+ ${key}: ${fileData2[key]}`);
    } else if (fileData1[key] === fileData2[key]) {
      acc.push(`  ${key}: ${fileData1[key]}`);
    }
    return acc;
  }, []);
  console.log(`{\n  ${result.join('\n  ')}\n}`);
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default getDiff;
