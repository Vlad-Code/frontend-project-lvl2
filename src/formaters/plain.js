import _ from 'lodash';

const handelValues = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const stringify = (diff) => {
  const iter = (differences, path) => {
    const lines = differences.map((item) => {
      const { type } = item;
      switch (type) {
        case 'nested':
          return iter(item.children, `${path}${item.key}.`);
        case 'deleted':
          return `Property '${path}${item.key}' was removed`;
        case 'added':
          return `Property '${path}${item.key}' was added with value: ${handelValues(item.value)}`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${path}${item.key}' was updated. From ${handelValues(item.value1)} to ${handelValues(item.value2)}`;
        default:
          throw new Error(`Unknown status: ${type}`);
      }
    }).filter((item) => item !== null);
    return `${lines.join('\n')}`;
  };
  return iter(diff, '');
};

export default stringify;
