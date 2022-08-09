import _ from 'lodash';

const getValue = (value, replacer, depth) => {
  const iter = (iterValue, iterReplacer, iterDepth) => {
    if (!_.isObject(iterValue)) {
      return iterValue;
    }
    const dataArray = Object.entries(iterValue);
    const lines = dataArray.map(([key, internalValue]) => {
      if (!_.isObject(internalValue)) {
        return `${replacer.repeat(iterDepth + 2)}  ${key}: ${internalValue}`;
      }
      return `${replacer.repeat(iterDepth + 2)}  ${key}: ${iter(internalValue, iterReplacer, iterDepth + 2)}`;
    });
    return `{\n${lines.join('\n')}\n${iterReplacer.repeat(iterDepth + 1)}}`;
  };
  return iter(value, replacer, depth);
};

const getStylish = (diff) => {
  const iter = (differense, replacer = '  ', depth = 1) => {
    const result = differense
      .flatMap((item) => {
        const {
          key, children, status, value1, value2,
        } = item;
        if (children.length > 0) {
          return `${replacer.repeat(depth)}  ${key}: ${iter(children, replacer, depth + 2)}`;
        }
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
