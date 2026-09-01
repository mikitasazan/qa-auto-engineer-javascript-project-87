const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatNode = (node) => {
  const { key, type } = node;

  switch (type) {
    case 'added':
      return `Property '${key}' was added with value: ${formatValue(node.value2)}`;
    case 'removed':
      return `Property '${key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${key}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
    default:
      throw new Error(`Unknown diff node type: '${type}'`);
  }
};

const plain = (diff) => diff
  .map(formatNode)
  .filter((line) => line !== null)
  .join('\n');

export default plain;
