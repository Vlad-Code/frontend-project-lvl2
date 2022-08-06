import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

let __dirname;
let result;
let resultForTreeStylish;
let resultForTreePlain;
beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  result = readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  resultForTreeStylish = readFileSync(`${__dirname}/../__fixtures__/resultForTreeStylish.txt`, 'utf-8');
  resultForTreePlain = readFileSync(`${__dirname}/../__fixtures__/resultforTreePlain.txt`, 'utf-8');
});

test('check function for flat json files', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'before.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'after.json');
  expect(genDiff(filePathJson1, filePathJson2)).toEqual(result);
});

test('check function for flat yaml files', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'before.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'after.yml');
  expect(genDiff(filePathYaml1, filePathYaml2)).toEqual(result);
});

test('check function for tree json files stylish format', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.json');
  expect(genDiff(filePathJson1, filePathJson2)).toEqual(resultForTreeStylish);
});

test('check function for tree yaml files stylish format', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.yml');
  expect(genDiff(filePathYaml1, filePathYaml2)).toEqual(resultForTreeStylish);
});

test('check function for tree json files plain format', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.json');
  expect(genDiff(filePathJson1, filePathJson2, 'plain')).toEqual(resultForTreePlain);
});

test('check function for tree yaml files plain format', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.yml');
  expect(genDiff(filePathYaml1, filePathYaml2, 'plain')).toEqual(resultForTreePlain);
});
