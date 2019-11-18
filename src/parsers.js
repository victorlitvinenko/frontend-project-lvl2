import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const fileParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export const getFileType = (pathToFile) => path.extname(pathToFile).substring(1);

export const parse = (fileContent, fileType) => {
  const process = fileParsers[fileType];
  return process(fileContent);
};
