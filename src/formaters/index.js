import getPlain from './plain.js';
import getStylish from './stylish.js';
import getJSON from './json.js';

const getFormatedOutput = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return getStylish(diff);
    case 'plain':
      return getPlain(diff);
    case 'json':
      return getJSON(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatedOutput;
