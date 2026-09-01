const formatValue = (value) => String(value);

const formatNode = (node) => {
  const { key, type } = node;

  switch (type) {
    case 'added':
      return `  + ${key}: ${formatValue(node.value2)}`;
    case 'removed':
      return `  - ${key}: ${formatValue(node.value1)}`;
    case 'unchanged':
      return `    ${key}: ${formatValue(node.value1)}`;
    case 'changed':
      return [
        `  - ${key}: ${formatValue(node.value1)}`,
        `  + ${key}: ${formatValue(node.value2)}`,
      ].join('\n');
    default:
      throw new Error(`Unknown diff node type: '${type}'`);
  }
};

const stylish = (diff) => {
  const lines = diff.map(formatNode);
  return ['{', ...lines, '}'].join('\n');
};

export default stylish;
