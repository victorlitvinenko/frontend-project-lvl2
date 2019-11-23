import yaml from 'js-yaml';
import parseIni from './parseIni';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, type) => {
  const process = parsers[type];
  return process(data);
};
