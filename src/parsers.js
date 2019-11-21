import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, type) => {
  const process = parsers[type];
  return process(data);
};
