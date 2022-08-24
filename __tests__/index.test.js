import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (fileName) => {
  const pathToFile = path.join(__dirname, '..', '__fixtures__', `${fileName}`);
  return pathToFile;
};

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: undefined, result: 'resultForTreeStylish.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: undefined, result: 'resultForTreeStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', result: 'resultForTreePlain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'plain', result: 'resultForTreePlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'json', result: 'resultForTreeJSON.json',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', result: 'resultForTreeJSON.json',
  },
])('check function for $file1 and $file2, output in the $format format', ({
  file1, file2, format, result,
}) => {
  const pathToFile1 = getPathToFile(file1);
  const pathToFile2 = getPathToFile(file2);
  const pathToResult = getPathToFile(result);
  const resultForTree = readFileSync(`${pathToResult}`, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(resultForTree);
});
