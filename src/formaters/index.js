import getPlain from './plain.js';
import getStylish from './stylish.js';
import getJSON from './json.js';

const getFormatedOutput = (diff, format) => {
  if (format === 'plain') {
    console.log(getPlain(diff));
    return getPlain(diff);
  }
  if (format === 'json') {
    console.log(getJSON(diff));
    return getJSON(diff);
  }
  console.log(getStylish(diff));
  return getStylish(diff, format);
};

export default getFormatedOutput;
