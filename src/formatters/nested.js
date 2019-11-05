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
  // console.log(elements);
  // return;
  const result = elements.reduce((acc, elem) => {
    const buildLine = (char) => (
      `${acc}\n${indent(level)}  ${char} ${elem.name}: ${stringify(elem.value, level + 1)}`
    );
    switch (elem.type) {
      case 'deleted':
        return buildLine('-');
      case 'added':
        return buildLine('+');
      case 'changed':
        return `${acc}\n${indent(level)}  - ${elem.name}: ${stringify(elem.value.old, level + 1)}
${indent(level)}  + ${elem.name}: ${stringify(elem.value.new, level + 1)}`;
      case 'nested':
        return `${acc}\n${indent(level)}    ${elem.name}: ${render(elem.value, level + 1)}`;
      default:
        return buildLine(' ');
    }
  }, '');
  return `{${result}\n${indent(level)}}`;
};

export default render;
