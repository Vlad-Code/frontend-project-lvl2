import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../flatGendiff.js';

test('check function for flat files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'before.json');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'after.json');
  const result = readFileSync(`${__dirname}/../__fixtures__/result`, 'utf-8');
  expect(getDiff(filePath1, filePath2)).toEqual(result);
});
