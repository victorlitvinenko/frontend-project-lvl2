const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const actions = [
  {
    check: (arg) => path.extname(arg) === '.json',
    process: (pathToFile) => JSON.parse(fs.readFileSync(pathToFile, 'utf8')),
  },
  {
    check: (arg) => path.extname(arg) === '.yml',
    process: (pathToFile) => yaml.safeLoad(fs.readFileSync(pathToFile, 'utf8')),
  },
];
const getAction = (arg) => actions.find(({ check }) => check(arg));
const getObject = (pathToFile) => {
  const { process } = getAction(pathToFile);
  return process(pathToFile);
};

export default (pathToFile1, pathToFile2) => [getObject(pathToFile1), getObject(pathToFile2)];
