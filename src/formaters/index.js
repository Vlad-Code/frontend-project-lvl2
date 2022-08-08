import getPlain from './plain.js';
import getStylish from './stylish.js';

const getFormatedOutput = (diff, format) => {
  if (format === 'plain') {
    console.log(getPlain(diff));
    return getPlain(diff);
  }
  console.log(getStylish(diff));
  return getStylish(diff, format);
};

export default getFormatedOutput;
