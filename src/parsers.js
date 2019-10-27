const fs = require('fs');
const ini = require('ini');
const yaml = require('js-yaml');
const path = require('path');

const actions = [
  {
    check: (arg) => path.extname(arg) === '.json',
    process: JSON.parse,
  },
  {
    check: (arg) => path.extname(arg) === '.yml',
    process: yaml.safeLoad,
  },
  {
    check: (arg) => path.extname(arg) === '.ini',
    process: ini.parse,
  },
];
const getObject = (pathToFile) => {
  const { process } = actions.find(({ check }) => check(pathToFile));
  return process(fs.readFileSync(pathToFile, 'utf8'));
};

export default (pathToFile1, pathToFile2) => [getObject(pathToFile1), getObject(pathToFile2)];
