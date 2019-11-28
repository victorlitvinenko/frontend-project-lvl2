import errors from 'errno';
import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const render = (elements, parents = []) => {
  const lines = elements.reduce((acc, elem) => {
    const fullName = [...parents, elem.name].join('.');
    switch (elem.type) {
      case 'deleted':
        return [...acc, `Property '${fullName}' was removed`];
      case 'added':
        return [...acc, `Property '${fullName}' was added with value: ${stringify(elem.valueAfter)}`];
      case 'changed':
        return [...acc, `Property '${fullName}' was updated. From ${stringify(elem.valueBefore)} to ${stringify(elem.valueAfter)}`];
      case 'nested':
        return [...acc, `${render(elem.children, [...parents, elem.name])}`];
      case 'unchanged':
        return acc;
      default:
        throw new Error(errors.code.ESRCH);
    }
  }, []);
  return lines.join('\n');
};

export default render;
