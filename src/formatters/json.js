const _ = require('lodash');

const stringify = (value) => {
  if (_.isObject(value)) {
    const result = _.keys(value).reduce((acc, elem) => [...acc, `"${elem}":${stringify(value[elem])}`], []);
    return `{${result.join(',')}}`;
  }
  return `"${value}"`;
};

const render = (elements) => {
  const result = elements.reduce((acc, elem) => {
    switch (elem.status) {
      case 'edited':
        return [...acc, `{"name":"${elem.name}","status":"${elem.status}","value":${stringify(elem.value)},"newValue":${stringify(elem.newValue)}}`];
      case 'children':
        return [...acc, `{"name":"${elem.name}","status":"${elem.status}","children":${render(elem.children)}}`];
      default:
        return [...acc, `{"name":"${elem.name}","status":"${elem.status}","value":${stringify(elem.value)}}`];
    }
  }, []);
  return `[${result.join(',')}]`;
};

export default render;
