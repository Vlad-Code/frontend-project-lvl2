import yaml from 'js-yaml';

const parseFile = (file, extension) => {
  let fileData;
  switch (extension) {
    case '.json':
      fileData = JSON.parse(file);
      break;
    case '.yml':
      fileData = yaml.load(file);
      break;
    default:
      throw new Error(`Unknown file extension: ${extension}!`);
  }
  return fileData;
};

export default parseFile;
