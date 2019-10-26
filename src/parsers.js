const fs = require('fs');
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
];
const getAction = (arg) => actions.find(({ check }) => check(arg));
const getObject = (pathToFile) => {
  const { process } = getAction(pathToFile);
  return process(fs.readFileSync(pathToFile, 'utf8'));
};

export default (pathToFile1, pathToFile2) => [getObject(pathToFile1), getObject(pathToFile2)];
