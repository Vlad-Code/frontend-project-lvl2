import _ from 'lodash';

const getValue = (object, replacer, depth) => {
  const iter = (values, iterReplacer, iterDepth) => {
    if (!_.isObject(values)) {
      return values;
    }
    const dataArray = Object.entries(values);
    const lines = dataArray.map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${replacer.repeat(iterDepth + 2)}  ${key}: ${value}`;
      }
      return `${replacer.repeat(iterDepth + 2)}  ${key}: ${iter(value, iterReplacer, iterDepth + 2)}`;
    });
    return `{\n${lines.join('\n')}\n${iterReplacer.repeat(iterDepth + 1)}}`;
  };
  return iter(object, replacer, depth);
};

export const getStylish = (diff) => {
  const iter = (differense, replacer = '  ', depth = 1) => {
    const keysOfDiff = Object.keys(differense);
    const result = keysOfDiff.reduce((acc, key) => {
      if (!Array.isArray(differense[key])) {
        acc.push(`${replacer.repeat(depth)}  ${key}: ${iter(differense[key], replacer, depth + 2)}`);
      } else {
        const [status, value1, value2] = differense[key];
        switch (status) {
          case 'deleted':
            acc.push(`${replacer.repeat(depth)}- ${key}: ${getValue(value1, replacer, depth)}`);
            break;
          case 'added':
            acc.push(`${replacer.repeat(depth)}+ ${key}: ${getValue(value2, replacer, depth)}`);
            break;
          case 'unchanged':
            acc.push(`${replacer.repeat(depth)}  ${key}: ${getValue(value1, replacer, depth)}`);
            break;
          case 'changed':
            acc.push(`${replacer.repeat(depth)}- ${key}: ${getValue(value1, replacer, depth)}`);
            acc.push(`${replacer.repeat(depth)}+ ${key}: ${getValue(value2, replacer, depth)}`);
            break;
          default:
            throw new Error(`Unknown status: ${status}`);
        }
      }
      return acc;
    }, []);
    return `{\n${result.join('\n')}\n${replacer.repeat(depth - 1)}}`;
  };
  return iter(diff);
};

export const getPlain = (diff, path = '') => {
  const keys = Object.keys(diff);
  const lines = keys.map((key) => {
    if (!Array.isArray(diff[key])) {
      return getPlain(diff[key], `${path}${key}.`);
    }
    const [status, value1, value2] = diff[key];
    const handelValues = (value) => {
      if (_.isObject(value)) {
        return '[complex value]';
      }
      if (typeof (value) === 'string') {
        return `'${value}'`;
      }
      return value;
    };
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