import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const fileParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const loadFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const getFileType = (pathToFile) => path.extname(pathToFile).substring(1);

const parse = (fileContent, fileType) => {
  const process = fileParsers[fileType];
  return process(fileContent);
};

export default (pathToFile) => {
  const fileContent = loadFile(pathToFile);
  const fileType = getFileType(pathToFile);
  return parse(fileContent, fileType);
};
