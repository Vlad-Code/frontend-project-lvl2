import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

test.each([
  {
    fileExtension1: 'json', fileExtension2: 'json', format: 'stylish', result: 'resultForTreeStylish.txt',
  },
  {
    fileExtension1: 'yml', fileExtension2: 'yml', format: 'stylish', result: 'resultForTreeStylish.txt',
  },
  {
    fileExtension1: 'json', fileExtension2: 'json', format: 'plain', result: 'resultForTreePlain.txt',
  },
  {
    fileExtension1: 'yml', fileExtension2: 'yml', format: 'plain', result: 'resultForTreePlain.txt',
  },
  {
    fileExtension1: 'json', fileExtension2: 'json', format: 'json', result: 'resultForTreeJSON.json',
  },
  {
    fileExtension1: 'yml', fileExtension2: 'yml', format: 'json', result: 'resultForTreeJSON.json',
  },
])('check function for tree $file1 files $format format', ({
  fileExtension1, fileExtension2, format, result,
}) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath1 = path.join(__dirname, '..', '__fixtures__', `beforeTree.${fileExtension1}`);
  const filePath2 = path.join(__dirname, '..', '__fixtures__', `afterTree.${fileExtension2}`);
  const resultForTree = readFileSync(`${__dirname}/../__fixtures__/${result}`, 'utf-8');
  expect(genDiff(filePath1, filePath2, format)).toEqual(resultForTree);
});
