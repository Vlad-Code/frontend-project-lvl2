import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys, ((key) => key));
  const differense = sortedUnionKeys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      // acc[key] = buildDiff(data1[key], data2[key]);
      return { ...acc, [key]: buildDiff(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      // acc[key] = ['added', "doesn't exist", data2[key]];
      return { ...acc, [key]: ['added', "doesn't exist", data2[key]] };
    }
    if (!Object.hasOwn(data2, key)) {
      // acc[key] = ['deleted', data1[key], "doesn't exist"];
      return { ...acc, [key]: ['deleted', data1[key], "doesn't exist"] };
    }
    if (data1[key] === data2[key]) {
      // acc[key] = ['unchanged', data1[key], data2[key]];
      return { ...acc, [key]: ['unchanged', data1[key], data2[key]] };
    }
    if (data1[key] !== data2[key]) {
      // acc[key] = ['changed', data1[key], data2[key]];
      return { ...acc, [key]: ['changed', data1[key], data2[key]] };
    }
    return acc;
  }, {});
  return differense;
};

export default buildDiff;
