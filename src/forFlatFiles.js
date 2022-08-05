import _ from 'lodash';
import parseFile from './parsers.js';

const getDiff = (filePath1, filePath2) => {
  const fileData1 = parseFile(filePath1);
  const fileData2 = parseFile(filePath2);
  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const unionKeys = _.union(keys1, keys2).sort();
  const result = unionKeys.reduce((acc, key) => {
    if (!Object.hasOwn(fileData1, key)) {
      acc.push(`+ ${key}: ${fileData2[key]}`);
    } else if (!Object.hasOwn(fileData2, key)) {
      acc.push(`- ${key}: ${fileData1[key]}`);
    } else if (fileData1[key] !== fileData2[key]) {
      acc.push(`- ${key}: ${fileData1[key]}`);
      acc.push(`+ ${key}: ${fileData2[key]}`);
    } else if (fileData1[key] === fileData2[key]) {
      acc.push(`  ${key}: ${fileData1[key]}`);
    }
    return acc;
  }, []);
  console.log(`{\n  ${result.join('\n  ')}\n}`);
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default getDiff;
