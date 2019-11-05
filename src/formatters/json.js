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
    switch (elem.type) {
      case 'changed':
        return [...acc, `{"name":"${elem.name}","type":"${elem.type}","value":${stringify(elem.value.old)},"newValue":${stringify(elem.value.new)}}`];
      case 'nested':
        return [...acc, `{"name":"${elem.name}","type":"${elem.type}","children":${render(elem.value)}}`];
      default:
        return [...acc, `{"name":"${elem.name}","type":"${elem.type}","value":${stringify(elem.value)}}`];
    }
  }, []);
  return `[${result.join(',')}]`;
};

export default render;
