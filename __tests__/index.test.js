import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

let __dirname;
let resultForTreeStylish;
let resultForTreePlain;
let resultForTreeJSON;
beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  resultForTreeStylish = readFileSync(`${__dirname}/../__fixtures__/resultForTreeStylish.txt`, 'utf-8');
  resultForTreePlain = readFileSync(`${__dirname}/../__fixtures__/resultForTreePlain.txt`, 'utf-8');
  resultForTreeJSON = readFileSync(`${__dirname}/../__fixtures__/resultForTreeJSON.json`, 'utf-8');
});

test('check function for tree json files stylish format', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.json');
  expect(genDiff(filePathJson1, filePathJson2, 'stylish')).toEqual(resultForTreeStylish);
});

test('check function for tree yaml files stylish format', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.yml');
  expect(genDiff(filePathYaml1, filePathYaml2, 'stylish')).toEqual(resultForTreeStylish);
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

test('check function for tree json files json format', () => {
  const filePathJson1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.json');
  const filePathJson2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.json');
  expect(genDiff(filePathJson1, filePathJson2, 'json')).toEqual(resultForTreeJSON);
});

test('check function for tree yaml files json format', () => {
  const filePathYaml1 = path.join(__dirname, '..', '__fixtures__', 'beforeTree.yml');
  const filePathYaml2 = path.join(__dirname, '..', '__fixtures__', 'afterTree.yml');
  expect(genDiff(filePathYaml1, filePathYaml2, 'json')).toEqual(resultForTreeJSON);
});
