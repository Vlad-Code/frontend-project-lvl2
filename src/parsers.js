import yaml from 'js-yaml';

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yml' || 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extension: ${dataType}!`);
  }
};

export default parse;
