import fs from 'fs';
import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const fileParsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parseFile = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf8');
  const parse = fileParsers[path.extname(pathToFile).substring(1)];
  return parse(fileContent);
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

const getAst = (config1 = {}, config2 = {}) => {
  const configsKeys = _.union(_.keys(config1), _.keys(config2)).sort();
  return configsKeys.map((key) => {
    const { type, process } = keyTypes.find(
      (item) => item.check(config1, config2, key),
    );
    const value = process(config1[key], config2[key], getAst);
    return { name: key, type, value };
  });
};

export default (pathToFile1, pathToFile2) => {
  const config1 = parseFile(pathToFile1);
  const config2 = parseFile(pathToFile2);
  return getAst(config1, config2);
};
