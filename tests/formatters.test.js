import { test, expect } from 'vitest';
import formatDiff from '../src/formatters/index.js';

test('formatDiff throws on an unknown format name', () => {
  expect(() => formatDiff([], 'unknown-format')).toThrow("Unknown format: 'unknown-format'");
});

test('formatDiff defaults to stylish', () => {
  const diff = [{
    key: 'a', type: 'unchanged', value1: 1, value2: 1,
  }];
  expect(formatDiff(diff)).toBe('{\n    a: 1\n}');
});
