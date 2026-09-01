import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from 'vitest';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff finds differences between two flat JSON files (stylish format)', () => {
  const expected = readFixture('expectedStylish.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

test('genDiff returns a string', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(typeof actual).toBe('string');
});

test('genDiff works with relative paths', () => {
  const relative1 = path.relative(process.cwd(), getFixturePath('file1.json'));
  const relative2 = path.relative(process.cwd(), getFixturePath('file2.json'));
  const expected = readFixture('expectedStylish.txt');
  const actual = genDiff(relative1, relative2);
  expect(actual).toBe(expected);
});
