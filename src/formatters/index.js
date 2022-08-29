import stringify from './plain.js';
import getStylish from './stylish.js';

const getFormattedOutput = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return getStylish(diff);
    case 'plain':
      return stringify(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};

export default getFormattedOutput;
