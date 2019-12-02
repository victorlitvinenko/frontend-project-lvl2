import errors from 'errno';
import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const render = (elements, parents = []) => {
  const lines = elements.map((elem) => {
    const fullName = [...parents, elem.name].join('.');
    switch (elem.type) {
      case 'deleted':
        return `Property '${fullName}' was removed`;
      case 'added':
        return `Property '${fullName}' was added with value: ${stringify(elem.valueAfter)}`;
      case 'changed':
        return `Property '${fullName}' was updated. From ${stringify(elem.valueBefore)} to ${stringify(elem.valueAfter)}`;
      case 'nested':
        return `${render(elem.children, [...parents, elem.name])}`;
      case 'unchanged':
        return '';
      default:
        throw new Error(errors.code.ESRCH);
    }
  }, []);
  return lines.filter((el) => el).join('\n');
};

export default render;
