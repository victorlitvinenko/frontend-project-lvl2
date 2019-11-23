import _ from 'lodash';

const indent = (level) => ('    '.repeat(level));

const stringify = (value, level = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = [];
  _.keys(value).forEach((elem) => {
    lines.push(`${indent(level)}    ${elem}: ${value[elem]}`);
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

const render = (elements, level = 0) => {
  const lines = [];
  elements.forEach((elem) => {
    const buildLine = (char) => `${indent(level)}  ${char} ${elem.name}: ${stringify(elem.value, level + 1)}`;
    switch (elem.type) {
      case 'deleted':
        lines.push(buildLine('-'));
        break;
      case 'added':
        lines.push(buildLine('+'));
        break;
      case 'changed':
        lines.push(`${indent(level)}  - ${elem.name}: ${stringify(elem.valueBefore, level + 1)}
${indent(level)}  + ${elem.name}: ${stringify(elem.value, level + 1)}`);
        break;
      case 'nested':
        lines.push(`${indent(level)}    ${elem.name}: ${render(elem.children, level + 1)}`);
        break;
      case 'unchanged':
        lines.push(buildLine(' '));
        break;
      default:
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(level)}}`;
};

export default render;
