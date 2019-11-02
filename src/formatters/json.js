export const stringify = (value) => {
  if (value instanceof Object) {
    const result = Object.keys(value).reduce((acc, elem) => [...acc, `"${elem}":${stringify(value[elem])}`], []);
    return `{${result.join(',')}}`;
  }
  return `"${value}"`;
};

const render = (elements) => {
  const result = elements.reduce((acc, elem) => {
    switch (elem.status) {
      case 'deleted':
        return [...acc, `{"name":"${elem.name}","status":"deleted","value":${stringify(elem.value)}}`];
      case 'added':
        return [...acc, `{"name":"${elem.name}","status":"added","value":${stringify(elem.value)}}`];
      case 'edited':
        return [...acc, `{"name":"${elem.name}","status":"edited","value":${stringify(elem.value)},"newValue":${stringify(elem.newValue)}}`];
      case 'children':
        return [...acc, `{"name":"${elem.name}","status":"children","children":${render(elem.children)}}`];
      // case 'unchanged':
      default:
        return [...acc, `{"name":"${elem.name}","status":"unchanged","value":${stringify(elem.value)}}`];
    }
  }, []);
  return `[${result.join(',')}]`;
};

export default render;
