import _ from 'lodash';

const space = ' ';

const getIntend = (depth, replacer, spaceCount = 4) => replacer.repeat(depth * spaceCount - 2);

const getValue = (value, depth, replacer, spaceCount = 4) => {
  const iter = (iterValue, iterDepth, iterReplacer) => {
    if (!_.isObject(iterValue)) {
      return iterValue;
    }
    const dataArray = Object.entries(iterValue);
    const lines = dataArray.map(([key, internalValue]) => {
      if (!_.isObject(internalValue)) {
        return `${replacer.repeat(spaceCount * (iterDepth + 1))}${key}: ${internalValue}`;
      }
      return `${replacer.repeat(spaceCount * (iterDepth + 1))}${key}: ${iter(internalValue, iterDepth + 1, iterReplacer)}`;
    });
    return `{\n${lines.join('\n')}\n${replacer.repeat(spaceCount * iterDepth)}}`;
  };
  return iter(value, depth, replacer);
};

const getStylish = (diff) => {
  const iter = (difference, depth) => {
    const result = difference
      .flatMap((item) => {
        const { type } = item;
        switch (type) {
          case 'nested':
            return `${getIntend(depth, space)}  ${item.key}: ${iter(item.children, depth + 1)}`;
          case 'deleted':
            return `${getIntend(depth, space)}- ${item.key}: ${getValue(item.value, depth, space)}`;
          case 'added':
            return `${getIntend(depth, space)}+ ${item.key}: ${getValue(item.value, depth, space)}`;
          case 'unchanged':
            return `${getIntend(depth, space)}  ${item.key}: ${getValue(item.value, depth, space)}`;
          case 'changed':
            return [
              `${getIntend(depth, space)}- ${item.key}: ${getValue(item.value1, depth, space)}`,
              `${getIntend(depth, space)}+ ${item.key}: ${getValue(item.value2, depth, space)}`,
            ];
          default:
            throw new Error(`Unknown status: ${type}`);
        }
      });
    return `{\n${result.join('\n')}\n${space.repeat(depth * 4 - 4)}}`;
  };
  return iter(diff, 1);
};

export default getStylish;
