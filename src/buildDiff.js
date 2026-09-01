import _ from 'lodash';

// Строит внутреннее представление отличий между двумя плоскими объектами:
// отсортированный по ключу массив узлов вида { key, type, value1, value2 }.
// type принимает значения: 'added', 'removed', 'unchanged', 'changed'.
const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1) {
      return {
        key, type: 'added', value1: undefined, value2: data2[key],
      };
    }
    if (!hasKey2) {
      return {
        key, type: 'removed', value1: data1[key], value2: undefined,
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key, type: 'unchanged', value1: data1[key], value2: data2[key],
      };
    }
    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });
};

export default buildDiff;
