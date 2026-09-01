import stylish from './stylish.js';

const formatters = {
  stylish,
};

const formatDiff = (diff, formatName = 'stylish') => {
  const format = formatters[formatName];

  if (!format) {
    throw new Error(`Unknown format: '${formatName}'`);
  }

  return format(diff);
};

export default formatDiff;
