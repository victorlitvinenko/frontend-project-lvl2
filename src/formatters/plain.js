const prepareString = (value) => {
  if (value instanceof Object) return '[complex value]';
  return `'${value}'`;
};

const render = (elements, parents = []) => {
  const result = elements.reduce((acc, elem) => {
    const newName = [...parents, elem.name].join('.');
    switch (elem.status) {
      case 'deleted':
        return `${acc}Property '${newName}' was removed\n`;
      case 'added':
        return `${acc}Property '${newName}' was added with value: ${prepareString(elem.after)}\n`;
      case 'edited':
        return `${acc}Property '${newName}' was updated. From ${prepareString(elem.before)} to ${prepareString(elem.after)}\n`;
      case 'children':
        return `${acc}${render(elem.children, [...parents, elem.name])}`;
      default:
        return acc;
    }
  }, '');
  return result;
};

export default render;
