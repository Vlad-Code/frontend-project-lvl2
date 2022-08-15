import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys);
  const differenses = sortedUnionKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = buildDiff(data1[key], data2[key]);
      return { key, type: 'complex difference', children };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value1: 'doesnt exist',
        value2: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'deleted',
        value1: data1[key],
        value2: 'doesnt exist',
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        type: 'unchanged',
        value1: data1[key],
        value: data2[key],
      };
    }
    return {
      key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });
  return differenses;
};

export default buildDiff;
