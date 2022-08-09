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

const getPlain = (diff, path = '') => {
  const lines = diff.map((item) => {
    const {
      key, children, status, value1, value2,
    } = item;
    if (children.length > 0) {
      return getPlain(children, `${path}${key}.`);
    }
    switch (status) {
      case 'deleted':
        return `Property '${path}${key}' was removed`;
      case 'added':
        return `Property '${path}${key}' was added with value: ${handelValues(value2)}`;
      case 'unchanged':
        return '';
      case 'changed':
        return `Property '${path}${key}' was updated. From ${handelValues(value1)} to ${handelValues(value2)}`;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }).filter((item) => item !== '');
  return `${lines.join('\n')}`;
};

export default getPlain;
