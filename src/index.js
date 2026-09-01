import _ from 'lodash';
import parse from './parsers.js';

const formatValue = (value) => String(value);

const buildStylishDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1) {
      return `  + ${key}: ${formatValue(data2[key])}`;
    }
    if (!hasKey2) {
      return `  - ${key}: ${formatValue(data1[key])}`;
    }
    if (data1[key] === data2[key]) {
      return `    ${key}: ${formatValue(data1[key])}`;
    }
    return [
      `  - ${key}: ${formatValue(data1[key])}`,
      `  + ${key}: ${formatValue(data2[key])}`,
    ].join('\n');
  });

  return ['{', ...lines, '}'].join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  return buildStylishDiff(data1, data2);
};

export default genDiff;
