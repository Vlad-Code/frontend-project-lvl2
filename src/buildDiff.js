import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys, ((key) => key));
  const differense = sortedUnionKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = buildDiff(data1[key], data2[key]);
      return { key, children };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        children: [],
        status: 'added',
        value1: 'doesnt exist',
        value2: data2[key],
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        children: [],
        status: 'deleted',
        value1: data1[key],
        value2: 'doesnt exist',
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        children: [],
        status: 'unchanged',
        value1: data1[key],
        value: data2[key],
      };
    }
    return {
      key,
      children: [],
      status: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });
  return differense;
};

export default buildDiff;
