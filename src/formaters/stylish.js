import _ from 'lodash';

const getValue = (value, replacer, depth) => {
  const iter = (iterValue, iterReplacer, iterDepth) => {
    if (!_.isObject(iterValue)) {
      return iterValue;
    }
    const dataArray = Object.entries(iterValue);
    const lines = dataArray.map(([key, internalValue]) => {
      if (!_.isObject(internalValue)) {
        return `${replacer.repeat(2 * (iterDepth + 1))}${key}: ${internalValue}`;
      }
      return `${replacer.repeat(2 * (iterDepth + 1))}${key}: ${iter(internalValue, iterReplacer, iterDepth + 1)}`;
    });
    return `{\n${lines.join('\n')}\n${iterReplacer.repeat(2 * iterDepth)}}`;
  };
  return iter(value, replacer, depth);
};

const getStylish = (diff) => {
  const iter = (differense, replacer, replacerCount, depth) => {
    const result = differense
      .flatMap((item) => {
        const { type } = item;
        switch (type) {
          case 'nested':
            return `${replacer.repeat(replacerCount + depth)}  ${item.key}: ${iter(item.children, replacer, replacerCount + 1, depth + 1)}`;
          case 'deleted':
            return `${replacer.repeat(replacerCount + depth)}- ${item.key}: ${getValue(item.value, replacer, depth)}`;
          case 'added':
            return `${replacer.repeat(replacerCount + depth)}+ ${item.key}: ${getValue(item.value, replacer, depth)}`;
          case 'unchanged':
            return `${replacer.repeat(replacerCount + depth)}  ${item.key}: ${getValue(item.value, replacer, depth)}`;
          case 'changed':
            return [
              `${replacer.repeat(replacerCount + depth)}- ${item.key}: ${getValue(item.value1, replacer, depth)}`,
              `${replacer.repeat(replacerCount + depth)}+ ${item.key}: ${getValue(item.value2, replacer, depth)}`,
            ];
          default:
            throw new Error(`Unknown status: ${type}`);
        }
      });
    return `{\n${result.join('\n')}\n${replacer.repeat(replacerCount + depth - 1)}}`;
  };
  return iter(diff, '  ', 0, 1);
};

export default getStylish;
