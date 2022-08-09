import yaml from 'js-yaml';

const parseFile = (file, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown file extension: ${extension}!`);
  }
};

export default parseFile;
