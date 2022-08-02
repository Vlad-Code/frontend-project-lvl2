import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/index.js';

let __dirname;
let result;
beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  result = readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
});

test('check function for flat json files', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'before.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'after.json');
  expect(getDiff(filePathJson1, filePathJson2)).toEqual(result);
});

test('check function for flat yaml files', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'before.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'after.yml');
  expect(getDiff(filePathYaml1, filePathYaml2)).toEqual(result);
});
