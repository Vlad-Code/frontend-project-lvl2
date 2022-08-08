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

const getStylish = (diff) => {
  const iter = (differense, replacer = '  ', depth = 1) => {
    const result = Object
      .keys(differense)
      .flatMap((key) => {
        if (_.isObject(differense[key]) && !Array.isArray(differense[key])) {
          return `${replacer.repeat(depth)}  ${key}: ${iter(differense[key], replacer, depth + 2)}`;
        }
        const [status, value1, value2] = differense[key];
        switch (status) {
          case 'deleted':
            return `${replacer.repeat(depth)}- ${key}: ${getValue(value1, replacer, depth)}`;
          case 'added':
            return `${replacer.repeat(depth)}+ ${key}: ${getValue(value2, replacer, depth)}`;
          case 'unchanged':
            return `${replacer.repeat(depth)}  ${key}: ${getValue(value1, replacer, depth)}`;
          case 'changed':
            return [
              `${replacer.repeat(depth)}- ${key}: ${getValue(value1, replacer, depth)}`,
              `${replacer.repeat(depth)}+ ${key}: ${getValue(value2, replacer, depth)}`,
            ];
          default:
            throw new Error(`Unknown status: ${status}`);
        }
      });
    return `{\n${result.join('\n')}\n${replacer.repeat(depth - 1)}}`;
  };
  return iter(diff);
};

export default getStylish;
