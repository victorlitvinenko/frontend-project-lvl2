const fs = require('fs');
const _ = require('lodash');
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

const parse = (obj1, obj2) => (
  _.union(_.keys(obj1), _.keys(obj2)).sort().reduce((acc, name) => {
    if (obj1[name] === obj2[name]) return [...acc, { name, status: 'unchanged', value: obj1[name] }];
    if (obj2[name] === undefined) return [...acc, { name, status: 'deleted', value: obj1[name] }];
    if (obj1[name] === undefined) return [...acc, { name, status: 'added', value: obj2[name] }];
    if (_.isObject(obj1[name]) && _.isObject(obj2[name])) {
      return [
        ...acc,
        {
          name, status: 'children', children: parse(obj1[name], obj2[name]),
        },
      ];
    }
    return [
      ...acc,
      {
        name, status: 'edited', value: obj1[name], newValue: obj2[name],
      },
    ];
  }, []));

export default (pathToFile1, pathToFile2) => parse(getObject(pathToFile1), getObject(pathToFile2));
