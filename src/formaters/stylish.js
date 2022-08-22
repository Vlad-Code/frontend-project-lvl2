import _ from 'lodash';

const getValue = (value, replacer, replacerCount) => {
  const iter = (iterValue, iterReplacer, iterReplacerCount) => {
    if (!_.isObject(iterValue)) {
      return iterValue;
    }
    const dataArray = Object.entries(iterValue);
    const lines = dataArray.map(([key, internalValue]) => {
      if (!_.isObject(internalValue)) {
        return `${replacer.repeat(iterReplacerCount + 3)}${key}: ${internalValue}`;
      }
      return `${replacer.repeat(iterReplacerCount + 3)}${key}: ${iter(internalValue, iterReplacer, iterReplacerCount + 2)}`;
    });
    return `{\n${lines.join('\n')}\n${iterReplacer.repeat(iterReplacerCount + 1)}}`;
  };
  return iter(value, replacer, replacerCount);
};

const getStylish = (diff) => {
  const iter = (differense, replacer, replacerCount) => {
    const result = differense
      .flatMap((item) => {
        const { type } = item;
        switch (type) {
          case 'nested':
            return `${replacer.repeat(replacerCount)}  ${item.key}: ${iter(item.children, replacer, replacerCount + 2)}`;
          case 'deleted':
            return `${replacer.repeat(replacerCount)}- ${item.key}: ${getValue(item.value1, replacer, replacerCount)}`;
          case 'added':
            return `${replacer.repeat(replacerCount)}+ ${item.key}: ${getValue(item.value2, replacer, replacerCount)}`;
          case 'unchanged':
            return `${replacer.repeat(replacerCount)}  ${item.key}: ${getValue(item.value1, replacer, replacerCount)}`;
          case 'changed':
            return [
              `${replacer.repeat(replacerCount)}- ${item.key}: ${getValue(item.value1, replacer, replacerCount)}`,
              `${replacer.repeat(replacerCount)}+ ${item.key}: ${getValue(item.value2, replacer, replacerCount)}`,
            ];
          default:
            throw new Error(`Unknown status: ${type}`);
        }
      });
    return `{\n${result.join('\n')}\n${replacer.repeat(replacerCount - 1)}}`;
  };
  return iter(diff, '  ', 1);
};

export default getStylish;
