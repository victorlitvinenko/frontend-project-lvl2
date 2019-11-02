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

const getObjects = (pathToFile1, pathToFile2) => (
  [getObject(pathToFile1), getObject(pathToFile2)]
);

const parse = (object1, object2) => (
  Object.keys({ ...object1, ...object2 }).sort().reduce((acc, elem) => {
    if (object1[elem] === object2[elem]) return [...acc, { name: elem, status: 'unchanged', value: object1[elem] }];
    if (object2[elem] === undefined) return [...acc, { name: elem, status: 'deleted', value: object1[elem] }];
    if (object1[elem] === undefined) return [...acc, { name: elem, status: 'added', value: object2[elem] }];
    // Objects are not equal:
    if (object1[elem] instanceof Object && object2[elem] instanceof Object) {
      return [
        ...acc,
        {
          name: elem, status: 'children', children: parse(object1[elem], object2[elem]),
        },
      ];
    }
    return [
      ...acc,
      {
        name: elem, status: 'edited', value: object1[elem], newValue: object2[elem],
      },
    ];
  }, []));

export default (pathToFile1, pathToFile2) => {
  const [object1, object2] = getObjects(pathToFile1, pathToFile2);
  return parse(object1, object2);
};
