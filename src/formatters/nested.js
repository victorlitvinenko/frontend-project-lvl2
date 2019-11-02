export const stringify = (value, level = 0) => {
  const indent = '    '.repeat(level);
  if (value instanceof Object) {
    const result = Object.keys(value).reduce((acc, elem) => `${acc}${indent}    ${elem}: ${value[elem]}\n`, '');
    return `{\n${result}${indent}}`;
  }
  return value;
};

const render = (elements, level = 0) => {
  const indent = '    '.repeat(level);
  const result = elements.reduce((acc, elem) => {
    switch (elem.status) {
      case 'deleted':
        return `${acc}\n${indent}  - ${elem.name}: ${stringify(elem.value, level + 1)}`;
      case 'added':
        return `${acc}\n${indent}  + ${elem.name}: ${stringify(elem.value, level + 1)}`;
      case 'edited':
        return `${acc}\n${indent}  - ${elem.name}: ${stringify(elem.value, level + 1)}
${indent}  + ${elem.name}: ${stringify(elem.newValue, level + 1)}`;
      case 'children':
        return `${acc}\n${indent}    ${elem.name}: ${render(elem.children, level + 1)}`;
      // case 'unchanged':
      default:
        return `${acc}\n${indent}    ${elem.name}: ${stringify(elem.value, level + 1)}`;
    }
  }, '');
  return `{${result}\n${indent}}`;
};

export default render;
