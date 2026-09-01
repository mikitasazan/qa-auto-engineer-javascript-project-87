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

test('plain formatter skips unchanged properties and quotes strings, but not numbers/booleans/null', () => {
  const diff = [
    {
      key: 'a', type: 'unchanged', value1: 1, value2: 1,
    },
    {
      key: 'b', type: 'added', value1: undefined, value2: 'text',
    },
    {
      key: 'c', type: 'removed', value1: null, value2: undefined,
    },
    {
      key: 'd', type: 'changed', value1: false, value2: true,
    },
  ];

  expect(formatDiff(diff, 'plain')).toBe(
    [
      "Property 'b' was added with value: 'text'",
      "Property 'c' was removed",
      "Property 'd' was updated. From false to true",
    ].join('\n'),
  );
});
