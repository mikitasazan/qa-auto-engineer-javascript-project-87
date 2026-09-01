import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect, describe } from 'vitest';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe.each([
  ['json', 'file1.json', 'file2.json'],
  ['yaml', 'file1.yml', 'file2.yml'],
])('genDiff with %s files', (format, file1, file2) => {
  test('finds differences between two flat files (stylish format, default)', () => {
    const expected = readFixture('expectedStylish.txt');
    const actual = genDiff(getFixturePath(file1), getFixturePath(file2));
    expect(actual).toBe(expected);
  });

  test('returns a string', () => {
    const actual = genDiff(getFixturePath(file1), getFixturePath(file2));
    expect(typeof actual).toBe('string');
  });

  test('works with relative paths', () => {
    const relative1 = path.relative(process.cwd(), getFixturePath(file1));
    const relative2 = path.relative(process.cwd(), getFixturePath(file2));
    const expected = readFixture('expectedStylish.txt');
    const actual = genDiff(relative1, relative2);
    expect(actual).toBe(expected);
  });
});

test('genDiff throws on an unknown format name', () => {
  expect(() => genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'unknown-format',
  )).toThrow("Unknown format: 'unknown-format'");
});
