import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2).sort();
  const differense = unionKeys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      acc[key] = buildDiff(data1[key], data2[key]);
    } else if (!Object.hasOwn(data1, key)) {
      acc[key] = ['added', data1[key], data2[key]];
    } else if (!Object.hasOwn(data2, key)) {
      acc[key] = ['deleted', data1[key], data2[key]];
    } else if (data1[key] === data2[key]) {
      acc[key] = ['unchanged', data1[key], data2[key]];
    } else if (data1[key] !== data2[key]) {
      acc[key] = ['changed', data1[key], data2[key]];
    }
    return acc;
  }, {});
  return differense;
};

export default buildDiff;
