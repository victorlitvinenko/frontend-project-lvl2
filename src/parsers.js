const fs = require('fs');
const _ = require('lodash');
const ini = require('ini');
const yaml = require('js-yaml');
const path = require('path');

const fileTypes = [
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
  const { process } = fileTypes.find(({ check }) => check(pathToFile));
  return process(fs.readFileSync(pathToFile, 'utf8'));
};

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    process: (first, second, fn) => fn(first, second),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: (first) => _.identity(first),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first) => _.identity(first),
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
];

export const getAst = (obj1 = {}, obj2 = {}) => {
  const configsKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return configsKeys.map((key) => {
    const { type, process } = keyTypes.find(
      (item) => item.check(obj1, obj2, key),
    );
    const value = process(obj1[key], obj2[key], getAst);
    return { name: key, type, value };
  });
};

export default (pathToFile1, pathToFile2) => getAst(getObject(pathToFile1), getObject(pathToFile2));
