import { test, expect } from 'vitest';
import buildDiff from '../src/buildDiff.js';

test('buildDiff classifies added, removed, unchanged and changed keys, sorted by key', () => {
  const data1 = {
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  };
  const data2 = { timeout: 20, verbose: true, host: 'hexlet.io' };

  const diff = buildDiff(data1, data2);

  expect(diff).toEqual([
    {
      key: 'follow', type: 'removed', value1: false, value2: undefined,
    },
    {
      key: 'host', type: 'unchanged', value1: 'hexlet.io', value2: 'hexlet.io',
    },
    {
      key: 'proxy', type: 'removed', value1: '123.234.53.22', value2: undefined,
    },
    {
      key: 'timeout', type: 'changed', value1: 50, value2: 20,
    },
    {
      key: 'verbose', type: 'added', value1: undefined, value2: true,
    },
  ]);
});
