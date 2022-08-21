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
      const {
        key, type, children, value1, value2,
      } = item;
      switch (type) {
        case 'nested':
          return iter(children, `${path}${key}.`);
        case 'deleted':
          return `Property '${path}${key}' was removed`;
        case 'added':
          return `Property '${path}${key}' was added with value: ${handelValues(value2)}`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${path}${key}' was updated. From ${handelValues(value1)} to ${handelValues(value2)}`;
        default:
          throw new Error(`Unknown status: ${type}`);
      }
    }).filter((item) => item !== null);
    return `${lines.join('\n')}`;
  };
  return iter(diff, '');
};

export default stringify;
