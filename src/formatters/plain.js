const _ = require('lodash');

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const render = (elements, parents = []) => {
  const result = elements.reduce((acc, elem) => {
    const newName = [...parents, elem.name].join('.');
    switch (elem.type) {
      case 'deleted':
        return `${acc}Property '${newName}' was removed\n`;
      case 'added':
        return `${acc}Property '${newName}' was added with value: ${stringify(elem.value)}\n`;
      case 'changed':
        return `${acc}Property '${newName}' was updated. From ${stringify(elem.value.old)} to ${stringify(elem.value.new)}\n`;
      case 'nested':
        return `${acc}${render(elem.value, [...parents, elem.name])}`;
      default:
        return acc;
    }
  }, '');
  return result;
};

export default (elements) => render(elements).trim();
