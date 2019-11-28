import errors from 'errno';
import _ from 'lodash';

const indent = (level) => ('    '.repeat(level));

const stringify = (value, level = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((elem) => `${indent(level)}    ${elem}: ${value[elem]}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

const render = (elements, level = 0) => {
  const lines = elements.map((elem) => {
    const buildLine = (char, value) => `${indent(level)}  ${char} ${elem.name}: ${stringify(value, level + 1)}`;
    switch (elem.type) {
      case 'deleted':
        return buildLine('-', elem.valueBefore);
      case 'added':
        return buildLine('+', elem.valueAfter);
      case 'changed':
        return `${indent(level)}  - ${elem.name}: ${stringify(elem.valueBefore, level + 1)}
${indent(level)}  + ${elem.name}: ${stringify(elem.valueAfter, level + 1)}`;
      case 'nested':
        return `${indent(level)}    ${elem.name}: ${render(elem.children, level + 1)}`;
      case 'unchanged':
        return buildLine(' ', elem.valueAfter);
      default:
        throw new Error(errors.code.ESRCH);
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

export default render;
