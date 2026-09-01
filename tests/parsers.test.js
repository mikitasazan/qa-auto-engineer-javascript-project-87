import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from 'vitest';
import parse from '../src/parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parse reads and parses a JSON file', () => {
  const data = parse(getFixturePath('file1.json'));
  expect(data).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('parse throws on an unsupported file extension', () => {
  expect(() => parse(getFixturePath('file1.unsupported'))).toThrow(
    "Unknown file extension: 'unsupported'",
  );
});
