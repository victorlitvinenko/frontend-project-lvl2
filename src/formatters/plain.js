import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const render = (elements, parents = []) => {
  const lines = [];
  elements.forEach((elem) => {
    const fullName = [...parents, elem.name].join('.');
    switch (elem.type) {
      case 'deleted':
        lines.push(`Property '${fullName}' was removed`);
        break;
      case 'added':
        lines.push(`Property '${fullName}' was added with value: ${stringify(elem.value)}`);
        break;
      case 'changed':
        lines.push(`Property '${fullName}' was updated. From ${stringify(elem.valueBefore)} to ${stringify(elem.value)}`);
        break;
      case 'nested':
        lines.push(`${render(elem.children, [...parents, elem.name])}`);
        break;
      default:
    }
  });
  return lines.join('\n');
};

export default render;
