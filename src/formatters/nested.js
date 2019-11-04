const _ = require('lodash');

const indent = (level) => ('    '.repeat(level));

export const stringify = (value, level = 0) => {
  if (_.isObject(value)) {
    const result = _.keys(value).reduce((acc, elem) => `${acc}${indent(level)}    ${elem}: ${value[elem]}\n`, '');
    return `{\n${result}${indent(level)}}`;
  }
  return value;
};

const render = (elements, level = 0) => {
  const result = elements.reduce((acc, elem) => {
    const prepareLine = (char) => (
      `${acc}\n${indent(level)}  ${char} ${elem.name}: ${stringify(elem.value, level + 1)}`
    );
    switch (elem.status) {
      case 'deleted':
        return prepareLine('-');
      case 'added':
        return prepareLine('+');
      case 'edited':
        return `${acc}\n${indent(level)}  - ${elem.name}: ${stringify(elem.value, level + 1)}
${indent(level)}  + ${elem.name}: ${stringify(elem.newValue, level + 1)}`;
      case 'children':
        return `${acc}\n${indent(level)}    ${elem.name}: ${render(elem.children, level + 1)}`;
      // case 'unchanged':
      default:
        return prepareLine(' ');
    }
  }, '');
  return `{${result}\n${indent(level)}}`;
};

export default render;
