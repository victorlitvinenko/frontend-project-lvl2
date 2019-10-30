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
export const stringify = (value, indentLevel = 0) => {
  const indent = '    '.repeat(indentLevel);
  if (value instanceof Object) {
    const result = Object.keys(value).reduce((acc, elem) => `${acc}${indent}    ${elem}: ${value[elem]}\n`, '');
    return `{\n${result}${indent}}`;
  }
  return value;
};

export const parse = (object1, object2) => (
  Object.keys({ ...object1, ...object2 }).sort().reduce((acc, elem) => {
    if (object1[elem] === object2[elem]) return [...acc, { name: elem, status: 'unchanged', before: object1[elem] }];
    if (object2[elem] === undefined) return [...acc, { name: elem, status: 'deleted', before: object1[elem] }];
    if (object1[elem] === undefined) return [...acc, { name: elem, status: 'added', after: object2[elem] }];
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
        name: elem, status: 'edited', before: object1[elem], after: object2[elem],
      },
    ];
  }, []));

export const render = (elements, indentLevel = 0) => {
  const indent = '    '.repeat(indentLevel);
  const result = elements.reduce((acc, elem) => {
    switch (elem.status) {
      case 'unchanged':
        return `${acc}\n${indent}    ${elem.name}: ${stringify(elem.before, indentLevel + 1)}`;
      case 'deleted':
        return `${acc}\n${indent}  - ${elem.name}: ${stringify(elem.before, indentLevel + 1)}`;
      case 'added':
        return `${acc}\n${indent}  + ${elem.name}: ${stringify(elem.after, indentLevel + 1)}`;
      case 'edited':
        return `${acc}\n${indent}  - ${elem.name}: ${stringify(elem.before, indentLevel + 1)}
${indent}  + ${elem.name}: ${stringify(elem.after, indentLevel + 1)}`;
      case 'children':
        return `${acc}\n${indent}    ${elem.name}: ${render(elem.children, indentLevel + 1)}`;
      default:
        return acc;
    }
  }, '');
  return `{${result}\n${indent}}`;
};

export const getObjects = (pathToFile1, pathToFile2) => (
  [getObject(pathToFile1), getObject(pathToFile2)]
);
