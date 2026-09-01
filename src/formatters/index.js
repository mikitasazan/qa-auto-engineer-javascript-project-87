import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatDiff = (diff, formatName = 'stylish') => {
  const format = formatters[formatName];

  if (!format) {
    throw new Error(`Unknown format: '${formatName}'`);
  }

  return format(diff);
};

export default formatDiff;
