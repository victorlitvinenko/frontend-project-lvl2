import _ from 'lodash';

const indent = (level) => ('    '.repeat(level));

const stringify = (value, level = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).reduce((acc, elem) => (
    [...acc, `${indent(level)}    ${elem}: ${value[elem]}`]
  ), []);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

const render = (elements, level = 0) => {
  const lines = elements.reduce((acc, elem) => {
    const buildLine = (char, value) => `${indent(level)}  ${char} ${elem.name}: ${stringify(value, level + 1)}`;
    switch (elem.type) {
      case 'deleted':
        return [...acc, buildLine('-', elem.valueBefore)];
      case 'added':
        return [...acc, buildLine('+', elem.valueAfter)];
      case 'changed':
        return [...acc, `${indent(level)}  - ${elem.name}: ${stringify(elem.valueBefore, level + 1)}
${indent(level)}  + ${elem.name}: ${stringify(elem.valueAfter, level + 1)}`];
      case 'nested':
        return [...acc, `${indent(level)}    ${elem.name}: ${render(elem.children, level + 1)}`];
      case 'unchanged':
        return [...acc, buildLine(' ', elem.valueAfter)];
      default:
        return acc;
    }
  }, []);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

export default render;
