import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  // Построение и форматирование дерева отличий появится на следующих шагах.
  return JSON.stringify({ data1, data2 });
};

export default genDiff;
